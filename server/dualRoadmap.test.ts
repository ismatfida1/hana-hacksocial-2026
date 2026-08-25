import { describe, expect, it } from "vitest";
import { buildJourney } from "@shared/hanaJourney";

describe("Hana dual roadmap tracks", () => {
  it("builds the full BSCS foundation across eight semesters", () => {
    const steps = buildJourney("BSCS Foundation", "Starting from zero", "Pass my university courses", "Flexible pace", {
      university: "PUCIT/FCIT",
      degree: "BSCS",
      semester: "1",
      subjects: ["Programming Fundamentals", "Calculus"],
    });

    expect(steps).toHaveLength(16);
    expect(steps[0]?.title).toContain("C/C++");
    expect(steps[0]?.purpose).toContain("PUCIT/FCIT");
    expect(steps.at(-1)?.title).toContain("Capstone");
  });

  it("builds the separate AI Automation earning specialization", () => {
    const steps = buildJourney("AI Automation Engineer", "Starting from zero", "Build a portfolio", "Flexible pace");

    expect(steps).toHaveLength(8);
    expect(steps.map((step) => step.title)).toEqual(expect.arrayContaining([
      "Programming foundation",
      "Workflow automation",
      "Agents and tool use",
      "Earning and portfolio proof",
    ]));
  });
});
