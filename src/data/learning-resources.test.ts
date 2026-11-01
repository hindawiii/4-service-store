import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { filterResources } from "./learning-resources";

describe("learning resource discovery", () => {
  test("programming search returns GitHub regardless of letter case", () => {
    assert.deepEqual(filterResources("all", " GITHUB ", false).map((r) => r.id), ["github"]);
  });
  test("free educational content excludes Figma's limited free plan", () => {
    const results = filterResources("all", "", true).map((r) => r.id);
    assert.ok(results.includes("freecodecamp"));
    assert.ok(!results.includes("figma"));
  });
  test("foreign languages stay separate from programming languages", () => {
    assert.deepEqual(filterResources("languages", "", false).map((r) => r.id), ["duolingo", "bbc", "britishcouncil"]);
  });
  test("unmatched search returns no recommendations", () => {
    assert.deepEqual(filterResources("all", "no-such-resource-12345", false), []);
  });
});