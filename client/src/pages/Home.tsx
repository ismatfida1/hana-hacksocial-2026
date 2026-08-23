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
import { trpc } from "@/lib/trpc";

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
  curious: "/manus-storage/hana-thinking_8f0c7810.png",
  proud: "/manus-storage/hana-happy_f13f616c.png",
  sleepy: "/manus-storage/hana-focus_3084b5de.png",
  celebrating: "/manus-storage/hana-celebration_7a49143a.png",
  excited: "/manus-storage/hana-happy_f13f616c.png",
  surprised: "/manus-storage/hana-confused_f7a41f5e.png",
};

type Memory = { id: string; label: string; value: string; source: string };
type Mood = keyof Pick<typeof ASSETS, "happy" | "worried" | "confused" | "sad" | "thinking" | "curious" | "proud" | "sleepy" | "celebrating" | "excited" | "surprised">;
type Drawer = "chat" | "memory" | "journey" | "project" | "focus" | "career" | "demo" | "lab" | "portfolio" | null;
type CareerAnswer = { question: string; answer: string };
type ChatMode = "short" | "analogy" | "example" | "debug" | "deep" | "career" | "project";

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

const demoSteps = [
  { eyebrow: "01 · Meet Hana", title: "A small companion for the next clear step.", body: "Hana is warm, concise, and quietly proactive. She will help you notice what to try next — not make you feel behind.", action: "Meet the sample Hana" },
  { eyebrow: "02 · Choose a sample mission", title: "Make Hana fetch something useful.", body: "In Demo Mode, every mission is unlocked. Pick a sample quest and see the same real journey surface you’ll use later.", action: "Choose sample mission" },
  { eyebrow: "03 · See the recommendation", title: "Hana connects the dots.", body: "She explains today’s skill, why it matters, and the kind of project it can become.", action: "Show me the connection" },
  { eyebrow: "04 · Open a resource", title: "Learn one small idea.", body: "A short explanation is followed by a tiny challenge — because learning is something you do, not something you only watch.", action: "Open sample resource" },
  { eyebrow: "05 · Try and check", title: "Make the concept yours.", body: "Answer three quick questions or explain the idea back to Hana. If it feels fuzzy, she changes the explanation instead of moving on.", action: "Try the practice" },
  { eyebrow: "06 · Ask Hana", title: "Chat when a thought gets stuck.", body: "Choose short version, analogy, example, debug help, or a deeper explanation. Hana stays in context.", action: "Open Hana Chat" },
  { eyebrow: "07 · See where you’re going", title: "Skill → bigger skill → project → career.", body: "The roadmap is a constellation, not a countdown. Your path can pause, bend, or change.", action: "Explore the roadmap" },
  { eyebrow: "08 · Build something real", title: "Turn a lesson into a tiny project.", body: "Build Mode helps you move from understanding to making, with a clear definition of done.", action: "Open Build Mode" },
  { eyebrow: "09 · A little reward", title: "The room grows with understanding.", body: "Complete practice and building — not just clicking complete — and Hana’s room gets a new plant, book, decoration, or pose.", action: "Grow Hana’s room" },
];

const energyModes = [
  { id: "light", label: "Light", detail: "Review + one easy win", icon: "🌱" },
  { id: "normal", label: "Normal", detail: "Learn + practice", icon: "⚡" },
  { id: "deep", label: "Deep", detail: "A challenging build", icon: "🔥" },
] as const;

const skillGarden = [
  { name: "Programming", plant: "🌱", value: 42, color: "#dfead8" },
  { name: "AI", plant: "🌸", value: 28, color: "#f0e1df" },
  { name: "Cloud", plant: "🌿", value: 18, color: "#dce7f4" },
  { name: "Data", plant: "🌻", value: 24, color: "#f2e6b8" },
];

const careerQuestions = [
  { prompt: "What sounds fun today?", options: ["Building things", "Solving problems", "Creating designs", "Making AI do things", "Protecting systems", "Working with data", "Building apps", "Researching"] },
  { prompt: "What kind of work feels most like you?", options: ["Hands-on and practical", "Curious and analytical", "Creative and visual", "Helpful and people-focused"] },
  { prompt: "Which topics pull you in?", options: ["Coding", "AI", "Math and data", "Cybersecurity", "I’m still exploring"] },
  { prompt: "What kind of project would you enjoy trying?", options: ["A useful web app", "A visual creative tool", "A data story or dashboard", "A security challenge", "An AI helper", "A research experiment"] },
  { prompt: "When you imagine your future work, what matters most?", options: ["Building things people use", "Making sense of complex questions", "Creating something original", "Helping people feel safer", "Keeping many doors open"] },
  { prompt: "What would you rather avoid?", options: ["Lots of repetition", "Being alone all day", "Open-ended design", "Hard math", "Nothing comes to mind"] },
];

const careerDirections = [
  { name: "Software Engineering", fit: "You like building useful things and solving clear problems.", involves: "Designing, coding, testing, and improving apps and systems.", projects: "A study timer, a small web app, or a helpful browser tool.", skills: "Programming, APIs, debugging, and teamwork.", roles: "Frontend engineer, backend engineer, product engineer.", outlook: "A flexible foundation that can lead almost anywhere in technology." },
  { name: "AI Engineering", fit: "Your curiosity about AI pairs nicely with your urge to make systems do something useful.", involves: "Connecting models, data, tools, and product experiences.", projects: "A study-note explainer, a project planner, or a small AI assistant.", skills: "Python or JavaScript, APIs, evaluation, and responsible design.", roles: "AI engineer, ML engineer, applied AI developer.", outlook: "A fast-moving path for people who enjoy learning by building." },
  { name: "Data Science", fit: "You enjoy finding patterns, asking why, and making messy information clearer.", involves: "Exploring data, testing ideas, and explaining what the evidence suggests.", projects: "A learning progress dashboard, survey explorer, or recommendation model.", skills: "Python, statistics, visualization, and clear communication.", roles: "Data analyst, data scientist, analytics engineer.", outlook: "A strong route for analytical thinkers who like questions with evidence." },
  { name: "Cybersecurity", fit: "You notice how systems can fail and like the idea of protecting people and information.", involves: "Finding weaknesses, designing safeguards, and responding to incidents.", projects: "A password-safety explainer, threat model, or secure login demo.", skills: "Networks, operating systems, risk thinking, and careful investigation.", roles: "Security analyst, application security engineer, penetration tester.", outlook: "A purposeful path where careful thinking creates real trust." },
];

const questSets: Record<string, typeof quests> = {
  "Software Engineering": [
    { id: 1, title: "Build a tiny useful interface", topic: "Software Engineering", duration: "15 min", status: "next", color: "#dfead8", icon: "01" },
    { id: 2, title: "Make one interaction respond", topic: "Software Engineering", duration: "20 min", status: "locked", color: "#dce7f4", icon: "02" },
    { id: 3, title: "Give your app a memory", topic: "Software Engineering", duration: "25 min", status: "locked", color: "#f2e6b8", icon: "03" },
    { id: 4, title: "Ship a small useful version", topic: "Projects", duration: "30 min", status: "locked", color: "#f0d8d5", icon: "04" },
  ],
  "AI Engineering": quests,
  "Data Science": [
    { id: 1, title: "Find one story inside a dataset", topic: "Data Science", duration: "15 min", status: "next", color: "#dfead8", icon: "01" },
    { id: 2, title: "Ask a better question of the data", topic: "Data Science", duration: "20 min", status: "locked", color: "#dce7f4", icon: "02" },
    { id: 3, title: "Make one clear visual", topic: "Data Science", duration: "25 min", status: "locked", color: "#f2e6b8", icon: "03" },
    { id: 4, title: "Explain what the evidence suggests", topic: "Projects", duration: "30 min", status: "locked", color: "#f0d8d5", icon: "04" },
  ],
  "Cybersecurity": [
    { id: 1, title: "Spot the weak link in a safe system", topic: "Cybersecurity", duration: "15 min", status: "next", color: "#dfead8", icon: "01" },
    { id: 2, title: "Draw a thoughtful safeguard", topic: "Cybersecurity", duration: "20 min", status: "locked", color: "#dce7f4", icon: "02" },
    { id: 3, title: "Trace how trust can break", topic: "Cybersecurity", duration: "25 min", status: "locked", color: "#f2e6b8", icon: "03" },
    { id: 4, title: "Explain the safe path forward", topic: "Projects", duration: "30 min", status: "locked", color: "#f0d8d5", icon: "04" },
  ],
};

const careerMissions: Record<string, { title: string; topic: string; duration: string; desc: string }> = {
  "Software Engineering": { title: "Build a tiny useful interface", topic: "Software Engineering", duration: "15 min", desc: "Choose one small problem, sketch the screen, and make a useful interface respond to one action." },
  "AI Engineering": { title: "Teach a small helper one clear task", topic: "AI Engineering", duration: "15 min", desc: "Give a small AI helper one bounded task, one example, and one way to check whether its answer is useful." },
  "Data Science": { title: "Find one story inside a small dataset", topic: "Data Science", duration: "15 min", desc: "Take a small dataset, ask one friendly question, and make one clear visual that helps someone see the answer." },
  "Cybersecurity": { title: "Spot the weak link in a safe system", topic: "Cybersecurity", duration: "15 min", desc: "Draw a safe little system, notice where trust could break, and suggest one thoughtful safeguard." },
};

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
            <button onClick={() => onNav("Demo")} className="hidden rounded-full bg-[#f2e6b8] px-3 py-2 text-xs font-bold text-[#705d28] sm:block">Try Hana</button><span className="hidden items-center gap-1.5 rounded-full bg-[#e8f0e4] px-3 py-2 text-xs font-semibold text-[#56704f] sm:flex"><span className="size-2 rounded-full bg-[#83a77a]" /> Saved locally</span>
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
  const [careerStep, setCareerStep] = useState(0);
  const [careerAnswers, setCareerAnswers] = useState<CareerAnswer[]>([]);
  const [mood, setMood] = useState<Mood>("happy");
  const [memories, setMemories] = useState<Memory[]>(() => {
    try { return JSON.parse(localStorage.getItem("hana-memories") || "null") || initialMemories; } catch { return initialMemories; }
  });
  const [memoryPaused, setMemoryPaused] = useState(false);
  const [completed, setCompleted] = useState<number[]>(() => { try { return JSON.parse(localStorage.getItem("hana-completed") || "[]"); } catch { return []; } });
  const [chatMode, setChatMode] = useState<ChatMode>("short");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([{ from: "hana", text: "Hi, I’m Hana. I’ll help you find one clear thing to learn next. What would feel useful today?" }]);
  const [hanaPrompt, setHanaPrompt] = useState("I checked your progress. You’re ready for one small mission that fits your evening.");
  const [ritualChoice, setRitualChoice] = useState("20 minutes");
  const [focusSeconds, setFocusSeconds] = useState(20 * 60);
  const [focusRunning, setFocusRunning] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(quests[0]);
  const [recommendedPath, setRecommendedPath] = useState("AI Engineering");
  const [demoStep, setDemoStep] = useState(0);
  const [energyMode, setEnergyMode] = useState<(typeof energyModes)[number]["id"]>("normal");
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);
  const chatMutation = trpc.hana.chat.useMutation();

  useEffect(() => { localStorage.setItem("hana-memories", JSON.stringify(memories)); }, [memories]);
  useEffect(() => { localStorage.setItem("hana-completed", JSON.stringify(completed)); }, [completed]);
  useEffect(() => { if (!focusRunning) return; const timer = window.setInterval(() => setFocusSeconds((s) => s > 0 ? s - 1 : 0), 1000); return () => window.clearInterval(timer); }, [focusRunning]);
  useEffect(() => { if (focusSeconds === 0) { setFocusRunning(false); setMood("happy"); toast.success("Focus time is complete", { description: "Hana saved your place. A small step counts." }); } }, [focusSeconds]);

  const progress = Math.round((completed.length / quests.length) * 100);
  const remaining = useMemo(() => Math.max(0, quests.length - completed.length), [completed.length]);
  const careerRecommendation = useMemo(() => {
    const text = careerAnswers.map((a) => a.answer).join(" ").toLowerCase();
    if (text.includes("ai") || text.includes("making ai")) return careerDirections.slice(1, 4);
    if (text.includes("data") || text.includes("analytical")) return [careerDirections[2], careerDirections[0], careerDirections[3]];
    if (text.includes("protect") || text.includes("cyber")) return [careerDirections[3], careerDirections[0], careerDirections[1]];
    return [careerDirections[0], careerDirections[1], careerDirections[2]];
  }, [careerAnswers]);
  const journeyQuests = questSets[recommendedPath] ?? quests;

  function nav(name: string) {
    setActive(name);
    if (name === "Chat") setDrawer("chat");
    if (name === "Profile") setDrawer("memory");
    if (name === "Journey") setDrawer("journey");
    if (name === "Projects") setDrawer("project");
    if (name === "Demo") setDrawer("demo");
  }

  function completeQuest() {
    if (completed.includes(selectedQuest.id)) return;
    setCompleted((list) => [...list, selectedQuest.id]);
    setMood("happy");
    continueWithHana(`You did it — “${selectedQuest.title}” is now part of your constellation. Want to explain what clicked, or try the next small piece?`, "proud");
    const message = stepMessages[completed.length % stepMessages.length];
    toast.success(message, { description: `${selectedQuest.title} added to your constellation.` });
    setMemories((list) => list.some((m) => m.id === "achievement") ? list : [...list, { id: "achievement", label: "Recent achievement", value: `Finished ${selectedQuest.title}`, source: "Quest completion" }]);
  }

  function sendChat(text = chatInput) {
    if (!text.trim()) return;
    const cleanText = text.trim();
    setMood("thinking");
    setChatMessages((list) => [...list, { from: "you", text: cleanText }]);
    chatMutation.mutate({
      message: cleanText,
      mode: chatMode,
      context: {
        currentQuest: selectedQuest.title,
        activeProject: "Study Sprint Coach",
        availableTime: ritualChoice,
        explanationStyle: memories.find((m) => m.id === "preference")?.value,
        weakArea: memories.find((m) => m.id === "weak")?.value,
        approvedMemories: memories.map((m) => `${m.label}: ${m.value}`).slice(0, 8),
      },
    }, {
      onSuccess: (result) => { setChatMessages((list) => [...list, { from: "hana", text: result.text }]); setMood(chatMode === "debug" ? "worried" : "happy"); },
      onError: () => { setChatMessages((list) => [...list, { from: "hana", text: chatReplies[chatMode] }]); setMood(chatMode === "debug" ? "worried" : "happy"); toast("Hana used her local notes", { description: "The secure AI service was unavailable, so this preview kept you moving." }); },
    });
    setChatInput("");
  }

  function chooseCareerAnswer(answer: string) {
    const nextAnswers = [...careerAnswers, { question: careerQuestions[careerStep].prompt, answer }];
    setCareerAnswers(nextAnswers);
    setMood(careerStep === 3 ? "thinking" : "happy");
    continueWithHana(`I heard “${answer}.” That helps me narrow the path. For the next step, would you rather choose another interest or let me keep noticing the pattern?`, careerStep === 3 ? "thinking" : "happy");
    if (careerStep < careerQuestions.length - 1) setCareerStep(careerStep + 1);
    else setCareerStep(careerQuestions.length);
  }

  function saveCareerPath() {
    const recommendation = careerRecommendation[0];
    const mission = careerMissions[recommendation.name] ?? careerMissions["AI Engineering"];
    setRecommendedPath(recommendation.name);
    setSelectedQuest({ ...quests[0], title: mission.title, topic: mission.topic, duration: mission.duration });
    setMemories((list) => [...list.filter((m) => m.id !== "career"), { id: "career", label: "Hana’s path hunch", value: recommendation.name, source: "Find My Career Path" }]);
    toast.success("Hana saved your starting path", { description: `${recommendation.name} is now your next kind direction.` });
    setDrawer("journey");
  }

  function chooseEnergyMode(mode: (typeof energyModes)[number]["id"]) {
    setEnergyMode(mode);
    setRitualChoice(mode === "light" ? "10 minutes" : mode === "deep" ? "Just one thing" : "20 minutes");
    const nextMood = mode === "light" ? "sleepy" : mode === "deep" ? "thinking" : "happy";
    setMood(nextMood);
    continueWithHana(mode === "light" ? "Light sounds right. I’ll keep this to one friendly review. Want a tiny win or a quick recap?" : mode === "deep" ? "Deep mode it is. I’ll give you a real build, but we can pause anytime. Want the first piece or the bigger picture?" : "Normal mode ready. We’ll learn, try, and check one useful idea. Want to start with an example or the mission?", nextMood);
    toast.success(`${mode[0].toUpperCase()}${mode.slice(1)} mode ready`, { description: mode === "light" ? "Hana prepared a gentle review." : mode === "deep" ? "Hana found a deeper build when you’re ready." : "Hana prepared a balanced mission." });
  }

  function resetDemo() {
    setDemoStep(0);
    setMood("happy");
    toast("Demo reset", { description: "Hana is ready to show you the whole experience again." });
  }

  function advanceDemo() {
    if (demoStep < demoSteps.length - 1) {
      setDemoStep((step) => step + 1);
      const next = demoSteps[demoStep + 1];
      continueWithHana(`Okay, we’re at ${next.eyebrow.toLowerCase()}. ${next.body} Want to keep going?`, demoStep === 4 ? "thinking" : "happy");
      return;
    }
    setMood("celebrating");
    toast.success("Hana’s room grew", { description: "Demo reward unlocked: a little desk plant." });
  }

  function respondToHana(text: string, nextMood: Mood = "happy") {
    setMood(nextMood);
    setHanaPrompt(text);
    setChatMessages((list) => [...list, { from: "hana", text }]);
    setDrawer("chat");
  }

  function continueWithHana(text: string, nextMood: Mood = "happy") {
    setMood(nextMood);
    setHanaPrompt(text);
    setChatMessages((list) => [...list, { from: "hana", text }]);
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

        <section className="mb-8" aria-label="Choose a starting path"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8b7764]">Start here</p><h2 className="mt-2 font-display text-2xl sm:text-3xl">Hana can meet you where you are.</h2></div><div className="flex items-center gap-2"><span className="hidden text-xs font-semibold text-[#938679] sm:block">No wrong door. Just a kinder first step.</span><button onClick={() => setDrawer("demo")} className="rounded-full bg-[#f2e6b8] px-3 py-2 text-xs font-bold text-[#705d28]">✨ Explore demo</button></div></div><div className="grid gap-3 md:grid-cols-3"><button onClick={() => { setSelectedQuest(quests[0]); setDrawer("journey"); }} className="lift flex items-center gap-4 rounded-[22px] border border-[#d5e1cf] bg-[#e3ecd9] p-4 text-left"><span className="grid size-12 place-items-center rounded-2xl bg-[#fffaf1]/75 text-[#56704f]"><Zap size={20}/></span><span><span className="block text-xs font-bold uppercase tracking-[.13em] text-[#56704f]">AI Engineering</span><span className="mt-1 block text-sm font-semibold text-[#4f5d4e]">Make systems do useful things.</span></span><ArrowRight size={16} className="ml-auto text-[#56704f]" /></button><button onClick={() => toast.success("Computer Science path is ready", { description: "Hana will begin with programming foundations and problem-solving." })} className="lift flex items-center gap-4 rounded-[22px] border border-[#d7e2eb] bg-[#e4edf3] p-4 text-left"><span className="grid size-12 place-items-center rounded-2xl bg-[#fffaf1]/75 text-[#607a96]"><BookOpen size={20}/></span><span><span className="block text-xs font-bold uppercase tracking-[.13em] text-[#607a96]">Computer Science</span><span className="mt-1 block text-sm font-semibold text-[#50627b]">Understand how the pieces work.</span></span><ArrowRight size={16} className="ml-auto text-[#607a96]" /></button><button onClick={() => { setCareerStep(0); setCareerAnswers([]); setMood("curious"); setDrawer("career"); }} className="lift flex items-center gap-4 rounded-[22px] border border-[#ead1d1] bg-[#f0e1df] p-4 text-left"><span className="grid size-12 place-items-center rounded-2xl bg-[#fffaf1]/75 text-[#8d5961]"><Compass size={20}/></span><span><span className="block text-xs font-bold uppercase tracking-[.13em] text-[#8d5961]">Find My Career Path</span><span className="mt-1 block text-sm font-semibold text-[#765f60]">Not sure yet? Start with curiosity.</span></span><ArrowRight size={16} className="ml-auto text-[#8d5961]" /></button></div></section>

        <section className="mb-8 grid gap-4 md:grid-cols-[1.15fr_.85fr]" aria-label="Hana learning modes"><article className="paper-card rounded-[24px] bg-[#fffaf1] p-5"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b7764]">Today’s mission</p><h2 className="mt-2 font-display text-2xl">{selectedQuest.title}</h2></div><Target className="text-[#56704f]" size={20}/></div><p className="mt-2 text-sm text-[#75695e]">{selectedQuest.duration} · {energyMode === "light" ? "Review + one easy win" : energyMode === "deep" ? "A challenging build" : "Learn + practice"}</p><button onClick={() => setDrawer("journey")} className="mt-4 rounded-full bg-[#2f2a25] px-4 py-2 text-xs font-bold text-white">Start <ArrowRight size={14} className="ml-1 inline"/></button><button onClick={() => setDrawer("chat")} className="ml-2 mt-4 rounded-full border border-[#dfd3bf] px-4 py-2 text-xs font-bold text-[#6d6258]">I’m stuck <CircleHelp size={14} className="ml-1 inline"/></button></article><article className="paper-card rounded-[24px] bg-[#e4edf3] p-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#56709a]">Energy check</p><h2 className="mt-2 font-display text-2xl">How much room today?</h2><div className="mt-4 grid grid-cols-3 gap-2">{energyModes.map((mode) => <button key={mode.id} onClick={() => chooseEnergyMode(mode.id)} className={`rounded-2xl px-2 py-3 text-center text-xs font-bold ${energyMode === mode.id ? "bg-[#3157c8] text-white" : "bg-[#fffaf1]/70 text-[#5a6e88]"}`}><span className="block text-lg">{mode.icon}</span>{mode.label}<span className="mt-1 block text-[10px] font-medium opacity-80">{mode.detail}</span></button>)}</div></article></section>

        <section className="grid gap-6 lg:grid-cols-[1.18fr_.82fr]" aria-label="Daily welcome">
          <article className="grain paper-card relative min-h-[390px] overflow-hidden rounded-[30px] bg-[#e3ecd9] p-6 sm:p-9">
            <div className="relative z-10 max-w-[52%] sm:max-w-[55%]"><div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fff8ed]/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-[#55704f]"><span className="size-2 rounded-full bg-[#83a77a]" /> Hana’s morning note</div><h2 className="font-display text-3xl leading-tight sm:text-4xl">Hi, I’m Hana.</h2><p className="mt-4 text-base leading-relaxed text-[#50604b]">{hanaPrompt}</p><div className="mt-5 flex flex-wrap gap-2"><button onClick={() => respondToHana("Okay. Let’s make the first move together — sketch who asks, who answers, and what comes back.", "curious")} className="rounded-full bg-[#fff8ed]/80 px-3 py-2 text-xs font-bold text-[#55704f]">Let me try</button><button onClick={() => respondToHana("I can explain it with a tiny example first. No jargon ambushes, promise.", "thinking")} className="rounded-full bg-[#fff8ed]/80 px-3 py-2 text-xs font-bold text-[#55704f]">Tell me more</button></div><button onClick={() => setDrawer("chat")} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2f2a25] px-5 py-3 text-sm font-bold text-[#fff8ed] shadow-lg shadow-[#6d805f]/20 transition hover:-translate-y-0.5">Talk it through <MessageCircle size={16}/></button></div>
            <img src={ASSETS.welcome} alt="Hana beside a mug and notebook in a sunlit study room" className="absolute -bottom-5 -right-10 w-[64%] max-w-[420px] object-contain sm:-right-5 sm:w-[54%]" />
            <span className="pin-label absolute bottom-5 left-5 rounded-md bg-[#f2d982] px-2 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#65542d]">a gentle start</span><span className="pin-label absolute right-8 top-7 rounded-md bg-[#fffaf1] px-2 py-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#6d6258]">Hana’s room · growing</span>
          </article>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <article className="paper-card rounded-[26px] bg-[#fffaf1] p-6"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b7764]">Hana’s hunch</p><h3 className="mt-3 font-display text-2xl">Make APIs less mysterious.</h3></div><span className="grid size-10 place-items-center rounded-full bg-[#dce7f4] text-[#3157c8]"><Lightbulb size={18}/></span></div><p className="mt-3 text-sm leading-relaxed text-[#6f6359]">You’ve built the idea. Today, connect it to one small request-and-response story.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => { setSelectedQuest(quests[0]); setDrawer("journey"); }} className="inline-flex items-center gap-2 text-sm font-bold text-[#3157c8]">See the next quest <ChevronRight size={16}/></button><button onClick={() => respondToHana("I’m noticing a useful thread: your project needs one clear request-and-response story. Want to make that together?", "curious")} className="text-sm font-bold text-[#8b7764]">Ask Hana why</button></div></article>
            <article className="paper-card rounded-[26px] bg-[#f0e1df] p-6"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8d5961]">One small ritual</p><Clock3 size={18} className="text-[#a56e75" /></div><h3 className="mt-3 font-display text-2xl">How much room do you have?</h3><div className="mt-5 flex flex-wrap gap-2">{["10 minutes", "20 minutes", "Just one thing"].map((choice) => <button key={choice} onClick={() => setRitualChoice(choice)} className={`rounded-full px-3 py-2 text-xs font-bold transition ${ritualChoice === choice ? "bg-[#2f2a25] text-[#fff8ed]" : "bg-[#fff8ed]/70 text-[#805d5e] hover:bg-[#fff8ed]"}`}>{choice}</button>)}</div><p className="mt-4 text-xs text-[#8b6d6e]">Hana will shape the mission around <b>{ritualChoice.toLowerCase()}</b>.</p></article>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[.82fr_1.18fr]">
          <article className="paper-card rounded-[26px] bg-[#fffaf1] p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b7764]">Your constellation</p><h2 className="mt-2 font-display text-2xl">The room remembers.</h2></div><span className="rounded-full bg-[#e8f0e4] px-3 py-1 text-xs font-bold text-[#56704f]">{completed.length} pins</span></div><div className="relative mt-6 min-h-[170px] overflow-hidden rounded-[20px] bg-[#2f3f56] p-5"><div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(#f2d982 1px, transparent 1px)", backgroundSize: "28px 28px" }} />{[...Array(12)].map((_, i) => <span key={i} className={`absolute size-2 rounded-full ${i < completed.length ? "bg-[#f2d982] shadow-[0_0_12px_#f2d982]" : "bg-[#93a5bc]"}`} style={{ left: `${12 + ((i * 23) % 76)}%`, top: `${18 + ((i * 37) % 62)}%` }} />)}<div className="relative z-10 flex h-full min-h-[130px] items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#dce7f4]">{recommendedPath} path</p><p className="mt-2 max-w-[190px] font-display text-2xl text-[#fff8ed]">A flexible sky, not a deadline.</p></div><Trophy size={32} className="text-[#f2d982]" /></div></div><button onClick={() => setDrawer("journey")} className="mt-5 flex w-full items-center justify-between rounded-xl bg-[#edf3e9] px-4 py-3 text-sm font-bold text-[#56704f]">Open your quest map <ArrowRight size={16}/></button></article>

          <article className="paper-card relative rounded-[26px] bg-[#e4edf3] p-6 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#56709a]">Hana’s next step</p><h2 className="mt-2 font-display text-3xl">Name the moving pieces.</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-[#50627b]">Before you send a request, you’ll sketch who asks, who answers, and what comes back. No code gymnastics yet.</p></div><div className="grid size-16 place-items-center rounded-[20px] bg-[#fffaf1]/75 text-[#3157c8] shadow-sm"><Target size={28}/></div></div><div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-bold text-[#5a6e88]"><span className="rounded-full bg-[#fffaf1]/75 px-3 py-2"><Clock3 size={13} className="mr-1 inline" /> {ritualChoice === "10 minutes" ? "10" : "12"} min</span><span className="rounded-full bg-[#fffaf1]/75 px-3 py-2">Quest 01</span><span className="rounded-full bg-[#fffaf1]/75 px-3 py-2">+1 constellation pin</span></div><div className="mt-7 flex flex-wrap gap-3"><button onClick={() => setDrawer("journey")} className="rounded-full bg-[#3157c8] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#3157c8]/20 transition hover:-translate-y-0.5">Enter quest <ArrowRight size={16} className="ml-1 inline" /></button><button onClick={() => setDrawer("focus")} className="rounded-full bg-[#fffaf1]/75 px-5 py-3 text-sm font-bold text-[#3157c8]">Focus mode</button></div></article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.18fr_.82fr]">
          <article className="paper-card rounded-[26px] bg-[#fffaf1] p-6 sm:p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8b7764]">Kind-step history</p><h2 className="mt-2 font-display text-2xl">The bits worth keeping.</h2></div><button onClick={() => setShowAllHistory(!showAllHistory)} className="text-xs font-bold text-[#3157c8]">{showAllHistory ? "Show less" : "View all"}</button></div><div className="mt-5 space-y-3">{["You returned to the tricky part", "JavaScript basics became familiar", "You chose a project boundary"].slice(0, showAllHistory ? 3 : 2).map((text, i) => <div key={text} className="flex items-center gap-3 rounded-xl bg-[#f7f1e4] p-3"><span className="grid size-9 place-items-center rounded-full bg-[#e3ecd9] text-[#56704f]"><Check size={15}/></span><p className="text-sm font-semibold text-[#5c5147]">{text}<span className="mt-0.5 block text-xs font-normal text-[#938679]">{i === 0 ? "Today" : "A little while ago"}</span></p></div>)}</div></article>
          <article className="paper-card rounded-[26px] bg-[#f2e6b8] p-6 sm:p-7"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#fffaf1]/75 text-[#8d7430]"><Sparkles size={18}/></span><p className="text-xs font-bold uppercase tracking-[.18em] text-[#846d34]">A note from Hana</p></div><p className="mt-5 font-display text-2xl leading-tight text-[#5c4d26]">“One clear thing is enough for today.”</p><button onClick={() => setDrawer("memory")} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#715d27]">What I remember <ArrowRight size={16}/></button></article>
        </section><section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]"><article className="paper-card rounded-[26px] bg-[#e3ecd9] p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#56704f]">Skill garden</p><h2 className="mt-2 font-display text-2xl">Grow what you can demonstrate.</h2></div><Sprout size={21} className="text-[#6f8c68]"/></div><div className="mt-4 grid grid-cols-2 gap-2">{skillGarden.map((skill) => <button key={skill.name} onClick={() => setExpandedInfo(expandedInfo === skill.name ? null : skill.name)} className="rounded-2xl p-3 text-left" style={{ background: skill.color }}><span className="text-xl">{skill.plant}</span><span className="mt-1 block text-xs font-bold text-[#52634d]">{skill.name}</span><span className="mt-2 block h-1.5 rounded-full bg-[#fffaf1]/70"><span className="block h-1.5 rounded-full bg-[#56704f]" style={{ width: `${skill.value}%` }}/></span>{expandedInfo === skill.name && <span className="mt-2 block text-[10px] leading-relaxed text-[#60705b]">Hana grows this when you practice or build with {skill.name.toLowerCase()}. Click again to tuck away.</span>}</button>)}</div></article><article className="paper-card rounded-[26px] bg-[#e4edf3] p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#56709a]">Explore</p><h2 className="mt-2 font-display text-2xl">Learn by making.</h2><p className="mt-2 text-sm leading-relaxed text-[#50627b]">Short answer first. Click when you want the deeper door.</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => setDrawer("lab")} className="rounded-full bg-[#fffaf1] px-4 py-2 text-xs font-bold text-[#56709a]">Hana’s Lab</button><button onClick={() => setDrawer("portfolio")} className="rounded-full bg-[#fffaf1] px-4 py-2 text-xs font-bold text-[#56709a]">Portfolio</button></div></article></section></div>

      {drawer && <div className="fixed inset-0 z-50 flex items-end justify-end bg-[#2f2a25]/25 backdrop-blur-[2px]" onClick={() => setDrawer(null)}><aside className="max-h-[92vh] w-full overflow-y-auto rounded-t-[30px] bg-[#fffaf1] p-5 shadow-2xl sm:max-w-[560px] sm:rounded-l-[30px] sm:rounded-r-none sm:p-7" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#e3ecd9]"><img src={ASSETS.mark} alt="" className="size-8" /></span><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#8b7764]">{drawer === "chat" ? "Ask Hana" : drawer === "memory" ? "Hana remembers" : drawer === "journey" ? "Hana Journey" : drawer === "project" ? "Hana Projects" : drawer === "career" ? "Find My Career Path" : drawer === "demo" ? "Try Hana" : drawer === "lab" ? "Hana’s Lab" : drawer === "portfolio" ? "Hana Portfolio" : "Hana Focus"}</p><h2 className="font-display text-2xl">{drawer === "chat" ? "Let’s make it clearer." : drawer === "memory" ? "Useful context, in your hands." : drawer === "journey" ? "Choose your next quest." : drawer === "project" ? "Turn learning into a thing." : drawer === "career" ? "Let’s find your direction." : drawer === "demo" ? "A tiny tour of Hana." : drawer === "lab" ? "Curiosity is allowed here." : drawer === "portfolio" ? "The things you made matter." : "A calm pocket of time."}</h2></div></div><button onClick={() => setDrawer(null)} className="grid size-10 place-items-center rounded-full bg-[#f3eadc] text-[#6f6359]" aria-label="Close panel"><X size={18}/></button></div><div className="mb-5 rounded-2xl bg-[#f7f1e4] p-4"><div className="flex items-start gap-3"><HanaImage mood={mood} className="size-12 shrink-0"/><p className="text-sm leading-relaxed text-[#5f554c]">{hanaPrompt}</p></div><div className="mt-3 flex flex-wrap gap-2"><button onClick={() => continueWithHana("I’ll give you one small hint, not the whole answer. What part feels foggiest?", "worried")} className="rounded-full bg-[#fffaf1] px-3 py-2 text-xs font-bold text-[#6d6258]">Give me a hint</button><button onClick={() => continueWithHana("Let’s try it together. You can make a first attempt and I’ll stay close.", "curious")} className="rounded-full bg-[#fffaf1] px-3 py-2 text-xs font-bold text-[#6d6258]">Let me try</button><button onClick={() => continueWithHana("I can open one deeper layer. Which part should we look at?", "thinking")} className="rounded-full bg-[#fffaf1] px-3 py-2 text-xs font-bold text-[#6d6258]">Tell me more</button><button onClick={() => continueWithHana("Of course. I’ll explain it another way, with a picture in words and one tiny example. Which part felt unclear?", "confused")} className="rounded-full bg-[#fffaf1] px-3 py-2 text-xs font-bold text-[#6d6258]">Explain another way</button><button onClick={addChatMemory} className="rounded-full bg-[#fffaf1] px-3 py-2 text-xs font-bold text-[#6d6258]">Save this</button></div></div>

        {drawer === "demo" && <div><div className="mb-5 rounded-[24px] bg-[#e3ecd9] p-5"><div className="flex items-start gap-4"><HanaImage mood={demoStep >= 8 ? "celebrating" : demoStep === 4 ? "thinking" : "happy"} className="size-24 shrink-0"/><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#56704f]">Try Hana · fully unlocked</p><h3 className="mt-2 font-display text-2xl">{demoSteps[demoStep].title}</h3><p className="mt-2 text-sm leading-relaxed text-[#52634d]">{demoSteps[demoStep].body}</p></div></div></div><div className="flex items-center justify-between text-xs font-bold text-[#8b7764]"><span>{demoSteps[demoStep].eyebrow}</span><span>{demoStep + 1} / {demoSteps.length}</span></div><div className="mt-3 h-2 rounded-full bg-[#e8f0e4]"><div className="h-2 rounded-full bg-[#83a77a] transition-all" style={{width:`${((demoStep+1)/demoSteps.length)*100}%`}}/></div>{demoStep === demoSteps.length - 1 ? <div className="mt-5 rounded-2xl bg-[#f2e6b8] p-4"><p className="font-display text-2xl text-[#5c4d26]">Ready for your own journey?</p><p className="mt-2 text-sm text-[#75632e]">Choose a path. Hana will keep the first step small.</p><div className="mt-4 grid gap-2 sm:grid-cols-3"><button onClick={() => {setRecommendedPath("AI Engineering"); setSelectedQuest(quests[0]); setDrawer("journey");}} className="rounded-xl bg-[#2f2a25] px-3 py-2 text-xs font-bold text-white">AI Engineering</button><button onClick={() => toast.success("Computer Science is ready", {description:"Hana will begin with foundations and problem-solving."})} className="rounded-xl bg-[#fffaf1] px-3 py-2 text-xs font-bold text-[#5c4d26]">Computer Science</button><button onClick={() => {setCareerStep(0); setCareerAnswers([]); setDrawer("career");}} className="rounded-xl bg-[#fffaf1] px-3 py-2 text-xs font-bold text-[#5c4d26]">Find my path</button></div></div> : <button onClick={advanceDemo} className="mt-5 flex w-full items-center justify-between rounded-full bg-[#2f2a25] px-5 py-3 text-sm font-bold text-white">{demoSteps[demoStep].action}<ArrowRight size={16}/></button>}<button onClick={resetDemo} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#8b7764]"><RotateCcw size={14}/> Replay demo</button></div>}

        {drawer === "lab" && <div><div className="mb-5 rounded-[24px] bg-[#e4edf3] p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#56709a]">Hana’s Lab · experiment mode</p><h3 className="mt-2 font-display text-3xl">What happens if we change this?</h3><p className="mt-2 text-sm leading-relaxed text-[#50627b]">A safe place to play with prompts, APIs, code, and tiny ideas. No grades. No pressure.</p></div><div className="space-y-3">{[{title:"Prompt playground",copy:"Change one instruction and compare the result.",icon:"✦"},{title:"API sandbox",copy:"Try a request shape with sample data.",icon:"⌘"},{title:"Build sketch",copy:"Turn a curious idea into a tiny definition of done.",icon:"◇"}].map((item) => <button key={item.title} onClick={() => setExpandedInfo(expandedInfo === item.title ? null : item.title)} className="flex w-full items-center gap-3 rounded-2xl border border-[#d7e2eb] bg-[#fffaf1] p-4 text-left"><span className="grid size-10 place-items-center rounded-xl bg-[#dce7f4] text-[#3157c8]">{item.icon}</span><span><span className="block font-bold text-[#50627b]">{item.title}</span><span className="mt-1 block text-xs text-[#77899c]">{expandedInfo === item.title ? item.copy : "Click for a little more"}</span></span><ChevronRight size={16} className="ml-auto text-[#7890a8]"/></button>)}</div></div>}

        {drawer === "portfolio" && <div><div className="mb-5 rounded-[24px] bg-[#f2e6b8] p-5"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#846d34]">Hana Portfolio</p><h3 className="mt-2 font-display text-3xl">The things you made matter.</h3><p className="mt-2 text-sm leading-relaxed text-[#75632e]">Completed builds become evidence of understanding — with room for what you learned, not just what you clicked.</p></div><div className="rounded-2xl border border-[#e2d7c7] bg-[#fffaf1] p-4"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#8b7764]">Project seed</p><p className="mt-2 font-display text-2xl">Study Sprint Coach</p></div><span className="rounded-full bg-[#e3ecd9] px-3 py-1 text-xs font-bold text-[#56704f]">In progress</span></div><div className="mt-4 grid gap-2 text-xs text-[#75695e] sm:grid-cols-2"><p><b>Technologies:</b> React · local memory · AI-ready chat</p><p><b>Skills:</b> APIs · product thinking · interaction design</p><p><b>Learning note:</b> One clear task helps a learner keep moving.</p><p><b>GitHub:</b> Connect when you’re ready.</p></div><button onClick={() => setExpandedInfo(expandedInfo === "portfolio" ? null : "portfolio")} className="mt-4 rounded-full border border-[#dfd3bf] px-4 py-2 text-xs font-bold text-[#6d6258]">{expandedInfo === "portfolio" ? "Hide project note" : "Show project note"}</button>{expandedInfo === "portfolio" && <p className="mt-3 rounded-xl bg-[#f7f1e4] p-3 text-sm leading-relaxed text-[#665b52]">Hana can turn this into a portfolio summary after you complete a real build. This is a project seed, not a fake achievement.</p>}</div><button onClick={() => setDrawer("project")} className="mt-5 rounded-full bg-[#2f2a25] px-4 py-2 text-xs font-bold text-white">Open project plans <ArrowRight size={14} className="ml-1 inline"/></button></div>}

        {drawer === "career" && <div><div className="mb-5 flex items-start gap-3 rounded-2xl bg-[#f0e1df] p-4"><HanaImage mood={careerStep >= careerQuestions.length ? "proud" : careerStep === 0 ? "happy" : "thinking"} className="size-20 shrink-0" /><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#8d5961]">Hana’s little compass</p><p className="mt-1 text-sm leading-relaxed text-[#765f60]">You don’t need to know the answer yet. I’ll notice the patterns with you.</p></div></div>{careerStep < careerQuestions.length ? <div><div className="mb-4 flex items-center justify-between"><p className="font-display text-2xl">{careerQuestions[careerStep].prompt}</p><span className="text-xs font-bold text-[#9a7c7d]">{careerStep + 1} / {careerQuestions.length}</span></div><div className="grid gap-2 sm:grid-cols-2">{careerQuestions[careerStep].options.map((option) => <button key={option} onClick={() => chooseCareerAnswer(option)} className="lift rounded-2xl border border-[#e6d3d0] bg-[#fffaf1] px-4 py-3 text-left text-sm font-semibold text-[#665252] hover:border-[#c88c92] hover:bg-[#fff7f3]">{option}<ChevronRight size={15} className="float-right mt-0.5 text-[#a36e75]" /></button>)}</div><p className="mt-5 text-center text-xs text-[#9a7c7d]">Short answers are enough. Hana is looking for a direction, not a perfect label.</p></div> : <div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#8d5961]">Hana’s first read</p><h3 className="mt-2 font-display text-3xl">I think you might enjoy…</h3><div className="mt-5 space-y-3">{careerRecommendation.map((direction, i) => <div key={direction.name} className={`rounded-2xl border p-4 ${i === 0 ? "border-[#d5e1cf] bg-[#edf3e9]" : "border-[#e2d7c7] bg-[#fffaf1]"}`}><div className="flex items-start gap-3"><span className="grid size-8 place-items-center rounded-full bg-[#e3ecd9] text-xs font-bold text-[#56704f]">{i + 1}</span><div><p className="font-display text-xl">{direction.name}</p><p className="mt-1 text-sm leading-relaxed text-[#665b52]">{direction.fit}</p><button onClick={() => { setExpandedInfo(expandedInfo === direction.name ? null : direction.name); continueWithHana(expandedInfo === direction.name ? "I’ll tuck that detail away." : `Here’s the deeper layer for ${direction.name}. Which part should we turn into a small experiment?`, "thinking"); }} className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#8d5961]">{expandedInfo === direction.name ? "Hide details" : "Click for more info"}<ChevronRight size={13}/></button>{expandedInfo === direction.name && <div className="mt-3 grid gap-2 text-xs text-[#7b6f63] sm:grid-cols-2"><p><b>Involves:</b> {direction.involves}</p><p><b>Try:</b> {direction.projects}</p><p><b>Skills:</b> {direction.skills}</p><p><b>Future roles:</b> {direction.roles}</p><p className="sm:col-span-2"><b>Outlook:</b> {direction.outlook}</p></div>}</div></div></div>)}</div><div className="mt-5 rounded-2xl bg-[#f2e6b8] p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#846d34]">🌸 My recommendation</p><p className="mt-2 font-display text-2xl">Start with {careerRecommendation[0].name}.</p><p className="mt-2 text-sm leading-relaxed text-[#66572d]">One small project will tell us more than a long questionnaire. Hana can adjust as you learn.</p><button onClick={saveCareerPath} className="mt-4 rounded-full bg-[#2f2a25] px-4 py-2 text-sm font-bold text-white">Choose this path <ArrowRight size={15} className="ml-1 inline" /></button></div><button onClick={() => { setCareerStep(0); setCareerAnswers([]); }} className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#8d5961]"><RotateCcw size={14}/> Start over</button></div>}</div>}

        {drawer === "chat" && <div><div className="mb-4 flex items-start gap-3 rounded-2xl bg-[#e3ecd9] p-4"><HanaImage mood={mood} className="size-20 shrink-0" /><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#56704f]">Hana is {mood === "sad" ? "with you" : mood}</p><p className="mt-1 text-sm leading-relaxed text-[#52634d]">I’ll start short, then open a deeper door if you want it.</p></div></div><div className="mb-4 flex flex-wrap gap-2" aria-label="Hana response modes">{([{k:"short",t:"Short version"},{k:"analogy",t:"Use an analogy"},{k:"example",t:"Show an example"},{k:"debug",t:"Help me debug"},{k:"deep",t:"Tell me more"},{k:"career",t:"Career path"},{k:"project",t:"Project plan"}] as const).map((mode) => <button key={mode.k} onClick={() => setChatMode(mode.k)} className={`rounded-full px-3 py-2 text-xs font-bold ${chatMode === mode.k ? "bg-[#3157c8] text-white" : "bg-[#edf3e9] text-[#56704f]"}`}>{mode.t}</button>)}</div><div className="mb-4 max-h-[300px] space-y-3 overflow-y-auto rounded-2xl bg-[#f7f1e4] p-4">{chatMessages.map((m, i) => <div key={i} className={`flex gap-2 ${m.from === "you" ? "justify-end" : ""}`}>{m.from === "hana" && <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#e3ecd9]"><img src={ASSETS.mark} alt="" className="size-5" /></span>}<p className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${m.from === "you" ? "bg-[#3157c8] text-white" : "bg-[#fffaf1] text-[#5f554c]"}`}>{m.text}</p></div>)}</div><div className="flex gap-2"><textarea value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }} placeholder="Ask about your project, a concept, or a stuck moment…" className="min-h-[80px] flex-1 resize-none rounded-2xl border border-[#dfd3bf] bg-[#fffaf1] p-3 text-sm outline-none focus:border-[#3157c8]" /><button onClick={() => sendChat()} className="self-end rounded-full bg-[#2f2a25] px-4 py-3 text-sm font-bold text-white"><ArrowRight size={17}/></button></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => sendChat("Why do APIs matter for my project?")} className="rounded-full border border-[#dfd3bf] px-3 py-2 text-xs font-semibold text-[#716359]">Why do APIs matter?</button><button onClick={addChatMemory} className="rounded-full border border-[#dfd3bf] px-3 py-2 text-xs font-semibold text-[#716359]"><Save size={13} className="mr-1 inline" /> Keep this in memory</button></div></div>}

        {drawer === "memory" && <div><div className="mb-5 flex items-center justify-between rounded-2xl bg-[#edf3e9] p-4"><div><p className="text-sm font-bold text-[#56704f]">Memory is {memoryPaused ? "paused" : "on"}.</p><p className="mt-1 text-xs text-[#70816a]">Only useful learning context is saved on this device.</p></div><button onClick={() => setMemoryPaused(!memoryPaused)} className={`rounded-full px-4 py-2 text-xs font-bold ${memoryPaused ? "bg-[#f0e1df] text-[#8d5961]" : "bg-[#56704f] text-white"}`}>{memoryPaused ? "Resume" : "Pause"}</button></div><div className="space-y-3">{memories.map((memory) => <div key={memory.id} className="rounded-2xl border border-[#e2d7c7] bg-[#fffaf1] p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.13em] text-[#8b7764]">{memory.label}</p><p className="mt-1 text-sm font-semibold text-[#4e453d]">{memory.value}</p><p className="mt-2 text-xs text-[#9a8b7d]">Source: {memory.source}</p></div><button onClick={() => setMemories((list) => list.filter((m) => m.id !== memory.id))} className="text-[#a98981]" aria-label={`Delete ${memory.label}`}><Trash2 size={15}/></button></div></div>)}</div><div className="mt-5 flex gap-2"><button onClick={() => setMemories([])} className="rounded-full border border-[#e0c4c0] px-4 py-2 text-xs font-bold text-[#8d5961]">Clear all memories</button><button onClick={() => toast("Memory stays on this device", { description: "Server-side cross-device memory can be connected later." })} className="rounded-full bg-[#2f2a25] px-4 py-2 text-xs font-bold text-white">How this works</button></div></div>}

        {drawer === "journey" && <div><div className="rounded-2xl bg-[#2f3f56] p-5 text-[#fffaf1]"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-[#b9c8dc]">Flexible {recommendedPath} path</p><p className="mt-2 font-display text-2xl">Go at the speed of your real life.</p></div><span className="rounded-full bg-[#f2d982] px-3 py-1 text-xs font-bold text-[#5d4d24]">{progress}% lit</span></div><div className="mt-5 h-2 rounded-full bg-[#8396af]/40"><div className="h-2 rounded-full bg-[#f2d982] transition-all" style={{ width: `${Math.max(progress, 8)}%` }} /></div><p className="mt-3 text-xs text-[#cbd6e3]">No 90-day countdown. Just the next useful quest for your new direction.</p></div><div className="mt-5 space-y-3">{[selectedQuest, ...journeyQuests.filter((quest) => quest.id !== selectedQuest.id)].map((quest) => <button key={`${quest.id}-${quest.topic}`} onClick={() => { setSelectedQuest(quest); if (quest.status === "next" || completed.includes(quest.id)) setDrawer("journey"); }} className={`lift flex w-full items-center gap-4 rounded-2xl border p-4 text-left ${selectedQuest.id === quest.id ? "border-[#3157c8] bg-[#edf3e9]" : "border-[#e2d7c7] bg-[#fffaf1]"} ${quest.status === "locked" && !completed.includes(quest.id) ? "opacity-65" : ""}`}><span className="grid size-11 place-items-center rounded-xl text-xs font-bold text-[#4f5d4e]" style={{ background: quest.color }}>{completed.includes(quest.id) ? <Check size={17}/> : quest.icon}</span><span className="min-w-0 flex-1"><span className="block text-xs font-bold uppercase tracking-[.12em] text-[#8b7764]">{quest.topic} · {quest.duration}</span><span className="mt-1 block font-display text-xl">{quest.title}</span><span className="mt-1 block text-xs text-[#8c7d70]">{quest.status === "locked" && !completed.includes(quest.id) ? "Unlocks when the previous quest feels familiar" : "Learn more · open quest details"}</span></span><ChevronRight size={17} className="text-[#8b7764]" /></button>)}</div><div className="mt-5 rounded-2xl bg-[#f2e6b8] p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#846d34]">Hana’s short version</p><p className="mt-2 text-sm leading-relaxed text-[#66572d]">{careerMissions[recommendedPath]?.desc ?? "Hana will keep the next step small, specific, and connected to what you want to make."}</p><button onClick={completeQuest} className="mt-4 rounded-full bg-[#2f2a25] px-4 py-2 text-xs font-bold text-white">{completed.includes(selectedQuest.id) ? "Quest complete" : "Complete this quest"}</button></div></div>}

        {drawer === "project" && <div><div className="rounded-2xl bg-[#f0e1df] p-5"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#8d5961]">Active project</p><h3 className="mt-2 font-display text-3xl">Study Sprint Coach</h3><p className="mt-2 text-sm leading-relaxed text-[#765f60]">A tiny companion that turns available time and a weak topic into one focused mission.</p></div><div className="mt-5 space-y-3">{[{name:"Quick build",time:"30 min",desc:"One form, one recommendation, one calm result."},{name:"Portfolio build",time:"Weekend",desc:"Add history, saved preferences, and a clear empty state."},{name:"Hackathon build",time:"A focused sprint",desc:"Connect the project to a real learning context and explain the tradeoffs."}].map((p, i) => <button key={p.name} onClick={() => continueWithHana(`${p.name} sounds like a good scope. ${p.desc} Want to sketch the first tiny piece together?`, "curious")} className="lift flex w-full items-center gap-4 rounded-2xl border border-[#e2d7c7] bg-[#fffaf1] p-4 text-left"><span className="grid size-10 place-items-center rounded-xl bg-[#dce7f4] text-[#3157c8]"><Zap size={17}/></span><span className="flex-1"><span className="block font-bold">{p.name}</span><span className="mt-1 block text-xs text-[#8b7c70]">{p.time} · {p.desc}</span></span><ArrowRight size={16}/></button>)}</div><a href="https://devpost.com/software" target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-between rounded-2xl bg-[#edf3e9] p-4 text-sm font-bold text-[#56704f]">Find a hackathon project <ExternalLink size={16}/></a></div>}

        {drawer === "focus" && <div><div className="grid place-items-center rounded-2xl bg-[#e3ecd9] p-6"><HanaImage mood="thinking" className="h-40" /><p className="text-xs font-bold uppercase tracking-[.15em] text-[#56704f]">One task. No pressure.</p><p className="mt-2 font-display text-5xl text-[#40543b]">{minutes}:{seconds}</p><p className="mt-2 text-center text-sm text-[#64755e]">Hana will keep your place if you pause.</p></div><div className="mt-5 flex justify-center gap-3"><button onClick={() => { setFocusRunning(!focusRunning); continueWithHana(focusRunning ? "Paused. Good call — your place is safe. Want to resume later or make the task smaller?" : "I’m here. We’ll keep one task in view. Want a hint before you begin?", focusRunning ? "sleepy" : "focused" as Mood); }} className="inline-flex items-center gap-2 rounded-full bg-[#2f2a25] px-5 py-3 text-sm font-bold text-white">{focusRunning ? <Pause size={16}/> : <Play size={16}/>} {focusRunning ? "Pause" : "Begin focus"}</button><button onClick={() => { setFocusSeconds(20 * 60); setFocusRunning(false); }} className="grid size-11 place-items-center rounded-full border border-[#dfd3bf] text-[#6f6359]" aria-label="Reset timer"><TimerReset size={17}/></button></div><div className="mt-5 rounded-2xl bg-[#fffaf1] p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#8b7764]">Today’s single task</p><p className="mt-2 font-display text-2xl">Sketch who asks, who answers, and what comes back.</p><button onClick={() => { setSelectedQuest(quests[0]); setDrawer("journey"); }} className="mt-4 text-sm font-bold text-[#3157c8]">Open the quest <ArrowRight size={15} className="ml-1 inline"/></button></div></div>}
      </aside></div>}
    </AppShell>
  );
}
