import type { MediaCatalogSnapshot } from "@media-resource-catalog/core";
import type { MetadataProvider } from "@media-resource-catalog/providers";
import { describe, expect, it, vi } from "vitest";
import { MediaCatalogService } from "./media-catalog-service.js";
import { MediaImportService } from "./media-import-service.js";
import type {
  MediaCatalogStore,
  MediaDetail,
} from "./types.js";

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

function createStore() {
  const saveSnapshot = vi.fn(() => Promise.resolve(detail));
  const getByTmdbId = vi.fn(() => Promise.resolve(detail));
  const search = vi.fn(() => Promise.resolve([detail.media]));

  const store: MediaCatalogStore = {
    saveSnapshot,
    getByTmdbId,
    search,
  };

  return {
    store,
    spies: {
      saveSnapshot,
      getByTmdbId,
      search,
    },
  };
}

function createSnapshot(tmdbId = 693134): MediaCatalogSnapshot {
  return {
    media: {
      type: "movie",
      tmdbId,
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
      metadataUpdatedAt: new Date(),
    },
    titles: [],
    externalIds: [],
    genres: [],
    seasons: [],
  };
}

describe("MediaCatalogService", () => {
  it("normalizes empty queries and clamps limits", async () => {
    const { store, spies } = createStore();
    const service = new MediaCatalogService(store);

    await expect(service.search("   ")).resolves.toEqual([]);
    expect(spies.search).not.toHaveBeenCalled();

    await service.search("Dune", 999);
    expect(spies.search).toHaveBeenCalledWith("Dune", 50);
  });
});

describe("MediaImportService", () => {
  it("imports a provider snapshot through the catalog store", async () => {
    const { store, spies } = createStore();
    const catalog = new MediaCatalogService(store);
    const snapshot = createSnapshot();

    const getMovieSnapshot = vi.fn(() => Promise.resolve(snapshot));
    const getTvSnapshot = vi.fn(() =>
      Promise.reject(new Error("not used")),
    );

    const metadataProvider: MetadataProvider = {
      id: "fixture",
      name: "Fixture",
      getMovieSnapshot,
      getTvSnapshot,
    };

    const importer = new MediaImportService(metadataProvider, catalog);

    await expect(
      importer.importMedia("movie", 693134, "zh-CN"),
    ).resolves.toEqual(detail);

    expect(getMovieSnapshot).toHaveBeenCalledWith(693134, "zh-CN");
    expect(spies.saveSnapshot).toHaveBeenCalledWith(snapshot);
  });

  it("rejects a provider identity mismatch", async () => {
    const { store } = createStore();
    const catalog = new MediaCatalogService(store);
    const mismatchedSnapshot = createSnapshot(1);

    const getMovieSnapshot = vi.fn(() =>
      Promise.resolve(mismatchedSnapshot),
    );
    const getTvSnapshot = vi.fn(() =>
      Promise.reject(new Error("not used")),
    );

    const metadataProvider: MetadataProvider = {
      id: "fixture",
      name: "Fixture",
      getMovieSnapshot,
      getTvSnapshot,
    };

    const importer = new MediaImportService(metadataProvider, catalog);

    await expect(
      importer.importMedia("movie", 693134),
    ).rejects.toThrow("mismatched media identity");
  });
});
