export function officialCurriculumSourceFor(university: string): string | null {
  return /pucit|fcit|punjab university/i.test(university) ? "https://pucit.edu.pk/approved-curriculum/" : null;
}

export function curriculumStatusFor(university: string): "verified" | "unavailable" {
  return officialCurriculumSourceFor(university) ? "verified" : "unavailable";
}
