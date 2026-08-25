import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Hana interactive tour contract", () => {
  const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("contains eight tutorial stages and real app anchors", () => {
    expect(source).toContain('const demoTourStages = [');
    expect(source.match(/selector: "#tour-/g)?.length).toBe(8);
    for (const anchor of ["tour-home", "tour-career", "tour-journey", "tour-resources", "tour-projects", "tour-opportunities", "tour-ask", "tour-profile"]) {
      expect(source).toContain(`id="${anchor}"`);
    }
  });

  it("supports back navigation and progress wording", () => {
    expect(source).toContain("Step {stage + 1} of {demoTourStages.length}");
    expect(source).toContain('onStage(Math.max(0, stage - 1))');
    expect(source).toContain('Next');
  });

  it("keeps placement checks and resource alternatives in the focused learning view", () => {
    expect(source).toContain('I already know this');
    expect(source).toContain('Placement check: ${answer.trim()}');
    expect(source).toContain('Alternative video · ${step.title}');
    expect(source).toContain('Alternative course · ${step.title}');
  });

  it("opens first-entry onboarding and preserves the tutorial attachment wording", () => {
    expect(source).toContain('const firstEntryTour = !demoMode && profile?.tourCompleted !== true && !tourDismissed;');
    expect(source).toContain('Welcome to HANA');
    expect(source).toContain('How would you like to explore HANA?');
    expect(source).toContain('Skip for now');
    expect(source).toContain('You’re ready! Let’s start your HANA journey.');
    expect(source).toContain('Start Exploring');
    expect(source).toContain('Hana points here');
    expect(source).toContain('getBoundingClientRect');
    expect(source).toContain('Hana guides you with expressions and arrows.');
    expect(source).toContain('Interactive guide');
    expect(source).toContain('privateDemo = false');
    expect(source).toContain('Use ← → or Esc');
    expect(source).toContain('event.key === "ArrowRight"');
  });

  it("shows an explicit curriculum source result and keeps subjects editable", () => {
    expect(source).toContain('Hana found a verified curriculum source for this university');
    expect(source).toContain('No verified curriculum source was found');
    expect(source).toContain('Hana will not guess your subjects');
  });

  it("does not invent university subjects when official curriculum data is unavailable", () => {
    expect(source).toContain('No verified curriculum source was found. Hana will not guess your subjects—add them here instead.');
    expect(source).toContain('No verified curriculum source was found. Hana will use only these saved subjects with your degree and semester.');
    expect(source).toContain('https://pucit.edu.pk/approved-curriculum/');
    expect(source).toContain('Open the official curriculum source');
    expect(source).toContain('Hana’s fit:');
    expect(source).toContain('Before applying:');
    expect(source).toContain('Hana never invents deadlines, eligibility, or income promises.');
  });
});
