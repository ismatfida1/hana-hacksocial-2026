import { describe, expect, it } from "vitest";
import { buildProjectRecord } from "./studentContext";

describe("project records", () => {
  it("starts active with incomplete milestones", () => {
    const project = buildProjectRecord("Weather Application", ["Python", "APIs"], ["Create project", "Connect API"]);
    expect(project.status).toBe("active");
    expect(project.milestones).toEqual([
      { title: "Create project", complete: false },
      { title: "Connect API", complete: false },
    ]);
  });
});
