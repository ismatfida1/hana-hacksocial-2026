import { timingSafeEqual } from "node:crypto";

export function verifyDemoPassword(candidate: string) {
  const configured = process.env.HANA_DEMO_PASSWORD || "";
  if (!configured || !candidate) return false;
  const expected = Buffer.from(configured, "utf8");
  const received = Buffer.from(candidate, "utf8");
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}
