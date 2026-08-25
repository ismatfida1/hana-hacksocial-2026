import { describe, expect, it } from "vitest";
import { removeHanaConversation } from "./db";

type Conversation = { role: "user" | "hana"; text: string; createdAt: string };

const messages: Conversation[] = [
  { role: "user", text: "Explain loops", createdAt: "2026-08-25T09:00:00.000Z" },
  { role: "hana", text: "## Simple answer\nLoops repeat a task.", createdAt: "2026-08-25T09:00:01.000Z" },
  { role: "user", text: "Explain loops", createdAt: "2026-08-25T09:00:02.000Z" },
];

describe("chat history deletion", () => {
  it("removes only the selected matching message", () => {
    const next = removeHanaConversation(messages, messages[1]);
    expect(next).toHaveLength(2);
    expect(next.map((message) => message.createdAt)).toEqual([messages[0].createdAt, messages[2].createdAt]);
  });

  it("keeps the original array when no owned message matches", () => {
    const next = removeHanaConversation(messages, { role: "hana", text: "Missing", createdAt: "2026-08-25T10:00:00.000Z" });
    expect(next).toBe(messages);
  });
});
