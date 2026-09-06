import type { MediaDetail } from "@media-resource-catalog/catalog";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface DetailPageProps {
  params: Promise<{
    tmdbId: string;
  }>;
}

async function getMedia(type: "movie" | "tv", tmdbId: string) {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:4100";

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

export default async function DetailPage({ params }: DetailPageProps) {
  const { tmdbId } = await params;
  const mediaType = "movie" as const;
  const detail = await getMedia(mediaType, tmdbId);

  if (!detail) {
    notFound();
  }

  const { media, titles, externalIds, genres, seasons } = detail;

  return (
    <main className="searchPage">
      <header className="searchHeader">
        <Link href="/">← 返回首页</Link>
        <h1>{media.title}</h1>
        <p className="lead">{media.originalTitle ?? "—"}</p>
      </header>

      <section className="grid">
        <article className="card">
          <div className="index">IDENTITY</div>
          <h3>TMDB {media.tmdbId}</h3>
          <p>{media.type.toUpperCase()}</p>
        </article>
        <article className="card">
          <div className="index">GENRES</div>
          <h3>{genres.length}</h3>
          <p>{genres.map((genre) => genre.name).join(" · ") || "—"}</p>
        </article>
        <article className="card">
          <div className="index">TITLES</div>
          <h3>{titles.length}</h3>
          <p>Primary / Original / Alternative</p>
        </article>
        <article className="card">
          <div className="index">EXTERNAL IDS</div>
          <h3>{externalIds.length}</h3>
          <p>
            {externalIds
              .map((item) => `${item.provider}:${item.externalId}`)
              .join(" · ") || "—"}
          </p>
        </article>
      </section>

      {media.type === "tv" ? (
        <section className="architecture">
          <div className="sectionHeading">
            <span>SEASONS</span>
            <h2>{seasons.length} 个季记录</h2>
          </div>
        </section>
      ) : null}
    </main>
  );
}
