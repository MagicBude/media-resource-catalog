import type { MediaCatalogSnapshot } from "@media-resource-catalog/core";
import type { MetadataProvider } from "../../contracts/metadata-provider.js";
import type { TmdbClient } from "./client.js";
import {
  mapTmdbMovieBundle,
  mapTmdbTvBundle,
} from "./normalize.js";
import type {
  TmdbFindResponse,
  TmdbGenreListResponse,
  TmdbMovieAlternativeTitlesResponse,
  TmdbMovieBundle,
  TmdbMovieDetails,
  TmdbMovieExternalIds,
  TmdbTvAlternativeTitlesResponse,
  TmdbTvBundle,
  TmdbTvDetails,
  TmdbTvExternalIds,
} from "./types.js";

export class TmdbMetadataProvider implements MetadataProvider {
  public readonly id = "tmdb";
  public readonly name = "TMDB";

  public constructor(private readonly client: TmdbClient) {}

  public async getMovieBundle(
    movieId: number,
    language = "zh-CN",
  ): Promise<TmdbMovieBundle> {
    const [
      details,
      alternativeTitles,
      externalIds,
      canonicalGenres,
    ] = await Promise.all([
      this.client.get<TmdbMovieDetails>(`movie/${movieId}`, {
        language,
      }),
      this.client.get<TmdbMovieAlternativeTitlesResponse>(
        `movie/${movieId}/alternative_titles`,
      ),
      this.client.get<TmdbMovieExternalIds>(
        `movie/${movieId}/external_ids`,
      ),
      this.client.get<TmdbGenreListResponse>("genre/movie/list", {
        language: "en-US",
      }),
    ]);

    return {
      details,
      alternativeTitles,
      externalIds,
      canonicalGenres,
      language,
    };
  }

  public async getTvBundle(
    tvId: number,
    language = "zh-CN",
  ): Promise<TmdbTvBundle> {
    const [
      details,
      alternativeTitles,
      externalIds,
      canonicalGenres,
    ] = await Promise.all([
      this.client.get<TmdbTvDetails>(`tv/${tvId}`, {
        language,
      }),
      this.client.get<TmdbTvAlternativeTitlesResponse>(
        `tv/${tvId}/alternative_titles`,
      ),
      this.client.get<TmdbTvExternalIds>(`tv/${tvId}/external_ids`),
      this.client.get<TmdbGenreListResponse>("genre/tv/list", {
        language: "en-US",
      }),
    ]);

    return {
      details,
      alternativeTitles,
      externalIds,
      canonicalGenres,
      language,
    };
  }

  public async getMovieSnapshot(
    movieId: number,
    language = "zh-CN",
  ): Promise<MediaCatalogSnapshot> {
    return mapTmdbMovieBundle(
      await this.getMovieBundle(movieId, language),
    );
  }

  public async getTvSnapshot(
    tvId: number,
    language = "zh-CN",
  ): Promise<MediaCatalogSnapshot> {
    return mapTmdbTvBundle(await this.getTvBundle(tvId, language));
  }

  public async findByExternalId(
    externalId: string,
    externalSource: string,
    language = "zh-CN",
  ): Promise<TmdbFindResponse> {
    return this.client.get<TmdbFindResponse>(`find/${externalId}`, {
      external_source: externalSource,
      language,
    });
  }
}
