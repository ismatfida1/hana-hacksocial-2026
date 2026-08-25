import { describe, expect, it } from "vitest";
import { curriculumStatusFor, officialCurriculumSourceFor } from "./curriculum";

describe("curriculum source mapping", () => {
  it("uses the verified PUCIT curriculum source for supported university names", () => {
    expect(officialCurriculumSourceFor("PUCIT / FCIT")).toBe("https://pucit.edu.pk/approved-curriculum/");
    expect(curriculumStatusFor("Punjab University FCIT")).toBe("verified");
  });

  it("does not invent a curriculum source for an unsupported university", () => {
    expect(officialCurriculumSourceFor("Example University")).toBeNull();
    expect(curriculumStatusFor("Example University")).toBe("unavailable");
  });
});
