import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");


describe("Hana sign-in contract", () => {
  it("keeps the greeting-first flow and exposes provider-aware sign-in actions", () => {
    expect(homeSource).toContain('setScreen(auth.data ? "start" : "signin")');
    expect(homeSource).toContain('startLogin("google")');
    expect(homeSource).toContain('startLogin("other")');
    expect(homeSource).toContain("Continue with Google");
    expect(homeSource).toContain("Use another sign-in option");
  });

  it("keeps the password field inside the separately labeled private demo area", () => {
    const signInBlock = homeSource.match(/if \(screen === "signin"\)[\s\S]*?if \(screen === "start"\)/)?.[0] ?? "";
    expect(signInBlock).not.toContain('type="email"');
    const demoIndex = signInBlock.indexOf("Preview for authorized users");
    const passwordIndex = signInBlock.indexOf('type="password"');
    expect(demoIndex).toBeGreaterThan(-1);
    expect(passwordIndex).toBeGreaterThan(demoIndex);
  });
});
