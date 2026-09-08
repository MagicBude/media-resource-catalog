import type { MediaCatalogSnapshot } from "@media-resource-catalog/core";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { fileURLToPath } from "node:url";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { createDatabase } from "../client.js";
import { loadRepositoryEnv } from "../load-env.js";
import { genres, media } from "../schema.js";
import { MediaRepository } from "./media-repository.js";

loadRepositoryEnv();

const databaseTestUrl = process.env.DATABASE_TEST_URL;
const describeDatabase = databaseTestUrl ? describe : describe.skip;

describeDatabase("MediaRepository integration", () => {
  if (!databaseTestUrl) {
    return;
  }

  const { db, client } = createDatabase(databaseTestUrl);
  const repository = new MediaRepository(db);

  const snapshot: MediaCatalogSnapshot = {
    media: {
      type: "movie",
      tmdbId: 693134,
      title: "沙丘2",
      originalTitle: "Dune: Part Two",
      originalLanguage: "en",
      overview: "Integration test",
      releaseDate: "2024-02-27",
      firstAirDate: null,
      status: "Released",
      posterPath: "/poster.jpg",
      backdropPath: "/backdrop.jpg",
      runtime: 167,
      metadataUpdatedAt: new Date("2026-09-06T00:00:00Z"),
    },
    titles: [
      {
        title: "沙丘2",
        language: "zh-CN",
        region: null,
        kind: "primary",
      },
      {
        title: "Dune: Part Two",
        language: "en",
        region: null,
        kind: "original",
      },
      {
        title: "Duna 2",
        language: "und",
        region: "MX",
        kind: "alternative",
      },
      {
        title: "Duna 2",
        language: "und",
        region: "BR",
        kind: "alternative",
      },
    ],
    externalIds: [
      {
        provider: "tmdb",
        externalId: "693134",
        externalUrl: null,
      },
      {
        provider: "imdb",
        externalId: "tt15239678",
        externalUrl: null,
      },
    ],
    genres: [
      {
        tmdbId: 878,
        slug: "tmdb-878",
        name: "Science Fiction",
      },
    ],
    seasons: [],
  };

  beforeAll(async () => {
    await migrate(db, {
      migrationsFolder: fileURLToPath(
        new URL("../../migrations", import.meta.url),
      ),
    });
  });

  beforeEach(async () => {
    await db.delete(media);
    await db.delete(genres);
  });

  afterAll(async () => {
    await client.end();
  });

  it("persists a snapshot atomically and reads it back", async () => {
    const saved = await repository.saveSnapshot(snapshot);

    expect(saved.media).toMatchObject({
      type: "movie",
      tmdbId: 693134,
      title: "沙丘2",
    });
    expect(saved.externalIds).toContainEqual(
      expect.objectContaining({
        provider: "imdb",
        externalId: "tt15239678",
      }),
    );

    const regionalDunaTitles = saved.titles.filter(
      (title) =>
        title.title === "Duna 2" && title.kind === "alternative",
    );

    expect(regionalDunaTitles).toHaveLength(2);
    expect(regionalDunaTitles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ region: "MX" }),
        expect.objectContaining({ region: "BR" }),
      ]),
    );

    await expect(
      repository.search("Dune: Part Two", 20),
    ).resolves.toHaveLength(1);

    await expect(
      repository.search("imdb:tt15239678", 20),
    ).resolves.toHaveLength(1);

    await expect(repository.listRecent("movie", 20)).resolves.toHaveLength(1);
  });
});
