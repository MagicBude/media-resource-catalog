import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { loadRepositoryEnv } from "./load-env.js";
import * as schema from "./schema.js";

loadRepositoryEnv();

export type Database = PostgresJsDatabase<typeof schema>;

export function createDatabase(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required. Copy the repository root .env.example to .env.",
    );
  }

  const client = postgres(databaseUrl);
  const db = drizzle(client, { schema });

  return {
    db,
    client,
  };
}
