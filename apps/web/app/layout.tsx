import type { Metadata } from "next";
import { SiteHeader } from "./_components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Media Resource Catalog",
    template: "%s · Media Resource Catalog",
  },
  description:
    "以 Media → Release → Share → Provenance 组织电影、剧集与资源版本的结构化影视资料库。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
        <footer className="siteFooter">
          <div>
            <strong>Media Resource Catalog</strong>
            <span>Media → Release → Share → Provenance</span>
          </div>
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </footer>
      </body>
    </html>
  );
}
