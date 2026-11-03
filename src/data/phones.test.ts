import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { filterTools } from "./phones";

describe("filterTools", () => {
  test("MediaTek filter includes SP Flash Tool and excludes QFIL", () => {
    const ids = filterTools("mediatek", false).map((t) => t.id);
    assert.ok(ids.includes("spflash"));
    assert.ok(!ids.includes("qfil"));
  });
  test("free-only hides paid tools", () => {
    assert.ok(filterTools("any", true).every((t) => t.free));
  });
});
