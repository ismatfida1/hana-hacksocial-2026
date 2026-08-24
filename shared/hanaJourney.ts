export type JourneyStep = { title: string; purpose: string; kind: "learn" | "practice" | "build" };

const journeys: Record<string, JourneyStep[]> = {
  Cybersecurity: [
    { title: "Computer and network basics", purpose: "Understand what you are protecting.", kind: "learn" },
    { title: "Linux essentials", purpose: "Work comfortably in the systems security teams use.", kind: "practice" },
    { title: "Build a security checklist", purpose: "Turn what you learned into a useful project.", kind: "build" },
  ],
  "UI/UX": [
    { title: "Find a real user problem", purpose: "Start with the person, not the tool.", kind: "learn" },
    { title: "Sketch a simple flow", purpose: "Practice making one task easy to complete.", kind: "practice" },
    { title: "Build a small case study", purpose: "Show your thinking in a portfolio project.", kind: "build" },
  ],
  "Web Development": [
    { title: "How a web page works", purpose: "Learn the browser’s basic building blocks.", kind: "learn" },
    { title: "Make one page interactive", purpose: "Practice turning an idea into a working screen.", kind: "practice" },
    { title: "Build a personal site", purpose: "Create a project you can share.", kind: "build" },
  ],
  "AI / Machine Learning": [
    { title: "How data becomes useful", purpose: "Understand examples and simple patterns first.", kind: "learn" },
    { title: "Compare a few predictions", purpose: "Practice checking whether a model is useful.", kind: "practice" },
    { title: "Build a small AI feature", purpose: "Turn one clear idea into a safe project.", kind: "build" },
  ],
  Programming: [
    { title: "Problem-solving basics", purpose: "Learn to break a problem into small steps.", kind: "learn" },
    { title: "Write and test a small function", purpose: "Practice turning steps into code.", kind: "practice" },
    { title: "Build a useful mini tool", purpose: "Use your skills in a project you can explain.", kind: "build" },
  ],
};

const defaultJourney: JourneyStep[] = [
  { title: "Understand the basics", purpose: "Start with the ideas behind your chosen subject.", kind: "learn" },
  { title: "Try one small task", purpose: "Practice before taking on a bigger project.", kind: "practice" },
  { title: "Build something you can show", purpose: "Turn your learning into evidence of skill.", kind: "build" },
];

export function buildJourney(area: string, level = "", goal = "", time = ""): JourneyStep[] {
  const base = journeys[area] || defaultJourney;
  const steps = level.includes("advanced") ? base.slice(1).concat(base[0]) : base;
  if (goal.includes("university")) return steps.map((step) => ({ ...step, purpose: `${step.purpose} Keep it close to your current courses.` }));
  if (time === "10 minutes") return steps.map((step) => ({ ...step, purpose: `${step.purpose} Hana will keep today’s version small.` }));
  return steps;
}
