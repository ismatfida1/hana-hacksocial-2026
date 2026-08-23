import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM, listLLMModels } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const hanaSystemPrompt = `You are Hana, a cute cream robot who helps people learn. You are a smart, patient friend — not a professor or a business tool.

Use very simple everyday English. Keep replies short. Share one idea at a time. Start with the simple version, then give one small example. Use a technical word only when needed, and explain it right away. Do not give a long list unless the learner asks for one. Ask one clear question at most. Format replies so they are easy to scan: use one short Markdown heading, then 2–4 short bullets or numbered points when a list helps, then one tiny example or one clear next action. Do not write one dense paragraph. Do not add headings that do not help.

If the learner says “I don’t understand,” do not repeat the same answer. Say “No problem — let’s make it easier,” then explain it with simpler words, a picture in words, or a tiny example. Never make the learner feel bad. Be warm and lightly playful, but do not talk constantly. Give one clear next step.

You can help with code, errors, ideas, projects, careers, and learning resources. Be honest when you are unsure. Do not invent facts, deadlines, guarantees, sources, or requirements. Never ask to remember secrets, API keys, private keys, or sensitive personal information. End with one kind action when useful.`;

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
  hana: router({
    chat: publicProcedure.input(chatInput).mutation(async ({ input }) => {
      const contextLines = input.context ? Object.entries(input.context)
        .filter(([, value]) => value && (!Array.isArray(value) || value.length > 0))
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join("; ") : value}`)
        .join("\n") : "No additional learner context was approved.";
      const modeInstruction = input.mode === "analogy" ? "Use the heading ## Simple picture, then one memorable analogy and one short check question." : input.mode === "example" ? "Use the heading ## Tiny example, then show a small concrete example and one thing to try." : input.mode === "debug" ? "Use the headings ## What I see and ## Try this, with a calm numbered debugging checklist and one next diagnostic step." : input.mode === "deep" ? "Use the headings ## Short answer and ## More detail. Keep the second section compact." : input.mode === "career" ? "Use the headings ## Paths that may fit and ## My first suggestion. Return 2–3 exploratory directions with a short fit reason, compact role description, one project idea, and key skills." : input.mode === "project" ? "Use the headings ## Small project and ## First step. Turn the idea into a scoped plan with outcome, short stages, suggested technology, and a definition of done." : "Use the heading ## Simple answer, then 2–4 short points and one clear next action.";
      const { data: models } = await listLLMModels();
      const model = models.find((candidate) => candidate.id.startsWith("claude-sonnet"))?.id
        ?? models.find((candidate) => candidate.id.startsWith("gpt-5-mini"))?.id;
      const response = await invokeLLM({
        model,
        messages: [
          { role: "system", content: hanaSystemPrompt },
          { role: "user", content: `Response mode: ${modeInstruction}\n\nApproved learner context:\n${contextLines}\n\nLearner message:\n${input.message}` },
        ],
      });
      const content = response.choices[0]?.message?.content;
      const text = typeof content === "string" ? content : "I’m still finding the clearest way to help. Try asking me one smaller question, and we’ll take it step by step.";
      return { text, model: model ?? "default" };
    }),
  }),
});

export type AppRouter = typeof appRouter;
