import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Lightbulb, MessageCircle, Sparkles, Trophy } from "lucide-react";
import { trpc } from "@/lib/trpc";

type Stage = "goal" | "roadmap" | "mission" | "ask" | "mastery" | "project" | "opportunity" | "progress";

const demoRoadmap = [
  { title: "Understand the problem", detail: "Choose one student problem that is worth solving.", state: "complete" },
  { title: "Build a small AI helper", detail: "Create a simple assistant that turns a question into a useful next step.", state: "current" },
  { title: "Test with real examples", detail: "Try the idea with three safe, realistic student questions.", state: "upcoming" },
  { title: "Share the result", detail: "Explain what you built and what you learned.", state: "upcoming" },
];

const stageOrder: Stage[] = ["goal", "roadmap", "mission", "ask", "mastery", "project", "opportunity", "progress"];

const stageCopy: Record<Stage, { eyebrow: string; title: string; caption: string }> = {
  goal: { eyebrow: "HackSocial 2026 · Demo Mode", title: "Turn confusion into one clear next step.", caption: "Hana helps a student move from an uncertain goal to something useful they can build." },
  roadmap: { eyebrow: "Your direction", title: "Here is the compact demo path.", caption: "A small path is easier to follow than a giant list of tools." },
  mission: { eyebrow: "Today’s mission", title: "Make the first useful piece.", caption: "Start with a tiny task. The goal is progress, not a perfect app." },
  ask: { eyebrow: "Ask Hana", title: "You are not stuck alone.", caption: "Ask a focused question while you work." },
  mastery: { eyebrow: "Quick check", title: "Show what you understood.", caption: "Hana checks the idea before moving you forward." },
  project: { eyebrow: "Build", title: "Turn the lesson into proof.", caption: "The project is small enough to start and real enough to explain." },
  opportunity: { eyebrow: "Explore", title: "Find a place to share it.", caption: "Hana connects the project to a real opportunity page." },
  progress: { eyebrow: "Progress", title: "One step now belongs to a bigger story.", caption: "The demo ends where a student can continue: with a clear next action." },
};

export function HackSocial({ onExit }: { onExit: () => void }) {
  const [stage, setStage] = useState<Stage>("goal");
  const [goal, setGoal] = useState("Help students choose what to learn next");
  const [question, setQuestion] = useState("");
  const [mastery, setMastery] = useState<"idle" | "correct" | "try-again">("idle");
  const [aiReply, setAiReply] = useState<string | null>(null);
  const demoChat = trpc.hana.demoChat.useMutation({
    onSuccess: (response) => setAiReply(response.live ? response.text : `Live AI is unavailable right now. Hana’s safe demo guidance is still here: ${response.text}`),
    onError: () => setAiReply("Live AI is unavailable right now. Please continue with the demo guidance, or try again when the service is available."),
  });

  const currentIndex = stageOrder.indexOf(stage);
  const progress = Math.round(((currentIndex + 1) / stageOrder.length) * 100);
  const copy = stageCopy[stage];
  const isLast = stage === "progress";
  const opportunity = useMemo(() => ({
    title: "Devpost Hackathons",
    detail: "Browse official hackathons and choose one whose rules match your project.",
    url: "https://devpost.com/hackathons",
  }), []);

  const next = () => {
    if (isLast) return;
    setStage(stageOrder[currentIndex + 1]);
  };

  const askHana = () => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    setAiReply(null);
    demoChat.mutate({ message: cleanQuestion, goal, roadmapStage: stage, mission: "Build a small AI helper", masteryResult: mastery === "correct" ? "passed" : "not_attempted", project: "Student Next-Step Helper" });
  };

  return (
    <main className="min-h-screen bg-[#FBF7F1] px-4 pb-10 text-[#3A3540] sm:px-6">
      <div className="mx-auto max-w-2xl">
        <header className="flex items-center justify-between gap-3 py-5">
          <button type="button" onClick={onExit} className="inline-flex items-center gap-1 rounded-full border border-[#D9CEC4] bg-[#FFFCF8] px-3 py-2 text-xs font-bold text-[#62566A]">
            <ArrowLeft size={14} /> Exit demo
          </button>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E5E5F0] px-3 py-2 text-xs font-bold text-[#51486A]"><Trophy size={14} /> HackSocial 2026</div>
          <span className="w-16" />
        </header>

        <section className="rounded-[30px] border border-[#E1D7CE] bg-[#FFFCF8] p-5 shadow-[0_18px_50px_rgba(75,58,47,.08)] sm:p-8">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.16em] text-[#8A7E82]">
            <span>{copy.eyebrow}</span><span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#E8DFD8]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="HackSocial demo progress"><div className="h-full rounded-full bg-[#947DA3] transition-[width] duration-200" style={{ width: `${progress}%` }} /></div>

          <div className="mt-8 grid gap-6 md:grid-cols-[180px_1fr] md:items-center">
            <div className="relative mx-auto grid size-40 place-items-center rounded-[38px] bg-[#E5E5F0] text-7xl shadow-inner">🤖<span className="absolute right-3 top-3 rounded-full bg-[#FFFCF8] px-2 py-1 text-sm">{stage === "mastery" ? "🤔" : stage === "progress" ? "🥹" : stage === "ask" ? "💡" : "😊"}</span></div>
            <div><h1 className="font-display text-4xl leading-[.98] text-[#3A3540] sm:text-5xl">{copy.title}</h1><p className="mt-4 max-w-xl text-sm leading-6 text-[#625D65]">{copy.caption}</p></div>
          </div>

          {stage === "goal" && <div className="mt-8 rounded-2xl bg-[#F5F3FB] p-4"><label htmlFor="hack-goal" className="text-xs font-bold uppercase tracking-[.12em] text-[#62566A]">Student goal</label><textarea id="hack-goal" value={goal} onChange={(event) => setGoal(event.target.value)} className="mt-3 min-h-24 w-full resize-none rounded-xl border border-[#D8D4E4] bg-white p-3 text-sm text-[#3A3540] outline-none focus:border-[#947DA3]" /><p className="mt-2 text-xs text-[#746B72]">This is demo input only. It is not saved to a real student account.</p></div>}

          {stage === "roadmap" && <div className="mt-8 space-y-3">{demoRoadmap.map((step, index) => <div key={step.title} className="flex gap-3 rounded-2xl border border-[#E1D7CE] bg-white p-4"><div className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${step.state === "complete" ? "bg-[#D9E6D4] text-[#4A6845]" : step.state === "current" ? "bg-[#E7B7BC] text-[#6F4D55]" : "bg-[#F0EEE6] text-[#746B72]"}`}>{step.state === "complete" ? <Check size={15} /> : index + 1}</div><div><h2 className="text-sm font-bold">{step.title}</h2><p className="mt-1 text-xs leading-5 text-[#746B72]">{step.detail}</p></div></div>)}</div>}

          {stage === "mission" && <div className="mt-8 rounded-2xl bg-[#F0EEE6] p-5"><div className="flex items-start gap-3"><Lightbulb className="mt-0.5 text-[#947D55]" size={19} /><div><h2 className="text-lg font-bold">Build the first question screen</h2><p className="mt-2 text-sm leading-5 text-[#625D65]">Write three questions a student might ask. Then choose one answer Hana should make simpler.</p><p className="mt-3 text-xs font-bold text-[#746B72]">No deadline · work at your own pace</p></div></div></div>}

          {stage === "ask" && <div className="mt-8 rounded-2xl bg-[#F5F3FB] p-4"><label htmlFor="hack-question" className="text-xs font-bold uppercase tracking-[.12em] text-[#62566A]">Ask Hana about this mission</label><div className="mt-3 flex gap-2"><input id="hack-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="What should I build first?" className="min-w-0 flex-1 rounded-xl border border-[#D8D4E4] bg-white px-3 py-3 text-sm outline-none focus:border-[#947DA3]" /><button type="button" onClick={askHana} disabled={!question.trim() || demoChat.isPending} className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#3A3540] text-white disabled:opacity-50" aria-label="Ask Hana">{demoChat.isPending ? "…" : <MessageCircle size={17} />}</button></div>{aiReply ? <div className="mt-4 rounded-xl bg-white p-4 text-sm leading-6 text-[#514B53]"><p className="mb-2 text-xs font-bold uppercase tracking-[.12em] text-[#C98C93]">Hana · {demoChat.data?.model || "live response"}</p><p className="whitespace-pre-wrap">{aiReply}</p></div> : <p className="mt-3 text-xs leading-5 text-[#746B72]">Demo Mode sends no conversation to personal memory. If live AI is unavailable, Hana will say so clearly.</p>}</div>}

          {stage === "mastery" && <div className="mt-8 rounded-2xl bg-[#F5F3FB] p-4"><p className="text-sm font-bold">Which choice makes this project easier to test?</p><div className="mt-3 grid gap-2"><button type="button" onClick={() => setMastery("correct")} className={`rounded-xl border px-4 py-3 text-left text-sm ${mastery === "correct" ? "border-[#A5BD9C] bg-[#EAF2E7]" : "border-[#D8D4E4] bg-white"}`}>Use three small examples and compare the answers.</button><button type="button" onClick={() => setMastery("try-again")} className={`rounded-xl border px-4 py-3 text-left text-sm ${mastery === "try-again" ? "border-[#E7B7BC] bg-[#F6E9EA]" : "border-[#D8D4E4] bg-white"}`}>Add many features before trying one example.</button></div>{mastery === "correct" && <p className="mt-3 text-sm font-bold text-[#4A6845]">Nice. Small examples make the result easier to understand.</p>}{mastery === "try-again" && <p className="mt-3 text-sm font-bold text-[#6F4D55]">Try again. Start with one small example.</p>}</div>}

          {stage === "project" && <div className="mt-8 rounded-2xl border border-[#D8D4E4] bg-[#F5F3FB] p-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#62566A]">Small project</p><h2 className="mt-2 text-2xl font-bold">Student Next-Step Helper</h2><p className="mt-2 text-sm leading-6 text-[#625D65]">Build a small page where a student enters a question and receives one clear next action.</p><div className="mt-4 flex flex-wrap gap-2">{["forms", "simple logic", "clear writing"].map((skill) => <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#62566A]">{skill}</span>)}</div></div>}

          {stage === "opportunity" && <div className="mt-8 rounded-2xl border border-[#D8D4E4] bg-[#F5F3FB] p-5"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#62566A]">Relevant opportunity</p><h2 className="mt-2 text-2xl font-bold">{opportunity.title}</h2><p className="mt-2 text-sm leading-6 text-[#625D65]">{opportunity.detail}</p><a href={opportunity.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#3A3540] px-4 py-3 text-sm font-bold text-white">Open official page <ExternalLink size={15} /></a><p className="mt-3 text-xs text-[#746B72]">Check the official rules, dates, and eligibility before applying.</p></div>}

          {stage === "progress" && <div className="mt-8 rounded-2xl bg-[#EAF2E7] p-5"><div className="flex items-start gap-3"><Sparkles className="mt-0.5 text-[#5D8056]" size={19} /><div><h2 className="text-lg font-bold">Demo complete</h2><p className="mt-2 text-sm leading-5 text-[#625D65]">You moved from a goal to a roadmap, mission, question, mastery check, project, and opportunity.</p><p className="mt-3 text-sm font-bold text-[#4A6845]">Next: build the first version of your helper.</p></div></div></div>}

          <div className="mt-8 flex items-center justify-between gap-3"><button type="button" onClick={() => currentIndex > 0 && setStage(stageOrder[currentIndex - 1])} disabled={currentIndex === 0} className="rounded-xl border border-[#D9CEC4] bg-white px-4 py-3 text-sm font-bold text-[#62566A] disabled:opacity-40">Back</button><button type="button" onClick={next} disabled={(stage === "mastery" && mastery !== "correct") || isLast} className="inline-flex items-center gap-2 rounded-xl bg-[#3A3540] px-5 py-3 text-sm font-bold text-white disabled:opacity-40">{isLast ? "Done" : "Continue"}<ArrowRight size={16} /></button></div>
        </section>
      </div>
    </main>
  );
}
