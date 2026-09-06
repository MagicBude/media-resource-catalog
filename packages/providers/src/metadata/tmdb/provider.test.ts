import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { TmdbClient } from "./client.js";
import { TmdbMetadataProvider } from "./provider.js";

function readFixture(name: string): unknown {
  const url = new URL(`../../../fixtures/tmdb/${name}`, import.meta.url);
  return JSON.parse(readFileSync(fileURLToPath(url), "utf8")) as unknown;
}

function fixtureResponse(name: string) {
  return new Response(JSON.stringify(readFixture(name)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function buildFetchMock() {
  return vi.fn<typeof fetch>((input, init) => {
    const url = new URL(
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url,
    );

    expect(init?.headers).toMatchObject({
      Authorization: "Bearer test-token",
    });

    if (url.pathname.endsWith("/movie/693134")) {
      expect(url.searchParams.get("language")).toBe("zh-CN");
      return Promise.resolve(fixtureResponse("movie-details.json"));
    }
    if (url.pathname.endsWith("/movie/693134/alternative_titles")) {
      return Promise.resolve(
        fixtureResponse("movie-alternative-titles.json"),
      );
    }
    if (url.pathname.endsWith("/movie/693134/external_ids")) {
      return Promise.resolve(
        fixtureResponse("movie-external-ids.json"),
      );
    }
    if (url.pathname.endsWith("/genre/movie/list")) {
      expect(url.searchParams.get("language")).toBe("en-US");
      return Promise.resolve(fixtureResponse("movie-genres.json"));
    }

    if (url.pathname.endsWith("/tv/1399")) {
      return Promise.resolve(fixtureResponse("tv-details.json"));
    }
    if (url.pathname.endsWith("/tv/1399/alternative_titles")) {
      return Promise.resolve(
        fixtureResponse("tv-alternative-titles.json"),
      );
    }
    if (url.pathname.endsWith("/tv/1399/external_ids")) {
      return Promise.resolve(fixtureResponse("tv-external-ids.json"));
    }
    if (url.pathname.endsWith("/genre/tv/list")) {
      return Promise.resolve(fixtureResponse("tv-genres.json"));
    }

    return Promise.reject(
      new Error(`Unexpected TMDB fixture request: ${url}`),
    );
  });
}

describe("TmdbMetadataProvider", () => {
  it("normalizes movie metadata without database side effects", async () => {
    const fetchMock = buildFetchMock();
    const provider = new TmdbMetadataProvider(
      new TmdbClient("test-token", { fetchImpl: fetchMock }),
    );

    const snapshot = await provider.getMovieSnapshot(693134);

    expect(snapshot.media).toMatchObject({
      type: "movie",
      tmdbId: 693134,
      title: "沙丘2",
      originalTitle: "Dune: Part Two",
      runtime: 167,
    });
    expect(snapshot.externalIds).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          provider: "imdb",
          externalId: "tt15239678",
        }),
      ]),
    );
    expect(snapshot.genres).toContainEqual({
      tmdbId: 878,
      slug: "tmdb-878",
      name: "Science Fiction",
    });
    expect(
      snapshot.titles.some((title) => title.title === "沙丘：第二部"),
    ).toBe(true);
  });

  it("normalizes TV seasons and external IDs", async () => {
    const provider = new TmdbMetadataProvider(
      new TmdbClient("test-token", { fetchImpl: buildFetchMock() }),
    );

    const snapshot = await provider.getTvSnapshot(1399);

    expect(snapshot.media).toMatchObject({
      type: "tv",
      tmdbId: 1399,
      title: "权力的游戏",
    });
    expect(snapshot.externalIds).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          provider: "tvdb",
          externalId: "121361",
        }),
      ]),
    );
    expect(snapshot.seasons).toContainEqual(
      expect.objectContaining({
        seasonNumber: 1,
        episodeCount: 10,
      }),
    );
  });
});
