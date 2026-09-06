import type { MediaType } from "@media-resource-catalog/core";

export interface ResourceSearchContext {
  mediaId: string;
  mediaType: MediaType;
  tmdbId: number;
  titles: readonly string[];
  year: number | null;
  query: string;
}

export interface ResourceCandidate {
  providerId: string;
  rawTitle: string;
  rawUrl: string | null;
  rawPayload: unknown;
}

export interface ResourceProvider {
  readonly id: string;
  readonly name: string;

  search(
    context: ResourceSearchContext,
  ): Promise<ResourceCandidate[]>;
}
