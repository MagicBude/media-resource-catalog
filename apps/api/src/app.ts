import Fastify from "fastify";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", async () => ({
    status: "ok",
    service: "media-resource-catalog-api",
    version: "0.1.0",
  }));

  return app;
}
