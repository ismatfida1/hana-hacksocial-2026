import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Hana opportunity directory contract", () => {
  const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("keeps a broad set of official opportunity categories", () => {
    for (const title of [
      "Devpost Hackathons",
      "Major League Hacking",
      "Kaggle Competitions",
      "NASA Space Apps Challenge",
      "picoCTF / CyLab Security Academy",
      "Google Summer of Code",
      "Outreachy",
      "LFX Mentorship",
      "The Forage",
    ]) {
      expect(source).toContain(`title: "${title}"`);
    }
  });

  it("uses official HTTPS destinations for directory entries", () => {
    const opportunityBlock = source.slice(source.indexOf("const opportunities = ["), source.indexOf("\n];", source.indexOf("const opportunities = [")));
    const urls = [...opportunityBlock.matchAll(/url: "([^"]+)"/g)].map((match) => match[1]);
    expect(urls.length).toBeGreaterThanOrEqual(12);
    expect(urls.every((url) => url.startsWith("https://"))).toBe(true);
  });
});
