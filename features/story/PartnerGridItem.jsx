"use client"
import { data } from "./data"
import { SafeImage } from "@/components/ui/safe-image"
import { motion } from "motion/react"
import { AutoCarousel } from "@/components/molecules/AutoCarousel"

export function PartnerGridItem({ gridArea }) {
  const { partnersData } = data
  const { partners } = partnersData

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex h-full flex-col gap-4 bg-none xl:flex-row ${gridArea}`}
    >
      <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 font-bold text-red-600">
        <span className="text-base font-extrabold tracking-widest uppercase md:text-lg">
          VISION
        </span>
        <span className="px-1 text-xl leading-none text-red-600">•</span>
        <span className="text-base font-extrabold tracking-widest uppercase md:text-lg">
          LEADERSHIP
        </span>
        <span className="px-1 text-xl leading-none text-red-600">•</span>
        <span className="text-base font-extrabold tracking-widest uppercase md:text-lg">
          IMPACT
        </span>
      </div>
      <div className="flex h-full flex-1 items-center justify-between gap-4 rounded-xl bg-card lg:max-w-full xl:h-auto xl:max-w-111 2xl:max-w-154">
        <AutoCarousel
          transition="marquee"
          items={partners}
          autoPlay
          loop
          pauseOnHover
          stopOnInteraction={false}
          showChevronControls={false}
          showGradientMask={false}
          marqueeSpeed={90}
          gradientMaskClassName="py-2 lg:py-0"
          itemClassName="basis-1/2 md:basis-1/3"
          renderItem={(p) => (
            <div key={p.id} className="flex items-center justify-center">
              {p.image ? (
                <div className="relative h-10 w-32">
                  <SafeImage
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="128px"
                    objectFit="contain"
                  />
                </div>
              ) : (
                <span className="text-sm font-semibold text-gray-500">
                  {p.name}
                </span>
              )}
            </div>
          )}
        />
      </div>
    </motion.div>
  )
}
