import { resolveUrl } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

export function GalleryCard({ item }) {
  if (!item) {
    return null;
  }
  return (
    <SafeImage
      src={resolveUrl(item.url)}
      alt={item.alt || item.title}
      height={0}
      width={0}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      objectFit='contain'
    className='w-full h-auto rounded-2xl shadow-md'
    />
  )
}

