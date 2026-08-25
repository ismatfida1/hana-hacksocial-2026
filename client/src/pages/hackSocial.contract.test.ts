import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("HackSocial 2026 demo contract", () => {
  const component = readFileSync(resolve(process.cwd(), "client/src/pages/HackSocial.tsx"), "utf8");
  const router = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("keeps the evaluator journey in the intended order", () => {
    const stages = ["goal", "roadmap", "mission", "ask", "mastery", "project", "opportunity", "progress"];
    let previous = -1;
    for (const stage of stages) {
      const position = component.indexOf(`  ${stage}:`);
      expect(position).toBeGreaterThan(previous);
      previous = position;
    }
  });

  it("labels demo state as isolated and links to an official opportunity page", () => {
    expect(component).toContain("Demo Mode sends no conversation to personal memory");
    expect(component).toContain("https://devpost.com/hackathons");
    expect(component).toContain("Check the official rules, dates, and eligibility");
  });

  it("exposes HackSocial from the existing Home experience", () => {
    expect(home).toContain("Open HackSocial 2026 demo");
    expect(home).toContain("<HackSocial onExit={() => setScreen(\"app\")} />");
  });

  it("uses a public demo AI procedure that explicitly avoids persistence", () => {
    expect(router).toContain("demoChat: publicProcedure");
    expect(router).toContain("Do not save a conversation, change a profile");
    expect(router).toContain("live: false");
  });
});
