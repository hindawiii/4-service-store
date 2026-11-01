import { describe, expect, test } from "bun:test";
import { filterResources } from "./learning-resources";

describe("learning resource discovery", () => {
  test("programming search returns GitHub regardless of letter case", () => {
    expect(filterResources("all", " GITHUB ", false).map((r) => r.id)).toEqual(["github"]);
  });
  test("free educational content excludes Figma's limited free plan", () => {
    const results = filterResources("all", "", true).map((r) => r.id);
    expect(results).toContain("freecodecamp");
    expect(results).not.toContain("figma");
  });
  test("foreign languages stay separate from programming languages", () => {
    expect(filterResources("languages", "", false).map((r) => r.id)).toEqual(["duolingo", "bbc", "britishcouncil"]);
  });
  test("unmatched search returns no recommendations", () => {
    expect(filterResources("all", "no-such-resource-12345", false)).toEqual([]);
  });
});