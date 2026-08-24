import { describe, expect, it } from "vitest";
import { buildStudentContextFromMemory, formatStudentContextForHana, normalizeStudentProfile } from "./studentContext";
import { resolveJourneyArea } from "../shared/hanaJourney";

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

  it("does not turn active or unverified skills into completed skills", () => {
    const profile = normalizeStudentProfile({ currentActiveStep: "APIs", skills: ["Python"], progress: ["variables"], completedSkills: [] });
    const context = buildStudentContextFromMemory({ profile, conversations: [] } as never);
    const prompt = formatStudentContextForHana(context);

    expect(context.learning.currentActiveStep).toBe("APIs");
    expect(context.learning.completedSkills).toEqual([]);
    expect(prompt).toContain('"completedSkills": []');
    expect(prompt).toContain('"currentActiveStep": "APIs"');
  });
});
