import type {
  MediaDetail,
  MediaSearchResult,
} from "@media-resource-catalog/catalog";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildApp } from "./app.js";

const apps: ReturnType<typeof buildApp>[] = [];

const detail: MediaDetail = {
  media: {
    id: "media-1",
    type: "movie",
    tmdbId: 693134,
    title: "沙丘2",
    originalTitle: "Dune: Part Two",
    originalLanguage: "en",
    overview: null,
    releaseDate: "2024-02-27",
    firstAirDate: null,
    status: "Released",
    posterPath: null,
    backdropPath: null,
    runtime: 167,
  },
  titles: [],
  externalIds: [],
  genres: [],
  seasons: [],
};

function buildTestApp() {
  const catalog = {
    getMedia: vi.fn(() => Promise.resolve(detail)),
    listRecent: vi.fn(() => Promise.resolve([detail.media])),
    search: vi.fn(
      (): Promise<MediaSearchResult[]> => Promise.resolve([detail.media]),
    ),
  };
  const app = buildApp({ catalog });
  apps.push(app);

  return { app, catalog };
}

afterEach(async () => {
  await Promise.all(apps.splice(0).map((app) => app.close()));
});

describe("API", () => {
  it("returns API health information", async () => {
    const { app } = buildTestApp();

    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      service: "media-resource-catalog-api",
      version: "0.2.3",
    });
  });

  it("lists recently updated local media", async () => {
    const { app, catalog } = buildTestApp();

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/media?type=movie&limit=12",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      items: [detail.media],
    });
    expect(catalog.listRecent).toHaveBeenCalledWith("movie", 12);
  });

  it("searches the local media catalog", async () => {
    const { app, catalog } = buildTestApp();

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/media/search?q=Dune",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      items: [detail.media],
    });
    expect(catalog.search).toHaveBeenCalledWith("Dune", 20);
  });

  it("returns media details by TMDB identity", async () => {
    const { app, catalog } = buildTestApp();

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/media/movie/693134",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(detail);
    expect(catalog.getMedia).toHaveBeenCalledWith("movie", 693134);
  });
});
