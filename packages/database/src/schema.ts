import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const mediaTypeEnum = pgEnum("media_type", ["movie", "tv"]);

/**
 * V0.1 Foundation placeholder.
 *
 * V0.2 must expand this table according to docs/data-model/media.md
 * instead of treating the current shape as the final Media schema.
 */
export const media = pgTable("media", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: mediaTypeEnum("type").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
