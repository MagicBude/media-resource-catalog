import type { MediaType } from "@media-resource-catalog/core";
import type { MetadataProvider } from "@media-resource-catalog/providers";
import type { MediaCatalogService } from "./media-catalog-service.js";
import type { MediaDetail } from "./types.js";

export class MediaImportService {
  public constructor(
    private readonly metadataProvider: MetadataProvider,
    private readonly catalog: MediaCatalogService,
  ) {}

  public async importMedia(
    type: MediaType,
    tmdbId: number,
    language = "zh-CN",
  ): Promise<MediaDetail> {
    const snapshot =
      type === "movie"
        ? await this.metadataProvider.getMovieSnapshot(tmdbId, language)
        : await this.metadataProvider.getTvSnapshot(tmdbId, language);

    if (snapshot.media.type !== type || snapshot.media.tmdbId !== tmdbId) {
      throw new Error(
        `Metadata provider returned mismatched media identity for ${type}:${tmdbId}.`,
      );
    }

    return this.catalog.saveSnapshot(snapshot);
  }
}
