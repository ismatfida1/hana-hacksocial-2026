import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  ExternalLink,
  Flower2,
  Headphones,
  Lightbulb,
  MessageCircle,
  MoreHorizontal,
  NotebookPen,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Sprout,
  Target,
  TimerReset,
  Trash2,
  Trophy,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

/* Hana style reminder: Paper Constellation — calm editorial pinboard, tactile paper cards, expressive cream robot, and one clear kind step. */

const ASSETS = {
  welcome: "/manus-storage/hana-welcome_683c430f.png",
  chat: "/manus-storage/hana-chat_b2cdacd5.png",
  focus: "/manus-storage/hana-focus_3084b5de.png",
  celebration: "/manus-storage/hana-celebration_7a49143a.png",
  mark: "/manus-storage/hana-mark_56f5b8bd.png",
  happy: "/manus-storage/hana-happy_f13f616c.png",
  worried: "/manus-storage/hana-worried_a86d76fe.png",
  confused: "/manus-storage/hana-confused_f7a41f5e.png",
  sad: "/manus-storage/hana-sad_b1cb88e1.png",
  thinking: "/manus-storage/hana-thinking_8f0c7810.png",
};

type Memory = { id: string; label: string; value: string; source: string };
type Mood = keyof Pick<typeof ASSETS, "happy" | "worried" | "confused" | "sad" | "thinking">;
type Drawer = "chat" | "memory" | "journey" | "project" | "focus" | null;

const initialMemories: Memory[] = [
  { id: "preference", label: "Explanation style", value: "Analogy first, then a small example", source: "Your profile" },
  { id: "time", label: "Usual study time", value: "20 minutes when the evening is quiet", source: "Daily ritual" },
  { id: "weak", label: "A topic to revisit", value: "APIs still feel a little mysterious", source: "Your reflection" },
  { id: "project", label: "Active project", value: "Study Sprint Coach", source: "Project seed" },
];

const quests = [
  { id: 1, title: "Name the moving pieces", topic: "APIs", duration: "12 min", status: "next", color: "#dfead8", icon: "01" },
  { id: 2, title: "Send one honest request", topic: "APIs", duration: "18 min", status: "locked", color: "#dce7f4", icon: "02" },
  { id: 3, title: "Give your app a memory", topic: "Databases", duration: "20 min", status: "locked", color: "#f2e6b8", icon: "03" },
  { id: 4, title: "Make a tiny thing useful", topic: "Projects", duration: "25 min", status: "locked", color: "#f0d8d5", icon: "04" },
];

const stepMessages = [
  "That step is yours now. Hana is saving the win.",
  "You made the idea less mysterious. That is real progress.",
  "One more piece fits into your mental model.",
  "Your future project just got a little more possible.",
  "Small step, lasting skill. The next one will feel lighter.",
];

const chatReplies: Record<string, string> = {
  short: "An API is a clear doorway between two programs. Your app asks for something in a known format, and another service sends back a structured answer.",
  analogy: "Think of an API like a café counter. You place an order in the format the kitchen understands, then you get a prepared result back. You do not need to walk into the kitchen to use it.",
  example: "A tiny example: your study app sends GET /missions. The server responds with JSON like { title: \"Name the moving pieces\", minutes: 12 }. Your interface turns that answer into a card.",
  debug: "Let’s debug gently. First, check the request URL. Then check the browser Network tab for the status code. If it is 401, credentials are missing; if it is 404, the route is wrong; if it is 500, the server needs a closer look.",
  deep: "APIs are contracts between systems. A useful contract names the route, method, inputs, authentication rules, response shape, and failure behavior. For Hana’s project, keeping those pieces explicit will make the chat, mission tracker, and project planner easier to evolve.",
};

function HanaImage({ mood = "happy", className = "" }: { mood?: Mood; className?: string }) {
  const src = ASSETS[mood] || ASSETS.happy;
  return <img src={src} alt={`Hana is feeling ${mood}`} className={`object-contain ${className}`} />;
}

function AppShell({ children, active, onNav }: { children: React.ReactNode; active: string; onNav: (name: string) => void }) {
  return (
    <div className="min-h-screen bg-[#f7f1e4] text-[#302a25]">
      <header className="sticky top-0 z-30 border-b border-[#dfd3bf]/80 bg-[#f7f1e4]/92 backdrop-blur-xl">
        <div className="container flex items-center justify-between py-3">
          <button onClick={() => onNav("Home")} className="group flex items-center gap-3 text-left" aria-label="Go to Hana Home">
            <span className="grid size-11 place-items-center rounded-[15px] bg-[#e3ecd9] shadow-sm ring-1 ring-[#bcccad] group-hover:rotate-6 transition-transform duration-200">
              <img src={ASSETS.mark} alt="" className="size-8" />
            </span>
            <span><span className="hana-wordmark font-display text-xl font-semibold tracking-tight">HANA</span><span className="ml-2 rounded-full bg-[#efe0df] px-2 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#8d5961]">Your AI Learning Companion</span></span>
          </button>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {["Home", "Journey", "Projects", "Chat", "Profile"].map((item) => (
              <button key={item} onClick={() => onNav(item)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === item ? "bg-[#2f2a25] text-[#fff8ed]" : "text-[#6d6258] hover:bg-[#ece2d1] hover:text-[#302a25]"}`}>{item}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-[#e8f0e4] px-3 py-2 text-xs font-semibold text-[#56704f] sm:flex"><span className="size-2 rounded-full bg-[#83a77a]" /> Saved locally</span>
            <button onClick={() => onNav("Profile")} className="grid size-10 place-items-center rounded-full bg-[#e8ded2] text-sm font-bold text-[#695448] hover:bg-[#dfd0c0]" aria-label="Open profile">AM</button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-[22px] border border-[#dfd3bf] bg-[#fffaf1]/95 p-1.5 shadow-xl backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
        {[{n:"Home",i:<Sprout size={17}/>},{n:"Journey",i:<Compass size={17}/>},{n:"Projects",i:<BookOpen size={17}/>},{n:"Chat",i:<MessageCircle size={17}/>},{n:"Profile",i:<Flower2 size={17}/>}].map((item) => <button key={item.n} onClick={() => onNav(item.n)} className={`flex flex-col items-center gap-1 rounded-[16px] py-2 text-[10px] font-bold ${active === item.n ? "bg-[#2f2a25] text-[#fff8ed]" : "text-[#85776b]"}`}>{item.i}{item.n}</button>)}
      </nav>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("Home");
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [mood, setMood] = useState<Mood>("happy");
  const [memories, setMemories] = useState<Memory[]>(() => {
    try { return JSON.parse(localStorage.getItem("hana-memories") || "null") || initialMemories; } catch { return initialMemories; }
  });
  const [memoryPaused, setMemoryPaused] = useState(false);
  const [completed, setCompleted] = useState<number[]>(() => { try { return JSON.parse(localStorage.getItem("hana-completed") || "[]"); } catch { return []; } });
  const [chatMode, setChatMode] = useState<keyof typeof chatReplies>("short");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([{ from: "hana", text: "Hi, I’m Hana. I’ll help you find one clear thing to learn next. What would feel useful today?" }]);
  const [ritualChoice, setRitualChoice] = useState("20 minutes");
  const [focusSeconds, setFocusSeconds] = useState(20 * 60);
  const [focusRunning, setFocusRunning] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(quests[0]);

  useEffect(() => { localStorage.setItem("hana-memories", JSON.stringify(memories)); }, [memories]);
  useEffect(() => { localStorage.setItem("hana-completed", JSON.stringify(completed)); }, [completed]);
  useEffect(() => { if (!focusRunning) return; const timer = window.setInterval(() => setFocusSeconds((s) => s > 0 ? s - 1 : 0), 1000); return () => window.clearInterval(timer); }, [focusRunning]);
  useEffect(() => { if (focusSeconds === 0) { setFocusRunning(false); setMood("happy"); toast.success("Focus time is complete", { description: "Hana saved your place. A small step counts." }); } }, [focusSeconds]);

  const progress = Math.round((completed.length / quests.length) * 100);
  const remaining = useMemo(() => Math.max(0, quests.length - completed.length), [completed.length]);

  function nav(name: string) {
    setActive(name);
    if (name === "Chat") setDrawer("chat");
    if (name === "Profile") setDrawer("memory");
    if (name === "Journey") setDrawer("journey");
    if (name === "Projects") setDrawer("project");
  }

  function completeQuest() {
    if (completed.includes(selectedQuest.id)) return;
    setCompleted((list) => [...list, selectedQuest.id]);
    setMood("happy");
    const message = stepMessages[completed.length % stepMessages.length];
    toast.success(message, { description: `${selectedQuest.title} added to your constellation.` });
    setMemories((list) => list.some((m) => m.id === "achievement") ? list : [...list, { id: "achievement", label: "Recent achievement", value: `Finished ${selectedQuest.title}`, source: "Quest completion" }]);
  }

  function sendChat(text = chatInput) {
    if (!text.trim()) return;
    setMood("thinking");
    setChatMessages((list) => [...list, { from: "you", text: text.trim() }]);
    window.setTimeout(() => { setChatMessages((list) => [...list, { from: "hana", text: chatReplies[chatMode] }]); setMood(chatMode === "debug" ? "worried" : "happy"); }, 420);
    setChatInput("");
  }

  function addChatMemory() {
    if (memoryPaused) { toast("Memory is paused", { description: "Turn it back on in What Hana remembers when you’re ready." }); return; }
    setMemories((list) => [...list, { id: `note-${Date.now()}`, label: "Learner note", value: "I want to understand APIs by building something small.", source: "Hana Chat" }]);
    toast.success("Hana remembers", { description: "I’ll connect your next API mission to a small build." });
  }

  const minutes = String(Math.floor(focusSeconds / 60)).padStart(2, "0");
  const seconds = String(focusSeconds % 60).padStart(2, "0");

  return (
    <AppShell active={active} onNav={nav}>
      <div className="container py-8 pb-28 lg:py-12 lg:pb-16">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="fade-up"><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[#8b7764]">Thursday, a little after dinner</p><h1 className="font-display max-w-2xl text-4xl leading-[1.04] tracking-[-.04em] sm:text-6xl">You don’t have to know<br /><em className="text-[#667b66]">what’s next. Hana does.</em></h1></div>
          <button onClick={() => setDrawer("chat")} className="lift flex max-w-xs items-center gap-3 rounded-[18px] bg-[#f0e1df] px-4 py-3 text-left text-sm font-semibold text-[#684f51]"><span className="grid size-9 place-items-center rounded-full bg-[#fff7ed]"><MessageCircle size={17}/></span><span>Ask Hana anything <span className="block text-xs font-normal text-[#8d706f]">She’s listening</span></span><ArrowRight size={16} className="ml-auto" /></button>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.18fr_.82fr]" aria-label="Daily welcome">
          <article className="grain paper-card relative min-h-[390px] overflow-hidden rounded-[30px] bg-[#e3ecd9] p-6 sm:p-9">
            <div className="relative z-10 max-w-[52%] sm:max-w-[55%]"><div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fff8ed]/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-[#55704f]"><span className="size-2 rounded-full bg-[#83a77a]" /> Hana’s morning note</div><h2 className="font-display text-3xl leading-tight sm:text-4xl">Hi, I’m Hana.</h2><p className="mt-4 text-base leading-relaxed text-[#50604b]">I checked your progress. You’re ready for APIs today, so I prepared a small mission that fits your evening.</p><button onClick={() => setDrawer("chat")} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2f2a25] px-5 py-3 text-sm font-bold text-[#fff8ed] shadow-lg shadow-[#6d805f]/20 transition hover:-translate-y-0.5">Talk it through <MessageCircle size={16}/></button></div>
            <img src={ASSETS.welcome} alt="Hana beside a mug and notebook in a sunlit study room" className="absolute -bottom-5 -right-10 w-[64%] max-w-[420px] object-contain sm:-right-5 sm:w-[54%]" />
            <span className="pin-label absolute bottom-5 left-5 rounded-md bg-[#f2d982] px-2 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#65542d]">a gentle start</span><span className="pin-label absolute right-8 top-7 rounded-md bg-[#fffaf1] px-2 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#6d6258]">Hana’s room · growing</span>
          </article>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <article className="paper-card rounded-[26px] bg-[#fffaf1] p-6"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b7764]">Hana’s hunch</p><h3 className="mt-3 font-display text-2xl">Make APIs less mysterious.</h3></div><span className="grid size-10 place-items-center rounded-full bg-[#dce7f4] text-[#3157c8]"><Lightbulb size={18}/></span></div><p className="mt-3 text-sm leading-relaxed text-[#6f6359]">You’ve built the idea. Today, connect it to one small request-and-response story.</p><button onClick={() => { setSelectedQuest(quests[0]); setDrawer("journey"); }} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#3157c8]">See the next quest <ChevronRight size={16}/></button></article>
            <article className="paper-card rounded-[26px] bg-[#f0e1df] p-6"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8d5961]">One small ritual</p><Clock3 size={18} className="text-[#a56e75" /></div><h3 className="mt-3 font-display text-2xl">How much room do you have?</h3><div className="mt-5 flex flex-wrap gap-2">{["10 minutes", "20 minutes", "Just one thing"].map((choice) => <button key={choice} onClick={() => setRitualChoice(choice)} className={`rounded-full px-3 py-2 text-xs font-bold transition ${ritualChoice === choice ? "bg-[#2f2a25] text-[#fff8ed]" : "bg-[#fff8ed]/70 text-[#805d5e] hover:bg-[#fff8ed]"}`}>{choice}</button>)}</div><p className="mt-4 text-xs text-[#8b6d6e]">Hana will shape the mission around <b>{ritualChoice.toLowerCase()}</b>.</p></article>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
          <article className="paper-card rounded-[26px] bg-[#fffaf1] p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b7764]">Your constellation</p><h2 className="mt-2 font-display text-2xl">The room remembers.</h2></div><span className="rounded-full bg-[#e8f0e4] px-3 py-1 text-xs font-bold text-[#56704f]">{completed.length} pins</span></div><div className="relative mt-6 min-h-[170px] overflow-hidden rounded-[20px] bg-[#2f3f56] p-5"><div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(#f2d982 1px, transparent 1px)", backgroundSize: "28px 28px" }} />{[...Array(12)].map((_, i) => <span key={i} className={`absolute size-2 rounded-full ${i < completed.length ? "bg-[#f2d982] shadow-[0_0_12px_#f2d982]" : "bg-[#93a5bc]"}`} style={{ left: `${12 + ((i * 23) % 76)}%`, top: `${18 + ((i * 37) % 62)}%` }} />)}<div className="relative z-10 flex h-full min-h-[130px] items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#dce7f4]">AI engineering path</p><p className="mt-2 max-w-[190px] font-display text-2xl text-[#fff8ed]">A flexible sky, not a deadline.</p></div><Trophy size={32} className="text-[#f2d982]" /></div></div><button onClick={() => setDrawer("journey")} className="mt-5 flex w-full items-center justify-between rounded-xl bg-[#edf3e9] px-4 py-3 text-sm font-bold text-[#56704f]">Open your quest map <ArrowRight size={16}/></button></article>

          <article className="paper-card relative rounded-[26px] bg-[#e4edf3] p-6 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#56709a]">Hana’s next step</p><h2 className="mt-2 font-display text-3xl">Name the moving pieces.</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-[#50627b]">Before you send a request, you’ll sketch who asks, who answers, and what comes back. No code gymnastics yet.</p></div><div className="grid size-16 place-items-center rounded-[20px] bg-[#fffaf1]/75 text-[#3157c8] shadow-sm"><Target size={28}/></div></div><div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-bold text-[#5a6e88]"><span className="rounded-full bg-[#fffaf1]/75 px-3 py-2"><Clock3 size={13} className="mr-1 inline" /> {ritualChoice === "10 minutes" ? "10" : "12"} min</span><span className="rounded-full bg-[#fffaf1]/75 px-3 py-2">Quest 01</span><span className="rounded-full bg-[#fffaf1]/75 px-3 py-2">+1 constellation pin</span></div><div className="mt-7 flex flex-wrap gap-3"><button onClick={() => setDrawer("journey")} className="rounded-full bg-[#3157c8] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#3157c8]/20 transition hover:-translate-y-0.5">Enter quest <ArrowRight size={16} className="ml-1 inline" /></button><button onClick={() => setDrawer("focus")} className="rounded-full bg-[#fffaf1]/75 px-5 py-3 text-sm font-bold text-[#3157c8]">Focus mode</button></div></article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.18fr_.82fr]">
          <article className="paper-card rounded-[26px] bg-[#fffaf1] p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b7764]">Kind-step history</p><h2 className="mt-2 font-display text-2xl">The bits worth keeping.</h2></div><button onClick={() => setShowAllHistory(!showAllHistory)} className="text-xs font-bold text-[#3157c8]">{showAllHistory ? "Show less" : "View all"}</button></div><div className="mt-5 space-y-3">{["You returned to the tricky part", "JavaScript basics became familiar", "You chose a project boundary"].slice(0, showAllHistory ? 3 : 2).map((text, i) => <div key={text} className="flex items-center gap-3 rounded-xl bg-[#f7f1e4] p-3"><span className="grid size-9 place-items-center rounded-full bg-[#e3ecd9] text-[#56704f]"><Check size={15}/></span><p className="text-sm font-semibold text-[#5c5147]">{text}<span className="mt-0.5 block text-xs font-normal text-[#938679]">{i === 0 ? "Today" : "A little while ago"}</span></p></div>)}</div></article>
          <article className="paper-card rounded-[26px] bg-[#f2e6b8] p-6 sm:p-7"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#fffaf1]/75 text-[#8d7430]"><Sparkles size={18}/></span><p className="text-xs font-bold uppercase tracking-[.18em] text-[#846d34]">A note from Hana</p></div><p className="mt-5 font-display text-2xl leading-tight text-[#5c4d26]">“One clear thing is enough for today.”</p><button onClick={() => setDrawer("memory")} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#715d27]">What I remember <ArrowRight size={16}/></button></article>
        </section>
      </div>

      {drawer && <div className="fixed inset-0 z-50 flex items-end justify-end bg-[#2f2a25]/25 backdrop-blur-[2px]" onClick={() => setDrawer(null)}><aside className="max-h-[92vh] w-full overflow-y-auto rounded-t-[30px] bg-[#fffaf1] p-5 shadow-2xl sm:max-w-[560px] sm:rounded-l-[30px] sm:rounded-r-none sm:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#e3ecd9]"><img src={ASSETS.mark} alt="" className="size-8" /></span><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#8b7764]">{drawer === "chat" ? "Ask Hana" : drawer === "memory" ? "Hana remembers" : drawer === "journey" ? "Hana Journey" : drawer === "project" ? "Hana Projects" : "Hana Focus"}</p><h2 className="font-display text-2xl">{drawer === "chat" ? "Let’s make it clearer." : drawer === "memory" ? "Useful context, in your hands." : drawer === "journey" ? "Choose your next quest." : drawer === "project" ? "Turn learning into a thing." : "A calm pocket of time."}</h2></div></div><button onClick={() => setDrawer(null)} className="grid size-10 place-items-center rounded-full bg-[#f3eadc] text-[#6f6359]" aria-label="Close panel"><X size={18}/></button></div>

        {drawer === "chat" && <div><div className="mb-4 flex items-start gap-3 rounded-2xl bg-[#e3ecd9] p-4"><HanaImage mood={mood} className="size-20 shrink-0" /><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#56704f]">Hana is {mood === "sad" ? "with you" : mood}</p><p className="mt-1 text-sm leading-relaxed text-[#52634d]">I’ll start short, then open a deeper door if you want it.</p></div></div><div className="mb-4 flex flex-wrap gap-2" aria-label="Hana response modes">{([{k:"short",t:"Short version"},{k:"analogy",t:"Use an analogy"},{k:"example",t:"Show an example"},{k:"debug",t:"Help me debug"},{k:"deep",t:"Tell me more"}] as const).map((mode) => <button key={mode.k} onClick={() => setChatMode(mode.k)} className={`rounded-full px-3 py-2 text-xs font-bold ${chatMode === mode.k ? "bg-[#3157c8] text-white" : "bg-[#edf3e9] text-[#56704f]"}`}>{mode.t}</button>)}</div><div className="mb-4 max-h-[300px] space-y-3 overflow-y-auto rounded-2xl bg-[#f7f1e4] p-4">{chatMessages.map((m, i) => <div key={i} className={`flex gap-2 ${m.from === "you" ? "justify-end" : ""}`}>{m.from === "hana" && <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#e3ecd9]"><img src={ASSETS.mark} alt="" className="size-5" /></span>}<p className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${m.from === "you" ? "bg-[#3157c8] text-white" : "bg-[#fffaf1] text-[#5f554c]"}`}>{m.text}</p></div>)}</div><div className="flex gap-2"><textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }} placeholder="Ask about your project, a concept, or a stuck moment…" className="min-h-[80px] flex-1 resize-none rounded-2xl border border-[#dfd3bf] bg-[#fffaf1] p-3 text-sm outline-none focus:border-[#3157c8]" /><button onClick={() => sendChat()} className="self-end rounded-full bg-[#2f2a25] px-4 py-3 text-sm font-bold text-white"><ArrowRight size={17}/></button></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => sendChat("Why do APIs matter for my project?")} className="rounded-full border border-[#dfd3bf] px-3 py-2 text-xs font-semibold text-[#716359]">Why do APIs matter?</button><button onClick={addChatMemory} className="rounded-full border border-[#dfd3bf] px-3 py-2 text-xs font-semibold text-[#716359]"><Save size={13} className="mr-1 inline" /> Keep this in memory</button></div></div>}

        {drawer === "memory" && <div><div className="mb-5 flex items-center justify-between rounded-2xl bg-[#edf3e9] p-4"><div><p className="text-sm font-bold text-[#56704f]">Memory is {memoryPaused ? "paused" : "on"}.</p><p className="mt-1 text-xs text-[#70816a]">Only useful learning context is saved on this device.</p></div><button onClick={() => setMemoryPaused(!memoryPaused)} className={`rounded-full px-4 py-2 text-xs font-bold ${memoryPaused ? "bg-[#f0e1df] text-[#8d5961]" : "bg-[#56704f] text-white"}`}>{memoryPaused ? "Resume" : "Pause"}</button></div><div className="space-y-3">{memories.map((memory) => <div key={memory.id} className="rounded-2xl border border-[#e2d7c7] bg-[#fffaf1] p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.13em] text-[#8b7764]">{memory.label}</p><p className="mt-1 text-sm font-semibold text-[#4e453d]">{memory.value}</p><p className="mt-2 text-xs text-[#9a8b7d]">Source: {memory.source}</p></div><button onClick={() => setMemories((list) => list.filter((m) => m.id !== memory.id))} className="text-[#a98981]" aria-label={`Delete ${memory.label}`}><Trash2 size={15}/></button></div></div>)}</div><div className="mt-5 flex gap-2"><button onClick={() => setMemories([])} className="rounded-full border border-[#e0c4c0] px-4 py-2 text-xs font-bold text-[#8d5961]">Clear all memories</button><button onClick={() => toast("Memory stays on this device", { description: "Server-side cross-device memory can be connected later." })} className="rounded-full bg-[#2f2a25] px-4 py-2 text-xs font-bold text-white">How this works</button></div></div>}

        {drawer === "journey" && <div><div className="rounded-2xl bg-[#2f3f56] p-5 text-[#fffaf1]"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#b9c8dc]">Flexible AI engineering path</p><p className="mt-2 font-display text-2xl">Go at the speed of your real life.</p></div><span className="rounded-full bg-[#f2d982] px-3 py-1 text-xs font-bold text-[#5d4d24]">{progress}% lit</span></div><div className="mt-5 h-2 rounded-full bg-[#8396af]/40"><div className="h-2 rounded-full bg-[#f2d982] transition-all" style={{ width: `${Math.max(progress, 8)}%` }} /></div><p className="mt-3 text-xs text-[#cbd6e3]">No 90-day countdown. Just the next useful quest.</p></div><div className="mt-5 space-y-3">{quests.map((quest) => <button key={quest.id} onClick={() => { setSelectedQuest(quest); if (quest.status === "next" || completed.includes(quest.id)) setDrawer("journey"); }} className={`lift flex w-full items-center gap-4 rounded-2xl border p-4 text-left ${selectedQuest.id === quest.id ? "border-[#3157c8] bg-[#edf3e9]" : "border-[#e2d7c7] bg-[#fffaf1]"} ${quest.status === "locked" && !completed.includes(quest.id) ? "opacity-65" : ""}`}><span className="grid size-11 place-items-center rounded-xl text-xs font-bold text-[#4f5d4e]" style={{ background: quest.color }}>{completed.includes(quest.id) ? <Check size={17}/> : quest.icon}</span><span className="min-w-0 flex-1"><span className="block text-xs font-bold uppercase tracking-[.12em] text-[#8b7764]">{quest.topic} · {quest.duration}</span><span className="mt-1 block font-display text-xl">{quest.title}</span><span className="mt-1 block text-xs text-[#8c7d70]">{quest.status === "locked" && !completed.includes(quest.id) ? "Unlocks when the previous quest feels familiar" : "Learn more · open quest details"}</span></span><ChevronRight size={17} className="text-[#8b7764]" /></button>)}</div><div className="mt-5 rounded-2xl bg-[#f2e6b8] p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#846d34]">Hana’s short version</p><p className="mt-2 text-sm leading-relaxed text-[#66572d]">An API is a doorway between programs. This quest helps you draw the doorway before you build it.</p><button onClick={completeQuest} className="mt-4 rounded-full bg-[#2f2a25] px-4 py-2 text-xs font-bold text-white">{completed.includes(selectedQuest.id) ? "Quest complete" : "Complete this quest"}</button></div></div>}

        {drawer === "project" && <div><div className="rounded-2xl bg-[#f0e1df] p-5"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#8d5961]">Active project</p><h3 className="mt-2 font-display text-3xl">Study Sprint Coach</h3><p className="mt-2 text-sm leading-relaxed text-[#765f60]">A tiny companion that turns available time and a weak topic into one focused mission.</p></div><div className="mt-5 space-y-3">{[{name:"Quick build",time:"30 min",desc:"One form, one recommendation, one calm result."},{name:"Portfolio build",time:"Weekend",desc:"Add history, saved preferences, and a clear empty state."},{name:"Hackathon build",time:"A focused sprint",desc:"Connect the project to a real learning context and explain the tradeoffs."}].map((p, i) => <button key={p.name} onClick={() => toast.success(`${p.name} selected`, { description: p.desc })} className="lift flex w-full items-center gap-4 rounded-2xl border border-[#e2d7c7] bg-[#fffaf1] p-4 text-left"><span className="grid size-10 place-items-center rounded-xl bg-[#dce7f4] text-[#3157c8]"><Zap size={17}/></span><span className="flex-1"><span className="block font-bold">{p.name}</span><span className="mt-1 block text-xs text-[#8b7c70]">{p.time} · {p.desc}</span></span><ArrowRight size={16}/></button>)}</div><a href="https://devpost.com/software" target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-between rounded-2xl bg-[#edf3e9] p-4 text-sm font-bold text-[#56704f]">Find a hackathon project <ExternalLink size={16}/></a></div>}

        {drawer === "focus" && <div><div className="grid place-items-center rounded-2xl bg-[#e3ecd9] p-6"><HanaImage mood="thinking" className="h-40" /><p className="text-xs font-bold uppercase tracking-[.15em] text-[#56704f]">One task. No pressure.</p><p className="mt-2 font-display text-5xl text-[#40543b]">{minutes}:{seconds}</p><p className="mt-2 text-center text-sm text-[#64755e]">Hana will keep your place if you pause.</p></div><div className="mt-5 flex justify-center gap-3"><button onClick={() => setFocusRunning(!focusRunning)} className="inline-flex items-center gap-2 rounded-full bg-[#2f2a25] px-5 py-3 text-sm font-bold text-white">{focusRunning ? <Pause size={16}/> : <Play size={16}/>} {focusRunning ? "Pause" : "Begin focus"}</button><button onClick={() => { setFocusSeconds(20 * 60); setFocusRunning(false); }} className="grid size-11 place-items-center rounded-full border border-[#dfd3bf] text-[#6f6359]" aria-label="Reset timer"><TimerReset size={17}/></button></div><div className="mt-5 rounded-2xl bg-[#fffaf1] p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#8b7764]">Today’s single task</p><p className="mt-2 font-display text-2xl">Sketch who asks, who answers, and what comes back.</p><button onClick={() => { setSelectedQuest(quests[0]); setDrawer("journey"); }} className="mt-4 text-sm font-bold text-[#3157c8]">Open the quest <ArrowRight size={15} className="ml-1 inline"/></button></div></div>}
      </aside></div>}
    </AppShell>
  );
}
