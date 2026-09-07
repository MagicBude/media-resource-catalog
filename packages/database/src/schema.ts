import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const mediaTypes = ["movie", "tv"] as const;
const mediaTitleKinds = [
  "primary",
  "original",
  "translated",
  "alternative",
  "alias",
] as const;
const externalIdProviders = [
  "tmdb",
  "imdb",
  "douban",
  "tvdb",
  "anidb",
  "bangumi",
  "wikidata",
  "other",
] as const;

/**
 * Drizzle Kit loads this schema through its own runtime loader.
 *
 * Keep the enum literals local to this file instead of importing runtime
 * constants through a workspace TypeScript source entry. The schema test
 * compares these values with packages/core so the duplicated boundary cannot
 * silently drift.
 */
export const mediaTypeEnum = pgEnum("media_type", mediaTypes);
export const mediaTitleKindEnum = pgEnum(
  "media_title_kind",
  mediaTitleKinds,
);
export const externalIdProviderEnum = pgEnum(
  "external_id_provider",
  externalIdProviders,
);

export const media = pgTable(
  "media",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    type: mediaTypeEnum("type").notNull(),
    tmdbId: integer("tmdb_id").notNull(),

    title: text("title").notNull(),
    originalTitle: text("original_title"),
    originalLanguage: varchar("original_language", { length: 16 }),
    overview: text("overview"),

    releaseDate: date("release_date", { mode: "string" }),
    firstAirDate: date("first_air_date", { mode: "string" }),
    status: varchar("status", { length: 64 }),

    posterPath: text("poster_path"),
    backdropPath: text("backdrop_path"),
    runtime: integer("runtime"),

    metadataUpdatedAt: timestamp("metadata_updated_at", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("media_type_tmdb_id_unique").on(table.type, table.tmdbId),
    index("media_type_idx").on(table.type),
    index("media_title_idx").on(table.title),
  ],
);

export const mediaTitles = pgTable(
  "media_titles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mediaId: uuid("media_id")
      .notNull()
      .references(() => media.id, { onDelete: "cascade" }),

    title: text("title").notNull(),
    language: varchar("language", { length: 16 })
      .default("und")
      .notNull(),
    region: varchar("region", { length: 8 }),
    kind: mediaTitleKindEnum("kind").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("media_titles_identity_unique").on(
      table.mediaId,
      table.title,
      table.kind,
      table.language,
      table.region,
    ),
    index("media_titles_media_id_idx").on(table.mediaId),
    index("media_titles_title_idx").on(table.title),
  ],
);

export const mediaExternalIds = pgTable(
  "media_external_ids",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mediaId: uuid("media_id")
      .notNull()
      .references(() => media.id, { onDelete: "cascade" }),

    provider: externalIdProviderEnum("provider").notNull(),
    externalId: text("external_id").notNull(),
    externalUrl: text("external_url"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("media_external_ids_provider_id_unique").on(
      table.provider,
      table.externalId,
    ),
    index("media_external_ids_media_id_idx").on(table.mediaId),
  ],
);

export const genres = pgTable(
  "genres",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tmdbId: integer("tmdb_id").notNull(),
    slug: varchar("slug", { length: 128 }).notNull(),
    name: varchar("name", { length: 128 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("genres_tmdb_id_unique").on(table.tmdbId),
    uniqueIndex("genres_slug_unique").on(table.slug),
  ],
);

export const mediaGenres = pgTable(
  "media_genres",
  {
    mediaId: uuid("media_id")
      .notNull()
      .references(() => media.id, { onDelete: "cascade" }),
    genreId: uuid("genre_id")
      .notNull()
      .references(() => genres.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.mediaId, table.genreId],
      name: "media_genres_pk",
    }),
    index("media_genres_genre_id_idx").on(table.genreId),
  ],
);

export const seasons = pgTable(
  "seasons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    mediaId: uuid("media_id")
      .notNull()
      .references(() => media.id, { onDelete: "cascade" }),

    tmdbId: integer("tmdb_id"),
    seasonNumber: integer("season_number").notNull(),
    name: text("name").notNull(),
    overview: text("overview"),
    airDate: date("air_date", { mode: "string" }),
    posterPath: text("poster_path"),
    episodeCount: integer("episode_count"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("seasons_media_number_unique").on(
      table.mediaId,
      table.seasonNumber,
    ),
    uniqueIndex("seasons_tmdb_id_unique").on(table.tmdbId),
    index("seasons_media_id_idx").on(table.mediaId),
  ],
);

export const episodes = pgTable(
  "episodes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    seasonId: uuid("season_id")
      .notNull()
      .references(() => seasons.id, { onDelete: "cascade" }),

    tmdbId: integer("tmdb_id"),
    episodeNumber: integer("episode_number").notNull(),
    name: text("name").notNull(),
    overview: text("overview"),
    airDate: date("air_date", { mode: "string" }),
    runtime: integer("runtime"),
    stillPath: text("still_path"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("episodes_season_number_unique").on(
      table.seasonId,
      table.episodeNumber,
    ),
    uniqueIndex("episodes_tmdb_id_unique").on(table.tmdbId),
    index("episodes_season_id_idx").on(table.seasonId),
  ],
);
