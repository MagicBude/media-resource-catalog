import type { MediaCatalogSnapshot } from "@media-resource-catalog/core";

export interface MetadataProvider {
  readonly id: string;
  readonly name: string;

  getMovieSnapshot(
    providerMediaId: number,
    language?: string,
  ): Promise<MediaCatalogSnapshot>;

  getTvSnapshot(
    providerMediaId: number,
    language?: string,
  ): Promise<MediaCatalogSnapshot>;
}
