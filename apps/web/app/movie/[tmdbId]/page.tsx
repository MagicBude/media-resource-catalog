import { notFound } from "next/navigation";
import { MediaDetailView } from "../../_components/media-detail";
import { getCatalogMedia } from "../../_lib/catalog";

export const dynamic = "force-dynamic";

interface DetailPageProps {
  params: Promise<{ tmdbId: string }>;
}

export default async function MovieDetailPage({ params }: DetailPageProps) {
  const { tmdbId } = await params;
  const detail = await getCatalogMedia("movie", tmdbId);

  if (!detail) {
    notFound();
  }

  return <MediaDetailView detail={detail} />;
}
