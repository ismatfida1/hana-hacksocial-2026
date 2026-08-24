import { invokeLLM } from "./llm";
import { ENV } from "./env";

export type ProviderMessage = { role: "system" | "user" | "assistant"; content: string };
export type AiProvider = "openai" | "gemini" | "forge";

type ProviderResult = { text: string; provider: AiProvider };

const providerPreference = () => (process.env.HANA_AI_PROVIDER ?? "auto").toLowerCase();

function configuredProviders(): AiProvider[] {
  const preference = providerPreference();
  if (preference === "openai") return ["openai", "gemini", "forge"];
  if (preference === "gemini") return ["gemini", "openai", "forge"];
  if (preference === "forge") return ["forge"];
  return ["openai", "gemini", "forge"];
}

async function openAi(messages: ProviderMessage[], json = false): Promise<ProviderResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OpenAI is not configured");
  const response = await fetch(process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", messages, temperature: 0.35, ...(json ? { response_format: { type: "json_object" } } : {}) }),
  });
  if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`);
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenAI returned no text");
  return { text, provider: "openai" };
}

async function gemini(messages: ProviderMessage[], json = false): Promise<ProviderResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("Gemini is not configured");
  const system = messages.find((message) => message.role === "system")?.content;
  const contents = messages.filter((message) => message.role !== "system").map((message) => ({ role: message.role === "assistant" ? "model" : "user", parts: [{ text: message.content }] }));
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-2.5-flash"}:generateContent?key=${encodeURIComponent(key)}`;
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}), contents, generationConfig: { temperature: 0.35, ...(json ? { responseMimeType: "application/json" } : {}) } }) });
  if (!response.ok) throw new Error(`Gemini request failed: ${response.status}`);
  const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
  if (!text) throw new Error("Gemini returned no text");
  return { text, provider: "gemini" };
}

async function forge(messages: ProviderMessage[]): Promise<ProviderResult> {
  const response = await invokeLLM({ messages });
  const content = response.choices[0]?.message?.content;
  if (typeof content !== "string" || !content) throw new Error("Forge returned no text");
  return { text: content, provider: "forge" };
}

export async function generateText(messages: ProviderMessage, json?: boolean): Promise<ProviderResult>;
export async function generateText(messages: ProviderMessage[], json?: boolean): Promise<ProviderResult>;
export async function generateText(messages: ProviderMessage | ProviderMessage[], json = false): Promise<ProviderResult> {
  const normalized = Array.isArray(messages) ? messages : [messages];
  let lastError: unknown;
  for (const provider of configuredProviders()) {
    try {
      if (provider === "openai") return await openAi(normalized, json);
      if (provider === "gemini") return await gemini(normalized, json);
      return await forge(normalized);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("No Hana AI provider is available");
}

export function providerLabel(provider: AiProvider) {
  return provider === "openai" ? "OpenAI" : provider === "gemini" ? "Google Gemini" : "Hana AI";
}

export const hasExternalProvider = Boolean(process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || ENV.forgeApiKey);
