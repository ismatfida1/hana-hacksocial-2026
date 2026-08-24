import { describe, expect, it } from "vitest";
import { getTodayMission } from "./hanaMission";
import { buildJourney } from "./hanaJourney";
import { memoryProfileSchema } from "../server/routers";

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

  it("accepts profile memory but bounds sensitive free text", () => {
    const profile = memoryProfileSchema.parse({ university: "PUCIT", semester: "3", career: "AI Engineering", skills: ["Python"] });
    expect(profile.university).toBe("PUCIT");
    expect(() => memoryProfileSchema.parse({ university: "x".repeat(161) })).toThrow();
  });
});
