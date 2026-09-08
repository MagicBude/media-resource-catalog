import type {
  MediaDetail,
  MediaSearchResult,
} from "@media-resource-catalog/catalog";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:4100";

interface MediaListResponse {
  items: MediaSearchResult[];
}

export async function listCatalogMedia(options?: {
  type?: "movie" | "tv";
  limit?: number;
}): Promise<MediaSearchResult[]> {
  const searchParams = new URLSearchParams();

  if (options?.type) {
    searchParams.set("type", options.type);
  }
  if (options?.limit) {
    searchParams.set("limit", String(options.limit));
  }

  const query = searchParams.toString();
  const response = await fetch(`${apiBase}/api/v1/media${query ? `?${query}` : ""}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Catalog API returned HTTP ${response.status}.`);
  }

  return ((await response.json()) as MediaListResponse).items;
}

export async function searchCatalog(query: string): Promise<MediaSearchResult[]> {
  const response = await fetch(
    `${apiBase}/api/v1/media/search?q=${encodeURIComponent(query)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Catalog API returned HTTP ${response.status}.`);
  }

  return ((await response.json()) as MediaListResponse).items;
}

export async function getCatalogMedia(
  type: "movie" | "tv",
  tmdbId: string,
): Promise<MediaDetail | null> {
  const response = await fetch(
    `${apiBase}/api/v1/media/${type}/${encodeURIComponent(tmdbId)}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Catalog API returned HTTP ${response.status}.`);
  }

  return (await response.json()) as MediaDetail;
}

export function mediaYear(item: {
  releaseDate: string | null;
  firstAirDate: string | null;
}) {
  const date = item.releaseDate ?? item.firstAirDate;
  return date?.slice(0, 4) ?? "—";
}

export function mediaTypeLabel(type: "movie" | "tv") {
  return type === "movie" ? "电影" : "剧集";
}

export function tmdbImage(
  path: string | null,
  size: "w342" | "w500" | "w780" | "original" = "w500",
) {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}
