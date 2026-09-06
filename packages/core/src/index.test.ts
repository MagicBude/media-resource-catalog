import { describe, expect, it } from "vitest";
import {
  CORE_MODEL,
  EXTERNAL_ID_PROVIDERS,
  MEDIA_TITLE_KINDS,
  MEDIA_TYPES,
} from "./index.js";

describe("core model", () => {
  it("keeps the architecture baseline explicit", () => {
    expect(CORE_MODEL).toEqual([
      "Media",
      "Release",
      "Share",
      "Provenance",
    ]);
  });

  it("exposes stable media catalog enums", () => {
    expect(MEDIA_TYPES).toEqual(["movie", "tv"]);
    expect(MEDIA_TITLE_KINDS).toContain("translated");
    expect(EXTERNAL_ID_PROVIDERS).toContain("tmdb");
    expect(EXTERNAL_ID_PROVIDERS).toContain("wikidata");
  });
});
