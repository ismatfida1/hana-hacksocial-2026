import type { DiagnosticAnswers } from "./personalizedRoadmap";

export type ResourceType = "university" | "book" | "video" | "quiz" | "mcq" | "documentation" | "project";
export type ResourceCandidate = { type: ResourceType; title: string; author?: string; url: string; source: string; why: string; topic?: string; level?: string; language?: string; lastCheckedAt?: string };

type SearchResult = { title?: string; url?: string; snippet?: string; source?: string };
const cache = new Map<string, { expiresAt: number; resources: ResourceCandidate[] }>();
const CACHE_MS = 10 * 60 * 1000;

function safePublicUrl(value: string) {
  try {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol)) return false;
    const host = url.hostname.toLowerCase();
    if (host === 'localhost' || host === '::1' || host.endsWith('.local') || /^127\.|^10\.|^192\.168\.|^169\.254\.|^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) return false;
    return true;
  } catch { return false; }
}

function dedupe(resources: ResourceCandidate[]) {
  const seen = new Set<string>();
  return resources.filter((resource) => {
    if (!safePublicUrl(resource.url)) return false;
    const canonical = new URL(resource.url).toString().replace(/\/$/, '').toLowerCase();
    if (seen.has(canonical)) return false;
    seen.add(canonical);
    return true;
  }).slice(0, 18);
}

function curatedResources(profile: DiagnosticAnswers): ResourceCandidate[] {
  const subject = profile.subject.toLowerCase();
  const resources: ResourceCandidate[] = [
    { type: "university", title: "MIT OpenCourseWare", url: "https://ocw.mit.edu/search/?q=" + encodeURIComponent(profile.subject), source: "MIT OpenCourseWare", why: "An open university course search for your subject.", topic: profile.subject, level: profile.level, language: profile.language },
    { type: "university", title: "CS50 OpenCourseWare", url: "https://cs50.harvard.edu/x/", source: "Harvard University", why: "A structured university introduction when your goal involves computing foundations.", topic: "computer science", level: "beginner", language: "English" },
    { type: "video", title: `University lectures for ${profile.subject}`, url: "https://www.youtube.com/results?search_query=" + encodeURIComponent(`${profile.subject} university lecture`), source: "YouTube search", why: "A starting point for university-led explanations on your topic.", topic: profile.subject, level: profile.level, language: profile.language },
    { type: "documentation", title: `${profile.subject} official documentation search`, url: "https://developer.mozilla.org/en-US/search?q=" + encodeURIComponent(profile.subject), source: "MDN Web Docs", why: "A practical reference when your goal involves web or software work.", topic: profile.subject, level: profile.level, language: "English" },
    { type: "quiz", title: `Practice questions for ${profile.subject}`, url: "https://www.khanacademy.org/search?page_search_query=" + encodeURIComponent(profile.subject), source: "Khan Academy", why: "Practice helps Hana see what you can explain, not only what you watched.", topic: profile.subject, level: profile.level, language: profile.language },
  ];
  if (subject.includes("python") || subject.includes("data") || subject.includes("ai") || subject.includes("machine")) {
    resources.push({ type: "university", title: "Python for Everybody", url: "https://www.py4e.com/", source: "University of Michigan", why: "A gentle, university-backed path for Python foundations.", topic: "python", level: profile.level, language: "English" });
    resources.push({ type: "video", title: "MIT Introduction to Deep Learning", url: "https://www.youtube.com/@MITOpenCourseWare/search?query=deep%20learning", source: "MIT OpenCourseWare", why: "Useful university lectures when the learner is ready for an AI direction.", topic: "machine learning", level: "intermediate", language: "English" });
  }
  return resources;
}

async function searchWeb(profile: DiagnosticAnswers): Promise<ResourceCandidate[]> {
  const endpoint = process.env.RESOURCE_SEARCH_URL;
  const key = process.env.RESOURCE_SEARCH_API_KEY;
  if (!endpoint || !key) return [];
  const query = `${profile.subject} ${profile.target} ${profile.level} ${profile.formats.join(' ')}`.trim();
  try {
    const response = await fetch(`${endpoint}${endpoint.includes('?') ? '&' : '?'}q=${encodeURIComponent(query)}&limit=10`, { headers: { Authorization: `Bearer ${key}`, Accept: "application/json" }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return [];
    const payload = await response.json() as { results?: SearchResult[] };
    return (payload.results || []).map((item) => ({ type: "project" as const, title: String(item.title || "Relevant learning resource").slice(0, 180), url: String(item.url || ""), source: String(item.source || "web search").slice(0, 120), why: String(item.snippet || "Found for this learner's goal.").slice(0, 360), topic: profile.subject, level: profile.level, language: profile.language, lastCheckedAt: new Date().toISOString() }));
  } catch { return []; }
}

export async function discoverResources(profile: DiagnosticAnswers): Promise<ResourceCandidate[]> {
  const key = JSON.stringify({ subject: profile.subject, target: profile.target, level: profile.level, language: profile.language, formats: profile.formats });
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.resources;
  const resources = dedupe([...curatedResources(profile), ...(await searchWeb(profile))]);
  cache.set(key, { expiresAt: Date.now() + CACHE_MS, resources });
  return resources;
}

export function validateExternalBook(input: { title: string; author: string; url: string; guidance?: string }) {
  return { ...input, title: input.title.trim().slice(0, 180), author: input.author.trim().slice(0, 160), url: input.url.trim(), guidance: input.guidance?.trim().slice(0, 400) };
}
