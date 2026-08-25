import { getHanaStudentMemory, upsertHanaStudentMemory } from "./db";
import type { HanaStudentMemory } from "../drizzle/schema";
import { buildRoadmap, type RoadmapNode } from "../shared/hanaJourney";

export type ProjectStatus = "locked" | "active" | "in_progress" | "complete";
export type OpportunityOutcomeStatus = "saved" | "applied" | "interview" | "accepted" | "rejected" | "completed";
export type OpportunityOutcome = { opportunityTitle: string; status: OpportunityOutcomeStatus; updatedAt: string };

export type ProjectRecord = {
  id: string;
  title: string;
  skills: string[];
  status: ProjectStatus;
  milestones: Array<{ title: string; complete: boolean }>;
  linkedStep?: string;
  requiresReview?: boolean;
};

export type StudentProfile = {
  university?: string;
  degree?: string;
  department?: string;
  semester?: string;
  subjects: string[];
  upcomingSubjects: string[];
  completedSubjects: string[];
  career?: string;
  currentJourney?: string;
  currentActiveStep?: string;
  demonstratedSkills: string[];
  completedSkills: string[];
  weakAreas: string[];
  completedLearningSteps: string[];
  stepNotes: Record<string, string>;
  stepResources: Record<string, string>;
  projects: string[];
  projectRecords: ProjectRecord[];
  projectSkills: string[];
  githubProjects: string[];
  portfolioProjects: string[];
  competitions: string[];
  opportunityOutcomes: OpportunityOutcome[];
  careerReadiness?: string;
  preferredLearningTime?: string;
  availableStudyTime?: string;
  energyMode?: "light" | "normal" | "deep";
  masteryChecks: string[];
  learningHistory: string[];
  goals: string[];
  tourCompleted?: boolean;
};

export type CareerMilestone = {
  title: string;
  status: "upcoming" | "current" | "complete";
};

export type SemesterPlanSummary = {
  academicAnchor: string;
  industryFocus: string;
  paceNote: string;
  scopeNote: string;
  milestones: CareerMilestone[];
};

export type ProjectProgressSummary = {
  activeProject?: string;
  nextGate: string;
  difficulty: "starting" | "building" | "proof";
  nextOpportunityAction: string;
  completedProjects: string[];
  portfolioReadyProjects: string[];
};

export type StudentContext = {
  student: {
    university?: string;
    degree?: string;
    department?: string;
    semester?: string;
    tourCompleted?: boolean;
  };
  career: {
    goal?: string;
    currentJourney?: string;
    readiness?: string;
  };
  university: {
    currentSubjects: string[];
    upcomingSubjects: string[];
    completedSubjects: string[];
  };
  learning: {
    currentActiveStep?: string;
    completedLearningSteps: string[];
    stepNotes: Record<string, string>;
    stepResources: Record<string, string>;
    demonstratedSkills: string[];
    completedSkills: string[];
    weakAreas: string[];
    history: string[];
    recentConversations: Array<{ role: "user" | "hana"; text: string; createdAt: string }>;
  };
  work: {
    projects: string[];
    projectRecords: ProjectRecord[];
    projectSkills: string[];
    githubProjects: string[];
    portfolioProjects: string[];
    competitions: string[];
    opportunityOutcomes: OpportunityOutcome[];
    progressSummary: ProjectProgressSummary;
  };
  preferences: {
    preferredLearningTime?: string;
    availableStudyTime?: string;
    energyMode?: "light" | "normal" | "deep";
    goals: string[];
  };
  mastery: {
    checks: string[];
    completedCount: number;
  };
  roadmap: RoadmapNode[];
  planning: SemesterPlanSummary;
};

const asList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").slice(0, 100) : [];

const asText = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value.trim().slice(0, 240) : undefined;

const asProjectRecords = (value: unknown): ProjectRecord[] => {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const title = asText(record.title);
    if (!title) return [];
    const rawMilestones = Array.isArray(record.milestones) ? record.milestones : [];
    const milestones = rawMilestones.flatMap((milestone) => {
      if (typeof milestone === "string") return [{ title: milestone.slice(0, 160), complete: false }];
      if (!milestone || typeof milestone !== "object") return [];
      const entry = milestone as Record<string, unknown>;
      const milestoneTitle = asText(entry.title);
      return milestoneTitle ? [{ title: milestoneTitle, complete: entry.complete === true }] : [];
    }).slice(0, 30);
    const status: ProjectStatus = record.status === "locked" || record.status === "active" || record.status === "in_progress" || record.status === "complete" ? record.status : "active";
    return [{ id: asText(record.id) || `project-${index + 1}`, title, skills: asList(record.skills), status, milestones, linkedStep: asText(record.linkedStep), requiresReview: record.requiresReview === true }];
  }).slice(0, 40);
};

const asOpportunityOutcomes = (value: unknown): OpportunityOutcome[] => {
  if (!Array.isArray(value)) return [];
  const statuses: OpportunityOutcomeStatus[] = ["saved", "applied", "interview", "accepted", "rejected", "completed"];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const opportunityTitle = asText(record.opportunityTitle);
    const updatedAt = asText(record.updatedAt);
    const status = typeof record.status === "string" && statuses.includes(record.status as OpportunityOutcomeStatus) ? record.status as OpportunityOutcomeStatus : null;
    return opportunityTitle && updatedAt && status ? [{ opportunityTitle, status, updatedAt }] : [];
  }).slice(-80);
};

const asMap = (value: unknown): Record<string, string> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.entries(value as Record<string, unknown>).reduce<Record<string, string>>((result, [key, item]) => {
    if (typeof item === "string" && key.trim()) result[key.slice(0, 160)] = item.trim().slice(0, 2000);
    return result;
  }, {});
};

export function normalizeStudentProfile(raw: unknown): StudentProfile {
  const profile = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  return {
    university: asText(profile.university),
    degree: asText(profile.degree),
    department: asText(profile.department),
    semester: asText(profile.semester),
    subjects: asList(profile.subjects ?? profile.currentSubjects),
    upcomingSubjects: asList(profile.upcomingSubjects),
    completedSubjects: asList(profile.completedSubjects),
    career: asText(profile.career ?? profile.careerGoal),
    currentJourney: asText(profile.currentJourney),
    currentActiveStep: asText(profile.currentActiveStep ?? profile.activeStep),
    demonstratedSkills: asList(profile.demonstratedSkills ?? profile.skills),
    completedSkills: asList(profile.completedSkills),
    weakAreas: asList(profile.weakAreas ?? profile.weaknesses),
    completedLearningSteps: asList(profile.completedLearningSteps ?? profile.progress),
    stepNotes: asMap(profile.stepNotes),
    stepResources: asMap(profile.stepResources),
    projects: asList(profile.projects),
    projectRecords: asProjectRecords(profile.projectRecords),
    projectSkills: asList(profile.projectSkills),
    githubProjects: asList(profile.githubProjects),
    portfolioProjects: asList(profile.portfolioProjects),
    competitions: asList(profile.competitions),
    opportunityOutcomes: asOpportunityOutcomes(profile.opportunityOutcomes),
    careerReadiness: asText(profile.careerReadiness),
    preferredLearningTime: asText(profile.preferredLearningTime),
    availableStudyTime: asText(profile.availableStudyTime ?? profile.studyTime),
    energyMode: profile.energyMode === "light" || profile.energyMode === "deep" || profile.energyMode === "normal" ? profile.energyMode : undefined,
    masteryChecks: asList(profile.masteryChecks),
    learningHistory: asList(profile.learningHistory),
    goals: asList(profile.goals),
    tourCompleted: profile.tourCompleted === true,
  };
}

export function buildProjectProgressSummary(projects: ProjectRecord[]): ProjectProgressSummary {
  const active = projects.find((project) => project.status === "in_progress" || project.status === "active");
  const completedProjects = projects.filter((project) => project.status === "complete").map((project) => project.title);
  const portfolioReadyProjects = projects.filter((project) => project.status === "complete" && project.milestones.some((milestone) => /readme|review|portfolio/i.test(milestone.title))).map((project) => project.title);
  const nextGate = active?.milestones.find((milestone) => !milestone.complete)?.title || (active ? "Review this project with Hana" : "Choose a small project after your current learning step");
  const difficulty = active ? (active.milestones.length >= 5 ? "proof" : active.milestones.length >= 3 ? "building" : "starting") : completedProjects.length ? "proof" : "starting";
  const nextOpportunityAction = portfolioReadyProjects.length ? "Choose an opportunity that matches your demonstrated skills" : "Finish the project gate before applying to an opportunity";
  return { activeProject: active?.title, nextGate, difficulty, nextOpportunityAction, completedProjects, portfolioReadyProjects };
}

export function buildSemesterPlanSummary(profile: StudentProfile, roadmap: RoadmapNode[] = []): SemesterPlanSummary {
  const academicAnchor = [profile.university, profile.degree, profile.semester].filter(Boolean).join(" · ") || "Add university details when ready";
  const industryFocus = profile.currentActiveStep || profile.career || "Choose a direction first";
  const paceNote = profile.availableStudyTime || profile.preferredLearningTime || "Flexible pace · no deadline";
  const completed = new Set(profile.completedLearningSteps.map((step) => step.toLowerCase()));
  const categories: Array<[RoadmapNode["category"], string]> = [["foundation", "Foundation"], ["core", "Core skills"], ["project", "First project"], ["portfolio", "Portfolio proof"], ["career", "Career readiness"]];
  const milestones = categories.map(([category, title], index) => {
    const nodes = roadmap.filter((node) => node.category === category);
    const complete = nodes.length > 0 && nodes.every((node) => completed.has(node.title.toLowerCase()));
    const priorIncomplete = categories.slice(0, index).some(([previous]) => roadmap.filter((node) => node.category === previous).some((node) => !completed.has(node.title.toLowerCase())));
    return { title, status: complete ? "complete" : !priorIncomplete && (index === 0 || roadmap.some((node) => node.category === categories[index - 1]?.[0] && completed.has(node.title.toLowerCase()))) ? "current" : "upcoming" } as CareerMilestone;
  });
  return { academicAnchor, industryFocus, paceNote, scopeNote: "Academic foundation + industry skills · move at your own pace", milestones };
}

export function buildStudentContextFromMemory(memory?: HanaStudentMemory | null): StudentContext {
  const profile = normalizeStudentProfile(memory?.profile);
  const roadmap = buildRoadmap({ pathType: profile.career ? "career" : "create-own", target: profile.career || profile.currentJourney || "Software Engineering", university: profile.university, degree: profile.degree, semester: profile.semester, existingSkills: [...profile.completedSkills, ...profile.completedLearningSteps] });
  return {
    student: {
      university: profile.university,
      degree: profile.degree,
      department: profile.department,
      semester: profile.semester,
      tourCompleted: profile.tourCompleted,
    },
    career: { goal: profile.career, currentJourney: profile.currentJourney, readiness: profile.careerReadiness },
    university: {
      currentSubjects: profile.subjects,
      upcomingSubjects: profile.upcomingSubjects,
      completedSubjects: profile.completedSubjects,
    },
    learning: {
      currentActiveStep: profile.currentActiveStep,
      completedLearningSteps: profile.completedLearningSteps,
      stepNotes: profile.stepNotes,
      stepResources: profile.stepResources,
      demonstratedSkills: profile.demonstratedSkills,
      completedSkills: profile.completedSkills,
      weakAreas: profile.weakAreas,
      history: profile.learningHistory,
      recentConversations: (memory?.conversations ?? []).slice(-12),
    },
    work: {
      projects: profile.projects,
      projectRecords: profile.projectRecords,
      projectSkills: profile.projectSkills,
      githubProjects: profile.githubProjects,
      portfolioProjects: profile.portfolioProjects,
      competitions: profile.competitions,
      opportunityOutcomes: profile.opportunityOutcomes,
      progressSummary: buildProjectProgressSummary(profile.projectRecords),
    },
    preferences: {
      preferredLearningTime: profile.preferredLearningTime,
      availableStudyTime: profile.availableStudyTime,
      energyMode: profile.energyMode,
      goals: profile.goals,
    },
    mastery: {
      checks: profile.masteryChecks,
      completedCount: profile.completedLearningSteps.length,
    },
    roadmap,
    planning: buildSemesterPlanSummary(profile, roadmap),
  };
}

export async function getStudentContext(studentId: number): Promise<StudentContext> {
  return buildStudentContextFromMemory(await getHanaStudentMemory(studentId));
}

export async function updateStudentProfile(studentId: number, changes: Partial<StudentProfile>): Promise<StudentContext> {
  const existing = await getHanaStudentMemory(studentId);
  const current = normalizeStudentProfile(existing?.profile);
  const next = normalizeStudentProfile({ ...current, ...changes });
  await upsertHanaStudentMemory({
    userId: studentId,
    profile: next,
    conversations: existing?.conversations ?? [],
    memoryEnabled: existing?.memoryEnabled ?? 1,
  });
  return buildStudentContextFromMemory({ ...(existing as HanaStudentMemory), profile: next });
}

export async function getStudentSkills(studentId: number) {
  const context = await getStudentContext(studentId);
  return { demonstrated: context.learning.demonstratedSkills, completed: context.learning.completedSkills, weakAreas: context.learning.weakAreas };
}

export async function getStudentProgress(studentId: number) {
  const context = await getStudentContext(studentId);
  return { currentActiveStep: context.learning.currentActiveStep, completedLearningSteps: context.learning.completedLearningSteps, history: context.learning.history };
}

export async function getStudentProjects(studentId: number) {
  const context = await getStudentContext(studentId);
  return context.work;
}

export async function getStudentCareerContext(studentId: number) {
  const context = await getStudentContext(studentId);
  return { ...context.career, goals: context.preferences.goals };
}

export type CoachModule = "ask-hana" | "daily-mission" | "career-coach" | "project-coach" | "career-readiness" | "opportunity-matching" | "university-coach" | "weekly-report";

export function buildCoachContextFromStudentContext(context: StudentContext, module: CoachModule) {
  const focusByModule: Record<CoachModule, string> = {
    "ask-hana": "Answer the learner using their current step and real context.",
    "daily-mission": "Choose one realistic next action for the learner’s available time and energy.",
    "career-coach": "Connect the learner’s goal, demonstrated skills, projects, and gaps to a career next step.",
    "project-coach": "Recommend a project that matches demonstrated skills and the current roadmap step.",
    "career-readiness": "Assess readiness only from stored skills, mastery evidence, projects, and learning history.",
    "opportunity-matching": "Match only verified opportunity records to demonstrated skills and current goals.",
    "university-coach": "Connect the learner’s university, degree, semester, and stored subjects to the journey.",
    "weekly-report": "Summarize only stored learning, mastery, project, and conversation history.",
  };
  return { module, focus: focusByModule[module], studentContext: context };
}

export async function buildCoachContext(studentId: number, module: CoachModule) {
  return buildCoachContextFromStudentContext(await getStudentContext(studentId), module);
}

export async function buildHanaContext(studentId: number) {
  return getStudentContext(studentId);
}

export function appendHanaConversations(existing: HanaStudentMemory | null | undefined, messages: Array<{ role: "user" | "hana"; text: string; createdAt: string }>): HanaStudentMemory["conversations"] | null {
  if (existing?.memoryEnabled === 0) return null;
  return [...(existing?.conversations ?? []), ...messages].slice(-100);
}

export async function recordHanaConversation(studentId: number, messages: Array<{ role: "user" | "hana"; text: string; createdAt: string }>) {
  const existing = await getHanaStudentMemory(studentId);
  const conversations = appendHanaConversations(existing, messages);
  if (!conversations) return;
  await upsertHanaStudentMemory({
    userId: studentId,
    profile: existing?.profile ?? normalizeStudentProfile({}),
    conversations,
    memoryEnabled: existing?.memoryEnabled ?? 1,
  });
}

export function formatStudentContextForHana(context: StudentContext, question = ""): string {
  const q = question.toLowerCase();
  const wantsUniversity = /university|degree|semester|subject|course|curriculum|class/.test(q);
  const wantsWork = /project|portfolio|github|build|readme|competition|hackathon|internship|opportunit/.test(q);
  const wantsProgress = /next|learn|skill|master|practice|stuck|ready|journey|progress|step|explain|error|debug/.test(q);
  const minimal = {
    student: context.student,
    career: context.career,
    ...(wantsUniversity || !wantsWork && !wantsProgress ? { university: context.university } : {}),
    ...(wantsProgress || !wantsUniversity && !wantsWork ? { learning: { currentActiveStep: context.learning.currentActiveStep, completedLearningSteps: context.learning.completedLearningSteps.slice(-20), demonstratedSkills: context.learning.demonstratedSkills, completedSkills: context.learning.completedSkills, weakAreas: context.learning.weakAreas, history: context.learning.history.slice(-10) } } : {}),
    ...(wantsWork ? { work: context.work } : {}),
    preferences: { availableStudyTime: context.preferences.availableStudyTime, energyMode: context.preferences.energyMode, goals: context.preferences.goals },
    ...(wantsProgress ? { roadmap: context.roadmap.slice(0, 20) } : {}),
  };
  return JSON.stringify(minimal, null, 2);
}

export function buildDailyMissionFromContext(context: StudentContext) {
  const active = context.roadmap.find((node) => node.status === "active") || context.roadmap.find((node) => node.status !== "complete") || context.roadmap[0];
  return {
    title: active?.title || context.learning.currentActiveStep || "Choose one small next step",
    reason: active?.description || "Hana will shape the next step around your saved goal and progress.",
    durationMinutes: active?.estimatedMinutes || 25,
    resourceUrl: active?.resourceUrl,
    resourceTitle: active?.resourceTitle,
    energyMode: context.preferences.energyMode || "normal",
  };
}

export async function getDailyMission(studentId: number) {
  return buildDailyMissionFromContext(await getStudentContext(studentId));
}

export function evaluateMasteryAnswer(step: { title: string }, answer: string) {
  const cleanAnswer = answer.trim().slice(0, 2400);
  const titleWords = step.title.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3 && !["with", "from", "and", "the", "for"].includes(word));
  const answerWords = new Set(cleanAnswer.toLowerCase().split(/[^a-z0-9]+/));
  const hasRelevantIdea = titleWords.some((word) => answerWords.has(word)) || /because|example|return|function|variable|request|response|risk|test|data/.test(cleanAnswer.toLowerCase());
  return { passed: cleanAnswer.length >= 24 && hasRelevantIdea, cleanAnswer };
}

export async function submitMasteryCheck(studentId: number, stepTitle: string, answer: string) {
  const existing = await getHanaStudentMemory(studentId);
  const current = normalizeStudentProfile(existing?.profile);
  const context = buildStudentContextFromMemory(existing);
  const step = context.roadmap.find((node) => node.title.toLowerCase() === stepTitle.trim().toLowerCase()) || context.roadmap.find((node) => node.status === "active");
  if (!step) return { passed: false, message: "Hana could not find that step yet. Open Journey and choose the active step." };

  const { cleanAnswer, passed } = evaluateMasteryAnswer(step, answer);
  const attempt = `${step.title}: ${passed ? "passed" : "needs another try"} — ${cleanAnswer.slice(0, 180)}`;
  const checks = [...current.masteryChecks, attempt].slice(-100);

  if (!passed) {
    await updateStudentProfile(studentId, { masteryChecks: checks, weakAreas: [...current.weakAreas, step.title].filter((item, index, list) => list.indexOf(item) === index).slice(-80), learningHistory: [...current.learningHistory, `Practised ${step.title}; needs another explanation.`].slice(-100) });
    return { passed: false, message: "Not quite yet. Hana saved your attempt. Try one tiny example, then check again.", step: step.title };
  }

  const completedLearningSteps = [...current.completedLearningSteps, step.title].filter((item, index, list) => list.indexOf(item) === index);
  const completedSkills = [...current.completedSkills, step.title].filter((item, index, list) => list.indexOf(item) === index);
  const demonstratedSkills = [...current.demonstratedSkills, step.title].filter((item, index, list) => list.indexOf(item) === index);
  const nextStep = context.roadmap.find((node) => node.title !== step.title && !completedLearningSteps.includes(node.title) && (!node.prerequisiteIds?.length || node.prerequisiteIds.every((id) => completedLearningSteps.some((title) => title.toLowerCase().includes(id.toLowerCase())))));
  await updateStudentProfile(studentId, { masteryChecks: checks, completedLearningSteps, completedSkills, demonstratedSkills, currentActiveStep: nextStep?.title || step.title, weakAreas: current.weakAreas.filter((item) => item !== step.title), learningHistory: [...current.learningHistory, `Passed mastery check for ${step.title}.`].slice(-100) });
  return { passed: true, message: `Nice work. ${step.title} is now complete, and Hana unlocked the next step.`, completedStep: step.title, nextStep: nextStep?.title };
}

export function mergeCompletedLearningSteps(existing: string[], stepTitle: string, completed: boolean) {
  const cleanTitle = stepTitle.trim();
  if (!cleanTitle) return [...existing];
  if (!completed) return existing.filter((item) => item.toLowerCase() !== cleanTitle.toLowerCase());
  if (existing.some((item) => item.toLowerCase() === cleanTitle.toLowerCase())) return [...existing];
  return [...existing, cleanTitle];
}

export async function setLearningStepCompletion(studentId: number, stepTitle: string, completed: boolean) {
  const existing = await getHanaStudentMemory(studentId);
  const current = normalizeStudentProfile(existing?.profile);
  const context = buildStudentContextFromMemory(existing);
  const step = context.roadmap.find((node) => node.title.toLowerCase() === stepTitle.trim().toLowerCase());
  if (!step) return { success: false, message: "Hana could not find that roadmap step." } as const;
  const completedLearningSteps = mergeCompletedLearningSteps(current.completedLearningSteps, step.title, completed);
  const nextStep = context.roadmap.find((node) => !completedLearningSteps.some((title) => title.toLowerCase() === node.title.toLowerCase()) && node.status !== "locked");
  await updateStudentProfile(studentId, { completedLearningSteps, currentActiveStep: nextStep?.title || (completed ? step.title : current.currentActiveStep), learningHistory: [...current.learningHistory, `${completed ? "Marked" : "Unmarked"} learning step: ${step.title}.`].slice(-100) });
  return { success: true, completed, step: step.title, message: completed ? `${step.title} marked complete. Hana check still confirms mastery.` : `${step.title} marked as not complete.` } as const;
}

export async function saveStepReference(studentId: number, stepTitle: string, note: string | undefined, resourceUrl: string | undefined) {
  const existing = await getHanaStudentMemory(studentId);
  const current = normalizeStudentProfile(existing?.profile);
  const cleanTitle = stepTitle.trim().slice(0, 160);
  if (!cleanTitle) return { success: false, message: "Hana needs a roadmap step name first." } as const;
  const stepNotes = { ...current.stepNotes };
  const stepResources = { ...current.stepResources };
  if (note?.trim()) stepNotes[cleanTitle] = note.trim().slice(0, 2000); else delete stepNotes[cleanTitle];
  if (resourceUrl?.trim()) stepResources[cleanTitle] = resourceUrl.trim().slice(0, 500); else delete stepResources[cleanTitle];
  await updateStudentProfile(studentId, { stepNotes, stepResources });
  return { success: true, message: "Saved to this roadmap step." } as const;
}

export async function recordLearningHistory(studentId: number, note: string) {
  const existing = await getHanaStudentMemory(studentId);
  const profile = normalizeStudentProfile(existing?.profile);
  const history = [...profile.learningHistory, note.trim().slice(0, 240)].filter(Boolean).slice(-100);
  return updateStudentProfile(studentId, { learningHistory: history });
}

async function appendProfileItem(studentId: number, field: "projects" | "portfolioProjects" | "competitions", item: string) {
  const existing = await getHanaStudentMemory(studentId);
  const profile = normalizeStudentProfile(existing?.profile);
  const clean = item.trim().slice(0, 200);
  if (!clean) return buildStudentContextFromMemory(existing);
  const next = [...profile[field], clean].filter((value, index, list) => list.indexOf(value) === index).slice(-40);
  return updateStudentProfile(studentId, { [field]: next });
}

export function buildProjectRecord(title: string, skills: string[] = [], milestones: string[] = [], linkedStep?: string): ProjectRecord {
  const cleanTitle = title.trim().slice(0, 160);
  return {
    id: `project-${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || Date.now()}`,
    title: cleanTitle,
    skills: skills.map((skill) => skill.trim().slice(0, 120)).filter(Boolean).slice(0, 12),
    status: "active",
    milestones: milestones.map((milestone) => ({ title: milestone.trim().slice(0, 160), complete: false })).filter((milestone) => milestone.title).slice(0, 20),
    linkedStep: linkedStep?.trim().slice(0, 160) || undefined,
  };
}

export async function addStudentProject(studentId: number, title: string, skills: string[] = [], milestones: string[] = [], linkedStep?: string) {
  const existing = await getHanaStudentMemory(studentId);
  const profile = normalizeStudentProfile(existing?.profile);
  const record = buildProjectRecord(title, skills, milestones, linkedStep);
  const records = [...profile.projectRecords.filter((item) => item.title.toLowerCase() !== record.title.toLowerCase()), record].slice(-40);
  return updateStudentProfile(studentId, { projects: [...profile.projects, record.title].filter((item, index, list) => list.indexOf(item) === index).slice(-40), projectRecords: records });
}

export async function setProjectMilestone(studentId: number, projectId: string, milestoneTitle: string, complete: boolean) {
  const existing = await getHanaStudentMemory(studentId);
  const profile = normalizeStudentProfile(existing?.profile);
  let linkedStepToComplete: string | undefined;
  const records = profile.projectRecords.map((project) => {
    if (project.id !== projectId) return project;
    const milestones = project.milestones.map((milestone) => milestone.title === milestoneTitle ? { ...milestone, complete } : milestone);
    const status: ProjectStatus = milestones.length > 0 && milestones.every((milestone) => milestone.complete) ? "complete" : milestones.some((milestone) => milestone.complete) ? "in_progress" : "active";
    if (status === "complete" && project.linkedStep) linkedStepToComplete = project.linkedStep;
    return { ...project, milestones, status };
  });
  if (!linkedStepToComplete) return updateStudentProfile(studentId, { projectRecords: records });
  const completedLearningSteps = mergeCompletedLearningSteps(profile.completedLearningSteps, linkedStepToComplete, true);
  const context = buildStudentContextFromMemory({ ...(existing as HanaStudentMemory), profile: { ...profile, completedLearningSteps } });
  const nextStep = context.roadmap.find((node) => !completedLearningSteps.some((title) => title.toLowerCase() === node.title.toLowerCase()) && node.status !== "locked");
  return updateStudentProfile(studentId, { projectRecords: records, completedLearningSteps, currentActiveStep: nextStep?.title || linkedStepToComplete, learningHistory: [...profile.learningHistory, `Completed project milestones for ${linkedStepToComplete}.`].slice(-100) });
}

export async function setProjectStatus(studentId: number, projectId: string, status: ProjectStatus) {
  const existing = await getHanaStudentMemory(studentId);
  const profile = normalizeStudentProfile(existing?.profile);
  return updateStudentProfile(studentId, { projectRecords: profile.projectRecords.map((project) => project.id === projectId ? { ...project, status } : project) });
}

export async function addPortfolioProject(studentId: number, title: string) {
  return appendProfileItem(studentId, "portfolioProjects", title);
}

export async function addCompetition(studentId: number, title: string) {
  return appendProfileItem(studentId, "competitions", title);
}

export async function setOpportunityOutcome(studentId: number, opportunityTitle: string, status: OpportunityOutcomeStatus) {
  const existing = await getHanaStudentMemory(studentId);
  const profile = normalizeStudentProfile(existing?.profile);
  const cleanTitle = opportunityTitle.trim().slice(0, 200);
  if (!cleanTitle) return buildStudentContextFromMemory(existing);
  const outcome: OpportunityOutcome = { opportunityTitle: cleanTitle, status, updatedAt: new Date().toISOString() };
  const outcomes = [...profile.opportunityOutcomes.filter((item) => item.opportunityTitle.toLowerCase() !== cleanTitle.toLowerCase()), outcome].slice(-80);
  return updateStudentProfile(studentId, { opportunityOutcomes: outcomes });
}

export function buildWeeklyReportFromContext(context: StudentContext) {
  const recent = context.learning.history.slice(-7);
  return {
    learned: context.learning.completedLearningSteps.slice(-5),
    built: context.work.projects.slice(-3),
    strongestSkill: context.learning.demonstratedSkills.at(-1) || context.learning.completedSkills.at(-1),
    next: context.learning.currentActiveStep || context.roadmap.find((node) => node.status === "active")?.title,
    recentActivity: recent,
  };
}

export async function getWeeklyReport(studentId: number) {
  return buildWeeklyReportFromContext(await getStudentContext(studentId));
}

export function buildCareerReadinessFromContext(context: StudentContext) {
  const evidence = [
    { label: "Demonstrated skills", ready: context.learning.demonstratedSkills.length > 0 },
    { label: "Completed learning", ready: context.learning.completedLearningSteps.length > 0 },
    { label: "Project proof", ready: context.work.projects.length > 0 },
    { label: "Portfolio", ready: context.work.portfolioProjects.length > 0 },
    { label: "Practical experience", ready: context.work.competitions.length > 0 || context.work.githubProjects.length > 0 || context.work.opportunityOutcomes.some((item) => item.status === "accepted" || item.status === "completed") },
  ];
  const readyCount = evidence.filter((item) => item.ready).length;
  return { level: readyCount >= 4 ? "building" : readyCount >= 2 ? "starting" : "not-yet", evidence, nextAction: evidence.find((item) => !item.ready)?.label || "Keep practising with a real project." };
}

export async function getCareerReadiness(studentId: number) {
  return buildCareerReadinessFromContext(await getStudentContext(studentId));
}
