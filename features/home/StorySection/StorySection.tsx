"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { storyData } from "./storyData"

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: easeOut },
  }),
}

export function Story() {
  const { title, paragraphs, image, badge } = storyData

  return (
    <section
      id="story"
      className="relative w-full bg-story bg-cover bg-no-repeat py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto rounded-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="py-2 sm:py-6 md:py-10 lg:py-12 xl:py-14"
        >
          <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ── Left: Image + badge ── */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl">
                <div className="relative aspect-4/5 max-h-180 w-full sm:aspect-3/4 md:aspect-4/5">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
                className="absolute right-2 bottom-6 flex flex-col items-center justify-center rounded-2xl border-8 border-destructive bg-background px-4 py-3 shadow-xl sm:right-4 sm:px-5 sm:py-4 md:-right-4 md:bottom-10 lg:-right-8"
              >
                <span className="text-2xl leading-none font-extrabold text-chart-3 sm:text-3xl md:text-5xl lg:text-6xl">
                  {badge.value}
                </span>
                <span className="mt-1 text-xs font-bold text-foreground sm:text-base md:text-xl lg:text-2xl">
                  {badge.label}
                </span>
              </motion.div>
            </div>

            <div className="text-primary-foreground">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-80px" }}
                custom={0}
                className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {title}
              </motion.h2>

              <div className="mt-5 space-y-4 sm:mt-6">
                {paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-80px" }}
                    custom={i + 1}
                    className="text-sm leading-relaxed sm:text-base lg:text-lg xl:text-xl"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
