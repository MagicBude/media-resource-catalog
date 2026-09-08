import type { MediaSearchResult } from "@media-resource-catalog/catalog";
import { MediaGrid } from "../_components/media-card";
import { listCatalogMedia } from "../_lib/catalog";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface BrowsePageProps {
  searchParams: Promise<{ type?: string | string[] }>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;
  const rawType = Array.isArray(params.type) ? params.type[0] : params.type;
  const type = rawType === "movie" || rawType === "tv" ? rawType : undefined;

  let items: MediaSearchResult[] = [];
  let error = false;

  try {
    items = await listCatalogMedia({
      ...(type ? { type } : {}),
      limit: 48,
    });
  } catch {
    error = true;
  }

  const title = type === "movie" ? "电影" : type === "tv" ? "剧集" : "发现";

  return (
    <main className="pageShell">
      <header className="pageHeading">
        <span className="sectionKicker">BROWSE</span>
        <h1>{title}</h1>
        <p>浏览已经进入本地 Media Catalog 的作品。</p>
        <div className="filterTabs">
          <Link className={!type ? "active" : ""} href="/browse">全部</Link>
          <Link className={type === "movie" ? "active" : ""} href="/browse?type=movie">电影</Link>
          <Link className={type === "tv" ? "active" : ""} href="/browse?type=tv">剧集</Link>
        </div>
      </header>

      {error ? (
        <div className="noticePanel">暂时无法连接本地 Catalog API。</div>
      ) : (
        <MediaGrid items={items} />
      )}
    </main>
  );
}
