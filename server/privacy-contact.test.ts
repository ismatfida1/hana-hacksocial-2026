import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("public privacy surfaces", () => {
  it("keeps the configured contact and required public routes in the server contract", () => {
    const entrypoint = fs.readFileSync(path.join(process.cwd(), "server/_core/index.ts"), "utf8");
    expect(process.env.HANA_PRIVACY_CONTACT).toBe("ismat542008@gmail.com");
    expect(entrypoint).toContain("HANA_PRIVACY_CONTACT");
    expect(entrypoint).toContain('"/privacy"');
    expect(entrypoint).toContain('"/terms"');
    expect(entrypoint).toContain('"/delete-account"');
    expect(entrypoint).toContain("Request deletion");
  });
});
