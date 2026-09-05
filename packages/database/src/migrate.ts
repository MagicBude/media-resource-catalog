import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { createDatabase } from "./client.js";

const { db, client } = createDatabase();

try {
  await migrate(db, {
    migrationsFolder: "./migrations",
  });
} finally {
  await client.end();
}
