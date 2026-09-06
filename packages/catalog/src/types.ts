import type {
  ExternalIdProvider,
  MediaCatalogSnapshot,
  MediaTitleKind,
  MediaType,
} from "@media-resource-catalog/core";

export interface CatalogMediaRecord {
  id: string;
  type: MediaType;
  tmdbId: number;
  title: string;
  originalTitle: string | null;
  originalLanguage: string | null;
  overview: string | null;
  releaseDate: string | null;
  firstAirDate: string | null;
  status: string | null;
  posterPath: string | null;
  backdropPath: string | null;
  runtime: number | null;
}

export interface CatalogMediaTitle {
  title: string;
  language: string;
  region: string | null;
  kind: MediaTitleKind;
}

export interface CatalogExternalId {
  provider: ExternalIdProvider;
  externalId: string;
  externalUrl: string | null;
}

export interface CatalogGenre {
  tmdbId: number;
  slug: string;
  name: string;
}

export interface CatalogSeason {
  tmdbId: number | null;
  seasonNumber: number;
  name: string;
  overview: string | null;
  airDate: string | null;
  posterPath: string | null;
  episodeCount: number | null;
}

export interface MediaDetail {
  media: CatalogMediaRecord;
  titles: CatalogMediaTitle[];
  externalIds: CatalogExternalId[];
  genres: CatalogGenre[];
  seasons: CatalogSeason[];
}

export interface MediaSearchResult {
  id: string;
  type: MediaType;
  tmdbId: number;
  title: string;
  originalTitle: string | null;
  releaseDate: string | null;
  firstAirDate: string | null;
  posterPath: string | null;
}

export interface MediaCatalogStore {
  saveSnapshot(snapshot: MediaCatalogSnapshot): Promise<MediaDetail>;
  getByTmdbId(type: MediaType, tmdbId: number): Promise<MediaDetail | null>;
  search(query: string, limit: number): Promise<MediaSearchResult[]>;
}
