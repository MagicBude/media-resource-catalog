import {
  EXTERNAL_ID_PROVIDERS,
  MEDIA_TITLE_KINDS,
  MEDIA_TYPES,
} from "@media-resource-catalog/core";
import { getTableName } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import {
  episodes,
  externalIdProviderEnum,
  genres,
  media,
  mediaExternalIds,
  mediaGenres,
  mediaTitleKindEnum,
  mediaTitles,
  mediaTypeEnum,
  seasons,
} from "./schema.js";

describe("media catalog schema", () => {
  it("defines all V0.2 media catalog tables", () => {
    expect([
      media,
      mediaTitles,
      mediaExternalIds,
      genres,
      mediaGenres,
      seasons,
      episodes,
    ].map(getTableName)).toEqual([
      "media",
      "media_titles",
      "media_external_ids",
      "genres",
      "media_genres",
      "seasons",
      "episodes",
    ]);
  });

  it("keeps database enum values aligned with core", () => {
    expect(mediaTypeEnum.enumValues).toEqual(MEDIA_TYPES);
    expect(mediaTitleKindEnum.enumValues).toEqual(MEDIA_TITLE_KINDS);
    expect(externalIdProviderEnum.enumValues).toEqual(
      EXTERNAL_ID_PROVIDERS,
    );
  });
});
