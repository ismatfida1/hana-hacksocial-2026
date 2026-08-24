import { getHanaStudentMemory, upsertHanaStudentMemory } from "./db";
import type { HanaStudentMemory } from "../drizzle/schema";
import { buildRoadmap, type RoadmapNode } from "../shared/hanaJourney";

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
  projects: string[];
  projectSkills: string[];
  githubProjects: string[];
  portfolioProjects: string[];
  competitions: string[];
  careerReadiness?: string;
  preferredLearningTime?: string;
  availableStudyTime?: string;
  learningHistory: string[];
  goals: string[];
};

export type StudentContext = {
  student: {
    university?: string;
    degree?: string;
    department?: string;
    semester?: string;
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
    demonstratedSkills: string[];
    completedSkills: string[];
    weakAreas: string[];
    history: string[];
    recentConversations: Array<{ role: "user" | "hana"; text: string; createdAt: string }>;
  };
  work: {
    projects: string[];
    projectSkills: string[];
    githubProjects: string[];
    portfolioProjects: string[];
    competitions: string[];
  };
  preferences: {
    preferredLearningTime?: string;
    availableStudyTime?: string;
    goals: string[];
  };
  roadmap: RoadmapNode[];
};

const asList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").slice(0, 100) : [];

const asText = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value.trim().slice(0, 240) : undefined;

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
    projects: asList(profile.projects),
    projectSkills: asList(profile.projectSkills),
    githubProjects: asList(profile.githubProjects),
    portfolioProjects: asList(profile.portfolioProjects),
    competitions: asList(profile.competitions),
    careerReadiness: asText(profile.careerReadiness),
    preferredLearningTime: asText(profile.preferredLearningTime),
    availableStudyTime: asText(profile.availableStudyTime ?? profile.studyTime),
    learningHistory: asList(profile.learningHistory),
    goals: asList(profile.goals),
  };
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
      demonstratedSkills: profile.demonstratedSkills,
      completedSkills: profile.completedSkills,
      weakAreas: profile.weakAreas,
      history: profile.learningHistory,
      recentConversations: (memory?.conversations ?? []).slice(-12),
    },
    work: {
      projects: profile.projects,
      projectSkills: profile.projectSkills,
      githubProjects: profile.githubProjects,
      portfolioProjects: profile.portfolioProjects,
      competitions: profile.competitions,
    },
    preferences: {
      preferredLearningTime: profile.preferredLearningTime,
      availableStudyTime: profile.availableStudyTime,
      goals: profile.goals,
    },
    roadmap,
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

export async function buildHanaContext(studentId: number) {
  return getStudentContext(studentId);
}

export async function recordHanaConversation(studentId: number, messages: Array<{ role: "user" | "hana"; text: string; createdAt: string }>) {
  const existing = await getHanaStudentMemory(studentId);
  if (existing?.memoryEnabled === 0) return;
  const conversations = [...(existing?.conversations ?? []), ...messages].slice(-100);
  await upsertHanaStudentMemory({
    userId: studentId,
    profile: existing?.profile ?? normalizeStudentProfile({}),
    conversations,
    memoryEnabled: existing?.memoryEnabled ?? 1,
  });
}

export function formatStudentContextForHana(context: StudentContext): string {
  return JSON.stringify(context, null, 2);
}
