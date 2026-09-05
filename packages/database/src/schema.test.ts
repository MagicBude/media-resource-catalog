import { describe, expect, it } from "vitest";
import { media } from "./schema.js";

describe("database schema", () => {
  it("defines the foundation media table", () => {
    expect(media).toBeDefined();
  });
});
