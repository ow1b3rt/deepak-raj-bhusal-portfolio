import { galleryData, GalleryGrid } from "@/features/gallery";

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-col gap-2 self-center">
        <h1 className="text-2xl md:text-3xl xl:text-4xl self-center font-bold">Gallery</h1>
        <p className="text-chart-3 self-center text-base md:text-lg xl:text-xl">Explore our collection of images and artworks.</p>
      </div>
      
      <GalleryGrid items={galleryData.items} />
    </div>
  );
}
