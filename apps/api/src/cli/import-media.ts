import {
  MediaCatalogService,
  MediaImportService,
} from "@media-resource-catalog/catalog";
import {
  createDatabase,
  MediaRepository,
} from "@media-resource-catalog/database";
import {
  TmdbClient,
  TmdbMetadataProvider,
} from "@media-resource-catalog/providers";
import { loadApiEnv } from "../load-env.js";

loadApiEnv();

function usage(): never {
  console.error(
    "Usage: pnpm media:import -- <movie|tv> <tmdbId> [language]\n" +
      "Example: pnpm media:import -- movie 693134 zh-CN",
  );
  process.exit(1);
}

const cliArguments = process.argv.slice(2);
if (cliArguments[0] === "--") {
  cliArguments.shift();
}

const [typeText, tmdbIdText, language = "zh-CN"] = cliArguments;

if (typeText !== "movie" && typeText !== "tv") {
  usage();
}

// The guard above narrows typeText to the exact MediaType union.
// Keep this local instead of adding an unnecessary direct core dependency
// to the API package for a single type-only annotation.
const type = typeText;
const tmdbId = Number(tmdbIdText);

if (!Number.isSafeInteger(tmdbId) || tmdbId <= 0) {
  usage();
}

const accessToken = process.env.TMDB_ACCESS_TOKEN?.trim();
if (!accessToken) {
  throw new Error(
    "TMDB_ACCESS_TOKEN is required for real imports. Add it to the repository root .env.",
  );
}

const { db, client } = createDatabase();

try {
  const catalog = new MediaCatalogService(new MediaRepository(db));
  const importer = new MediaImportService(
    new TmdbMetadataProvider(new TmdbClient(accessToken)),
    catalog,
  );

  const detail = await importer.importMedia(type, tmdbId, language);

  console.log(
    JSON.stringify(
      {
        imported: true,
        type: detail.media.type,
        tmdbId: detail.media.tmdbId,
        title: detail.media.title,
        titles: detail.titles.length,
        externalIds: detail.externalIds.length,
        genres: detail.genres.length,
        seasons: detail.seasons.length,
      },
      null,
      2,
    ),
  );
} finally {
  await client.end();
}
