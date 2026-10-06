"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Play } from "lucide-react"
import { motion } from "motion/react"
import { mediaData } from "./mediaData"
import { MoreButton } from "@/components/shared/MoreButton"

import { cn } from "@/lib/utils"
import { AutoCarousel } from "@/components/molecules/AutoCarousel"

const easeOut = [0.22, 1, 0.36, 1]


function MediaCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
      className="group relative h-full"
    >
      <Link href={item.href} className="block h-full">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-muted sm:aspect-5/4 lg:aspect-4/3">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 h-1/2",
              "bg-linear-to-t from-black/70 via-black/30 to-transparent",
              "opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0"
            )}
          />

          {item.isVideo && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-transform duration-500 group-hover:scale-0 group-hover:opacity-0 sm:size-14 lg:size-16">
                <Play className="ml-0.5 size-5 fill-current sm:size-6 lg:size-7" />
              </div>
            </div>
          )}

          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6",
              "opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0"
            )}
          >
            <p className="text-lg leading-snug font-extrabold text-white sm:text-xl lg:text-2xl">
              {item.title}
            </p>
          </div>

          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-end",
              "bg-linear-to-t from-black/85 via-black/50 to-transparent",
              "p-4 sm:p-5 lg:p-6",
              "opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            )}
          >
            <h3 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
              {item.title}
            </h3>

            <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-white/85 sm:text-sm lg:text-base">
              {item.description}
            </p>

            <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-lg bg-chart-3 px-4 py-2 text-sm font-semibold text-primary-foreground sm:text-base">
              Learn More
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function Media() {
  const { title, items } = mediaData

  return (
    <section
      id="media"
      className="relative w-full bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto flex flex-col  px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h2>

        <div>
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-15 flex justify-center"
        >
          <Link
            href="/media"
            className="flex items-center gap-2 rounded-2xl bg-foreground px-8 py-3 text-base font-semibold text-background transition-opacity duration-300 hover:opacity-80 md:text-lg"
          >
            More Media <ArrowUpRight className="h-5 w-5" />
          </Link>
        </motion.div>

      </div>

    </section>
  )
}
