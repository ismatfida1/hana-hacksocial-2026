import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Compass, FolderKanban, Home as HomeIcon, MessageCircle, Play, Trophy, WandSparkles } from "lucide-react";
import { buildJourney, type JourneyStep } from "@shared/hanaJourney";
import { trpc } from "@/lib/trpc";
import { AIChatBox, type Message } from "@/components/AIChatBox";

const HANA = "/manus-storage/hana-mobile-logo_7d26f9c0.png";
const SIGNATURE = "/manus-storage/ismat-fida-signature_5b1b14d2.png";
type Screen = "greeting" | "start" | "career" | "custom" | "customLevel" | "customGoal" | "customTime" | "skill" | "discover" | "app";
type Destination = "Home" | "Journey" | "Projects" | "Opportunities" | "Ask Hana";
type NavItem = { label: Destination; icon: typeof HomeIcon };

type Pathway = "career" | "custom" | "skill";

type Plan = { pathway: Pathway; area: string; title: string; goal: string; level: string; time: string; steps: JourneyStep[] };

const careers = ["Software Engineering", "AI / Machine Learning", "Cybersecurity", "Cloud / DevOps", "Data Science", "Web Development", "Mobile Development", "UI/UX Design"];
const practicalSkills = ["AI Automation", "Web Development", "Python Automation", "Data Analysis", "UI/UX Design", "Video Editing", "Content Creation", "SEO"];
const levels = ["Starting from zero", "I know the basics", "I’ve built a few things", "Ready for advanced work"];
const goals = ["Pass my university courses", "Build a portfolio", "Get an internship or job", "Explore this field first"];
const times = ["10 minutes", "25 minutes", "45 minutes", "1 hour or more"];
const navigation: NavItem[] = [
  { label: "Home", icon: HomeIcon },
  { label: "Journey", icon: Compass },
  { label: "Projects", icon: FolderKanban },
  { label: "Opportunities", icon: Trophy },
  { label: "Ask Hana", icon: MessageCircle },
];

const skillAreas: Record<string, string> = {
  "AI Automation": "Programming",
  "Web Development": "Web Development",
  "Python Automation": "Programming",
  "Data Analysis": "Data Science",
  "UI/UX Design": "UI/UX",
  "Video Editing": "Content Creation",
  "Content Creation": "Content Creation",
  SEO: "Digital Marketing",
};

function Shell({ children, back }: { children: ReactNode; back?: () => void }) {
  return <main className="min-h-screen bg-[#FBF7F1] px-5 text-[#3A3540]"><div className="mx-auto flex min-h-screen max-w-xl flex-col"><header className="flex items-center justify-between py-6">{back ? <button onClick={back} className="flex items-center gap-1 text-sm font-bold text-[#7A7482]"><ArrowLeft size={16}/> Back</button> : <span className="w-12"/>}<div className="flex items-center gap-2"><img src={HANA} alt="Hana logo" className="size-9 rounded-full object-cover"/><p className="font-display text-xl tracking-[.12em]">HANA<span className="text-[#C98C93]">.</span></p></div><span className="w-12"/></header>{children}</div></main>;
}

function ChoiceScreen({ eyebrow, title, options, onChoose, footer }: { eyebrow: string; title: ReactNode; options: string[]; onChoose: (value: string) => void; footer?: ReactNode }) {
  return <section className="flex flex-1 flex-col justify-center pb-12"><p className="text-sm font-semibold text-[#C98C93]">{eyebrow}</p><h1 className="mt-3 font-display text-5xl leading-[.95]">{title}</h1><div className="mt-7 grid gap-2">{options.map((option) => <button key={option} onClick={() => onChoose(option)} className="flex items-center justify-between rounded-2xl border border-[#E3D8CF] bg-white px-4 py-4 text-left text-sm font-bold transition hover:border-[#C98C93] active:scale-[.99]">{option}<ArrowRight size={17} className="text-[#947DA3]"/></button>)}</div>{footer}</section>;
}

function HanaArt({ mood = "😊", compact = false }: { mood?: string; compact?: boolean }) {
  return <div className={`relative mx-auto flex ${compact ? "h-[150px] max-w-[190px]" : "h-[285px] max-w-[350px]"} w-full items-end justify-center overflow-hidden rounded-[44px] bg-[#E9E7F1]`}><div className="absolute left-8 top-8 size-20 rounded-full bg-[#E7B7BC]/40 blur-2xl"/><div className="absolute right-8 top-7 size-24 rounded-full bg-[#C9BFE3]/50 blur-2xl"/><img src={HANA} alt="Hana, a cute professional robot companion" className="relative z-10 h-[115%] w-auto max-w-none object-contain mix-blend-multiply"/><span className="absolute right-4 top-4 rounded-full bg-[#FBF7F1] px-3 py-1.5 text-xs shadow-sm">{mood}</span></div>;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("greeting");
  const [destination, setDestination] = useState<Destination>("Home");
  const [pathway, setPathway] = useState<Pathway>("career");
  const [area, setArea] = useState("");
  const [customArea, setCustomArea] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [customLevel, setCustomLevel] = useState("");
  const [customBuilt, setCustomBuilt] = useState("");
  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");
  const [started, setStarted] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [aiMission, setAiMission] = useState<{ todaysStep?: string; whyToday?: string; provider?: string }>();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [discoverStep, setDiscoverStep] = useState(0);
  const chat = trpc.hana.chat.useMutation();
  const deviseJourney = trpc.hana.deviseJourney.useMutation();

  const chosenArea = area || customArea || "Programming";
  const localSteps = useMemo(() => buildJourney(chosenArea, level || customLevel, goal || customGoal, time), [chosenArea, level, customLevel, goal, customGoal, time]);
  const mission = aiMission?.todaysStep || localSteps[0]?.title || "Choose one small next step";
  const missionWhy = aiMission?.whyToday || localSteps[0]?.purpose || "Hana will shape the next step around your goal.";

  const createPlan = (nextPathway: Pathway, nextArea: string, nextLevel: string, nextGoal: string, nextTime: string, title: string) => {
    const steps = buildJourney(nextArea, nextLevel, nextGoal, nextTime);
    setPathway(nextPathway);
    setArea(nextArea);
    setLevel(nextLevel);
    setGoal(nextGoal);
    setTime(nextTime);
    setPlan({ pathway: nextPathway, area: nextArea, title, goal: nextGoal, level: nextLevel, time: nextTime, steps });
    setScreen("app");
    deviseJourney.mutate({ studyArea: nextArea, level: nextLevel, goal: nextGoal, availableTime: nextTime, interests: [] }, { onSuccess: (result) => setAiMission(result) });
  };

  const sendChat = (content: string) => {
    const next = [...chatMessages, { role: "user" as const, content }];
    setChatMessages(next);
    chat.mutate({ message: content, mode: "short", context: { activeProject: plan?.title, availableTime: time, approvedMemories: [plan?.area, plan?.goal, plan?.level].filter(Boolean) as string[] } }, { onSuccess: (response) => setChatMessages((messages) => [...messages, { role: "assistant", content: response.text }]) });
  };

  if (screen === "greeting") return <Shell><section className="flex flex-1 flex-col items-center justify-center pb-14 text-center"><p className="text-sm font-semibold text-[#C98C93]">Good morning 🌸</p><h1 className="mt-3 font-display text-5xl leading-[.95] sm:text-6xl">Hi, I’m Hana.</h1><p className="mt-4 text-base text-[#7A7482]">How’s your day going?</p><div className="mt-8 w-full"><HanaArt/></div><button onClick={() => setScreen("start")} className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3A3540] px-4 py-4 text-sm font-bold text-white transition active:scale-[.98]">I’m ready <span>✨</span><ArrowRight size={17}/></button></section></Shell>;

  if (screen === "start") return <Shell back={() => setScreen("greeting")}><ChoiceScreen eyebrow="Let’s begin" title={<>What would you like<br/><em className="text-[#947DA3]">to do?</em></>} options={["🎓 Build My Career", "🧭 Create My Own Journey", "💼 Learn a Skill & Earn"]} onChoose={(value) => { if (value.includes("Career")) { setPathway("career"); setScreen("career"); } else if (value.includes("Own")) { setPathway("custom"); setScreen("custom"); } else { setPathway("skill"); setScreen("skill"); } }} footer={<p className="mt-7 text-center text-xs text-[#9A8C84]">Hana will keep everything you choose inside one Journey.</p>} /></Shell>;

  if (screen === "career") return <Shell back={() => setScreen("start")}><ChoiceScreen eyebrow="Build my career" title={<>What career<br/><em className="text-[#947DA3]">sounds right?</em></>} options={careers} onChoose={(value) => { setArea(value); setScreen("customLevel"); }} footer={<button onClick={() => { setDiscoverStep(0); setScreen("discover"); }} className="mt-6 w-full text-center text-sm font-bold text-[#7A7482]">I’m not sure — Help me find my path</button>} /></Shell>;

  if (screen === "skill") return <Shell back={() => setScreen("start")}><ChoiceScreen eyebrow="Learn a skill & earn" title={<>Which skill<br/><em className="text-[#947DA3]">interests you?</em></>} options={practicalSkills} onChoose={(value) => { const nextArea = skillAreas[value] || value; createPlan("skill", nextArea, "Starting from zero", "Build proof I can show", "25 minutes", value); }} footer={<p className="mt-7 text-center text-xs text-[#9A8C84]">Hana measures skill, proof, and readiness — never promised income.</p>} /></Shell>;

  if (screen === "custom") return <Shell back={() => setScreen("start")}><section className="flex flex-1 flex-col justify-center pb-12"><p className="text-sm font-semibold text-[#C98C93]">Create my own Journey</p><h1 className="mt-3 font-display text-5xl leading-[.95]">What are you<br/><em className="text-[#947DA3]">trying to achieve?</em></h1><textarea value={customGoal} onChange={(event) => setCustomGoal(event.target.value)} placeholder="For example: become a full-stack developer" className="mt-7 min-h-32 resize-none rounded-2xl border border-[#E3D8CF] bg-white p-4 text-sm outline-none focus:border-[#C98C93]"/><button onClick={() => customGoal.trim() ? setScreen("customLevel") : setScreen("discover")} className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#3A3540] px-4 py-4 text-sm font-bold text-white">Continue <ArrowRight size={17}/></button><button onClick={() => { setDiscoverStep(0); setScreen("discover"); }} className="mt-4 text-sm font-bold text-[#7A7482]">Help me find my path instead</button></section></Shell>;

  if (screen === "customLevel") return <Shell back={() => setScreen(pathway === "career" ? "career" : "custom")}><ChoiceScreen eyebrow="Your starting point" title="How much do you know already?" options={levels} onChoose={(value) => { setCustomLevel(value); if (pathway === "career") setScreen("customGoal"); else setScreen("customGoal"); }} /></Shell>;
  if (screen === "customGoal") return <Shell back={() => setScreen("customLevel")}><ChoiceScreen eyebrow="Your direction" title="What would you like to do with it?" options={goals} onChoose={(value) => { setGoal(value); setCustomGoal(value); setScreen("customTime"); }} /></Shell>;
  if (screen === "customTime") return <Shell back={() => setScreen("customGoal")}><ChoiceScreen eyebrow="Your pace" title="How much time can you give it?" options={times} onChoose={(value) => createPlan(pathway, area || customArea || "Programming", customLevel || level, customGoal || "Explore this field first", value, area || customArea || "My learning goal")} /></Shell>;

  if (screen === "discover") {
    const questions = [{ title: "What sounds fun?", options: ["Building things", "Designing ideas", "Solving problems", "Analyzing information"] }, { title: "What are you curious about?", options: ["How apps work", "How AI learns", "How systems stay safe", "How people use products"] }, { title: "What is your goal?", options: ["Explore first", "Build projects", "Get job-ready", "Support my degree"] }];
    const question = questions[discoverStep];
    return <Shell back={() => setScreen("start")}><section className="flex flex-1 flex-col justify-center pb-12"><p className="text-sm font-semibold text-[#C98C93]">Hana’s path finder · {discoverStep + 1} of 3</p><h1 className="mt-3 font-display text-5xl leading-[.95]">{question.title}</h1><div className="mt-7 grid gap-2">{question.options.map((option) => <button key={option} onClick={() => { if (discoverStep < 2) setDiscoverStep((value) => value + 1); else { setPathway("custom"); setArea(option === "Designing ideas" ? "UI/UX" : option === "Analyzing information" ? "Data Science" : "Programming"); setCustomLevel("Starting from zero"); setCustomGoal("Explore this field first"); setScreen("customTime"); } }} className="flex items-center justify-between rounded-2xl border border-[#E3D8CF] bg-white px-4 py-4 text-left text-sm font-bold">{option}<ArrowRight size={17} className="text-[#947DA3]"/></button>)}</div></section></Shell>;
  }

  if (screen === "app") return <AppShell destination={destination} setDestination={setDestination} plan={plan} mission={mission} missionWhy={missionWhy} started={started} setStarted={setStarted} chatMessages={chatMessages} sendChat={sendChat} chatLoading={chat.isPending} />;
  return null;
}

function AppShell({ destination, setDestination, plan, mission, missionWhy, started, setStarted, chatMessages, sendChat, chatLoading }: { destination: Destination; setDestination: (value: Destination) => void; plan: Plan | null; mission: string; missionWhy: string; started: boolean; setStarted: (value: boolean) => void; chatMessages: Message[]; sendChat: (value: string) => void; chatLoading: boolean }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const steps = plan?.steps || buildJourney("Programming");
  const activeStepIndex = started ? 1 : 0;
  const renderContent = () => {
    if (destination === "Journey") return <section className="space-y-4"><div><p className="text-sm font-semibold text-[#C98C93]">Your Journey</p><h1 className="mt-2 font-display text-4xl">One step at a time.</h1><p className="mt-2 text-sm text-[#7A7482]">{plan?.title || "Your chosen direction"} · {plan?.goal || "Hana will shape the next step with you."}</p></div><div className="space-y-2">{steps.map((step, index) => <div key={step.title} className={`rounded-2xl border p-4 ${index === activeStepIndex ? "border-[#C98C93] bg-white shadow-sm" : "border-[#E3D8CF] bg-[#FFFDF9]"}`}><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#947DA3]">{index < activeStepIndex ? "Demonstrated" : index === activeStepIndex ? "Current step" : "Unlocks next"}</p><h2 className="mt-1 font-display text-2xl">{step.title}</h2></div><span className="rounded-full bg-[#E9E7F1] px-2.5 py-1 text-xs">{step.kind}</span></div><p className="mt-2 text-sm text-[#7A7482]">{step.purpose}</p></div>)}</div></section>;
    if (destination === "Projects") return <section className="space-y-4"><p className="text-sm font-semibold text-[#C98C93]">Projects</p><h1 className="font-display text-4xl">Show what you can do.</h1><div className="rounded-3xl bg-white p-5 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#947DA3]">Your next build</p><h2 className="mt-2 font-display text-3xl">{plan?.area || "Your chosen skill"} starter project</h2><p className="mt-2 text-sm text-[#7A7482]">Build one small thing that proves today’s skill. Hana will keep the scope clear.</p><button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3A3540] px-4 py-3.5 text-sm font-bold text-white"><WandSparkles size={16}/> Plan this project</button></div></section>;
    if (destination === "Opportunities") return <section className="space-y-4"><p className="text-sm font-semibold text-[#C98C93]">Opportunities</p><h1 className="font-display text-4xl">Build proof first.</h1><div className="rounded-3xl bg-white p-5 shadow-sm"><h2 className="font-display text-2xl">Ready when your proof is ready</h2><p className="mt-2 text-sm text-[#7A7482]">Hana will help you look for legitimate internships, campus work, open-source tasks, and beginner-friendly opportunities. No income promises.</p></div><button onClick={() => setAboutOpen(true)} className="w-full rounded-2xl border border-[#E3D8CF] bg-[#FFFDF9] px-4 py-3 text-sm font-bold text-[#725F78]">About HANA</button></section>;
    if (destination === "Ask Hana") return <section className="space-y-4"><p className="text-sm font-semibold text-[#C98C93]">Ask Hana</p><h1 className="font-display text-4xl">What are you stuck on?</h1><AIChatBox messages={chatMessages} onSendMessage={sendChat} isLoading={chatLoading} height="520px" emptyStateMessage="Ask Hana about your current Journey." suggestedPrompts={["What should I learn next?", "Explain this more simply", "Help me scope a project"]}/></section>;
    return <section className="flex flex-1 flex-col justify-center pb-8 pt-5"><div className="text-center"><p className="text-sm font-semibold text-[#C98C93]">Good morning 🌸</p><h1 className="mt-2 font-display text-4xl leading-tight">Ready for today’s step?</h1></div><div className="mt-5"><HanaArt mood={started ? "🎉" : "🤔"}/></div><article className="mt-5 rounded-[26px] bg-white p-5 shadow-[0_16px_35px_rgba(93,72,58,.09)]"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#C98C93]">Today’s mission</p><h2 className="mt-2 font-display text-3xl">{mission}</h2></div><span className="rounded-full bg-[#E9E7F1] px-3 py-1.5 text-xs font-bold text-[#7A7482]">{plan?.time || "25 minutes"}</span></div><p className="mt-3 text-sm text-[#7A7482]">{missionWhy}</p>{started && <div className="mt-4 rounded-2xl bg-[#F0EEE6] p-4 text-sm text-[#5D6556]">Start small. When you finish, Hana will unlock the next step.</div>}<button onClick={() => setStarted(!started)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3A3540] px-4 py-3.5 text-sm font-bold text-white"><Play size={16} fill="currentColor"/>{started ? "Mission started" : "Start"}</button><div className="mt-5 flex gap-2">{[0,1,2,3].map((step) => <span key={step} className={`h-1.5 flex-1 rounded-full ${step <= (started ? 1 : 0) ? "bg-[#947DA3]" : "bg-[#E8DFD8]"}`}/>)}</div></article></section>;
  };
  const about = aboutOpen ? <div className="fixed inset-0 z-30 grid place-items-center bg-[#3A3540]/30 px-5" role="dialog" aria-modal="true" aria-label="About HANA"><div className="w-full max-w-sm rounded-[28px] bg-[#FFFCF8] p-6 shadow-2xl"><button onClick={() => setAboutOpen(false)} className="float-right text-sm font-bold text-[#7A7482]">Close</button><p className="text-sm font-semibold text-[#C98C93]">About HANA</p><h2 className="mt-2 font-display text-3xl">Learning feels clearer with a companion.</h2><p className="mt-3 text-sm leading-6 text-[#7A7482]">HANA helps students choose a direction, take one useful step, and build proof of what they can do.</p><p className="mt-5 text-sm font-semibold text-[#5D6556]">Created with purpose by</p><img src={SIGNATURE} alt="Ismat Fida signature" className="mt-3 h-16 w-auto max-w-full object-contain object-left"/><p className="mt-4 text-xs text-[#9A8C84]">© 2026 HANA. All Rights Reserved.</p></div></div> : null;
  return <main className="min-h-screen bg-[#FBF7F1] px-4 pb-28 text-[#3A3540] sm:px-6"><div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-xl flex-col"><header className="flex items-center justify-between py-5"><div><div className="flex items-center gap-2"><img src={HANA} alt="Hana logo" className="size-9 rounded-full object-cover"/><p className="font-display text-xl tracking-[.12em]">HANA<span className="text-[#C98C93]">.</span></p></div><p className="mt-1 text-[9px] font-bold uppercase tracking-[.2em] text-[#7A7482]">{plan?.area || "Your path"}</p></div><span className="grid size-9 place-items-center rounded-full bg-[#E9E7F1] text-sm">{destination === "Ask Hana" ? "👀" : "😊"}</span></header>{renderContent()}</div><nav className="fixed inset-x-3 bottom-3 z-20 mx-auto grid max-w-xl grid-cols-5 rounded-[24px] border border-[#E3D8CF] bg-[#FFFCF8]/95 p-1.5 shadow-[0_12px_28px_rgba(75,58,47,.12)] backdrop-blur-xl" aria-label="Main navigation">{navigation.map(({ label, icon: Icon }) => <button key={label} onClick={() => setDestination(label)} className={`flex min-w-0 flex-col items-center gap-1 rounded-[18px] px-1 py-2 text-[9px] font-bold transition active:scale-95 ${destination === label ? "bg-[#E9E7F1] text-[#725F78]" : "text-[#9A8C84]"}`} aria-current={destination === label ? "page" : undefined}><Icon size={17}/><span className="truncate">{label}</span></button>)}</nav>{about}</main>;
}
