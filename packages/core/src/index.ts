export type MediaType = "movie" | "tv";

export const CORE_MODEL = [
  "Media",
  "Release",
  "Share",
  "Provenance",
] as const;

export type CoreModelEntity = (typeof CORE_MODEL)[number];
