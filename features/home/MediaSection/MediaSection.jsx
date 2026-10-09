import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { mediaData } from "./mediaData"
import { mediaFetcher } from "./mediaFetcher"
import { MediaCarousel } from "./MediaCarousel"

export async function Media() {
  const { title, items } = mediaData
  const media = await mediaFetcher()

  const mediaItems = media?.items || items

  return (
    <section
      id="media"
      className="relative w-full bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto flex flex-col px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h2>

        <div>
          <MediaCarousel items={mediaItems} />
        </div>

        <div className="mt-15 flex justify-center">
          <Link
            href="/media"
            className="flex items-center gap-2 rounded-2xl bg-foreground px-8 py-3 text-base font-semibold text-background transition-opacity duration-300 hover:opacity-80 md:text-lg"
          >
            More Media <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
