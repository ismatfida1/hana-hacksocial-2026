export type HanaMission = {
  title: string;
  duration: string;
  reason: string;
  action: string;
};

const missions: Record<string, HanaMission> = {
  "AI Engineering": { title: "Python Functions", duration: "25 min", reason: "You’ll need this for your next project.", action: "Write one function that turns a student’s study minutes into a simple plan." },
  "Software Engineering": { title: "Make one button work", duration: "20 min", reason: "Small interactions are the building blocks of useful apps.", action: "Build a button that marks one study task as done." },
  "Data Science": { title: "Ask one useful data question", duration: "20 min", reason: "Clear questions make data projects much easier to build.", action: "Turn a broad topic into one question that a table could answer." },
  "Cybersecurity": { title: "Protect an account", duration: "20 min", reason: "Good security starts with noticing simple risks.", action: "Write a short safety checklist for a new account." },
};

const defaultMission = missions["AI Engineering"];

export function getTodayMission(career?: string): HanaMission {
  return (career && missions[career]) || defaultMission;
}
