import type { MediaSearchResult } from "@media-resource-catalog/catalog";
import { MediaGrid } from "../_components/media-card";
import { searchCatalog } from "../_lib/catalog";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const query = rawQuery?.trim() ?? "";

  let items: MediaSearchResult[] = [];
  let error = false;

  if (query) {
    try {
      items = await searchCatalog(query);
    } catch {
      error = true;
    }
  }

  return (
    <main className="pageShell">
      <header className="pageHeading searchHeading">
        <span className="sectionKicker">SEARCH</span>
        <h1>{query ? `“${query}”` : "搜索"}</h1>
        <form className="pageSearch" action="/search">
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
        {query && !error ? <p>{items.length} 个本地匹配结果</p> : null}
      </header>

      {error ? (
        <div className="noticePanel">
          暂时无法连接本地 Catalog API。请确认 <code>pnpm dev</code> 已启动。
        </div>
      ) : query ? (
        <MediaGrid
          items={items}
          emptyMessage="本地资料库没有匹配结果。当前搜索不会自动向 TMDB 写入数据。"
        />
      ) : (
        <div className="emptyPanel">输入片名、别名或 External ID 开始搜索。</div>
      )}
    </main>
  );
}
