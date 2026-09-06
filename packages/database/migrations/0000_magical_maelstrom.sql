CREATE TYPE "public"."external_id_provider" AS ENUM('tmdb', 'imdb', 'douban', 'tvdb', 'anidb', 'bangumi', 'wikidata', 'other');--> statement-breakpoint
CREATE TYPE "public"."media_title_kind" AS ENUM('primary', 'original', 'translated', 'alternative', 'alias');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('movie', 'tv');--> statement-breakpoint
CREATE TABLE "episodes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"season_id" uuid NOT NULL,
	"tmdb_id" integer,
	"episode_number" integer NOT NULL,
	"name" text NOT NULL,
	"overview" text,
	"air_date" date,
	"runtime" integer,
	"still_path" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tmdb_id" integer NOT NULL,
	"slug" varchar(128) NOT NULL,
	"name" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "media_type" NOT NULL,
	"tmdb_id" integer NOT NULL,
	"title" text NOT NULL,
	"original_title" text,
	"original_language" varchar(16),
	"overview" text,
	"release_date" date,
	"first_air_date" date,
	"status" varchar(64),
	"poster_path" text,
	"backdrop_path" text,
	"runtime" integer,
	"metadata_updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_external_ids" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_id" uuid NOT NULL,
	"provider" "external_id_provider" NOT NULL,
	"external_id" text NOT NULL,
	"external_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_genres" (
	"media_id" uuid NOT NULL,
	"genre_id" uuid NOT NULL,
	CONSTRAINT "media_genres_pk" PRIMARY KEY("media_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "media_titles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_id" uuid NOT NULL,
	"title" text NOT NULL,
	"language" varchar(16) DEFAULT 'und' NOT NULL,
	"region" varchar(8),
	"kind" "media_title_kind" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seasons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"media_id" uuid NOT NULL,
	"tmdb_id" integer,
	"season_number" integer NOT NULL,
	"name" text NOT NULL,
	"overview" text,
	"air_date" date,
	"poster_path" text,
	"episode_count" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_external_ids" ADD CONSTRAINT "media_external_ids_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_genres" ADD CONSTRAINT "media_genres_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_genres" ADD CONSTRAINT "media_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_titles" ADD CONSTRAINT "media_titles_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "episodes_season_number_unique" ON "episodes" USING btree ("season_id","episode_number");--> statement-breakpoint
CREATE UNIQUE INDEX "episodes_tmdb_id_unique" ON "episodes" USING btree ("tmdb_id");--> statement-breakpoint
CREATE INDEX "episodes_season_id_idx" ON "episodes" USING btree ("season_id");--> statement-breakpoint
CREATE UNIQUE INDEX "genres_tmdb_id_unique" ON "genres" USING btree ("tmdb_id");--> statement-breakpoint
CREATE UNIQUE INDEX "genres_slug_unique" ON "genres" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "media_type_tmdb_id_unique" ON "media" USING btree ("type","tmdb_id");--> statement-breakpoint
CREATE INDEX "media_type_idx" ON "media" USING btree ("type");--> statement-breakpoint
CREATE INDEX "media_title_idx" ON "media" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "media_external_ids_provider_id_unique" ON "media_external_ids" USING btree ("provider","external_id");--> statement-breakpoint
CREATE INDEX "media_external_ids_media_id_idx" ON "media_external_ids" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "media_genres_genre_id_idx" ON "media_genres" USING btree ("genre_id");--> statement-breakpoint
CREATE UNIQUE INDEX "media_titles_media_title_kind_unique" ON "media_titles" USING btree ("media_id","title","kind");--> statement-breakpoint
CREATE INDEX "media_titles_media_id_idx" ON "media_titles" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "media_titles_title_idx" ON "media_titles" USING btree ("title");--> statement-breakpoint
CREATE UNIQUE INDEX "seasons_media_number_unique" ON "seasons" USING btree ("media_id","season_number");--> statement-breakpoint
CREATE UNIQUE INDEX "seasons_tmdb_id_unique" ON "seasons" USING btree ("tmdb_id");--> statement-breakpoint
CREATE INDEX "seasons_media_id_idx" ON "seasons" USING btree ("media_id");