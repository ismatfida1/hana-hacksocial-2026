import { afterEach, describe, expect, it, vi } from "vitest";
import { lookupOfficialCurriculum } from "./curriculum";

describe("official curriculum lookup", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns a safe editable fallback for an unsupported university", async () => {
    const result = await lookupOfficialCurriculum("Unknown University");
    expect(result.status).toBe("unavailable");
    expect(result.sourceUrl).toBeNull();
    expect(result.message).toContain("will not guess");
  });

  it("verifies the mapped official source server-side", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    const result = await lookupOfficialCurriculum("PUCIT / FCIT");
    expect(result.status).toBe("verified");
    expect(result.sourceUrl).toBe("https://pucit.edu.pk/approved-curriculum/");
    expect(fetch).toHaveBeenCalledWith(result.sourceUrl, expect.objectContaining({ method: "GET", redirect: "follow" }));
  });

  it("falls back when the official page cannot be reached", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const result = await lookupOfficialCurriculum("FCIT");
    expect(result.status).toBe("unavailable");
    expect(result.sourceUrl).toBe("https://pucit.edu.pk/approved-curriculum/");
    expect(result.message).toContain("manually");
  });
});
