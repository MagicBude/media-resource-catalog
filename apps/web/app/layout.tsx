import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media Resource Catalog",
  description:
    "A structured media resource catalog for movies, TV shows, releases, shares, and provenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
