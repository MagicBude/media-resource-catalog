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
          Media Catalog 已支持正式作品入库与本地搜索。先确认作品，
          再进入 Release 与 Share。
        </p>

        <form className="searchShell" action="/search">
          <input
            name="q"
            type="search"
            placeholder="搜索电影、剧集、TMDB / IMDb ID"
            aria-label="搜索电影和剧集"
            required
          />
          <button type="submit">搜索</button>
        </form>
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

      <footer>V0.2.2 · Import → PostgreSQL → API → Search</footer>
    </main>
  );
}
