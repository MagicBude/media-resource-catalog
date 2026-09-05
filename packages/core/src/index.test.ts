import { describe, expect, it } from "vitest";
import { CORE_MODEL } from "./index.js";

describe("core model", () => {
  it("keeps the architecture baseline explicit", () => {
    expect(CORE_MODEL).toEqual([
      "Media",
      "Release",
      "Share",
      "Provenance",
    ]);
  });
});
