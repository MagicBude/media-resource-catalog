import type {
  ExternalIdProvider,
  MediaCatalogSnapshot,
  MediaExternalIdInput,
  MediaTitleInput,
} from "@media-resource-catalog/core";
import type {
  TmdbGenre,
  TmdbMovieBundle,
  TmdbTvBundle,
} from "./types.js";

function toDateOrNull(value: string | null | undefined): string | null {
  return value && value.length > 0 ? value : null;
}

function dedupeTitles(
  inputs: readonly MediaTitleInput[],
): MediaTitleInput[] {
  const seen = new Set<string>();
  const result: MediaTitleInput[] = [];

  for (const input of inputs) {
    const key = [
      input.title.trim().toLocaleLowerCase(),
      input.kind,
      input.language,
      input.region ?? "",
    ].join("\u0000");

    if (input.title.trim().length > 0 && !seen.has(key)) {
      seen.add(key);
      result.push(input);
    }
  }

  return result;
}

function externalId(
  provider: ExternalIdProvider,
  value: string | number | null | undefined,
): MediaExternalIdInput | null {
  if (value === null || value === undefined || String(value).length === 0) {
    return null;
  }

  return {
    provider,
    externalId: String(value),
    externalUrl: null,
  };
}

function compact<T>(values: Array<T | null>): T[] {
  return values.filter((value): value is T => value !== null);
}

function normalizeGenreName(
  genre: TmdbGenre,
  canonicalGenres: readonly TmdbGenre[],
) {
  return (
    canonicalGenres.find((candidate) => candidate.id === genre.id)?.name ??
    genre.name
  );
}

function mapGenres(
  genres: readonly TmdbGenre[],
  canonicalGenres: readonly TmdbGenre[],
) {
  return genres.map((genre) => ({
    tmdbId: genre.id,
    slug: `tmdb-${genre.id}`,
    name: normalizeGenreName(genre, canonicalGenres),
  }));
}

export function mapTmdbMovieBundle(
  bundle: TmdbMovieBundle,
): MediaCatalogSnapshot {
  const { details, alternativeTitles, externalIds } = bundle;

  const titles = dedupeTitles([
    {
      title: details.title,
      language: bundle.language,
      region: null,
      kind: "primary",
    },
    {
      title: details.original_title,
      language: details.original_language || "und",
      region: null,
      kind: "original",
    },
    ...alternativeTitles.titles.map((title) => ({
      title: title.title,
      language: "und",
      region: title.iso_3166_1 || null,
      kind: "alternative" as const,
    })),
  ]);

  return {
    media: {
      type: "movie",
      tmdbId: details.id,
      title: details.title,
      originalTitle: details.original_title || null,
      originalLanguage: details.original_language || null,
      overview: details.overview || null,
      releaseDate: toDateOrNull(details.release_date),
      firstAirDate: null,
      status: details.status || null,
      posterPath: details.poster_path,
      backdropPath: details.backdrop_path,
      runtime: details.runtime,
      metadataUpdatedAt: new Date(),
    },
    titles,
    externalIds: compact([
      externalId("tmdb", details.id),
      externalId("imdb", externalIds.imdb_id),
      externalId("wikidata", externalIds.wikidata_id),
    ]),
    genres: mapGenres(details.genres, bundle.canonicalGenres.genres),
    seasons: [],
  };
}

export function mapTmdbTvBundle(
  bundle: TmdbTvBundle,
): MediaCatalogSnapshot {
  const { details, alternativeTitles, externalIds } = bundle;

  const titles = dedupeTitles([
    {
      title: details.name,
      language: bundle.language,
      region: null,
      kind: "primary",
    },
    {
      title: details.original_name,
      language: details.original_language || "und",
      region: null,
      kind: "original",
    },
    ...alternativeTitles.results.map((title) => ({
      title: title.title,
      language: "und",
      region: title.iso_3166_1 || null,
      kind: "alternative" as const,
    })),
  ]);

  return {
    media: {
      type: "tv",
      tmdbId: details.id,
      title: details.name,
      originalTitle: details.original_name || null,
      originalLanguage: details.original_language || null,
      overview: details.overview || null,
      releaseDate: null,
      firstAirDate: toDateOrNull(details.first_air_date),
      status: details.status || null,
      posterPath: details.poster_path,
      backdropPath: details.backdrop_path,
      runtime: null,
      metadataUpdatedAt: new Date(),
    },
    titles,
    externalIds: compact([
      externalId("tmdb", details.id),
      externalId("imdb", externalIds.imdb_id),
      externalId("tvdb", externalIds.tvdb_id),
      externalId("wikidata", externalIds.wikidata_id),
    ]),
    genres: mapGenres(details.genres, bundle.canonicalGenres.genres),
    seasons: details.seasons.map((season) => ({
      tmdbId: season.id,
      seasonNumber: season.season_number,
      name: season.name,
      overview: season.overview || null,
      airDate: toDateOrNull(season.air_date),
      posterPath: season.poster_path,
      episodeCount: season.episode_count,
    })),
  };
}
