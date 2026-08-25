import { officialCurriculumSourceFor } from "@shared/curriculum";

export type CurriculumLookup = {
  university: string;
  sourceUrl: string | null;
  status: "verified" | "unavailable";
  message: string;
};

export async function lookupOfficialCurriculum(university: string): Promise<CurriculumLookup> {
  const normalized = university.trim();
  const sourceUrl = officialCurriculumSourceFor(normalized);
  if (!normalized || !sourceUrl) {
    return {
      university: normalized,
      sourceUrl: null,
      status: "unavailable",
      message: "No verified curriculum source was found. Hana will not guess your subjects—add them here instead.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch(sourceUrl, { method: "GET", redirect: "follow", signal: controller.signal });
    if (!response.ok) {
      return { university: normalized, sourceUrl, status: "unavailable", message: "The official curriculum page could not be reached right now. Add your subjects manually instead." };
    }
    return { university: normalized, sourceUrl, status: "verified", message: "Hana reached the mapped official curriculum page. Check it and add or correct your subjects above." };
  } catch {
    return { university: normalized, sourceUrl, status: "unavailable", message: "Hana could not reach the official curriculum page right now. Add your subjects manually instead." };
  } finally {
    clearTimeout(timeout);
  }
}
