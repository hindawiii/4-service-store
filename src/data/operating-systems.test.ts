import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { OPERATING_SYSTEMS, rateOs } from "./operating-systems";

const win11 = OPERATING_SYSTEMS.find((o) => o.id === "win11")!;

describe("rateOs", () => {
  test("rejects Windows 11 without TPM", () => {
    assert.equal(rateOs(win11, { ramGb: 16, storageGb: 256, cpu: "modern", tpm: false, use: "gaming" }).fit, "no");
  });
  test("accepts Windows 11 on a modern PC with TPM and 8GB", () => {
    assert.equal(rateOs(win11, { ramGb: 8, storageGb: 256, cpu: "modern", tpm: true, use: "gaming" }).fit, "great");
  });
});
