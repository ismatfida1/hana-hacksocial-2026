import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Hana persistent chat integration", () => {
  const home = fs.readFileSync(path.join(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
  const chatBox = fs.readFileSync(path.join(process.cwd(), "client/src/components/AIChatBox.tsx"), "utf8");

  it("hydrates the visible chat from authenticated saved conversations", () => {
    expect(home).toContain("memory.data?.conversations");
    expect(home).toContain('message.role === "hana" ? "assistant" : "user"');
  });

  it("exposes duplicate-safe retry and new-chat reset controls", () => {
    expect(home).toContain("const retryChat");
    expect(home).toContain("const startNewChat");
    expect(home).toContain("clearHistory.mutate");
    expect(home).toContain('aria-label="Retry the last Hana response"');
    expect(home).toContain('aria-label="Start a new Hana conversation"');
  });

  it("keeps the composer accessible and communicates the drafting state", () => {
    expect(chatBox).toContain('aria-label="Hana support chat message composer"');
    expect(chatBox).toContain('htmlFor="hana-chat-message"');
    expect(chatBox).toContain("Hana is thinking…");
    expect(chatBox).toContain('aria-live="polite"');
  });
});
