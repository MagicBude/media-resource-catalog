export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbGenreListResponse {
  genres: TmdbGenre[];
}

export interface TmdbMovieDetails {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  release_date: string;
  status: string;
  poster_path: string | null;
  backdrop_path: string | null;
  runtime: number | null;
  genres: TmdbGenre[];
}

export interface TmdbTvSeasonSummary {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface TmdbTvDetails {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  overview: string;
  first_air_date: string;
  status: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: TmdbGenre[];
  seasons: TmdbTvSeasonSummary[];
}

export interface TmdbMovieAlternativeTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface TmdbMovieAlternativeTitlesResponse {
  id: number;
  titles: TmdbMovieAlternativeTitle[];
}

export interface TmdbTvAlternativeTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface TmdbTvAlternativeTitlesResponse {
  id: number;
  results: TmdbTvAlternativeTitle[];
}

export interface TmdbMovieExternalIds {
  id: number;
  imdb_id: string | null;
  wikidata_id: string | null;
}

export interface TmdbTvExternalIds {
  id: number;
  imdb_id: string | null;
  tvdb_id: number | null;
  wikidata_id: string | null;
}

export interface TmdbFindResponse {
  movie_results: Array<{ id: number; title: string }>;
  tv_results: Array<{ id: number; name: string }>;
  person_results: Array<{ id: number; name: string }>;
}

export interface TmdbMovieBundle {
  details: TmdbMovieDetails;
  alternativeTitles: TmdbMovieAlternativeTitlesResponse;
  externalIds: TmdbMovieExternalIds;
  canonicalGenres: TmdbGenreListResponse;
  language: string;
}

export interface TmdbTvBundle {
  details: TmdbTvDetails;
  alternativeTitles: TmdbTvAlternativeTitlesResponse;
  externalIds: TmdbTvExternalIds;
  canonicalGenres: TmdbGenreListResponse;
  language: string;
}
