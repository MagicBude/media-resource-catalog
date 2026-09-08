import type {
  MediaCatalogService,
} from "@media-resource-catalog/catalog";
import type { FastifyInstance } from "fastify";

interface MediaRouteDependencies {
  catalog: Pick<MediaCatalogService, "getMedia" | "listRecent" | "search">;
}

type MediaRouteType = "movie" | "tv";

function isMediaType(value: string): value is MediaRouteType {
  return value === "movie" || value === "tv";
}

export function registerMediaRoutes(
  app: FastifyInstance,
  dependencies: MediaRouteDependencies,
) {
  app.get<{
    Querystring: {
      type?: string;
      limit?: string;
    };
  }>("/api/v1/media", async (request, reply) => {
    const typeText = request.query.type?.trim();
    let type: MediaRouteType | undefined;

    if (typeText) {
      if (!isMediaType(typeText)) {
        return reply.code(400).send({
          error: "INVALID_MEDIA_TYPE",
          message: "Media type must be movie or tv.",
        });
      }

      type = typeText;
    }

    const parsedLimit = Number(request.query.limit ?? "24");
    const limit = Number.isFinite(parsedLimit) ? parsedLimit : 24;

    return {
      items: await dependencies.catalog.listRecent(type, limit),
    };
  });

  app.get<{
    Querystring: {
      q?: string;
      limit?: string;
    };
  }>("/api/v1/media/search", async (request, reply) => {
    const query = request.query.q?.trim() ?? "";

    if (query.length === 0) {
      return reply.code(400).send({
        error: "INVALID_QUERY",
        message: "Query parameter q is required.",
      });
    }

    const parsedLimit = Number(request.query.limit ?? "20");
    const limit = Number.isFinite(parsedLimit) ? parsedLimit : 20;

    return {
      items: await dependencies.catalog.search(query, limit),
    };
  });

  app.get<{
    Params: {
      type: string;
      tmdbId: string;
    };
  }>("/api/v1/media/:type/:tmdbId", async (request, reply) => {
    const { type, tmdbId: tmdbIdText } = request.params;

    if (!isMediaType(type)) {
      return reply.code(400).send({
        error: "INVALID_MEDIA_TYPE",
        message: "Media type must be movie or tv.",
      });
    }

    const tmdbId = Number(tmdbIdText);
    if (!Number.isSafeInteger(tmdbId) || tmdbId <= 0) {
      return reply.code(400).send({
        error: "INVALID_TMDB_ID",
        message: "TMDB ID must be a positive integer.",
      });
    }

    const detail = await dependencies.catalog.getMedia(type, tmdbId);

    if (!detail) {
      return reply.code(404).send({
        error: "MEDIA_NOT_FOUND",
        message: `Media ${type}:${tmdbId} was not found in the catalog.`,
      });
    }

    return detail;
  });
}
