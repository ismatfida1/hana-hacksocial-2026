import { ArrowRight, BriefcaseBusiness, Check, Compass, Gamepad2, LockKeyhole, MessageCircle, ScrollText, Sparkles, Star, Target, Trophy } from "lucide-react";
import type { ReactNode } from "react";
import type { JourneyStep } from "@shared/hanaJourney";
import type { Destination } from "@/pages/Home";

export const HANA_ROBOT = "/hana-full-body-character.png";

export type ConsoleStatus = "complete" | "current" | "upcoming" | "locked";

export type ConsoleMapNode = {
  id: number;
  title: string;
  subtitle: string;
  status: ConsoleStatus;
  position: string;
};

const navItems: Array<{ label: Destination; title: string; icon: typeof Compass }> = [
  { label: "Home", title: "Home", icon: Gamepad2 },
  { label: "Journey", title: "Journey", icon: Compass },
  { label: "Projects", title: "Projects", icon: BriefcaseBusiness },
  { label: "Opportunities", title: "Opportunities", icon: Trophy },
  { label: "Ask Hana", title: "Hana Chat", icon: MessageCircle },
];

export function ConsoleNavigation({ destination, setDestination }: { destination: Destination; setDestination: (destination: Destination) => void }) {
  return (
    <aside className="console-nav" aria-label="Hana adventure navigation">
      <div className="console-nav__eyebrow">Choose a destination</div>
      <div className="console-nav__items">
        {navItems.map(({ label, title, icon: Icon }) => {
          const active = destination === label || (label === "Home" && destination === "Home");
          return (
            <button
              key={label}
              type="button"
              onClick={() => setDestination(label)}
              className={`console-nav__item ${active ? "is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="console-nav__icon"><Icon size={19} strokeWidth={1.8} /></span>
              <span>{title}</span>
              {label === "Journey" && <span className="console-nav__badge">3</span>}
            </button>
          );
        })}
      </div>
      <div className="console-nav__hint">
        <Sparkles size={15} />
        <span>Small steps count as progress.</span>
      </div>
    </aside>
  );
}

export function HanaCompanion({ mood = "ready", compact = false }: { mood?: "ready" | "celebrate" | "thinking"; compact?: boolean }) {
  const expression = mood === "celebrate" ? "✦" : mood === "thinking" ? "…" : "♡";
  return (
    <div className={`hana-companion ${compact ? "hana-companion--compact" : ""}`}>
      <div className="hana-companion__spark hana-companion__spark--one">✦</div>
      <div className="hana-companion__spark hana-companion__spark--two">✧</div>
      <div className="hana-companion__glow" />
      <img src={HANA_ROBOT} alt="Hana, your expressive companion robot" className="hana-companion__image" />
      <span className="hana-companion__expression" aria-hidden="true">{expression}</span>
    </div>
  );
}

function MapNode({ node, onOpen }: { node: ConsoleMapNode; onOpen: () => void }) {
  const isLocked = node.status === "locked";
  return (
    <button type="button" onClick={onOpen} disabled={isLocked} className={`adventure-node adventure-node--${node.status}`} style={{ left: node.position }} aria-label={`${node.title}, ${node.subtitle}`}>
      <span className="adventure-node__number">{node.status === "complete" ? <Check size={17} strokeWidth={3} /> : node.status === "locked" ? <LockKeyhole size={15} /> : node.id}</span>
      <span className="adventure-node__copy"><strong>{node.title}</strong><small>{node.subtitle}</small></span>
      {node.status === "current" && <span className="adventure-node__star"><Star size={12} fill="currentColor" /></span>}
    </button>
  );
}

function AdventureMap({ nodes, onOpenJourney }: { nodes: ConsoleMapNode[]; onOpenJourney: () => void }) {
  return (
    <div className="adventure-map" aria-label="Your CS career adventure map">
      <div className="adventure-map__skyline" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span></div>
      <div className="adventure-map__mountain adventure-map__mountain--one" />
      <div className="adventure-map__mountain adventure-map__mountain--two" />
      <div className="adventure-map__island adventure-map__island--one" />
      <div className="adventure-map__island adventure-map__island--two" />
      <div className="adventure-map__river" />
      <div className="adventure-map__trees" aria-hidden="true"><span>🌳</span><span>🌲</span><span>🌳</span><span>🌲</span><span>🌳</span><span>🌲</span></div>
      <svg className="adventure-map__path" viewBox="0 0 800 480" preserveAspectRatio="none" aria-hidden="true">
        <path d="M100 385 C155 315 195 355 260 300 S360 215 425 255 S525 315 570 225 S660 175 728 90" />
      </svg>
      <div className="adventure-map__start"><span className="adventure-map__start-arrow">↓</span><strong>START HERE</strong><small>your first step</small></div>
      {nodes.map((node) => <MapNode key={node.id} node={node} onOpen={onOpenJourney} />)}
      <button type="button" className="adventure-map__progress" onClick={onOpenJourney}>
        <span className="adventure-map__progress-icon">⚑</span>
        <span><small>Journey progress</small><strong>28% in motion</strong><i><b style={{ width: "28%" }} /></i></span>
      </button>
      <div className="adventure-map__legend"><span><i className="legend-dot legend-dot--complete" /> Completed</span><span><i className="legend-dot legend-dot--current" /> Current</span><span><i className="legend-dot legend-dot--upcoming" /> Upcoming</span></div>
    </div>
  );
}

function MissionBar({ mission, duration, onStart }: { mission: string; duration: string; onStart: () => void }) {
  return (
    <section className="mission-bar" aria-label="Today’s mission">
      <div className="mission-bar__icon"><Target size={22} strokeWidth={1.8} /></div>
      <div className="mission-bar__copy"><p>Today’s mission <span>{duration}</span></p><strong>{mission}</strong><small>One focused move. That is enough for today.</small></div>
      <div className="mission-bar__reward"><span>★</span><strong>+10 XP</strong></div>
      <button type="button" onClick={onStart} className="mission-bar__button">Let’s go <ArrowRight size={17} /></button>
    </section>
  );
}

export function ConsoleHome({
  studentName = "Maya",
  area = "AI Engineering",
  mission,
  duration = "20–25 min",
  started,
  onStartMission,
  onOpenJourney,
  setDestination,
  nodes,
}: {
  studentName?: string;
  area?: string;
  mission: string;
  duration?: string;
  started: boolean;
  onStartMission: () => void;
  onOpenJourney: () => void;
  setDestination: (destination: Destination) => void;
  nodes: ConsoleMapNode[];
}) {
  return (
    <section className="console-home" id="tour-home">
      <header className="console-home__topbar">
        <div><p className="console-home__kicker">Hana · Your personal career adventure</p><h1>Where will you explore next?</h1></div>
        <div className="console-home__player"><span className="console-home__avatar">M</span><span><strong>{studentName}</strong><small>{area} path</small></span><span className="console-home__level">LV. 02</span></div>
      </header>
      <div className="console-home__layout">
        <section className="companion-panel" aria-label="Hana companion">
          <div className="companion-panel__label"><Sparkles size={14} /> Hana’s guidance</div>
          <div className="companion-panel__bubble"><strong>Hey {studentName}!</strong><span>Ready for today’s mission?</span><i /></div>
          <HanaCompanion mood={started ? "celebrate" : "ready"} />
          <div className="companion-panel__status"><span className="status-dot" /> Hana is here to help</div>
          <p className="companion-panel__quote">“You do not have to finish the whole journey today. Just find your next kind step.”</p>
        </section>
        <section className="map-panel">
          <div className="map-panel__header"><div><p>YOUR JOURNEY</p><h2>Career Adventure Map</h2></div><button type="button" onClick={onOpenJourney} className="map-panel__link">View full journey <ArrowRight size={15} /></button></div>
          <AdventureMap nodes={nodes} onOpenJourney={onOpenJourney} />
        </section>
        <ConsoleNavigation destination="Home" setDestination={setDestination} />
      </div>
      <MissionBar mission={mission} duration={duration} onStart={onStartMission} />
    </section>
  );
}

export function consoleNodesFromSteps(steps: JourneyStep[], completedStepTitles: Set<string>, demoMode = false): ConsoleMapNode[] {
  const fallback: Array<{ title: string; subtitle: string }> = [
    { title: "Foundations", subtitle: "Completed" },
    { title: "Data Structures", subtitle: "Current" },
    { title: "Web Development", subtitle: "Upcoming" },
    { title: "System Design", subtitle: "Later" },
    { title: "Internships", subtitle: "Locked" },
  ];
  const source = steps.length ? steps.slice(0, 5).map((step, index) => ({ title: step.title, subtitle: index === 0 ? "Completed" : index === 1 ? "Current" : index === 2 ? "Upcoming" : "Later" })) : fallback;
  const positions = ["9%", "29%", "48%", "66%", "79%"];
  const currentIndex = Math.max(0, steps.findIndex((step) => demoMode ? step.status !== "complete" : !completedStepTitles.has(step.title)));
  return source.map((item, index) => {
    const isComplete = steps.length ? (demoMode ? steps[index]?.status === "complete" : completedStepTitles.has(steps[index]?.title)) : index === 0;
    const status: ConsoleStatus = isComplete ? "complete" : index === currentIndex ? "current" : index > currentIndex + 1 ? "locked" : "upcoming";
    return { id: index + 1, title: item.title, subtitle: status === "complete" ? "Completed" : status === "current" ? "Current mission" : status === "locked" ? "Unlocks later" : item.subtitle, status, position: positions[index] };
  });
}

export function ConsolePageHeading({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: ReactNode }) {
  return <div className="console-page-heading"><div><p>{eyebrow}</p><h1>{title}</h1>{description && <span>{description}</span>}</div>{children}</div>;
}

export function ConsoleSectionCard({ children, tone = "cream", className = "" }: { children: ReactNode; tone?: "cream" | "mint" | "lavender" | "peach"; className?: string }) {
  return <div className={`console-section-card console-section-card--${tone} ${className}`}>{children}</div>;
}
