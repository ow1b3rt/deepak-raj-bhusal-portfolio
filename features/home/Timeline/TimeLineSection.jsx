"use client"

import React, { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TIMELINE_DATA } from "./timelineData"

function getNodePosition(index, total, activeIndex) {
  const spacing = 180 / (total - 1)

  let offset = (index - activeIndex) % total
  const half = Math.floor(total / 2)
  if (offset > half) {
    offset -= total
  } else if (offset < -half) {
    offset += total
  }

  // angle decreases as offset increases
  const angleDeg = 90 - offset * spacing
  const angleRad = (angleDeg * Math.PI) / 180

  const x = 50 + 50 * Math.cos(angleRad)
  const y = 50 - 50 * Math.sin(angleRad)

  // Since all nodes are now always within 0 to 180 degrees, opacity is always 1.
  // We keep it for consistency or if we want to fade out during jump.
  const opacity = 1

  return { x, y: y * 2, opacity, angleDeg }
}

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(3)
  const sectionRef = useRef(null)

  const active = TIMELINE_DATA[activeIndex]
  const total = TIMELINE_DATA.length

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total)
  }, [total])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="timeline-heading"
      className="relative w-full overflow-hidden bg-background py-12 sm:py-16 lg:py-24"
    >
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            id="timeline-heading"
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            TimeLine
          </h1>
        </motion.div>

        <div className="relative mt-8 sm:mt-10 lg:mt-14">
          <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/30 bg-primary/10 sm:rounded-2xl" />

          <div
            className="relative mx-auto w-full"
            style={{ maxHeight: "58rem" }}
          >
            <div className="relative aspect-2/1 max-h-200 w-full">
              <div className="absolute inset-0 p-[4%] sm:p-[5%] lg:p-[4%]">
                <div className="relative h-full w-full">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 50"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                  >
                    <defs>
                      <clipPath id="tl-arc-clip">
                        <path d="M 0 50 A 50 50 0 0 1 100 50 Z" />
                      </clipPath>
                    </defs>

                    <foreignObject
                      x="0"
                      y="0"
                      width="100"
                      height="50"
                      clipPath="url(#tl-arc-clip)"
                    >
                      <div
                        // eslint-disable-next-line react/no-unknown-property
                        xmlns="http://www.w3.org/1999/xhtml"
                        className="h-full w-full bg-story bg-cover bg-no-repeat"
                      />
                    </foreignObject>
                  </svg>

                  <div className="absolute inset-0">
                    {TIMELINE_DATA.map((item, i) => {
                      const { x, y, opacity } = getNodePosition(
                        i,
                        total,
                        activeIndex
                      )
                      const isActive = i === activeIndex
                      return (
                        <motion.button
                          key={item.year}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          aria-pressed={isActive}
                          aria-label={`Show ${item.year} milestone`}
                          className="group absolute z-2 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                          initial={false}
                          animate={{
                            left: `${x}%`,
                            top: `${y}%`,
                            opacity,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 45,
                            damping: 12,
                            mass: 0.9,
                          }}
                          style={{
                            pointerEvents: opacity === 0 ? "none" : "auto",
                          }}
                        >
                          <motion.span
                            animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                            whileHover={{ scale: isActive ? 1.15 : 1.08 }}
                            whileTap={{ scale: 0.94 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className={cn(
                              "relative flex items-center justify-center rounded-full font-semibold transition-colors",
                              "h-9 w-9 text-[10px]",
                              "sm:h-11 sm:w-11 sm:text-[11px]",
                              "md:h-12 md:w-12 md:text-xs",
                              "lg:h-16 lg:w-16 lg:text-sm",
                              "xl:h-18 xl:w-18 xl:text-base",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-[0_0_40px_-8px_var(--primary)]"
                                : "bg-foreground/85 text-background hover:bg-foreground"
                            )}
                          >
                            {item.year}
                            <span
                              aria-hidden="true"
                              className={cn(
                                "pointer-events-none absolute -inset-1.5 rounded-full border transition-opacity",
                                isActive
                                  ? "border-primary/60 opacity-100"
                                  : "border-transparent opacity-0 group-focus-visible:border-ring group-focus-visible:opacity-100"
                              )}
                            />
                          </motion.span>
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="pointer-events-none absolute inset-0 hidden items-center justify-center pt-[10%] lg:flex">
                    <div className="pointer-events-auto w-[90%] max-w-4xl xl:max-w-5xl">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={active.year}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="flex items-center gap-8 text-left xl:gap-12"
                        >
                          <div className="relative aspect-square w-56 shrink-0 overflow-hidden rounded-full border-4 border-background/20 shadow-xl lg:w-72 xl:w-80">
                            <Image
                              src={active.image}
                              alt={`${active.year} — ${active.title}`}
                              fill
                              sizes="(max-width: 1280px) 288px, 320px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-primary-foreground lg:text-3xl xl:text-4xl">
                              {active.title}
                            </h3>

                            <p className="mt-4 text-base leading-relaxed text-primary-foreground/90 lg:text-lg xl:text-xl">
                              {active.body}
                            </p>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 px-4 lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.year}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left"
              >
                <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-full border-4 border-primary/10 shadow-lg sm:w-40">
                  <Image
                    src={active.image}
                    alt={`${active.year} — ${active.title}`}
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground sm:text-xl">
                    {active.title}
                  </h3>

                  <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                    {active.body}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8 sm:gap-5">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous milestone"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-primary text-primary transition-colors hover:bg-chart-3 hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:h-12 sm:w-12 lg:h-11 lg:w-11"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next milestone"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-primary text-primary transition-colors hover:bg-chart-3 hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:h-12 sm:w-12 lg:h-11 lg:w-11"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
