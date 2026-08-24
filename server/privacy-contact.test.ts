import { describe, expect, it } from "vitest";

describe("public privacy contact", () => {
  it("renders the configured contact on the Privacy Policy endpoint", async () => {
    const contact = process.env.HANA_PRIVACY_CONTACT;
    expect(contact).toBe("ismat542008@gmail.com");

    for (const path of ["/privacy", "/terms", "/delete-account"]) {
      const response = await fetch(`http://127.0.0.1:3000${path}`);
      expect(response.ok).toBe(true);
      const html = await response.text();
      expect(html).toContain("HANA");
      if (path !== "/delete-account") expect(html).toContain(contact);
    }
  });
});
