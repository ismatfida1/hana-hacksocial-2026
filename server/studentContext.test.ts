import { describe, expect, it } from "vitest";
import { buildCareerReadinessFromContext, buildCoachContextFromStudentContext, buildDailyMissionFromContext, buildStudentContextFromMemory, buildWeeklyReportFromContext, evaluateMasteryAnswer, formatStudentContextForHana, normalizeStudentProfile } from "./studentContext";
import { buildJourney, resolveJourneyArea } from "../shared/hanaJourney";

describe("student context layer", () => {
  it("normalizes the full student profile into one coach context", () => {
    const context = buildStudentContextFromMemory({
      id: 1,
      userId: 7,
      profile: {
        university: "PUCIT/FCIT",
        degree: "BSCS",
        semester: "1",
        subjects: ["Programming"],
        career: "AI/ML Engineering",
        currentJourney: "AI foundations",
        currentActiveStep: "Python Functions",
        demonstratedSkills: ["Variables"],
        completedSkills: ["Python Variables"],
        completedLearningSteps: ["step-1"],
        weakAreas: ["Lists"],
        projects: ["Study timer"],
        projectSkills: ["Python"],
        githubProjects: ["https://github.com/example/study-timer"],
        portfolioProjects: ["Study timer"],
        competitions: ["Campus hackathon"],
        careerReadiness: "Foundation stage",
        preferredLearningTime: "Morning",
        availableStudyTime: "Full study day",
        learningHistory: ["Finished variables mastery check"],
        goals: ["Build a portfolio"],
      },
      conversations: [{ role: "user", text: "What should I learn next?", createdAt: "2026-08-24T00:00:00.000Z" }],
      memoryEnabled: 1,
      createdAt: new Date("2026-08-24T00:00:00.000Z"),
      updatedAt: new Date("2026-08-24T00:00:00.000Z"),
    });

    expect(context.student.university).toBe("PUCIT/FCIT");
    expect(context.career.goal).toBe("AI/ML Engineering");
    expect(context.learning.currentActiveStep).toBe("Python Functions");
    expect(context.learning.completedSkills).toEqual(["Python Variables"]);
    expect(context.learning.weakAreas).toEqual(["Lists"]);
    expect(context.work.githubProjects).toHaveLength(1);
    expect(context.learning.recentConversations[0]?.text).toContain("What should");
    expect(context.roadmap[0]?.status).toBe("active");
    expect(resolveJourneyArea("AI Engineering")).toBe("AI / Machine Learning");
  });

  it("starts Mathematics for Computing with foundations", () => {
    const steps = buildJourney("Mathematics for Computing", "Starting from zero", "Pass my university courses", "Full study day");
    expect(steps[0]?.title).toBe("Algebra for computing");
    expect(steps[0]?.title.toLowerCase()).not.toContain("python");
    expect(steps[2]?.title).toBe("Logic and discrete thinking");
  });

  it("starts Cybersecurity with networking foundations", () => {
    const steps = buildJourney("Cybersecurity", "Starting from zero", "Get job-ready", "Full study day");
    expect(steps[0]?.title).toBe("Networking foundations");
    expect(steps[0]?.title.toLowerCase()).not.toContain("python");
    expect(steps[1]?.title).toBe("Linux essentials");
  });

  it("does not turn active or unverified skills into completed skills", () => {
    const profile = normalizeStudentProfile({ currentActiveStep: "APIs", skills: ["Python"], progress: ["variables"], completedSkills: [] });
    const context = buildStudentContextFromMemory({ profile, conversations: [] } as never);
    const prompt = formatStudentContextForHana(context);

    expect(context.learning.currentActiveStep).toBe("APIs");
    expect(context.learning.completedSkills).toEqual([]);
    expect(prompt).toContain('"completedSkills": []');
    expect(prompt).toContain('"currentActiveStep": "APIs"');
  });

  it("keeps energy mode in the unified context", () => {
    const context = buildStudentContextFromMemory({ profile: { energyMode: "light", currentActiveStep: "Variables" }, conversations: [] } as never);
    expect(context.preferences.energyMode).toBe("light");
  });

  it("routes all eight coaching modules through one student context", () => {
    const context = buildStudentContextFromMemory({ profile: { career: "Software Engineering", completedLearningSteps: ["Variables"] }, conversations: [] } as never);
    const modules = ["ask-hana", "daily-mission", "career-coach", "project-coach", "career-readiness", "opportunity-matching", "university-coach", "weekly-report"] as const;
    modules.forEach((module) => {
      const routed = buildCoachContextFromStudentContext(context, module);
      expect(routed.module).toBe(module);
      expect(routed.studentContext).toBe(context);
      expect(routed.studentContext.learning.completedLearningSteps).toEqual(["Variables"]);
    });
  });

  it("requires a relevant explanation before marking mastery complete", () => {
    expect(evaluateMasteryAnswer({ title: "Python Functions" }, "I know it.").passed).toBe(false);
    expect(evaluateMasteryAnswer({ title: "Python Functions" }, "A function takes parameters and returns a value, so I can reuse the same logic in another part of a program.").passed).toBe(true);
  });

  it("uses stored evidence for readiness and report helpers", () => {
    const memory = {
      id: 1, userId: 7, profile: { currentActiveStep: "Functions", completedLearningSteps: ["Variables"], demonstratedSkills: ["Python"], projects: ["Study timer"], portfolioProjects: ["Study timer"], learningHistory: ["Finished variables"], energyMode: "normal" }, conversations: [], memoryEnabled: 1,
    } as never;
    const context = buildStudentContextFromMemory(memory);
    const mission = buildDailyMissionFromContext(context);
    const report = buildWeeklyReportFromContext(context);
    const readiness = buildCareerReadinessFromContext(context);
    expect(context.preferences.energyMode).toBe("normal");
    expect(context.learning.completedLearningSteps).toEqual(["Variables"]);
    expect(mission.energyMode).toBe("normal");
    expect(mission.title).toBe(context.roadmap.find((node) => node.status === "active")?.title);
    expect(report.learned).toEqual(["Variables"]);
    expect(readiness.level).toBe("building");
  });

  it("restores profile and progress from stored cloud memory", () => {
    const restored = buildStudentContextFromMemory({ profile: { university: "BSU", degree: "BSCS", semester: "4", career: "Cybersecurity", currentActiveStep: "Linux essentials", completedLearningSteps: ["Networking foundations"], projects: ["Packet tracer lab"] }, conversations: [], memoryEnabled: 1 } as never);
    expect(restored.student.university).toBe("BSU");
    expect(restored.student.degree).toBe("BSCS");
    expect(restored.career.goal).toBe("Cybersecurity");
    expect(restored.learning.currentActiveStep).toBe("Linux essentials");
    expect(restored.learning.completedLearningSteps).toEqual(["Networking foundations"]);
    expect(restored.work.projects).toEqual(["Packet tracer lab"]);
  });
});
