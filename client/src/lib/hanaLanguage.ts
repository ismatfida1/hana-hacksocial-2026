export function shouldSimplify(message: string) {
  return /(i\s*don['’]?t\s*understand|dont\s*understand|confused|make\s+it\s+simpler|too\s+(hard|complicated)|what\s+does\s+that\s+mean)/i.test(message);
}

export function simpleConfusionReply() {
  return "No problem — let’s make it easier. Tell me the one word or step that feels unclear, and I’ll explain just that with a tiny example.";
}

export type HanaReplyMood = "happy" | "worried" | "confused" | "celebrating";

export function chatLengthNote(mode: "short" | "deep") {
  return mode === "deep" ? "More detail is on because you asked." : "Short answer first.";
}

export function moodForReply(text: string): HanaReplyMood {
  if (/(error|failed|bug|cannot|undefined|wrong)/i.test(text)) return "worried";
  if (/(confused|unclear|don’t understand|don't understand)/i.test(text)) return "confused";
  if (/(done|worked|success|nice|great)/i.test(text)) return "celebrating";
  return "happy";
}
