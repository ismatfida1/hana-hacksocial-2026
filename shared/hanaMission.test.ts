import { describe, expect, it } from "vitest";
import { getTodayMission } from "./hanaMission";
import { buildJourney, buildRoadmap, pathTypeFromLegacy } from "./hanaJourney";
import { memoryProfileSchema } from "../server/routers";
import { buildDailyMissionFromContext, buildStudentContextFromMemory } from "../server/studentContext";

describe("Hana prototype contracts", () => {
  it("chooses a career-relevant mission while keeping a safe default", () => {
    expect(getTodayMission("Software Engineering").title).toBe("Make one button work");
    expect(getTodayMission("Unknown career").title).toBe("Python Functions");
  });

  it("devises different prerequisites for different subjects", () => {
    expect(buildJourney("Cybersecurity")[0].title).toBe("Computer and network basics");
    expect(buildJourney("UI/UX")[0].title).toBe("Find a real user problem");
    expect(buildJourney("Cybersecurity")[0].title).not.toContain("Python");
  });

  it("creates detailed full-day steps that start today and unlock in order", () => {
    const journey = buildJourney("AI / Machine Learning", "Starting from zero", "Build a portfolio", "Full study day · start now");
    expect(journey.length).toBeGreaterThanOrEqual(5);
    expect(journey[0].day).toBe(1);
    expect(journey[0].duration).toMatch(/min/);
    expect(journey[0].finishLine.length).toBeGreaterThanOrEqual(3);
    expect(journey[0].prerequisite).toContain("None");
    expect(journey[0].resource.url).toMatch(/^https:\/\//);
    expect(journey[0].masteryCheck).toBeTruthy();
    expect(journey[0].status).toBe("active");
    expect(journey[1].status).toBe("locked");
  });

  it("keeps subject-specific paths instead of forcing Python everywhere", () => {
    const security = buildJourney("Cybersecurity");
    const design = buildJourney("UI/UX");
    expect(security.map((item) => item.title).join(" ")).not.toContain("Python");
    expect(design[0].title).toBe("Find a real user problem");
    expect(design.at(-1)?.projectOutcome).toContain("portfolio");
  });

  it("maps the four onboarding path types and creates prerequisite-aware nodes", () => {
    expect(pathTypeFromLegacy("career", "AI / Machine Learning")).toBe("career");
    expect(pathTypeFromLegacy("skill", "Programming")).toBe("skill-to-earn");
    expect(pathTypeFromLegacy("custom", "Programming")).toBe("create-own");
    expect(pathTypeFromLegacy("career")).toBe("not-sure");

    const roadmap = buildRoadmap({ pathType: "career", target: "AI / Machine Learning", university: "PUCIT/FCIT", degree: "BSCS", semester: "1", existingSkills: ["Programming foundations"] });
    expect(roadmap[0]).toMatchObject({ title: "Programming foundations", status: "complete", estimatedMinutes: 90, category: "foundation" });
    expect(roadmap[1]?.status).toBe("active");
    expect(roadmap[1]?.prerequisiteIds).toHaveLength(1);
    expect(roadmap.at(-1)?.status).toBe("locked");
  });

  it("selects Today’s Mission from the saved active step", () => {
    const context = buildStudentContextFromMemory({ profile: { career: "Cybersecurity", currentActiveStep: "Linux essentials", completedLearningSteps: ["Computer and network basics"] }, conversations: [], memoryEnabled: 1 } as never);
    expect(buildDailyMissionFromContext(context).title).toBe("Linux essentials");
  });

  it("accepts profile memory but bounds sensitive free text", () => {
    const profile = memoryProfileSchema.parse({ university: "PUCIT", semester: "3", career: "AI Engineering", skills: ["Python"] });
    expect(profile.university).toBe("PUCIT");
    expect(() => memoryProfileSchema.parse({ university: "x".repeat(161) })).toThrow();
  });
});
