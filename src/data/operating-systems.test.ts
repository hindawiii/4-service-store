import { describe, expect, it } from "vitest";
import { OPERATING_SYSTEMS, rateOs } from "./operating-systems";

const win11 = OPERATING_SYSTEMS.find((o) => o.id === "win11")!;

describe("rateOs", () => {
  it("rejects Windows 11 without TPM", () => {
    const r = rateOs(win11, { ramGb: 16, storageGb: 256, cpu: "modern", tpm: false, use: "gaming" });
    expect(r.fit).toBe("no");
  });
  it("accepts Windows 11 on a modern PC with TPM and 8GB", () => {
    expect(rateOs(win11, { ramGb: 8, storageGb: 256, cpu: "modern", tpm: true, use: "gaming" }).fit).toBe("great");
  });
});
