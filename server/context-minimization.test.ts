import { describe, expect, it } from "vitest";
import { formatStudentContextForHana, type StudentContext } from "./studentContext";

const context = {
  student: { university: "Example University", degree: "BSCS", semester: "1" },
  career: { goal: "AI / Machine Learning", currentJourney: "AI path" },
  university: { currentSubjects: ["Programming"], upcomingSubjects: ["Math"], completedSubjects: [] },
  learning: { currentActiveStep: "Functions", completedLearningSteps: ["Variables"], stepNotes: {}, stepResources: {}, demonstratedSkills: ["Python"], completedSkills: ["Loops"], weakAreas: ["APIs"], history: ["Practised functions"], recentConversations: [{ role: "user", text: "private unrelated chat", createdAt: "now" }] },
  work: { projects: ["Weather app"], projectSkills: ["Python"], githubProjects: ["repo"], portfolioProjects: ["Weather app"], competitions: ["Hackathon"] },
  preferences: { availableStudyTime: "3 hours", goals: ["Internship"] },
  mastery: { checks: ["Functions"], completedCount: 1 },
  roadmap: [{ id: "one", title: "Functions", description: "Learn functions", category: "core", status: "active", estimatedMinutes: 25, prerequisiteIds: [], learningObjective: "Functions", finishLine: [], resourceUrl: "https://example.com", resourceTitle: "Example", practiceTask: "Try", masteryQuestion: "What?" }],
} as unknown as StudentContext;

describe("Hana AI context minimization", () => {
  it("keeps learning questions focused and excludes unrelated work/university detail", () => {
    const output = formatStudentContextForHana(context, "What should I learn next?");
    expect(output).toContain("Functions");
    expect(output).toContain("completedLearningSteps");
    expect(output).not.toContain("Weather app");
    expect(output).not.toContain("currentSubjects");
    expect(output).not.toContain("private unrelated chat");
  });

  it("includes only work context for a project question", () => {
    const output = formatStudentContextForHana(context, "Help me plan my project");
    expect(output).toContain("Weather app");
    expect(output).toContain("projectSkills");
    expect(output).not.toContain("private unrelated chat");
  });
});
