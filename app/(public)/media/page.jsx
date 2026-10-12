import { Heading } from "@/components/shared/Heading";
import { galleryData, galleryFetcher, GalleryGrid } from "@/features/gallery";

export const metadata = {
  title: "Media Gallery",
  description:
    "Browse photos and media highlights from Deepak Raj Bhusal's events, ventures, and community initiatives.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media Gallery | Deepak Raj Bhusal",
    description:
      "Photos and media highlights from Deepak Raj Bhusal's events, ventures, and community initiatives.",
    url: "/media",
  },
}

export default async function GalleryPage() {
  const data = await galleryFetcher() || galleryData;
  console.log(data)

  return (
    <div className="flex flex-col gap-8 py-8 container mx-auto">
      <div className="flex flex-col gap-2 self-center">
        <Heading>Media Gallery</Heading>
        <p className="text-chart-3 self-center text-base md:text-lg xl:text-xl">Explore media</p>
      </div>
      
      <GalleryGrid items={data?.items} />
    </div>
  );
}
