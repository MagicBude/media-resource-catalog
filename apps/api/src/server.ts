import { MediaCatalogService } from "@media-resource-catalog/catalog";
import {
  createDatabase,
  MediaRepository,
} from "@media-resource-catalog/database";
import { buildApp } from "./app.js";
import { loadApiEnv } from "./load-env.js";

loadApiEnv();

const { db, client } = createDatabase();
const catalog = new MediaCatalogService(new MediaRepository(db));
const app = buildApp({ catalog });

const port = Number(process.env.API_PORT ?? 4100);
const host = process.env.API_HOST ?? "127.0.0.1";

app.addHook("onClose", async () => {
  await client.end();
});

try {
  await app.listen({ port, host });
} catch (error) {
  app.log.error(error);
  await client.end();
  process.exitCode = 1;
}
