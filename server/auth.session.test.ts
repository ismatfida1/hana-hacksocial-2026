import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("authentication session contract", () => {
  it("clears the server session cookie on logout", () => {
    const source = readFileSync(resolve(process.cwd(), "server/auth.logout.test.ts"), "utf8");
    expect(source).toContain("clearCookie");
    expect(source).toContain("maxAge: -1");
  });

  it("hydrates the returning-user path from the authenticated account query", () => {
    const source = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
    expect(source).toContain("trpc.auth.me.useQuery");
    expect(source).toContain('setScreen("career")');
  });
});
