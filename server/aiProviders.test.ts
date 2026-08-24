import { afterEach, describe, expect, it, vi } from "vitest";
import { generateText } from "./_core/aiProviders";

describe("Hana AI provider routing", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.HANA_AI_PROVIDER;
  });

  it("uses OpenAI when explicitly preferred", async () => {
    process.env.HANA_AI_PROVIDER = "openai";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ choices: [{ message: { content: "## Simple answer\n- Hello from Hana." } }] }), { status: 200 })));
    const result = await generateText([{ role: "user", content: "Hello" }]);
    expect(result.provider).toBe("openai");
    expect(result.text).toContain("Hello from Hana");
  });

  it("falls back to Gemini when the preferred provider fails", async () => {
    process.env.HANA_AI_PROVIDER = "openai";
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response("provider unavailable", { status: 503 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: "## Simple answer\n- Gemini can help." }] } }] }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const result = await generateText([{ role: "user", content: "Help" }]);
    expect(result.provider).toBe("gemini");
    expect(result.text).toContain("Gemini can help");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
