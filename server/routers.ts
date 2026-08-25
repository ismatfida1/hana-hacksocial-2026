import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { generateText, providerLabel } from "./_core/aiProviders";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { archiveOpportunity, clearHanaConversations, createAccountDeletionRequest, createHanaUpload, deleteHanaConversation, deleteHanaUpload, createOpportunity, deleteUserAccount, getHanaStudentMemory, getOpportunity, listHanaConversations, listHanaUploads, listOpportunities, updateOpportunity, upsertHanaStudentMemory } from "./db";
import { addCompetition, addPortfolioProject, addStudentProject, buildCoachContext, buildHanaContext, formatStudentContextForHana, getCareerReadiness, getDailyMission, getStudentCareerContext, getStudentProjects, getStudentProgress, getStudentSkills, getWeeklyReport, recordHanaConversation, recordLearningHistory, saveStepReference, setLearningStepCompletion, setOpportunityOutcome, setProjectMilestone, setProjectStatus, submitMasteryCheck, updateStudentProfile } from "./studentContext";
import { buildRoadmap, type PathType } from "../shared/hanaJourney";
import { verifyDemoPassword } from "./demoAccess";
import { validateResourceCandidate, verifyResourceCandidates } from "./resourceVerification";
import { lookupOfficialCurriculum } from "./curriculum";
import { storagePut } from "./storage";

const hanaSystemPrompt = `You are Hana, a cute cream robot who helps people learn. You are a smart, patient friend — not a professor or a business tool.

Use very simple everyday English. Keep replies short. Share one idea at a time. Start with the simple version, then give one small example. Use a technical word only when needed, and explain it right away. Do not give a long list unless the learner asks for one. Ask one clear question at most. Format replies so they are easy to scan: use one short Markdown heading, then 2–4 short bullets or numbered points when a list helps, then one tiny example or one clear next action. Do not write one dense paragraph. Do not add headings that do not help.

If the learner says “I don’t understand,” do not repeat the same answer. Say “No problem — let’s make it easier,” then explain it with simpler words, a picture in words, or a tiny example. Never make the learner feel bad. Be warm and lightly playful, but do not talk constantly. Give one clear next step.

You can help with code, errors, ideas, projects, careers, and learning resources. Be honest when you are unsure. Do not invent facts, deadlines, guarantees, sources, or requirements. Never ask to remember secrets, API keys, private keys, or sensitive personal information. End with one kind action when useful.`;

export const memoryProfileSchema = z.object({
  university: z.string().max(160).optional(), degree: z.string().max(120).optional(), department: z.string().max(120).optional(), semester: z.string().max(80).optional(),
  subjects: z.array(z.string().max(160)).max(80).default([]), upcomingSubjects: z.array(z.string().max(160)).max(80).default([]), completedSubjects: z.array(z.string().max(160)).max(80).default([]),
  career: z.string().max(120).optional(), careerGoal: z.string().max(160).optional(), currentJourney: z.string().max(160).optional(), currentActiveStep: z.string().max(160).optional(),
  demonstratedSkills: z.array(z.string().max(120)).max(80).default([]), completedSkills: z.array(z.string().max(120)).max(80).default([]), weakAreas: z.array(z.string().max(120)).max(80).default([]), completedLearningSteps: z.array(z.string().max(160)).max(100).default([]),
  skills: z.array(z.string().max(80)).max(40).default([]), progress: z.array(z.string().max(120)).max(80).default([]), projects: z.array(z.string().max(160)).max(40).default([]), projectSkills: z.array(z.string().max(120)).max(80).default([]), githubProjects: z.array(z.string().max(200)).max(40).default([]), portfolioProjects: z.array(z.string().max(200)).max(40).default([]), competitions: z.array(z.string().max(200)).max(40).default([]), opportunityOutcomes: z.array(z.object({ opportunityTitle: z.string().min(1).max(200), status: z.enum(["saved", "applied", "interview", "accepted", "rejected", "completed"]), updatedAt: z.string().datetime() })).max(80).default([]),
  careerReadiness: z.string().max(160).optional(), preferredLearningTime: z.string().max(120).optional(), availableStudyTime: z.string().max(120).optional(), energyMode: z.enum(["light", "normal", "deep"]).optional(), tourCompleted: z.boolean().optional(), stepNotes: z.record(z.string().max(160), z.string().max(2000)).default({}), stepResources: z.record(z.string().max(160), z.string().url().max(500)).default({}), masteryChecks: z.array(z.string().max(2400)).max(100).default([]), learningHistory: z.array(z.string().max(240)).max(100).default([]), goals: z.array(z.string().max(160)).max(20).default([]),
});

type HanaMemoryProfileInput = z.infer<typeof memoryProfileSchema>;
const memoryConversation = z.object({ role: z.enum(["user", "hana"]), text: z.string().max(4000), createdAt: z.string().datetime() });
const teachHanaUpload = z.object({ fileName: z.string().trim().min(1).max(255), mimeType: z.enum(["text/plain", "text/markdown", "text/javascript", "text/typescript", "application/json", "text/x-python", "text/x-java-source", "text/x-c", "text/x-c++src"]), sizeBytes: z.number().int().positive().max(1_000_000), contentBase64: z.string().min(1).max(1_400_000) });
const opportunityFields = z.object({ title: z.string().min(1).max(200), type: z.string().min(1).max(80), detail: z.string().min(1).max(4000), officialUrl: z.string().url().max(500), deadlineAt: z.string().datetime().nullable().optional(), eligibility: z.string().min(1).max(4000), prizeDetails: z.string().max(2000).nullable().optional(), location: z.string().max(200).nullable().optional(), requirements: z.string().max(4000).nullable().optional(), applicationSteps: z.string().max(4000).nullable().optional(), submissionFormat: z.string().max(4000).nullable().optional(), teamInfo: z.string().max(2000).nullable().optional(), difficulty: z.string().max(80).nullable().optional(), active: z.boolean().default(true) });
const opportunityUpdate = opportunityFields.partial();

const chatInput = z.object({
  message: z.string().min(1).max(6000),
  mode: z.enum(["short", "simple", "new-learner", "before-test", "analogy", "example", "exam-answer", "practice", "debug", "deep", "career", "project"]).default("short"),
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
  demo: router({
    verify: publicProcedure.input(z.object({ password: z.string().min(1).max(200) })).mutation(({ input }) => ({ authorized: verifyDemoPassword(input.password) })),
  }),
  account: router({
    requestDeletion: publicProcedure.input(z.object({ email: z.string().email().max(320) })).mutation(async ({ input }) => {
      await createAccountDeletionRequest(input.email);
      return { success: true } as const;
    }),
    delete: protectedProcedure.input(z.object({ confirmation: z.literal("DELETE MY ACCOUNT") })).mutation(async ({ ctx }) => {
      await deleteUserAccount(ctx.user.id);
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
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
    setEnabled: protectedProcedure.input(z.object({ enabled: z.boolean() })).mutation(async ({ ctx, input }) => {
      const current = await getHanaStudentMemory(ctx.user.id);
      await upsertHanaStudentMemory({ userId: ctx.user.id, profile: current?.profile || {}, conversations: current?.conversations || [], memoryEnabled: input.enabled ? 1 : 0 });
      return { success: true, enabled: input.enabled } as const;
    }),
    clear: protectedProcedure.mutation(async ({ ctx }) => {
      await upsertHanaStudentMemory({ profile: {}, conversations: [], memoryEnabled: 0, userId: ctx.user.id });
      return { success: true } as const;
    }),
    history: protectedProcedure.query(({ ctx }) => listHanaConversations(ctx.user.id)),
    clearHistory: protectedProcedure.mutation(async ({ ctx }) => {
      await clearHanaConversations(ctx.user.id);
      return { success: true } as const;
    }),
    deleteMessage: protectedProcedure.input(memoryConversation).mutation(async ({ ctx, input }) => {
      await deleteHanaConversation(ctx.user.id, input);
      return { success: true } as const;
    }),
    uploads: protectedProcedure.query(({ ctx }) => listHanaUploads(ctx.user.id)),
    saveUpload: protectedProcedure.input(teachHanaUpload).mutation(async ({ ctx, input }) => {
      const bytes = Buffer.from(input.contentBase64, "base64");
      if (bytes.byteLength !== input.sizeBytes || bytes.byteLength > 1_000_000) throw new Error("Upload size could not be verified");
      const stored = await storagePut(`users/${ctx.user.id}/teach-hana/${input.fileName}`, bytes, input.mimeType);
      const upload = await createHanaUpload({ userId: ctx.user.id, fileName: input.fileName, mimeType: input.mimeType, sizeBytes: bytes.byteLength, storageKey: stored.key });
      return { ...upload, url: stored.url };
    }),
    deleteUpload: protectedProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await deleteHanaUpload(ctx.user.id, input.id);
      return { success: true } as const;
    }),
  }),
  resources: router({
    verify: protectedProcedure.input(z.object({ resources: z.array(z.object({ label: z.string().min(1).max(180), url: z.string().url().max(500) })).min(1).max(4) })).query(async ({ input }) => {
      const safeCandidates = input.resources.filter(validateResourceCandidate);
      return { resources: await verifyResourceCandidates(safeCandidates) };
    }),
  }),
  curriculum: router({
    check: protectedProcedure.input(z.object({ university: z.string().max(160) })).query(({ input }) => lookupOfficialCurriculum(input.university)),
  }),
  opportunities: router({
    list: protectedProcedure.query(() => listOpportunities(true)),
    adminList: adminProcedure.query(() => listOpportunities(false)),
    adminCreate: adminProcedure.input(opportunityFields).mutation(async ({ ctx, input }) => {
      if (!validateResourceCandidate({ label: input.title, url: input.officialUrl })) throw new Error("Official URL must be a public HTTPS page");
      const checked = (await verifyResourceCandidates([{ label: input.title, url: input.officialUrl }]))[0];
      const created = await createOpportunity({ ...input, deadlineAt: input.deadlineAt ? new Date(input.deadlineAt) : null, prizeDetails: input.prizeDetails ?? null, active: input.active ? 1 : 0, createdBy: ctx.user.id, verificationStatus: checked?.reachable ? "verified" : "unreachable", verifiedAt: checked?.reachable ? new Date() : null });
      return created;
    }),
    adminUpdate: adminProcedure.input(z.object({ id: z.number().int().positive(), changes: opportunityUpdate })).mutation(async ({ input }) => {
      if (input.changes.officialUrl && !validateResourceCandidate({ label: input.changes.title || "Opportunity", url: input.changes.officialUrl })) throw new Error("Official URL must be a public HTTPS page");
      const checked = input.changes.officialUrl ? (await verifyResourceCandidates([{ label: input.changes.title || "Opportunity", url: input.changes.officialUrl }]))[0] : undefined;
      const { active, deadlineAt, prizeDetails, location, requirements, applicationSteps, submissionFormat, teamInfo, difficulty, ...rest } = input.changes;
      const changes = { ...rest, ...(deadlineAt !== undefined ? { deadlineAt: deadlineAt ? new Date(deadlineAt) : null } : {}), ...(prizeDetails !== undefined ? { prizeDetails: prizeDetails ?? null } : {}), ...(location !== undefined ? { location: location ?? null } : {}), ...(requirements !== undefined ? { requirements: requirements ?? null } : {}), ...(applicationSteps !== undefined ? { applicationSteps: applicationSteps ?? null } : {}), ...(submissionFormat !== undefined ? { submissionFormat: submissionFormat ?? null } : {}), ...(teamInfo !== undefined ? { teamInfo: teamInfo ?? null } : {}), ...(difficulty !== undefined ? { difficulty: difficulty ?? null } : {}), ...(active !== undefined ? { active: active ? 1 : 0 } : {}), ...(checked ? { verificationStatus: checked.reachable ? "verified" as const : "unreachable" as const, verifiedAt: checked.reachable ? new Date() : null } : {}) };
      return updateOpportunity(input.id, changes);
    }),
    adminArchive: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(({ input }) => archiveOpportunity(input.id)),
    adminVerify: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ input }) => {
      const current = await getOpportunity(input.id);
      if (!current) throw new Error("Opportunity not found");
      const checked = (await verifyResourceCandidates([{ label: current.title, url: current.officialUrl }]))[0];
      return updateOpportunity(input.id, { verificationStatus: checked?.reachable ? "verified" : "unreachable", verifiedAt: checked?.reachable ? new Date() : null });
    }),
  }),
  studentContext: router({
    get: protectedProcedure.query(({ ctx }) => buildHanaContext(ctx.user.id)),
    updateProfile: protectedProcedure.input(memoryProfileSchema.partial()).mutation(async ({ ctx, input }) => updateStudentProfile(ctx.user.id, input)),
    skills: protectedProcedure.query(({ ctx }) => getStudentSkills(ctx.user.id)),
    progress: protectedProcedure.query(({ ctx }) => getStudentProgress(ctx.user.id)),
    projects: protectedProcedure.query(({ ctx }) => getStudentProjects(ctx.user.id)),
    career: protectedProcedure.query(({ ctx }) => getStudentCareerContext(ctx.user.id)),
    dailyMission: protectedProcedure.query(({ ctx }) => getDailyMission(ctx.user.id)),
    weeklyReport: protectedProcedure.query(({ ctx }) => getWeeklyReport(ctx.user.id)),
    careerReadiness: protectedProcedure.query(({ ctx }) => getCareerReadiness(ctx.user.id)),
    submitMastery: protectedProcedure.input(z.object({ stepTitle: z.string().min(1).max(160), answer: z.string().min(1).max(2400) })).mutation(({ ctx, input }) => submitMasteryCheck(ctx.user.id, input.stepTitle, input.answer)),
    setStepCompletion: protectedProcedure.input(z.object({ stepTitle: z.string().min(1).max(160), completed: z.boolean() })).mutation(({ ctx, input }) => setLearningStepCompletion(ctx.user.id, input.stepTitle, input.completed)),
    saveStepReference: protectedProcedure.input(z.object({ stepTitle: z.string().min(1).max(160), note: z.string().max(2000).optional(), resourceUrl: z.string().url().max(500).optional() })).mutation(({ ctx, input }) => saveStepReference(ctx.user.id, input.stepTitle, input.note, input.resourceUrl)),
    coachContext: protectedProcedure.input(z.object({ module: z.enum(["ask-hana", "daily-mission", "career-coach", "project-coach", "career-readiness", "opportunity-matching", "university-coach", "weekly-report"]) })).query(({ ctx, input }) => buildCoachContext(ctx.user.id, input.module)),
    addProject: protectedProcedure.input(z.object({ title: z.string().min(1).max(160), skills: z.array(z.string().max(120)).max(12).default([]), milestones: z.array(z.string().max(160)).max(20).default([]), linkedStep: z.string().max(160).optional() })).mutation(({ ctx, input }) => addStudentProject(ctx.user.id, input.title, input.skills, input.milestones, input.linkedStep)),
    setProjectMilestone: protectedProcedure.input(z.object({ projectId: z.string().min(1).max(120), milestoneTitle: z.string().min(1).max(160), complete: z.boolean() })).mutation(({ ctx, input }) => setProjectMilestone(ctx.user.id, input.projectId, input.milestoneTitle, input.complete)),
    setProjectStatus: protectedProcedure.input(z.object({ projectId: z.string().min(1).max(120), status: z.enum(["locked", "active", "in_progress", "complete"]) })).mutation(({ ctx, input }) => setProjectStatus(ctx.user.id, input.projectId, input.status)),
    addPortfolioProject: protectedProcedure.input(z.object({ title: z.string().min(1).max(200) })).mutation(({ ctx, input }) => addPortfolioProject(ctx.user.id, input.title)),
    addCompetition: protectedProcedure.input(z.object({ title: z.string().min(1).max(200) })).mutation(({ ctx, input }) => addCompetition(ctx.user.id, input.title)),
    setOpportunityOutcome: protectedProcedure.input(z.object({ opportunityTitle: z.string().min(1).max(200), status: z.enum(["saved", "applied", "interview", "accepted", "rejected", "completed"]) })).mutation(({ ctx, input }) => setOpportunityOutcome(ctx.user.id, input.opportunityTitle, input.status)),
    recordLearning: protectedProcedure.input(z.object({ note: z.string().min(1).max(240) })).mutation(({ ctx, input }) => recordLearningHistory(ctx.user.id, input.note)),
  }),
  hana: router({
    chat: protectedProcedure.input(chatInput).mutation(async ({ ctx, input }) => {
      const studentContext = await buildHanaContext(ctx.user.id);
      const extraContext = input.context ? Object.entries(input.context)
        .filter(([, value]) => value && (!Array.isArray(value) || value.length > 0))
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join("; ") : value}`)
        .join("\n") : "No extra context was supplied by the screen.";
      const modeInstruction = input.mode === "simple" ? "Use the heading ## Simple version. Explain with very common words, no jargon, and one tiny example." : input.mode === "new-learner" ? "Use the heading ## Start here. Assume no prior technical knowledge, define any necessary word immediately, and give one small first step." : input.mode === "before-test" ? "Use the headings ## Remember this and ## Quick check. Give only the key ideas likely needed for a test, then one short self-check question." : input.mode === "analogy" ? "Use the heading ## Simple picture, then one memorable analogy and one short check question." : input.mode === "example" ? "Use the heading ## Tiny example, then show a small concrete example and one thing to try." : input.mode === "exam-answer" ? "Use the heading ## Exam answer. Give a concise, accurate answer first, then 2–4 supporting points and no motivational filler." : input.mode === "practice" ? "Use the headings ## Try this and ## Check yourself. Give one practice question without the answer first, then a short hint." : input.mode === "debug" ? "Use the headings ## What I see and ## Try this, with a calm numbered debugging checklist and one next diagnostic step." : input.mode === "deep" ? "Use the headings ## Short answer and ## More detail. Keep the second section compact." : input.mode === "career" ? "Use the headings ## Paths that may fit and ## My first suggestion. Return 2–3 exploratory directions with a short fit reason, compact role description, one project idea, and key skills." : input.mode === "project" ? "Use the headings ## Small project and ## First step. Turn the idea into a scoped plan with outcome, short stages, suggested technology, and a definition of done." : "Use the heading ## Simple answer, then 2–4 short points and one clear next action.";
      const response = await generateText([
        { role: "system", content: `${hanaSystemPrompt}\n\nYou are a context-aware university and career coach. Treat the database context as the source of truth. Never say the student completed or demonstrated a skill unless it appears in completedLearningSteps, completedSkills, or demonstratedSkills. If the student asks about a next step, prefer currentActiveStep and the first unmet prerequisite. If they ask about APIs or another future skill, check completed skills and learning history first; explain the missing prerequisites instead of unlocking it. Never invent university subjects, projects, competitions, deadlines, or resources.` },
        { role: "user", content: `Response mode: ${modeInstruction}\n\nDatabase student context:\n${formatStudentContextForHana(studentContext, input.message)}\n\nScreen context:\n${extraContext}\n\nLearner message:\n${input.message}` },
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
      university: z.string().max(160).optional(), degree: z.string().max(120).optional(), semester: z.string().max(80).optional(), subjects: z.array(z.string().max(160)).max(30).default([]), availableStudyTime: z.string().max(80).optional(), existingSkills: z.array(z.string().max(120)).max(80).default([]),
    })).mutation(async ({ ctx, input }) => {
      const studentContext = await buildHanaContext(ctx.user.id);
      const selectedArea = input.studyArea || input.target || "Software Engineering";
      const roadmap = buildRoadmap({ pathType: input.pathType, target: selectedArea, university: input.university, degree: input.degree, semester: input.semester, subjects: input.subjects, availableStudyTime: input.availableStudyTime || input.availableTime, existingSkills: input.existingSkills });
      const response = await generateText([
        { role: "system", content: "You are Hana, a careful university and career coach. Return JSON only. Use the database context as the source of truth. Build a realistic beginner-safe learning journey for the selected study area, preserving demonstrated and completed skills. Never force Python unless it is genuinely useful later. Do not claim a skill is complete without a stored mastery result. Include 3 steps in prerequisite order." },
        { role: "user", content: JSON.stringify({ task: "devise_journey", pathType: input.pathType, selectedStudyArea: selectedArea, currentLevel: input.level, goal: input.goal, availableStudyTime: input.availableTime, interests: input.interests, university: input.university, degree: input.degree, semester: input.semester, subjects: input.subjects, existingSkills: input.existingSkills, databaseStudentContext: studentContext, deterministicRoadmap: roadmap, output: { steps: [{ title: "short step name", purpose: "one simple sentence", kind: "learn | practice | build" }], todaysStep: "one short first task", whyToday: "one short reason" } }) },
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
