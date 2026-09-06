import type { MediaCatalogSnapshot, MediaType } from "@media-resource-catalog/core";
import type {
  MediaCatalogStore,
  MediaDetail,
  MediaSearchResult,
} from "./types.js";

export class MediaCatalogService {
  public constructor(private readonly store: MediaCatalogStore) {}

  public saveSnapshot(
    snapshot: MediaCatalogSnapshot,
  ): Promise<MediaDetail> {
    return this.store.saveSnapshot(snapshot);
  }

  public getMedia(
    type: MediaType,
    tmdbId: number,
  ): Promise<MediaDetail | null> {
    return this.store.getByTmdbId(type, tmdbId);
  }

  public search(
    query: string,
    limit = 20,
  ): Promise<MediaSearchResult[]> {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length === 0) {
      return Promise.resolve([]);
    }

    const normalizedLimit = Math.min(Math.max(limit, 1), 50);

    return this.store.search(normalizedQuery, normalizedLimit);
  }
}
