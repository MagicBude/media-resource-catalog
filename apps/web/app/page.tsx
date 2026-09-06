const architecture = [
  {
    name: "Media",
    description: "电影与剧集本身，是整个资料库的根实体。",
  },
  {
    name: "Release",
    description: "2160p、REMUX、WEB-DL 等具体资源版本。",
  },
  {
    name: "Share",
    description: "115、光鸭等资源版本的实际分享位置。",
  },
  {
    name: "Provenance",
    description: "记录数据由谁、从哪里、在什么时候被发现。",
  },
] as const;

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">MEDIA RESOURCE CATALOG · V0.2</div>
        <h1>找到你真正想要的那个版本。</h1>
        <p className="lead">
          Media Catalog 已进入正式建设：作品、多语言标题、外部 ID、
          Genre 与剧集结构正在成为可查询的数据基础。
        </p>

        <div className="searchShell" aria-label="搜索功能占位">
          <span>搜索电影、剧集、TMDB / IMDb / 豆瓣 ID</span>
          <button type="button" disabled>
            V0.2.2 开放
          </button>
        </div>
      </section>

      <section className="architecture">
        <div className="sectionHeading">
          <span>CORE MODEL</span>
          <h2>Media → Release → Share → Provenance</h2>
        </div>

        <div className="grid">
          {architecture.map((item, index) => (
            <article key={item.name} className="card">
              <div className="index">0{index + 1}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>V0.2 · Media Catalog / Metadata Foundation</footer>
    </main>
  );
}
