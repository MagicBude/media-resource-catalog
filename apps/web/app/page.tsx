import type { MediaSearchResult } from "@media-resource-catalog/catalog";
import Link from "next/link";
import { MediaGrid } from "./_components/media-card";
import { listCatalogMedia } from "./_lib/catalog";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let items: MediaSearchResult[] = [];
  let unavailable = false;

  try {
    items = await listCatalogMedia({ limit: 24 });
  } catch {
    unavailable = true;
  }

  const movies = items.filter((item) => item.type === "movie").slice(0, 12);
  const shows = items.filter((item) => item.type === "tv").slice(0, 12);

  return (
    <main className="homePage">
      <section className="homeHero">
        <div>
          <span className="heroKicker">MEDIA RESOURCE CATALOG</span>
          <h1>找到你真正想要的那个版本。</h1>
          <p>
            先建立可信的影视资料，再围绕同一作品组织不同 Release 与 Share。
            现在 Media Catalog 已经支持真实 TMDB 入库、本地搜索和详情浏览。
          </p>
        </div>
        <form className="heroSearch" action="/search">
          <input
            name="q"
            type="search"
            placeholder="搜索电影、剧集、别名、TMDB / IMDb ID"
            aria-label="搜索影视资料"
            required
          />
          <button type="submit">搜索</button>
        </form>
      </section>

      {unavailable ? (
        <div className="noticePanel">
          暂时无法连接本地 Catalog API。请确认 <code>pnpm dev</code> 已启动。
        </div>
      ) : null}

      <section className="catalogSection">
        <div className="sectionTitleRow">
          <div>
            <span className="sectionKicker">RECENTLY ADDED</span>
            <h2>最近入库</h2>
          </div>
          <Link href="/browse">查看全部 →</Link>
        </div>
        <MediaGrid
          items={items.slice(0, 12)}
          emptyMessage="还没有作品。可以先使用 TMDB Import CLI 导入电影或剧集。"
        />
      </section>

      {movies.length > 0 ? (
        <section className="catalogSection">
          <div className="sectionTitleRow">
            <div>
              <span className="sectionKicker">MOVIES</span>
              <h2>电影</h2>
            </div>
            <Link href="/browse?type=movie">查看全部 →</Link>
          </div>
          <MediaGrid items={movies} />
        </section>
      ) : null}

      {shows.length > 0 ? (
        <section className="catalogSection">
          <div className="sectionTitleRow">
            <div>
              <span className="sectionKicker">TV</span>
              <h2>剧集</h2>
            </div>
            <Link href="/browse?type=tv">查看全部 →</Link>
          </div>
          <MediaGrid items={shows} />
        </section>
      ) : null}
    </main>
  );
}
