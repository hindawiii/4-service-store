import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { PLATFORMS, filterPlatforms } from "./media-guide";

describe("media guide", () => {
  test("unofficial platforms never carry a link", () => {
    assert.ok(PLATFORMS.filter((p) => p.legality === "unofficial").every((p) => !p.url));
  });
  test("legal-free anime filter returns only legal-free anime", () => {
    assert.ok(filterPlatforms("anime", "legal_free").every((p) => p.kind === "anime" && p.legality === "legal_free"));
  });
});
