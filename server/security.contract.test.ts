import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Hana security and privacy contracts", () => {
  const routers = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
  const db = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
  const context = readFileSync(resolve(process.cwd(), "server/studentContext.ts"), "utf8");

  it("keeps student context and history procedures protected", () => {
    expect(routers).toContain("studentContext: router({");
    expect(routers).toContain("get: protectedProcedure.query");
    expect(routers).toContain("updateProfile: protectedProcedure");
    expect(routers).toContain("memory: router({");
    expect(routers).toContain("clearHistory: protectedProcedure");
    expect(routers).toContain("deleteMessage: protectedProcedure");
  });

  it("uses the authenticated user id for memory and progress access", () => {
    expect(routers).toContain("buildHanaContext(ctx.user.id)");
    expect(routers).toContain("updateStudentProfile(ctx.user.id");
    expect(db).toContain("userId");
    expect(context).toContain("studentId");
  });

  it("keeps history deletion separate from essential profile memory", () => {
    expect(db).toContain("clearHanaConversations");
    expect(db).toContain("deleteHanaConversation");
    expect(db).toContain("tx.delete(hanaStudentMemory)");
    expect(db).toContain("profile: memory.profile");
  });

  it("does not place browser-exposed VITE credentials in the server credential path", () => {
    expect(readFileSync(resolve(process.cwd(), "server/_core/env.ts"), "utf8")).not.toContain("VITE_FRONTEND_FORGE_API_KEY");
  });

  it("keeps Teach Hana uploads protected and stores metadata separately from bytes", () => {
    const schema = readFileSync(resolve(process.cwd(), "drizzle/schema.ts"), "utf8");
    expect(schema).toContain('mysqlTable("hana_uploads"');
    expect(schema).toContain("storageKey");
    expect(routers).toContain("uploads: protectedProcedure");
    expect(routers).toContain("saveUpload: protectedProcedure");
    expect(routers).toContain("deleteUpload: protectedProcedure");
    expect(routers).toContain("storagePut");
    expect(routers).not.toContain("contentBase64: input.contentBase64");
    const db = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
    expect(db).toContain("tx.delete(hanaUploads)");
  });
});
