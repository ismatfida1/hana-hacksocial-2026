import { describe, expect, it } from "vitest";
import { verifyDemoPassword } from "./demoAccess";

describe("private demo access", () => {
  it("accepts the configured server-side demo password and rejects incorrect values", () => {
    const configured = process.env.HANA_DEMO_PASSWORD;
    expect(configured).toBeTruthy();
    expect(verifyDemoPassword(configured || "")).toBe(true);
    expect(verifyDemoPassword(`${configured || ""}-wrong`)).toBe(false);
  });
});
