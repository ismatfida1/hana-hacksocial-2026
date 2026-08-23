import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("hana.chat", () => {
  it("rejects an empty learner message before any model call", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.hana.chat({ message: "" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("accepts the supported Hana response modes in the typed contract", () => {
    const modes = ["short", "analogy", "example", "debug", "deep", "career", "project"] as const;
    expect(modes).toContain("career");
    expect(modes).toContain("project");
  });
});
