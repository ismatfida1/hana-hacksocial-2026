import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("admin-managed opportunity records", () => {
  const schema = readFileSync(resolve(process.cwd(), "drizzle/schema.ts"), "utf8");
  const router = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");
  const db = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
  const manager = readFileSync(resolve(process.cwd(), "client/src/pages/AdminOpportunityManager.tsx"), "utf8");

  it("stores the fields needed to keep opportunity details current", () => {
    for (const field of ["officialUrl", "deadlineAt", "eligibility", "prizeDetails", "verificationStatus", "verifiedAt", "active", "createdBy"]) {
      expect(schema).toContain(`${field}:`);
    }
    expect(schema).toContain('mysqlEnum("verificationStatus", ["unverified", "verified", "unreachable"])');
  });

  it("protects management operations with the existing admin procedure", () => {
    expect(router).toContain("adminList: adminProcedure");
    expect(router).toContain("adminCreate: adminProcedure");
    expect(router).toContain("adminUpdate: adminProcedure");
    expect(router).toContain("adminArchive: adminProcedure");
    expect(router).toContain("adminVerify: adminProcedure");
    expect(router).toContain("validateResourceCandidate");
    expect(db).toContain("export async function archiveOpportunity");
    expect(db).toContain('and(eq(opportunities.active, 1), eq(opportunities.verificationStatus, "verified"))');
  });

  it("uses stored demonstrated skills when explaining opportunity fit", () => {
    expect(home).toContain("function opportunityFitReason(area: string | undefined, type: string, demonstratedSkills: string[] = [])");
    expect(home).toContain("opportunityFitReason(plan?.area, item.type, demonstratedSkills)");
    expect(home).toContain("This builds on your saved evidence:");
  });

  it("renders active managed records and honest deadline states for students", () => {
    expect(home).toContain("trpc.opportunities.list.useQuery");
    expect(home).toContain("displayOpportunities = demoMode");
    expect(home).toContain("No current opportunities have been published yet.");
    expect(home).toContain('formatOpportunityDeadline');
    expect(home).toContain('formatOpportunityVerification');
    expect(home).toContain('Official page checked:');
    expect(home).toContain('Current deadline:');
    expect(home).toContain('Passed on');
    expect(home).toContain('Deadline not verified yet.');
  });

  it("keeps the management surface owner-only and supports edit/archive actions", () => {
    expect(home).toContain("{isAdmin && <AdminOpportunityManager />}");
    expect(manager).toContain("adminCreate.useMutation");
    expect(manager).toContain("adminUpdate.useMutation");
    expect(manager).toContain("adminArchive.useMutation");
    expect(manager).toContain("adminVerify.useMutation");
    expect(manager).toContain("Verify now");
    expect(manager).toContain("Official HTTPS URL");
    expect(manager).toContain("Current deadline");
  });
});
