import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { generateText, providerLabel } from "./_core/aiProviders";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { getHanaStudentMemory, upsertHanaStudentMemory } from "./db";
import { buildHanaContext, formatStudentContextForHana, getStudentCareerContext, getStudentProjects, getStudentProgress, getStudentSkills, recordHanaConversation, updateStudentProfile } from "./studentContext";
import { buildRoadmap, type PathType } from "../shared/hanaJourney";

const hanaSystemPrompt = `You are Hana, a cute cream robot who helps people learn. You are a smart, patient friend — not a professor or a business tool.

Use very simple everyday English. Keep replies short. Share one idea at a time. Start with the simple version, then give one small example. Use a technical word only when needed, and explain it right away. Do not give a long list unless the learner asks for one. Ask one clear question at most. Format replies so they are easy to scan: use one short Markdown heading, then 2–4 short bullets or numbered points when a list helps, then one tiny example or one clear next action. Do not write one dense paragraph. Do not add headings that do not help.

If the learner says “I don’t understand,” do not repeat the same answer. Say “No problem — let’s make it easier,” then explain it with simpler words, a picture in words, or a tiny example. Never make the learner feel bad. Be warm and lightly playful, but do not talk constantly. Give one clear next step.

You can help with code, errors, ideas, projects, careers, and learning resources. Be honest when you are unsure. Do not invent facts, deadlines, guarantees, sources, or requirements. Never ask to remember secrets, API keys, private keys, or sensitive personal information. End with one kind action when useful.`;

export const memoryProfileSchema = z.object({
  university: z.string().max(160).optional(), degree: z.string().max(120).optional(), department: z.string().max(120).optional(), semester: z.string().max(80).optional(),
  subjects: z.array(z.string().max(160)).max(80).default([]), upcomingSubjects: z.array(z.string().max(160)).max(80).default([]), completedSubjects: z.array(z.string().max(160)).max(80).default([]),
  career: z.string().max(120).optional(), careerGoal: z.string().max(160).optional(), currentJourney: z.string().max(160).optional(), currentActiveStep: z.string().max(160).optional(),
  demonstratedSkills: z.array(z.string().max(120)).max(80).default([]), completedSkills: z.array(z.string().max(120)).max(80).default([]), weakAreas: z.array(z.string().max(120)).max(80).default([]), completedLearningSteps: z.array(z.string().max(160)).max(100).default([]),
  skills: z.array(z.string().max(80)).max(40).default([]), progress: z.array(z.string().max(120)).max(80).default([]), projects: z.array(z.string().max(160)).max(40).default([]), projectSkills: z.array(z.string().max(120)).max(80).default([]), githubProjects: z.array(z.string().max(200)).max(40).default([]), portfolioProjects: z.array(z.string().max(200)).max(40).default([]), competitions: z.array(z.string().max(200)).max(40).default([]),
  careerReadiness: z.string().max(160).optional(), preferredLearningTime: z.string().max(120).optional(), availableStudyTime: z.string().max(120).optional(), learningHistory: z.array(z.string().max(240)).max(100).default([]), goals: z.array(z.string().max(160)).max(20).default([]),
});

type HanaMemoryProfileInput = z.infer<typeof memoryProfileSchema>;
const memoryConversation = z.object({ role: z.enum(["user", "hana"]), text: z.string().max(4000), createdAt: z.string().datetime() });

const chatInput = z.object({
  message: z.string().min(1).max(6000),
  mode: z.enum(["short", "analogy", "example", "debug", "deep", "career", "project"]).default("short"),
  context: z.object({
    currentQuest: z.string().max(160).optional(),
    activeProject: z.string().max(160).optional(),
    availableTime: z.string().max(80).optional(),
    explanationStyle: z.string().max(120).optional(),
    weakArea: z.string().max(160).optional(),
    approvedMemories: z.array(z.string().max(180)).max(8).optional(),
  }).optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  memory: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const memory = await getHanaStudentMemory(ctx.user.id);
      return memory ?? { profile: {}, conversations: [], memoryEnabled: 1 };
    }),
    save: protectedProcedure.input(z.object({ profile: memoryProfileSchema, conversations: z.array(memoryConversation).max(100), memoryEnabled: z.boolean() })).mutation(async ({ ctx, input }) => {
      await upsertHanaStudentMemory({ userId: ctx.user.id, profile: input.profile, conversations: input.conversations, memoryEnabled: input.memoryEnabled ? 1 : 0 });
      return { success: true } as const;
    }),
  }),
  studentContext: router({
    get: protectedProcedure.query(({ ctx }) => buildHanaContext(ctx.user.id)),
    updateProfile: protectedProcedure.input(memoryProfileSchema.partial()).mutation(async ({ ctx, input }) => updateStudentProfile(ctx.user.id, input)),
    skills: protectedProcedure.query(({ ctx }) => getStudentSkills(ctx.user.id)),
    progress: protectedProcedure.query(({ ctx }) => getStudentProgress(ctx.user.id)),
    projects: protectedProcedure.query(({ ctx }) => getStudentProjects(ctx.user.id)),
    career: protectedProcedure.query(({ ctx }) => getStudentCareerContext(ctx.user.id)),
  }),
  hana: router({
    chat: protectedProcedure.input(chatInput).mutation(async ({ ctx, input }) => {
      const studentContext = await buildHanaContext(ctx.user.id);
      const extraContext = input.context ? Object.entries(input.context)
        .filter(([, value]) => value && (!Array.isArray(value) || value.length > 0))
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join("; ") : value}`)
        .join("\n") : "No extra context was supplied by the screen.";
      const modeInstruction = input.mode === "analogy" ? "Use the heading ## Simple picture, then one memorable analogy and one short check question." : input.mode === "example" ? "Use the heading ## Tiny example, then show a small concrete example and one thing to try." : input.mode === "debug" ? "Use the headings ## What I see and ## Try this, with a calm numbered debugging checklist and one next diagnostic step." : input.mode === "deep" ? "Use the headings ## Short answer and ## More detail. Keep the second section compact." : input.mode === "career" ? "Use the headings ## Paths that may fit and ## My first suggestion. Return 2–3 exploratory directions with a short fit reason, compact role description, one project idea, and key skills." : input.mode === "project" ? "Use the headings ## Small project and ## First step. Turn the idea into a scoped plan with outcome, short stages, suggested technology, and a definition of done." : "Use the heading ## Simple answer, then 2–4 short points and one clear next action.";
      const response = await generateText([
        { role: "system", content: `${hanaSystemPrompt}\n\nYou are a context-aware university and career coach. Treat the database context as the source of truth. Never say the student completed or demonstrated a skill unless it appears in completedLearningSteps, completedSkills, or demonstratedSkills. If the student asks about a next step, prefer currentActiveStep and the first unmet prerequisite. If they ask about APIs or another future skill, check completed skills and learning history first; explain the missing prerequisites instead of unlocking it. Never invent university subjects, projects, competitions, deadlines, or resources.` },
        { role: "user", content: `Response mode: ${modeInstruction}\n\nDatabase student context:\n${formatStudentContextForHana(studentContext)}\n\nScreen context:\n${extraContext}\n\nLearner message:\n${input.message}` },
      ]);
      await recordHanaConversation(ctx.user.id, [
        { role: "user", text: input.message, createdAt: new Date().toISOString() },
        { role: "hana", text: response.text, createdAt: new Date().toISOString() },
      ]);
      return { text: response.text, model: providerLabel(response.provider) };
    }),
    deviseJourney: protectedProcedure.input(z.object({
      studyArea: z.string().min(1).max(160).optional(), target: z.string().min(1).max(160).optional(), pathType: z.enum(["career", "skill-to-earn", "create-own", "not-sure"] as [PathType, ...PathType[]]).default("career"),
      level: z.string().max(120), goal: z.string().max(160), availableTime: z.string().max(80), interests: z.array(z.string().max(120)).max(8).default([]),
      university: z.string().max(160).optional(), degree: z.string().max(120).optional(), semester: z.string().max(80).optional(), existingSkills: z.array(z.string().max(120)).max(80).default([]),
    })).mutation(async ({ ctx, input }) => {
      const studentContext = await buildHanaContext(ctx.user.id);
      const selectedArea = input.studyArea || input.target || "Software Engineering";
      const roadmap = buildRoadmap({ pathType: input.pathType, target: selectedArea, university: input.university, degree: input.degree, semester: input.semester, existingSkills: input.existingSkills });
      const response = await generateText([
        { role: "system", content: "You are Hana, a careful university and career coach. Return JSON only. Use the database context as the source of truth. Build a realistic beginner-safe learning journey for the selected study area, preserving demonstrated and completed skills. Never force Python unless it is genuinely useful later. Do not claim a skill is complete without a stored mastery result. Include 3 steps in prerequisite order." },
        { role: "user", content: JSON.stringify({ task: "devise_journey", pathType: input.pathType, selectedStudyArea: selectedArea, currentLevel: input.level, goal: input.goal, availableStudyTime: input.availableTime, interests: input.interests, university: input.university, degree: input.degree, semester: input.semester, existingSkills: input.existingSkills, databaseStudentContext: studentContext, deterministicRoadmap: roadmap, output: { steps: [{ title: "short step name", purpose: "one simple sentence", kind: "learn | practice | build" }], todaysStep: "one short first task", whyToday: "one short reason" } }) },
      ], true);
      try {
        const parsed = JSON.parse(response.text) as { steps?: unknown[]; todaysStep?: string; whyToday?: string };
        return { ...parsed, roadmap, provider: providerLabel(response.provider) };
      } catch {
        return { steps: [], roadmap, todaysStep: "Start with one small task in your chosen subject.", whyToday: "Hana will shape the next step after you try it.", provider: providerLabel(response.provider) };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
