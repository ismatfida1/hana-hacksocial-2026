import { describe, expect, it } from "vitest";
import { diagnosticQuestions, normalizeDiagnosticAnswers } from "./personalizedRoadmap";
import { discoverResources, validateExternalBook } from "./resourceDiscovery";

describe("personalized roadmap foundations", () => {
  it("normalizes learner answers into bounded, useful defaults", () => {
    const profile = normalizeDiagnosticAnswers({ target: "  Build an API  ", subject: " Python ", level: "not-a-level" as never, weeklyMinutes: 99999, formats: ["videos", "videos", ""], interests: ["data", "data"] });
    expect(profile.target).toBe("Build an API");
    expect(profile.subject).toBe("Python");
    expect(profile.level).toBe("beginner");
    expect(profile.weeklyMinutes).toBe(2400);
    expect(profile.formats).toEqual(["videos"]);
    expect(profile.interests).toEqual(["data"]);
  });

  it("asks about destination, baseline, time, formats, and obstacles", () => {
    const ids = diagnosticQuestions().map((question) => question.id);
    expect(ids).toEqual(["target", "subject", "level", "evidence", "weeklyMinutes", "formats", "universityContext", "obstacles"]);
  });

  it("returns curated university, video, documentation, and quiz resources without requiring a search key", async () => {
    const resources = await discoverResources(normalizeDiagnosticAnswers({ subject: "AI engineering", target: "build an AI project", level: "beginner", formats: ["videos"] }));
    expect(resources.some((resource) => resource.source === "MIT OpenCourseWare")).toBe(true);
    expect(resources.some((resource) => resource.type === "video")).toBe(true);
    expect(resources.every((resource) => /^https?:\/\//.test(resource.url))).toBe(true);
    expect(resources.some((resource) => resource.url.includes("localhost"))).toBe(false);
  });

  it("keeps external book records as metadata and preserves the URL without fetching it", () => {
    const book = validateExternalBook({ title: "  A Book  ", author: "  An Author ", url: "https://example.com/book", guidance: "Read chapter 1" });
    expect(book).toEqual({ title: "A Book", author: "An Author", url: "https://example.com/book", guidance: "Read chapter 1" });
  });
});
