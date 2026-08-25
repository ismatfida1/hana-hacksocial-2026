import { describe, expect, it } from "vitest";
import { resourceVerificationInternals, validateResourceCandidate } from "./resourceVerification";

describe("learning resource verification", () => {
  it("accepts public http and https resources only", () => {
    expect(validateResourceCandidate({ label: "MDN", url: "https://developer.mozilla.org/en-US/docs/Learn" })).toBe(true);
    expect(validateResourceCandidate({ label: "Docs", url: "ftp://example.com/file" })).toBe(false);
    expect(validateResourceCandidate({ label: "", url: "https://example.com" })).toBe(false);
  });

  it("rejects private or local hosts before making a network request", () => {
    expect(resourceVerificationInternals.isPrivateHost("localhost")).toBe(true);
    expect(resourceVerificationInternals.isPrivateHost("127.0.0.1")).toBe(true);
    expect(resourceVerificationInternals.isPrivateHost("192.168.1.20")).toBe(true);
    expect(resourceVerificationInternals.isPrivateHost("developer.mozilla.org")).toBe(false);
    expect(resourceVerificationInternals.safeUrl("http://127.0.0.1:3000")).toBeNull();
  });
});
