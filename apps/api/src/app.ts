import type { MediaCatalogService } from "@media-resource-catalog/catalog";
import Fastify from "fastify";
import { registerMediaRoutes } from "./media-routes.js";

export interface AppDependencies {
  catalog: Pick<MediaCatalogService, "getMedia" | "search">;
}

export function buildApp(dependencies: AppDependencies) {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", () => ({
    status: "ok",
    service: "media-resource-catalog-api",
    version: "0.2.2",
  }));

  void app.register(registerMediaRoutes, dependencies);

  return app;
}
