import type { MediaSearchResult } from "@media-resource-catalog/catalog";
import Link from "next/link";
import { mediaTypeLabel, mediaYear, tmdbImage } from "../_lib/catalog";

export function MediaCard({ item }: { item: MediaSearchResult }) {
  const poster = tmdbImage(item.posterPath, "w342");

  return (
    <Link className="mediaCard" href={`/${item.type}/${item.tmdbId}`}>
      <div className="mediaPoster">
        {poster ? <img src={poster} alt="" /> : <div className="posterFallback">暂无海报</div>}
        <span className="typeBadge">{mediaTypeLabel(item.type)}</span>
      </div>
      <div className="mediaCardBody">
        <h3>{item.title}</h3>
        {item.originalTitle && item.originalTitle !== item.title ? (
          <p>{item.originalTitle}</p>
        ) : null}
        <div className="mediaCardMeta">
          <span>{mediaYear(item)}</span>
          <span>TMDB {item.tmdbId}</span>
        </div>
      </div>
    </Link>
  );
}

export function MediaGrid({
  items,
  emptyMessage = "本地资料库暂时没有可展示的作品。",
}: {
  items: MediaSearchResult[];
  emptyMessage?: string;
}) {
  if (items.length === 0) {
    return <div className="emptyPanel">{emptyMessage}</div>;
  }

  return (
    <div className="mediaGrid">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
