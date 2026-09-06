import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { fileURLToPath } from "node:url";

config({
  path: fileURLToPath(new URL("../../.env", import.meta.url)),
  override: false,
  quiet: true,
});

const databaseUrl = process.env.DATABASE_URL;

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  ...(databaseUrl
    ? {
        dbCredentials: {
          url: databaseUrl,
        },
      }
    : {}),
  strict: true,
  verbose: true,
});
