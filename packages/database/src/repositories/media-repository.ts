import type {
  EpisodeInput,
  GenreInput,
  MediaCatalogSnapshot,
  MediaExternalIdInput,
  MediaRecordInput,
  MediaTitleInput,
  MediaType,
  SeasonInput,
} from "@media-resource-catalog/core";
import {
  and,
  asc,
  desc,
  eq,
  ilike,
  notInArray,
  or,
} from "drizzle-orm";
import type { Database } from "../client.js";
import {
  episodes,
  genres,
  media,
  mediaExternalIds,
  mediaGenres,
  mediaTitles,
  seasons,
} from "../schema.js";

export class MediaRepository {
  public constructor(private readonly db: Database) {}

  public async findByTmdbId(type: MediaType, tmdbId: number) {
    const rows = await this.db
      .select()
      .from(media)
      .where(and(eq(media.type, type), eq(media.tmdbId, tmdbId)))
      .limit(1);

    return rows[0] ?? null;
  }

  public async findByExternalId(
    provider: MediaExternalIdInput["provider"],
    externalId: string,
  ) {
    const rows = await this.db
      .select({ media })
      .from(mediaExternalIds)
      .innerJoin(media, eq(mediaExternalIds.mediaId, media.id))
      .where(
        and(
          eq(mediaExternalIds.provider, provider),
          eq(mediaExternalIds.externalId, externalId),
        ),
      )
      .limit(1);

    return rows[0]?.media ?? null;
  }

  public async upsertMedia(input: MediaRecordInput) {
    const now = new Date();

    const rows = await this.db
      .insert(media)
      .values({
        ...input,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [media.type, media.tmdbId],
        set: {
          title: input.title,
          originalTitle: input.originalTitle,
          originalLanguage: input.originalLanguage,
          overview: input.overview,
          releaseDate: input.releaseDate,
          firstAirDate: input.firstAirDate,
          status: input.status,
          posterPath: input.posterPath,
          backdropPath: input.backdropPath,
          runtime: input.runtime,
          metadataUpdatedAt: input.metadataUpdatedAt,
          updatedAt: now,
        },
      })
      .returning();

    const row = rows[0];
    if (!row) {
      throw new Error("Failed to upsert media.");
    }

    return row;
  }

  public async replaceTitles(
    mediaId: string,
    inputs: readonly MediaTitleInput[],
  ) {
    await this.db.delete(mediaTitles).where(eq(mediaTitles.mediaId, mediaId));

    if (inputs.length > 0) {
      await this.db.insert(mediaTitles).values(
        inputs.map((input) => ({
          mediaId,
          ...input,
        })),
      );
    }
  }

  public async replaceExternalIds(
    mediaId: string,
    inputs: readonly MediaExternalIdInput[],
  ) {
    await this.db
      .delete(mediaExternalIds)
      .where(eq(mediaExternalIds.mediaId, mediaId));

    if (inputs.length > 0) {
      await this.db.insert(mediaExternalIds).values(
        inputs.map((input) => ({
          mediaId,
          ...input,
        })),
      );
    }
  }

  public async replaceGenres(
    mediaId: string,
    inputs: readonly GenreInput[],
  ) {
    await this.db.delete(mediaGenres).where(eq(mediaGenres.mediaId, mediaId));

    for (const input of inputs) {
      const rows = await this.db
        .insert(genres)
        .values(input)
        .onConflictDoUpdate({
          target: genres.tmdbId,
          set: {
            slug: input.slug,
            name: input.name,
            updatedAt: new Date(),
          },
        })
        .returning({ id: genres.id });

      const row = rows[0];
      if (!row) {
        throw new Error(`Failed to upsert genre ${input.tmdbId}.`);
      }

      await this.db
        .insert(mediaGenres)
        .values({
          mediaId,
          genreId: row.id,
        })
        .onConflictDoNothing();
    }
  }

  public async upsertSeasons(
    mediaId: string,
    inputs: readonly SeasonInput[],
  ) {
    const result: Array<typeof seasons.$inferSelect> = [];

    for (const input of inputs) {
      const now = new Date();
      const rows = await this.db
        .insert(seasons)
        .values({
          mediaId,
          ...input,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [seasons.mediaId, seasons.seasonNumber],
          set: {
            tmdbId: input.tmdbId,
            name: input.name,
            overview: input.overview,
            airDate: input.airDate,
            posterPath: input.posterPath,
            episodeCount: input.episodeCount,
            updatedAt: now,
          },
        })
        .returning();

      const row = rows[0];
      if (!row) {
        throw new Error(
          `Failed to upsert season ${input.seasonNumber}.`,
        );
      }

      result.push(row);
    }

    return result;
  }

  public async syncSeasons(
    mediaId: string,
    inputs: readonly SeasonInput[],
  ) {
    const rows = await this.upsertSeasons(mediaId, inputs);
    const activeNumbers = inputs.map((input) => input.seasonNumber);

    if (activeNumbers.length === 0) {
      await this.db.delete(seasons).where(eq(seasons.mediaId, mediaId));
    } else {
      await this.db
        .delete(seasons)
        .where(
          and(
            eq(seasons.mediaId, mediaId),
            notInArray(seasons.seasonNumber, activeNumbers),
          ),
        );
    }

    return rows;
  }

  public async upsertEpisodes(
    seasonId: string,
    inputs: readonly EpisodeInput[],
  ) {
    const result: Array<typeof episodes.$inferSelect> = [];

    for (const input of inputs) {
      const now = new Date();
      const rows = await this.db
        .insert(episodes)
        .values({
          seasonId,
          ...input,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: [episodes.seasonId, episodes.episodeNumber],
          set: {
            tmdbId: input.tmdbId,
            name: input.name,
            overview: input.overview,
            airDate: input.airDate,
            runtime: input.runtime,
            stillPath: input.stillPath,
            updatedAt: now,
          },
        })
        .returning();

      const row = rows[0];
      if (!row) {
        throw new Error(
          `Failed to upsert episode ${input.episodeNumber}.`,
        );
      }

      result.push(row);
    }

    return result;
  }

  public async saveSnapshot(snapshot: MediaCatalogSnapshot) {
    await this.db.transaction(async (transaction) => {
      const repository = new MediaRepository(transaction);

      const mediaRow = await repository.upsertMedia(snapshot.media);

      await repository.replaceTitles(mediaRow.id, snapshot.titles);
      await repository.replaceExternalIds(
        mediaRow.id,
        snapshot.externalIds,
      );
      await repository.replaceGenres(mediaRow.id, snapshot.genres);
      await repository.syncSeasons(mediaRow.id, snapshot.seasons);
    });

    const detail = await this.getByTmdbId(
      snapshot.media.type,
      snapshot.media.tmdbId,
    );

    if (!detail) {
      throw new Error("Media disappeared after snapshot transaction.");
    }

    return detail;
  }

  public async getByTmdbId(type: MediaType, tmdbId: number) {
    const mediaRow = await this.findByTmdbId(type, tmdbId);

    if (!mediaRow) {
      return null;
    }

    const [titleRows, externalIdRows, genreRows, seasonRows] =
      await Promise.all([
        this.db
          .select({
            title: mediaTitles.title,
            language: mediaTitles.language,
            region: mediaTitles.region,
            kind: mediaTitles.kind,
          })
          .from(mediaTitles)
          .where(eq(mediaTitles.mediaId, mediaRow.id))
          .orderBy(asc(mediaTitles.title)),
        this.db
          .select({
            provider: mediaExternalIds.provider,
            externalId: mediaExternalIds.externalId,
            externalUrl: mediaExternalIds.externalUrl,
          })
          .from(mediaExternalIds)
          .where(eq(mediaExternalIds.mediaId, mediaRow.id))
          .orderBy(asc(mediaExternalIds.provider)),
        this.db
          .select({
            tmdbId: genres.tmdbId,
            slug: genres.slug,
            name: genres.name,
          })
          .from(mediaGenres)
          .innerJoin(genres, eq(mediaGenres.genreId, genres.id))
          .where(eq(mediaGenres.mediaId, mediaRow.id))
          .orderBy(asc(genres.name)),
        this.db
          .select({
            tmdbId: seasons.tmdbId,
            seasonNumber: seasons.seasonNumber,
            name: seasons.name,
            overview: seasons.overview,
            airDate: seasons.airDate,
            posterPath: seasons.posterPath,
            episodeCount: seasons.episodeCount,
          })
          .from(seasons)
          .where(eq(seasons.mediaId, mediaRow.id))
          .orderBy(asc(seasons.seasonNumber)),
      ]);

    return {
      media: {
        id: mediaRow.id,
        type: mediaRow.type,
        tmdbId: mediaRow.tmdbId,
        title: mediaRow.title,
        originalTitle: mediaRow.originalTitle,
        originalLanguage: mediaRow.originalLanguage,
        overview: mediaRow.overview,
        releaseDate: mediaRow.releaseDate,
        firstAirDate: mediaRow.firstAirDate,
        status: mediaRow.status,
        posterPath: mediaRow.posterPath,
        backdropPath: mediaRow.backdropPath,
        runtime: mediaRow.runtime,
      },
      titles: titleRows,
      externalIds: externalIdRows,
      genres: genreRows,
      seasons: seasonRows,
    };
  }

  public async listRecent(type: MediaType | undefined, limit: number) {
    const selection = {
      id: media.id,
      type: media.type,
      tmdbId: media.tmdbId,
      title: media.title,
      originalTitle: media.originalTitle,
      releaseDate: media.releaseDate,
      firstAirDate: media.firstAirDate,
      posterPath: media.posterPath,
    };

    const query = this.db
      .select(selection)
      .from(media)
      .orderBy(desc(media.updatedAt))
      .limit(limit);

    if (!type) {
      return query;
    }

    return this.db
      .select(selection)
      .from(media)
      .where(eq(media.type, type))
      .orderBy(desc(media.updatedAt))
      .limit(limit);
  }

  public async search(query: string, limit: number) {
    const tmdbMatch = /^tmdb:(\d+)$/i.exec(query);
    const externalMatch =
      /^(imdb|douban|tvdb|anidb|bangumi|wikidata):(.+)$/i.exec(query);

    if (tmdbMatch) {
      const tmdbId = Number(tmdbMatch[1]);
      if (!Number.isSafeInteger(tmdbId)) {
        return [];
      }

      return this.db
        .select({
          id: media.id,
          type: media.type,
          tmdbId: media.tmdbId,
          title: media.title,
          originalTitle: media.originalTitle,
          releaseDate: media.releaseDate,
          firstAirDate: media.firstAirDate,
          posterPath: media.posterPath,
        })
        .from(media)
        .where(eq(media.tmdbId, tmdbId))
        .limit(limit);
    }

    if (externalMatch) {
      const provider = externalMatch[1]?.toLowerCase() as
        | "imdb"
        | "douban"
        | "tvdb"
        | "anidb"
        | "bangumi"
        | "wikidata";
      const externalId = externalMatch[2] ?? "";

      return this.db
        .select({
          id: media.id,
          type: media.type,
          tmdbId: media.tmdbId,
          title: media.title,
          originalTitle: media.originalTitle,
          releaseDate: media.releaseDate,
          firstAirDate: media.firstAirDate,
          posterPath: media.posterPath,
        })
        .from(mediaExternalIds)
        .innerJoin(media, eq(mediaExternalIds.mediaId, media.id))
        .where(
          and(
            eq(mediaExternalIds.provider, provider),
            eq(mediaExternalIds.externalId, externalId),
          ),
        )
        .limit(limit);
    }

    const normalizedExternalId = /^tt\d+$/i.test(query)
      ? query.toLowerCase()
      : query;
    const pattern = `%${query}%`;

    return this.db
      .selectDistinct({
        id: media.id,
        type: media.type,
        tmdbId: media.tmdbId,
        title: media.title,
        originalTitle: media.originalTitle,
        releaseDate: media.releaseDate,
        firstAirDate: media.firstAirDate,
        posterPath: media.posterPath,
      })
      .from(media)
      .leftJoin(mediaTitles, eq(mediaTitles.mediaId, media.id))
      .leftJoin(
        mediaExternalIds,
        eq(mediaExternalIds.mediaId, media.id),
      )
      .where(
        or(
          ilike(media.title, pattern),
          ilike(media.originalTitle, pattern),
          ilike(mediaTitles.title, pattern),
          eq(mediaExternalIds.externalId, normalizedExternalId),
        ),
      )
      .limit(limit);
  }
}
