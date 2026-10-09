import { Heading } from "@/components/shared/Heading";
import { galleryData, galleryFetcher, GalleryGrid } from "@/features/gallery";

export default async function GalleryPage() {
  const data = await galleryFetcher() || galleryData;
  console.log(data)

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2 self-center">
        <Heading>Media Gallery</Heading>
        <p className="text-chart-3 self-center text-base md:text-lg xl:text-xl">Explore media</p>
      </div>
      
      <GalleryGrid items={data?.items} />
    </div>
  );
}
