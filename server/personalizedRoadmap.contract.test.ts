import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("personalized roadmap server contract", () => {
  const router = fs.readFileSync(path.join(process.cwd(), "server/routers.ts"), "utf8");
  const db = fs.readFileSync(path.join(process.cwd(), "server/db.ts"), "utf8");
  const schema = fs.readFileSync(path.join(process.cwd(), "drizzle/schema.ts"), "utf8");

  it("keeps generation, profile, and progress procedures behind protectedProcedure", () => {
    expect(router).toContain("personalized: router({");
    expect(router).toContain("profile: protectedProcedure");
    expect(router).toContain("generate: protectedProcedure");
    expect(router).toContain("recordProgress: protectedProcedure");
  });

  it("includes the live question and active personalized context in Ask Hana", () => {
    expect(router).toContain("const activeRoadmap = await getActiveHanaRoadmap(ctx.user.id)");
    expect(router).toContain("Learner message:\\n${input.message}");
    expect(router).toContain("Active personalized roadmap context:");
  });

  it("uses user ownership keys and indexed roadmap/profile access paths", () => {
    expect(schema).toContain("userId: int(\"userId\")");
    expect(schema).toContain("hana_learner_profiles_user_id_idx");
    expect(schema).toContain("hana_roadmaps_user_status_idx");
    expect(db).toContain("eq(hanaRoadmaps.id, roadmapId), eq(hanaRoadmaps.userId, userId)");
  });
});
