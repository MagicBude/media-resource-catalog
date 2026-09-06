import type { MediaSearchResult } from "@media-resource-catalog/catalog";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string | string[];
  }>;
}

interface SearchResponse {
  items: MediaSearchResult[];
}

async function searchCatalog(query: string): Promise<SearchResponse> {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:4100";

  const response = await fetch(
    `${apiBase}/api/v1/media/search?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Catalog API returned HTTP ${response.status}.`);
  }

  return (await response.json()) as SearchResponse;
}

function yearOf(item: MediaSearchResult) {
  const date = item.releaseDate ?? item.firstAirDate;
  return date?.slice(0, 4) ?? "—";
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = rawQuery?.trim() ?? "";

  let items: MediaSearchResult[] = [];
  let error: string | null = null;

  if (query) {
    try {
      items = (await searchCatalog(query)).items;
    } catch {
      error =
        "暂时无法连接本地 Catalog API。请确认 pnpm dev 已同时启动 Web 与 API。";
    }
  }

  return (
    <main className="searchPage">
      <header className="searchHeader">
        <Link href="/">← 返回首页</Link>
        <h1>搜索 Media</h1>

        <form className="searchShell" action="/search">
          <input
            name="q"
            type="search"
            defaultValue={query}
            placeholder="片名、别名、tmdb:693134、imdb:tt..."
            aria-label="搜索 Media"
            required
          />
          <button type="submit">搜索</button>
        </form>
      </header>

      {error ? <p className="searchMessage">{error}</p> : null}

      {!error && query && items.length === 0 ? (
        <p className="searchMessage">
          本地资料库暂时没有匹配结果。可以先通过 TMDB Import CLI
          导入作品。
        </p>
      ) : null}

      <section className="searchResults">
        {items.map((item) => (
          <Link
            key={item.id}
            className="resultCard"
            href={`/${item.type}/${item.tmdbId}`}
          >
            <div className="resultPoster">
              {item.posterPath ? (
                // TMDB image CDN is display-only; metadata remains local.
                <img
                  src={`https://image.tmdb.org/t/p/w185${item.posterPath}`}
                  alt=""
                />
              ) : (
                "NO POSTER"
              )}
            </div>

            <div className="resultBody">
              <h2>{item.title}</h2>
              <p>{item.originalTitle ?? "—"}</p>
            </div>

            <div className="resultMeta">
              <div>{item.type.toUpperCase()}</div>
              <div>{yearOf(item)}</div>
              <div>TMDB {item.tmdbId}</div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
