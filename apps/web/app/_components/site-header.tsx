import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/browse", label: "发现" },
  { href: "/browse?type=movie", label: "电影" },
  { href: "/browse?type=tv", label: "剧集" },
] as const;

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="siteHeaderInner">
        <Link className="brand" href="/" aria-label="Media Resource Catalog 首页">
          <span className="brandMark">M</span>
          <span className="brandText">
            <strong>MRC</strong>
            <small>Media Resource Catalog</small>
          </span>
        </Link>

        <nav className="siteNav" aria-label="主导航">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <form className="headerSearch" action="/search">
          <span aria-hidden="true">⌕</span>
          <input
            name="q"
            type="search"
            placeholder="搜索片名、别名、TMDB / IMDb"
            aria-label="搜索影视资料"
            required
          />
        </form>
      </div>
    </header>
  );
}
