"use client"

import { AutoCarousel } from "@/components/molecules/AutoCarousel"
import { MediaCard } from "./MediaCard"

export function MediaCarousel({ items }) {
  return (
    <AutoCarousel
      transition="marquee"
      items={items}
      renderItem={(item, i) => <MediaCard item={item} index={i} />}
      autoPlay
      loop
      pauseOnHover
      stopOnInteraction={false}
      showChevronControls={false}
      showGradientMask={false}
      marqueeSpeed={90}
      itemClassName="basis-full sm:basis-1/2 lg:basis-1/3"
      className="w-full"
    />
  )
}
