export const MEDIA_TYPES = ["movie", "tv"] as const;
export type MediaType = (typeof MEDIA_TYPES)[number];

export const MEDIA_TITLE_KINDS = [
  "primary",
  "original",
  "translated",
  "alternative",
  "alias",
] as const;
export type MediaTitleKind = (typeof MEDIA_TITLE_KINDS)[number];

export const EXTERNAL_ID_PROVIDERS = [
  "tmdb",
  "imdb",
  "douban",
  "tvdb",
  "anidb",
  "bangumi",
  "wikidata",
  "other",
] as const;
export type ExternalIdProvider = (typeof EXTERNAL_ID_PROVIDERS)[number];

export interface MediaRecordInput {
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
  metadataUpdatedAt: Date;
}

export interface MediaTitleInput {
  title: string;
  language: string;
  region: string | null;
  kind: MediaTitleKind;
}

export interface MediaExternalIdInput {
  provider: ExternalIdProvider;
  externalId: string;
  externalUrl: string | null;
}

export interface GenreInput {
  tmdbId: number;
  slug: string;
  name: string;
}

export interface SeasonInput {
  tmdbId: number | null;
  seasonNumber: number;
  name: string;
  overview: string | null;
  airDate: string | null;
  posterPath: string | null;
  episodeCount: number | null;
}

export interface EpisodeInput {
  tmdbId: number | null;
  episodeNumber: number;
  name: string;
  overview: string | null;
  airDate: string | null;
  runtime: number | null;
  stillPath: string | null;
}

export interface MediaCatalogSnapshot {
  media: MediaRecordInput;
  titles: MediaTitleInput[];
  externalIds: MediaExternalIdInput[];
  genres: GenreInput[];
  seasons: SeasonInput[];
}
