export interface TmdbClientOptions {
  accessToken: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

export class TmdbHttpError extends Error {
  public constructor(
    public readonly status: number,
    public readonly payload: unknown,
  ) {
    super(`TMDB request failed with HTTP ${status}.`);
    this.name = "TmdbHttpError";
  }
}

export class TmdbClient {
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  public constructor(private readonly accessToken: string, options?: Omit<TmdbClientOptions, "accessToken">) {
    if (accessToken.trim().length === 0) {
      throw new Error("TMDB access token must not be empty.");
    }

    this.baseUrl = options?.baseUrl ?? "https://api.themoviedb.org/3/";
    this.fetchImpl = options?.fetchImpl ?? fetch;
    this.timeoutMs = options?.timeoutMs ?? 15_000;
  }

  public async get<T>(
    path: string,
    query: Readonly<Record<string, string | number | undefined>> = {},
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await this.fetchImpl(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        signal: controller.signal,
      });

      const payload: unknown = await response.json();

      if (!response.ok) {
        throw new TmdbHttpError(response.status, payload);
      }

      return payload as T;
    } finally {
      clearTimeout(timeout);
    }
  }
}
