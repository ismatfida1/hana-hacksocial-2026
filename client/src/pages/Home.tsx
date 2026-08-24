import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Compass, ExternalLink, FolderKanban, Home as HomeIcon, MessageCircle, Play, Trophy, WandSparkles } from "lucide-react";
import { buildJourney, pathTypeFromLegacy, type JourneyStep } from "@shared/hanaJourney";
import { trpc } from "@/lib/trpc";
import { AIChatBox, type Message } from "@/components/AIChatBox";

const HANA = "/hana-mobile-logo.png";
const SIGNATURE = "/ismat-fida-signature.png";

type Screen = "greeting" | "start" | "career" | "custom" | "customLevel" | "customGoal" | "customTime" | "skill" | "discover" | "app";
type Destination = "Home" | "Journey" | "Projects" | "Opportunities" | "Ask Hana";
type Pathway = "career" | "custom" | "skill";
type Plan = { pathway: Pathway; area: string; title: string; goal: string; level: string; time: string; steps: JourneyStep[] };
type NavItem = { label: Destination; icon: typeof HomeIcon };

const careers = ["Software Engineering", "AI / Machine Learning", "Cybersecurity", "Cloud / DevOps", "Data Science", "Mobile Development", "UI/UX Design"];
const practicalSkills = ["AI Automation", "Web Development", "Python Automation", "Data Analysis", "UI/UX Design", "Video Editing", "Content Creation", "SEO"];
const levels = ["Starting from zero", "I know the basics", "I’ve built a few things", "Ready for advanced work"];
const goals = ["Pass my university courses", "Build a portfolio", "Get an internship or job", "Explore this field first"];
const times = ["Full study day · start now", "Focused half-day", "Flexible pace"];
const navigation: NavItem[] = [
  { label: "Home", icon: HomeIcon },
  { label: "Journey", icon: Compass },
  { label: "Projects", icon: FolderKanban },
  { label: "Opportunities", icon: Trophy },
  { label: "Ask Hana", icon: MessageCircle },
];
const skillAreas: Record<string, string> = {
  "AI Automation": "Programming", "Web Development": "Web Development", "Python Automation": "Programming", "Data Analysis": "Data Science", "UI/UX Design": "UI/UX", "Video Editing": "Content Creation", "Content Creation": "Content Creation", SEO: "Digital Marketing",
};
const opportunities = [
  { title: "Google Summer of Code", type: "Open-source programme", detail: "Work with an open-source organisation and learn from mentors.", url: "https://summerofcode.withgoogle.com/" },
  { title: "MLH Hackathons", type: "Student hackathons", detail: "Find online and campus hackathons for student builders.", url: "https://mlh.io/seasons/2026/events" },
  { title: "GitHub Good First Issues", type: "Open-source practice", detail: "Find small, beginner-friendly issues in real projects.", url: "https://github.com/search?q=label%3A%22good+first+issue%22+state%3Aopen&type=issues" },
  { title: "Devpost Hackathons", type: "Project competitions", detail: "Browse current online hackathons and build challenges.", url: "https://devpost.com/hackathons" },
];

function todayText() {
  return new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(new Date());
}

function Shell({ children, back }: { children: ReactNode; back?: () => void }) {
  return <main className="min-h-screen bg-[#FBF7F1] px-5 text-[#3A3540]"><div className="mx-auto flex min-h-screen max-w-xl flex-col"><header className="flex items-center justify-between py-6">{back ? <button onClick={back} className="flex items-center gap-1 text-sm font-bold text-[#62566A]"><ArrowLeft size={16} /> Back</button> : <span className="w-12" />}<div className="flex items-center gap-2"><img src={HANA} alt="Hana logo" className="size-9 rounded-full object-cover" /><p className="font-display text-xl tracking-[.12em]">HANA<span className="text-[#C98C93]">.</span></p></div><span className="w-12" /></header>{children}</div></main>;
}

function ChoiceScreen({ eyebrow, title, options, onChoose, footer }: { eyebrow: string; title: ReactNode; options: string[]; onChoose: (value: string) => void; footer?: ReactNode }) {
  return <section className="flex flex-1 flex-col justify-center pb-12"><p className="text-sm font-semibold text-[#C98C93]">{eyebrow}</p><h1 className="mt-3 font-display text-5xl leading-[.95] text-[#3A3540]">{title}</h1><div className="mt-7 grid gap-2">{options.map((option) => <button key={option} onClick={() => onChoose(option)} className="flex items-center justify-between rounded-2xl border border-[#D9CEC4] bg-[#FFFEFC] px-4 py-4 text-left text-sm font-bold text-[#3A3540] transition hover:border-[#C98C93] active:scale-[.99]">{option}<ArrowRight size={17} className="text-[#725F78]" /></button>)}</div>{footer}</section>;
}

function HanaArt({ mood = "😊", compact = false }: { mood?: string; compact?: boolean }) {
  return <div className={`relative mx-auto flex ${compact ? "h-[150px] max-w-[190px]" : "h-[285px] max-w-[350px]"} w-full items-end justify-center overflow-hidden rounded-[44px] bg-[#E5E5F0]`}><div className="absolute left-8 top-8 size-20 rounded-full bg-[#E7B7BC]/50 blur-2xl" /><div className="absolute right-8 top-7 size-24 rounded-full bg-[#C9BFE3]/60 blur-2xl" /><img src={HANA} alt="Hana, a cute professional robot companion" className="relative z-10 h-[115%] w-auto max-w-none object-contain" /><span className="absolute right-4 top-4 rounded-full bg-[#FBF7F1] px-3 py-1.5 text-xs shadow-sm">{mood}</span></div>;
}

function DetailStep({ step, index, active }: { step: JourneyStep; index: number; active: boolean }) {
  return <details open={active} className={`rounded-3xl border ${active ? "border-[#C98C93] bg-[#FFFEFC] shadow-sm" : "border-[#E1D7CE] bg-[#FFFDF9]"}`}><summary className="cursor-pointer list-none p-4"><div className="flex items-start gap-3"><div className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-[#C98C93] text-white" : "bg-[#E5E5F0] text-[#62566A]"}`}>{index + 1}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#725F78]">Day {step.day} · {step.kind}</p><span className="rounded-full bg-[#F0EEE6] px-2.5 py-1 text-[11px] font-bold text-[#62566A]">{step.duration}</span></div><h2 className="mt-1 font-display text-2xl text-[#3A3540]">{step.title}</h2><p className="mt-1 text-sm leading-5 text-[#625D65]">{step.purpose}</p></div></div></summary><div className="space-y-4 border-t border-[#E9DFD6] px-4 pb-5 pt-4 text-sm text-[#514B53]"><div><p className="font-bold text-[#3A3540]">Today’s finish line</p><ul className="mt-2 space-y-1.5">{step.finishLine.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#75907A]" />{item}</li>)}</ul></div><p><strong>Before you start:</strong> {step.prerequisite}</p><p><strong>Practice:</strong> {step.practice}</p><p><strong>Hana check:</strong> {step.masteryCheck}</p><p><strong>Project result:</strong> {step.projectOutcome}</p><a className="flex items-center gap-2 font-bold text-[#3157C8] underline underline-offset-4" href={step.resource.url} target="_blank" rel="noreferrer">Open {step.resource.label}<ExternalLink size={15} /></a><p className="rounded-2xl bg-[#EEF2FA] p-3 text-[#405071]"><strong>Next unlock:</strong> {step.unlocks}</p></div></details>;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("greeting");
  const [destination, setDestination] = useState<Destination>("Home");
  const [pathway, setPathway] = useState<Pathway>("career");
  const [area, setArea] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [customLevel, setCustomLevel] = useState("");
  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [time, setTime] = useState("");
  const [started, setStarted] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [aiMission, setAiMission] = useState<{ todaysStep?: string; whyToday?: string }>();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [discoverStep, setDiscoverStep] = useState(0);
  const auth = trpc.auth.me.useQuery();
  const chat = trpc.hana.chat.useMutation();
  const deviseJourney = trpc.hana.deviseJourney.useMutation();
  const saveStudentProfile = trpc.studentContext.updateProfile.useMutation();
  const chosenArea = area || "Programming";
  const localSteps = useMemo(() => buildJourney(chosenArea, level || customLevel, goal || customGoal, time), [chosenArea, level, customLevel, goal, customGoal, time]);
  const mission = aiMission?.todaysStep || localSteps[0]?.title || "Choose one small next step";
  const missionWhy = aiMission?.whyToday || localSteps[0]?.purpose || "Hana will shape the next step around your goal.";

  const createPlan = (nextPathway: Pathway, nextArea: string, nextLevel: string, nextGoal: string, nextTime: string, title: string) => {
    const steps = buildJourney(nextArea, nextLevel, nextGoal, nextTime);
    setPathway(nextPathway); setArea(nextArea); setLevel(nextLevel); setGoal(nextGoal); setTime(nextTime);
    setPlan({ pathway: nextPathway, area: nextArea, title, goal: nextGoal, level: nextLevel, time: nextTime, steps });
    setScreen("app");
    if (auth.data) {
      saveStudentProfile.mutate({ currentJourney: title, currentActiveStep: steps[0]?.title, availableStudyTime: nextTime, goals: [nextGoal], ...(nextPathway === "career" ? { career: nextArea } : {}) });
    }
    if (auth.data) {
      deviseJourney.mutate({ pathType: pathTypeFromLegacy(nextPathway, nextArea), studyArea: nextArea, target: nextArea, level: nextLevel, goal: nextGoal, availableTime: nextTime, interests: [] }, { onSuccess: (result) => setAiMission(result) });
    }
  };
  const sendChat = (content: string) => {
    setChatMessages((messages) => [...messages, { role: "user", content }]);
    if (!auth.data) {
      setChatMessages((messages) => [...messages, { role: "assistant", content: "## Sign in to continue\n\nHana needs your account to remember your journey and give personal advice. Your learning context stays tied to your account." }]);
      return;
    }
    chat.mutate({ message: content, mode: "short", context: { currentQuest: mission, availableTime: time || "Full study day", approvedMemories: [plan?.area, plan?.goal, plan?.level].filter(Boolean) as string[] } }, { onSuccess: (response) => setChatMessages((messages) => [...messages, { role: "assistant", content: response.text }]) });
  };

  if (screen === "greeting") return <Shell><section className="flex flex-1 flex-col items-center justify-center pb-14 text-center"><p className="text-sm font-semibold text-[#C98C93]">{new Intl.DateTimeFormat(undefined, { hour: "numeric" }).format(new Date()).includes("AM") ? "Good morning" : "Hello"} 🌸</p><h1 className="mt-3 font-display text-5xl leading-[.95] text-[#3A3540]">Hi, I’m Hana.</h1><p className="mt-4 text-base text-[#625D65]">How’s your day going?</p><div className="mt-8 w-full"><HanaArt /></div><button onClick={() => setScreen("start")} className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3A3540] px-4 py-4 text-sm font-bold text-white">I’m ready <span>✨</span><ArrowRight size={17} /></button></section></Shell>;
  if (screen === "start") return <Shell back={() => setScreen("greeting")}><ChoiceScreen eyebrow="Let’s begin" title={<>What are you<br /><em className="text-[#725F78]">here for?</em></>} options={["🎓 Build My Career", "🧭 Create My Own Journey", "💼 Learn a Skill & Earn"]} onChoose={(value) => { if (value.includes("Career")) { setPathway("career"); setScreen("career"); } else if (value.includes("Own")) { setPathway("custom"); setScreen("custom"); } else { setPathway("skill"); setScreen("skill"); } }} /> </Shell>;
  if (screen === "career") return <Shell back={() => setScreen("start")}><ChoiceScreen eyebrow="Build my career" title={<>What do you<br /><em className="text-[#725F78]">want to become?</em></>} options={careers} onChoose={(value) => { setArea(value); setScreen("customLevel"); }} footer={<button onClick={() => { setDiscoverStep(0); setScreen("discover"); }} className="mt-6 w-full text-center text-sm font-bold text-[#625D65]">I don’t know yet — Help me find my path</button>} /></Shell>;
  if (screen === "skill") return <Shell back={() => setScreen("start")}><ChoiceScreen eyebrow="Learn a skill & earn" title={<>Which skill<br /><em className="text-[#725F78]">interests you?</em></>} options={practicalSkills} onChoose={(value) => createPlan("skill", skillAreas[value] || value, "Starting from zero", "Build proof I can show", "Full study day · start now", value)} footer={<p className="mt-7 text-center text-xs text-[#746B72]">Hana never promises income. She helps you build real skill and proof.</p>} /></Shell>;
  if (screen === "custom") return <Shell back={() => setScreen("start")}><section className="flex flex-1 flex-col justify-center pb-12"><p className="text-sm font-semibold text-[#C98C93]">Create my own Journey</p><h1 className="mt-3 font-display text-5xl leading-[.95]">What are you<br /><em className="text-[#725F78]">trying to achieve?</em></h1><textarea value={customGoal} onChange={(event) => setCustomGoal(event.target.value)} placeholder="For example: build a portfolio website" className="mt-7 min-h-32 resize-none rounded-2xl border border-[#D9CEC4] bg-[#FFFEFC] p-4 text-sm text-[#3A3540] outline-none placeholder:text-[#91868A] focus:border-[#C98C93]" /><button onClick={() => customGoal.trim() ? setScreen("customLevel") : setScreen("discover")} className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#3A3540] px-4 py-4 text-sm font-bold text-white">Continue <ArrowRight size={17} /></button><button onClick={() => { setDiscoverStep(0); setScreen("discover"); }} className="mt-4 text-sm font-bold text-[#625D65]">Help me find my path instead</button></section></Shell>;
  if (screen === "customLevel") return <Shell back={() => setScreen(pathway === "career" ? "career" : "custom")}><ChoiceScreen eyebrow="Your starting point" title="How much do you know already?" options={levels} onChoose={(value) => { setCustomLevel(value); setScreen("customGoal"); }} /></Shell>;
  if (screen === "customGoal") return <Shell back={() => setScreen("customLevel")}><ChoiceScreen eyebrow="Your direction" title="What would you like to do with it?" options={goals} onChoose={(value) => { setGoal(value); if (pathway === "custom") setCustomGoal(value); setScreen("customTime"); }} /></Shell>;
  if (screen === "customTime") return <Shell back={() => setScreen("customGoal")}><ChoiceScreen eyebrow="Your day" title="How should Hana plan today?" options={times} onChoose={(value) => createPlan(pathway, area || "Programming", customLevel || level, customGoal || goal || "Explore this field first", value, area || customGoal || "My learning goal")} /></Shell>;
  if (screen === "discover") { const questions = [{ title: "What sounds fun?", options: ["Building things", "Designing ideas", "Solving problems", "Analyzing information"] }, { title: "What are you curious about?", options: ["How apps work", "How AI learns", "How systems stay safe", "How people use products"] }, { title: "What is your goal?", options: ["Explore first", "Build projects", "Get job-ready", "Support my degree"] }]; const question = questions[discoverStep]; return <Shell back={() => setScreen("start")}><section className="flex flex-1 flex-col justify-center pb-12"><p className="text-sm font-semibold text-[#C98C93]">Hana’s path finder · {discoverStep + 1} of 3</p><h1 className="mt-3 font-display text-5xl leading-[.95] text-[#3A3540]">{question.title}</h1><div className="mt-7 grid gap-2">{question.options.map((option) => <button key={option} onClick={() => { if (discoverStep < 2) setDiscoverStep((value) => value + 1); else { const nextArea = option === "Designing ideas" ? "UI/UX" : option === "Analyzing information" ? "Data Science" : option === "How systems stay safe" ? "Cybersecurity" : "Programming"; setArea(nextArea); setCustomLevel("Starting from zero"); setCustomGoal("Explore this field first"); setPathway("custom"); setScreen("customTime"); } }} className="flex items-center justify-between rounded-2xl border border-[#D9CEC4] bg-[#FFFEFC] px-4 py-4 text-left text-sm font-bold text-[#3A3540]">{option}<ArrowRight size={17} className="text-[#725F78]" /></button>)}</div></section></Shell>; }
  if (screen === "app") return <AppShell destination={destination} setDestination={setDestination} plan={plan} mission={mission} missionWhy={missionWhy} started={started} setStarted={setStarted} chatMessages={chatMessages} sendChat={sendChat} chatLoading={chat.isPending} />;
  return null;
}

function AppShell({ destination, setDestination, plan, mission, missionWhy, started, setStarted, chatMessages, sendChat, chatLoading }: { destination: Destination; setDestination: (value: Destination) => void; plan: Plan | null; mission: string; missionWhy: string; started: boolean; setStarted: (value: boolean) => void; chatMessages: Message[]; sendChat: (value: string) => void; chatLoading: boolean }) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);
  const steps = plan?.steps || buildJourney("Programming");
  const activeStepIndex = started ? Math.min(1, steps.length - 1) : 0;
  const projectTitle = plan?.area === "Cybersecurity" ? "Security checklist review" : plan?.area === "Data Science" ? "Small data story" : plan?.area === "UI/UX" ? "Portfolio case study" : plan?.area === "AI / Machine Learning" ? "Safe AI study helper" : "Study-time tool";
  const renderContent = () => {
    if (destination === "Journey") return <section className="space-y-5 pb-8"><div><p className="text-sm font-semibold text-[#C98C93]">Your Journey</p><h1 className="mt-2 font-display text-4xl text-[#3A3540]">Start today. Build steadily.</h1><p className="mt-2 text-sm leading-5 text-[#625D65]">{todayText()} · Full-day plan · {plan?.area || "Your chosen direction"}</p></div><div className="rounded-3xl border border-[#D8D4E4] bg-[#EDECF6] p-4"><div className="flex items-center gap-2 text-sm font-bold text-[#51486A]"><BookOpen size={17} /> Today’s finish line</div><p className="mt-2 font-display text-2xl text-[#3A3540]">{steps[activeStepIndex]?.title}</p><p className="mt-1 text-sm text-[#625D65]">{steps[activeStepIndex]?.purpose}</p></div><div className="space-y-3">{steps.map((step, index) => <div key={`${step.title}-${index}`} onClick={() => setSelectedStep(index)}><DetailStep step={step} index={index} active={index === selectedStep || index === activeStepIndex} /></div>)}</div></section>;
    if (destination === "Projects") return <section className="space-y-5 pb-8"><p className="text-sm font-semibold text-[#C98C93]">Projects</p><h1 className="font-display text-4xl text-[#3A3540]">Build proof of your skill.</h1><div className="rounded-3xl border border-[#D9CEC4] bg-[#FFFEFC] p-5 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#725F78]">Unlocked from today’s learning</p><h2 className="mt-2 font-display text-3xl text-[#3A3540]">{projectTitle}</h2><p className="mt-2 text-sm leading-5 text-[#625D65]">Build the smallest useful version. Hana guides you; you write the code or create the design.</p><div className="mt-4 grid gap-2 text-sm text-[#514B53]"><p><strong>Goal:</strong> Show one clear skill in a project someone else can understand.</p><p><strong>Milestones:</strong> Define → build a small version → test → write a README → review.</p><p><strong>Review:</strong> Hana checks bugs, structure, documentation, UI, and basic safety.</p></div><button onClick={() => setDestination("Ask Hana")} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3A3540] px-4 py-3.5 text-sm font-bold text-white"><WandSparkles size={16} /> Plan this project with Hana</button></div><div className="rounded-3xl bg-[#F0EEE6] p-4 text-sm text-[#5D6556]">When you finish, Hana can help you write a README and prepare a portfolio entry. Publishing to GitHub is always your choice.</div></section>;
    if (destination === "Opportunities") return <section className="space-y-5 pb-8"><p className="text-sm font-semibold text-[#C98C93]">Opportunities</p><h1 className="font-display text-4xl text-[#3A3540]">Find a real next step.</h1><p className="text-sm leading-5 text-[#625D65]">These are official links. Hana will help you decide when your demonstrated skills match.</p><div className="space-y-3">{opportunities.map((item) => <article key={item.title} className="rounded-3xl border border-[#D9CEC4] bg-[#FFFEFC] p-4"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#725F78]">{item.type}</p><h2 className="mt-1 font-display text-2xl text-[#3A3540]">{item.title}</h2><p className="mt-1 text-sm leading-5 text-[#625D65]">{item.detail}</p><a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 font-bold text-[#3157C8] underline underline-offset-4">Open official site <ExternalLink size={15} /></a></article>)}</div><p className="rounded-2xl bg-[#F6E9EA] p-4 text-sm text-[#6F4D55]">Hana never invents deadlines, eligibility, or income promises. Check each official page before applying.</p><button onClick={() => setAboutOpen(true)} className="w-full rounded-2xl border border-[#D9CEC4] bg-[#FFFDF9] px-4 py-3 text-sm font-bold text-[#62566A]">About HANA</button></section>;
    if (destination === "Ask Hana") return <section className="space-y-4 pb-8"><p className="text-sm font-semibold text-[#C98C93]">Ask Hana</p><h1 className="font-display text-4xl text-[#3A3540]">Let’s work through it.</h1><AIChatBox messages={chatMessages} onSendMessage={sendChat} isLoading={chatLoading} height="520px" emptyStateMessage="Ask Hana about today’s step, a project, a career choice, or a university topic." suggestedPrompts={["What should I learn next?", "Explain this more simply", "Am I ready for this project?", "Help me find a hackathon"]} /></section>;
    return <section className="flex flex-1 flex-col justify-center pb-8 pt-5"><div className="text-center"><p className="text-sm font-semibold text-[#C98C93]">{todayText()} 🌸</p><h1 className="mt-2 font-display text-4xl leading-tight text-[#3A3540]">Ready for today’s step?</h1></div><div className="mt-5"><HanaArt mood={started ? "🎉" : "🤔"} /></div><article className="mt-5 rounded-[26px] border border-[#E2D9D1] bg-[#FFFEFC] p-5 shadow-[0_16px_35px_rgba(93,72,58,.09)]"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#C98C93]">Today’s step</p><h2 className="mt-2 font-display text-3xl text-[#3A3540]">{mission}</h2></div><span className="rounded-full bg-[#E5E5F0] px-3 py-1.5 text-xs font-bold text-[#62566A]">{steps[activeStepIndex]?.duration || "Full day"}</span></div><p className="mt-3 text-sm leading-5 text-[#625D65]">{missionWhy}</p>{started && <div className="mt-4 rounded-2xl bg-[#F0EEE6] p-4 text-sm text-[#5D6556]">Hana is with you. Open Journey for the full finish line, practice, check, and resource.</div>}<button onClick={() => { setStarted(!started); setDestination("Journey"); }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3A3540] px-4 py-3.5 text-sm font-bold text-white"><Play size={16} fill="currentColor" />{started ? "Open today’s Journey" : "Start today’s step"}</button><div className="mt-5 flex gap-2">{[0, 1, 2, 3].map((item) => <span key={item} className={`h-1.5 flex-1 rounded-full ${item <= (started ? 1 : 0) ? "bg-[#947DA3]" : "bg-[#E8DFD8]"}`} />)}</div></article></section>;
  };
  const about = aboutOpen ? <div className="fixed inset-0 z-30 grid place-items-center bg-[#3A3540]/30 px-5" role="dialog" aria-modal="true" aria-label="About HANA"><div className="w-full max-w-sm rounded-[28px] bg-[#FFFCF8] p-6 shadow-2xl"><button onClick={() => setAboutOpen(false)} className="float-right text-sm font-bold text-[#625D65]">Close</button><p className="text-sm font-semibold text-[#C98C93]">About HANA</p><h2 className="mt-2 font-display text-3xl text-[#3A3540]">A calmer way to move forward.</h2><p className="mt-3 text-sm leading-6 text-[#625D65]">Hana helps university students choose a direction, learn one useful thing, build proof, and prepare for real opportunities.</p><p className="mt-5 text-sm font-semibold text-[#5D6556]">Created with purpose by</p><img src={SIGNATURE} alt="Ismat Fida signature" className="mt-3 h-16 w-auto max-w-full object-contain object-left" /><p className="mt-4 text-xs text-[#9A8C84]">© 2026 HANA. All Rights Reserved.</p></div></div> : null;
  return <main className="min-h-screen bg-[#FBF7F1] px-4 pb-28 text-[#3A3540] sm:px-6"><div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-xl flex-col"><header className="flex items-center justify-between py-5"><div><div className="flex items-center gap-2"><img src={HANA} alt="Hana logo" className="size-9 rounded-full object-cover" /><p className="font-display text-xl tracking-[.12em]">HANA<span className="text-[#C98C93]">.</span></p></div><p className="mt-1 text-[9px] font-bold uppercase tracking-[.2em] text-[#625D65]">{plan?.area || "Your path"}</p></div><span className="grid size-9 place-items-center rounded-full bg-[#E5E5F0] text-sm">{destination === "Ask Hana" ? "👀" : "😊"}</span></header>{renderContent()}</div><nav className="fixed inset-x-3 bottom-3 z-20 mx-auto grid max-w-xl grid-cols-5 rounded-[24px] border border-[#D9CEC4] bg-[#FFFCF8]/95 p-1.5 shadow-[0_12px_28px_rgba(75,58,47,.12)] backdrop-blur-xl" aria-label="Main navigation">{navigation.map(({ label, icon: Icon }) => <button key={label} onClick={() => setDestination(label)} className={`flex min-w-0 flex-col items-center gap-1 rounded-[18px] px-1 py-2 text-[9px] font-bold transition active:scale-95 ${destination === label ? "bg-[#E5E5F0] text-[#62566A]" : "text-[#746B72]"}`} aria-current={destination === label ? "page" : undefined}><Icon size={17} /><span className="truncate">{label}</span></button>)}</nav>{about}</main>;
}
