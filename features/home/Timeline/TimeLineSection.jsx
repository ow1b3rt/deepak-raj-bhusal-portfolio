"use client"

import React, { useState, useRef, useCallback } from "react"
import Image from "next/image"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TIMELINE_DATA } from "./timelineData"

function getNodePosition(index, total) {
  const angleDeg = 180 - (180 / (total - 1)) * index
  const angleRad = (angleDeg * Math.PI) / 180

  const x = 50 + 47 * Math.cos(angleRad)
  const y = 50 - 50 * Math.sin(angleRad)

  return { x, y: y * 2 }
}

const MAX_ROTATION = 3

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(3)
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const active = TIMELINE_DATA[activeIndex]
  const total = TIMELINE_DATA.length

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const rotationRange = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-MAX_ROTATION, MAX_ROTATION, -MAX_ROTATION]
  )

  const rotation = useSpring(rotationRange, {
    stiffness: 35,
    damping: 22,
    mass: 0.9,
  })

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
                    preserveAspectRatio="xMidYMid meet"
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

                  <motion.div
                    style={{
                      rotate: prefersReducedMotion ? 0 : rotation,
                      originX: 0.5,
                      originY: 1,
                    }}
                    className="absolute inset-0"
                  >
                    {TIMELINE_DATA.map((item, i) => {
                      const { x, y } = getNodePosition(i, total)
                      const isActive = i === activeIndex
                      return (
                        <button
                          key={item.year}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          aria-pressed={isActive}
                          aria-label={`Show ${item.year} milestone`}
                          className="group absolute z-2 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                          style={{ left: `${x}%`, top: `${y}%` }}
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
                        </button>
                      )
                    })}
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 hidden items-end justify-center pb-6 lg:flex">
                    <div className="pointer-events-auto w-[70%] max-w-105 text-center xl:max-w-120">
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
                        >
                          <div className="relative mx-auto mb-2 aspect-video w-full max-w-45 overflow-hidden rounded-xl lg:max-w-85 2xl:max-w-100">
                            <Image
                              src={active.image}
                              alt={`${active.year} — ${active.title}`}
                              fill
                              sizes="(max-width: 1280px) 260px, 300px"
                              className="object-cover"
                            />
                          </div>

                          <h3 className="text-lg font-bold text-primary-foreground sm:text-lg lg:text-xl xl:text-2xl">
                            {active.title}
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-primary-foreground/85 sm:text-base md:text-lg xl:text-xl">
                            {active.body}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.year}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="relative mx-auto mb-4 aspect-video w-full max-w-75 overflow-hidden rounded-xl border border-border bg-card shadow-lg sm:max-w-90">
                  <Image
                    src={active.image}
                    alt={`${active.year} — ${active.title}`}
                    fill
                    sizes="(max-width: 640px) 300px, 360px"
                    className="object-cover"
                  />
                </div>

                <h3 className="text-lg font-bold text-foreground sm:text-xl ">
                  {active.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[90%] text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:max-w-[80%]">
                  {active.body}
                </p>
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
