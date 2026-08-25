const REQUEST_TIMEOUT_MS = 3500;
const MAX_REDIRECTS = 3;

type ResourceCandidate = { label: string; url: string };
export type ResourceHealth = ResourceCandidate & { reachable: boolean; status?: number; checkedAt: string; reason?: string };

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/[\[\]]/g, "");
  if (host === "localhost" || host.endsWith(".local") || host === "::1" || host === "0.0.0.0") return true;
  if (/^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host)) return true;
  const match = host.match(/^172\.(\d{1,3})\./);
  return Boolean(match && Number(match[1]) >= 16 && Number(match[1]) <= 31);
}

function safeUrl(raw: string) {
  try {
    const parsed = new URL(raw);
    if ((parsed.protocol !== "https:" && parsed.protocol !== "http:") || isPrivateHost(parsed.hostname)) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function request(url: URL, method: "HEAD" | "GET", redirects = 0): Promise<{ reachable: boolean; status?: number; reason?: string }> {
  const safe = safeUrl(url.toString());
  if (!safe) return { reachable: false, reason: "unsafe-or-invalid-url" };
  if (redirects > MAX_REDIRECTS) return { reachable: false, reason: "too-many-redirects" };
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(safe, {
      method,
      redirect: "manual",
      signal: controller.signal,
      headers: method === "GET" ? { Range: "bytes=0-0", "User-Agent": "HanaLearningResourceCheck/1.0" } : { "User-Agent": "HanaLearningResourceCheck/1.0" },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      const next = location ? safeUrl(new URL(location, safe).toString()) : null;
      if (!next) return { reachable: false, status: response.status, reason: "unsafe-redirect" };
      return request(next, method, redirects + 1);
    }
    if (response.ok) return { reachable: true, status: response.status };
    if (method === "HEAD" && (response.status === 403 || response.status === 405 || response.status === 501)) return request(safe, "GET", redirects);
    return { reachable: false, status: response.status, reason: `http-${response.status}` };
  } catch (error) {
    return { reachable: false, reason: error instanceof DOMException && error.name === "AbortError" ? "timeout" : "network-error" };
  } finally {
    clearTimeout(timeout);
  }
}

export async function verifyResourceCandidates(candidates: ResourceCandidate[]): Promise<ResourceHealth[]> {
  const unique = candidates.filter((candidate, index, all) => candidate?.url && all.findIndex((item) => item.url === candidate.url) === index).slice(0, 4);
  return Promise.all(unique.map(async (candidate) => {
    const result = await request(new URL(candidate.url), "HEAD");
    return { ...candidate, ...result, checkedAt: new Date().toISOString() };
  }));
}

export function validateResourceCandidate(raw: ResourceCandidate) {
  return Boolean(typeof raw?.label === "string" && raw.label.trim() && typeof raw?.url === "string" && safeUrl(raw.url));
}

export const resourceVerificationInternals = { isPrivateHost, safeUrl };
