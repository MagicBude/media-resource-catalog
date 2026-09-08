import type {
  CatalogExternalId,
  MediaDetail,
} from "@media-resource-catalog/catalog";
import Link from "next/link";
import { mediaTypeLabel, mediaYear, tmdbImage } from "../_lib/catalog";

function externalLink(
  mediaType: "movie" | "tv",
  item: CatalogExternalId,
): string | null {
  if (item.externalUrl) {
    return item.externalUrl;
  }

  switch (item.provider) {
    case "tmdb":
      return `https://www.themoviedb.org/${mediaType}/${item.externalId}`;
    case "imdb":
      return `https://www.imdb.com/title/${item.externalId}/`;
    case "wikidata":
      return `https://www.wikidata.org/wiki/${item.externalId}`;
    default:
      return null;
  }
}

function providerLabel(provider: CatalogExternalId["provider"]) {
  const labels: Record<CatalogExternalId["provider"], string> = {
    tmdb: "TMDB",
    imdb: "IMDb",
    douban: "豆瓣",
    tvdb: "TVDB",
    anidb: "AniDB",
    bangumi: "Bangumi",
    wikidata: "Wikidata",
    other: "其他",
  };

  return labels[provider];
}

function runtimeLabel(runtime: number | null) {
  if (!runtime) {
    return null;
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return hours > 0 ? `${hours} 小时 ${minutes} 分钟` : `${minutes} 分钟`;
}

export function MediaDetailView({ detail }: { detail: MediaDetail }) {
  const { media, titles, externalIds, genres, seasons } = detail;
  const poster = tmdbImage(media.posterPath, "w500");
  const backdrop = tmdbImage(media.backdropPath, "original");
  const year = mediaYear(media);
  const runtime = runtimeLabel(media.runtime);
  const visibleAliases = titles.filter(
    (item) =>
      item.kind === "alternative" &&
      item.title !== media.title &&
      item.title !== media.originalTitle,
  );

  return (
    <main className="detailPage">
      <section className="detailHero">
        {backdrop ? (
          <img className="detailBackdrop" src={backdrop} alt="" />
        ) : null}
        <div className="detailBackdropShade" />
        <div className="detailHeroInner">
          <div className="detailPoster">
            {poster ? <img src={poster} alt={`${media.title} 海报`} /> : <div className="posterFallback">暂无海报</div>}
          </div>

          <div className="detailSummary">
            <Link className="backLink" href="/browse">← 返回发现</Link>
            <h1>{media.title}</h1>
            {media.originalTitle && media.originalTitle !== media.title ? (
              <p className="originalTitle">{media.originalTitle}</p>
            ) : null}

            <div className="detailBadges">
              <span>{mediaTypeLabel(media.type)}</span>
              {year !== "—" ? <span>{year}</span> : null}
              {runtime ? <span>{runtime}</span> : null}
              {media.status ? <span>{media.status}</span> : null}
            </div>

            {genres.length > 0 ? (
              <div className="genreRow">
                {genres.map((genre) => (
                  <span key={genre.tmdbId}>{genre.name}</span>
                ))}
              </div>
            ) : null}

            {media.overview ? <p className="overview">{media.overview}</p> : null}

            {externalIds.length > 0 ? (
              <div className="externalLinks">
                {externalIds.map((item) => {
                  const href = externalLink(media.type, item);
                  return href ? (
                    <a
                      key={`${item.provider}:${item.externalId}`}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {providerLabel(item.provider)} ↗
                    </a>
                  ) : (
                    <span key={`${item.provider}:${item.externalId}`}>
                      {providerLabel(item.provider)} · {item.externalId}
                    </span>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="detailContent">
        <section className="contentSection releaseSection">
          <div className="sectionTitleRow">
            <div>
              <span className="sectionKicker">RELEASES</span>
              <h2>资源版本</h2>
            </div>
            <span className="sectionCount">V0.3</span>
          </div>
          <div className="releasePlaceholder">
            <div>
              <strong>Release 数据尚未接入</strong>
              <p>
                后续将在这里展示 2160p / REMUX / WEB-DL、视频与音频规格、
                Release Group，以及每个版本对应的 Share。
              </p>
            </div>
            <span>Media → Release → Share</span>
          </div>
        </section>

        {media.type === "tv" ? (
          <section className="contentSection">
            <div className="sectionTitleRow">
              <div>
                <span className="sectionKicker">SEASONS</span>
                <h2>季</h2>
              </div>
              <span className="sectionCount">{seasons.length}</span>
            </div>
            {seasons.length > 0 ? (
              <div className="seasonGrid">
                {seasons.map((season) => {
                  const seasonPoster = tmdbImage(season.posterPath, "w342");
                  return (
                    <article className="seasonCard" key={season.seasonNumber}>
                      <div className="seasonPoster">
                        {seasonPoster ? <img src={seasonPoster} alt="" /> : <div className="posterFallback">暂无海报</div>}
                      </div>
                      <div>
                        <h3>{season.name}</h3>
                        <p>
                          {season.airDate?.slice(0, 4) ?? "年份未知"}
                          {season.episodeCount !== null ? ` · ${season.episodeCount} 集` : ""}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="emptyPanel">暂时没有季数据。</div>
            )}
          </section>
        ) : null}

        <section className="detailColumns">
          <div className="contentSection detailInfoSection">
            <span className="sectionKicker">INFORMATION</span>
            <h2>影视信息</h2>
            <dl className="infoList">
              <div><dt>类型</dt><dd>{mediaTypeLabel(media.type)}</dd></div>
              <div><dt>年份</dt><dd>{year}</dd></div>
              <div><dt>原始语言</dt><dd>{media.originalLanguage ?? "—"}</dd></div>
              <div><dt>状态</dt><dd>{media.status ?? "—"}</dd></div>
              {runtime ? <div><dt>片长</dt><dd>{runtime}</dd></div> : null}
              <div><dt>TMDB ID</dt><dd>{media.tmdbId}</dd></div>
            </dl>
          </div>

          <div className="contentSection aliasSection">
            <span className="sectionKicker">ALTERNATIVE TITLES</span>
            <h2>别名</h2>
            {visibleAliases.length > 0 ? (
              <div className="aliasList">
                {visibleAliases.slice(0, 10).map((item, index) => (
                  <div key={`${item.title}:${item.region ?? ""}:${index}`}>
                    <span>{item.title}</span>
                    <small>{item.region ?? item.language}</small>
                  </div>
                ))}
                {visibleAliases.length > 10 ? (
                  <details>
                    <summary>查看其余 {visibleAliases.length - 10} 个别名</summary>
                    <div className="aliasList aliasListMore">
                      {visibleAliases.slice(10).map((item, index) => (
                        <div key={`${item.title}:${item.region ?? ""}:${index}`}>
                          <span>{item.title}</span>
                          <small>{item.region ?? item.language}</small>
                        </div>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
            ) : (
              <p className="mutedText">暂无其他别名。</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
