import type {
  EpisodeInput,
  GenreInput,
  MediaExternalIdInput,
  MediaRecordInput,
  MediaTitleInput,
  SeasonInput,
} from "@media-resource-catalog/core";
import { and, eq } from "drizzle-orm";
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

  public async findByTmdbId(
    type: MediaRecordInput["type"],
    tmdbId: number,
  ) {
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

    if (inputs.length === 0) {
      return;
    }

    await this.db.insert(mediaTitles).values(
      inputs.map((input) => ({
        mediaId,
        ...input,
      })),
    );
  }

  public async replaceExternalIds(
    mediaId: string,
    inputs: readonly MediaExternalIdInput[],
  ) {
    await this.db
      .delete(mediaExternalIds)
      .where(eq(mediaExternalIds.mediaId, mediaId));

    if (inputs.length === 0) {
      return;
    }

    await this.db.insert(mediaExternalIds).values(
      inputs.map((input) => ({
        mediaId,
        ...input,
      })),
    );
  }

  public async replaceGenres(
    mediaId: string,
    inputs: readonly GenreInput[],
  ) {
    await this.db
      .delete(mediaGenres)
      .where(eq(mediaGenres.mediaId, mediaId));

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
}
