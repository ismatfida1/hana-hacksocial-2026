import { describe, expect, it } from "vitest";
import { selectReachableResources } from "./Home";

describe("learning resource failover", () => {
  const resources = [
    { label: "Primary", url: "https://primary.example" },
    { label: "Video", url: "https://video.example" },
    { label: "University", url: "https://university.example" },
  ];

  it("keeps only reachable routes when at least one is verified", () => {
    expect(selectReachableResources(resources, [
      { url: "https://primary.example", reachable: false },
      { url: "https://video.example", reachable: true },
      { url: "https://university.example", reachable: false },
    ])).toEqual([{ label: "Video", url: "https://video.example" }]);
  });

  it("keeps all routes when verification is unavailable or all fail", () => {
    expect(selectReachableResources(resources, undefined)).toEqual(resources);
    expect(selectReachableResources(resources, resources.map(({ url }) => ({ url, reachable: false })))).toEqual(resources);
  });
});
