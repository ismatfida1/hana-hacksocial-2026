import { describe, expect, it } from "vitest";
import { chatLengthNote, shouldSimplify, simpleConfusionReply } from "./hanaLanguage";

describe("hana language helper", () => {
  it("detects common confusion phrases", () => {
    expect(shouldSimplify("I don't understand this")) .toBe(true);
    expect(shouldSimplify("Can you make it simpler?")) .toBe(true);
    expect(shouldSimplify("I am ready to try")) .toBe(false);
  });

  it("keeps answers short unless the learner asks for more", () => {
    expect(chatLengthNote("short")).toBe("Short answer first.");
    expect(chatLengthNote("deep")).toContain("because you asked");
  });

  it("returns a short, kind next step", () => {
    const reply = simpleConfusionReply();
    expect(reply).toContain("let’s make it easier");
    expect(reply.length).toBeLessThan(180);
  });
});
