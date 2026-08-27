import { afterEach, describe, expect, it } from "vitest";
import { browseWeb, shouldBrowse, validateExternalBook } from "./resourceDiscovery";

describe("live browsing safeguards", () => {
  const originalTavilyKey = process.env.TAVILY_API_KEY;
  const originalSearchKey = process.env.RESOURCE_SEARCH_API_KEY;
  const originalSearchUrl = process.env.RESOURCE_SEARCH_URL;

  afterEach(() => {
    if (originalTavilyKey === undefined) delete process.env.TAVILY_API_KEY;
    else process.env.TAVILY_API_KEY = originalTavilyKey;
    if (originalSearchKey === undefined) delete process.env.RESOURCE_SEARCH_API_KEY;
    else process.env.RESOURCE_SEARCH_API_KEY = originalSearchKey;
    if (originalSearchUrl === undefined) delete process.env.RESOURCE_SEARCH_URL;
    else process.env.RESOURCE_SEARCH_URL = originalSearchUrl;
  });

  it("browses for freshness-sensitive questions but not stable concepts", () => {
    expect(shouldBrowse("What is recursion?"))
      .toBe(false);
    expect(shouldBrowse("Find current AI hackathons this month"))
      .toBe(true);
  });

  it("returns no live sources honestly when search is not configured", async () => {
    delete process.env.TAVILY_API_KEY;
    delete process.env.RESOURCE_SEARCH_API_KEY;
    delete process.env.RESOURCE_SEARCH_URL;
    await expect(browseWeb("current university deadlines")).resolves.toEqual([]);
  });

  it("preserves external books as metadata and keeps the URL external", () => {
    const book = validateExternalBook({
      title: "  Learning Python  ",
      author: "  A. Student ",
      url: "https://books.example.edu/python",
      guidance: "Read chapters 1–3.",
    });
    expect(book).toEqual({
      title: "Learning Python",
      author: "A. Student",
      url: "https://books.example.edu/python",
      guidance: "Read chapters 1–3.",
    });
  });
});
