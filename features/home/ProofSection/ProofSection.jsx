"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Radio } from "lucide-react"
import { ProofPointsData } from "./ProofPointsData"

import { cn } from "@/lib/utils"

const easeOut = [0.22, 1, 0.36, 1]

function IconTile({ variant, side }) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-12 md:size-14",
        variant === "primary"
          ? "bg-chart-3 text-primary-foreground"
          : "bg-foreground text-background"
      )}
    >
      <Radio className="size-5 sm:size-6 md:size-7" strokeWidth={2.25} />
    </div>
  )
}

function FeatureItem({ text, variant, side, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: easeOut }}
      className={cn(
        "flex items-center gap-3 sm:gap-4",
        side === "left" ? "flex-row text-right" : "flex-row-reverse text-left"
      )}
    >
      <p className="text-xs leading-snug font-medium text-foreground sm:text-sm md:text-base lg:text-lg">
        {text}
      </p>
      <IconTile variant={variant} side={side} />
    </motion.div>
  )
}

export function ProofPoints() {
  const { image, items } = ProofPointsData
  const left = items.filter((i) => i.side === "left")
  const right = items.filter((i) => i.side === "right")

  return (
    <section
      id="story"
      className="relative w-full overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-red-100)_0%,transparent_90%)] opacity-70 dark:opacity-20"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-6 md:grid lg:gap-10 xl:gap-16">
          <div className="flex flex-col items-end gap-12 lg:gap-20 xl:gap-28">
            {left.map((item, i) => (
              <FeatureItem
                key={`left-${i}`}
                text={item.text}
                variant={item.variant}
                side="left"
                delay={0.1 + i * 0.1}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="relative mx-auto w-60 lg:w-100 xl:w-180"
          >
            <div className="relative aspect-3/4 w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 768px) 60vw, 400px"
                className="object-contain object-bottom"
              />
            </div>
          </motion.div>

          <div className="flex flex-col items-start gap-12 lg:gap-20 xl:gap-28">
            {right.map((item, i) => (
              <FeatureItem
                key={`right-${i}`}
                text={item.text}
                variant={item.variant}
                side="right"
                delay={0.15 + i * 0.1}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 md:hidden">
          {/* Portrait on top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="relative w-48 sm:w-60"
          >
            <div className="relative aspect-3/4 w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="240px"
                className="object-contain object-bottom"
              />
            </div>
          </motion.div>

          <div className="flex w-full flex-col gap-5">
            {items.map((item, i) => (
              <FeatureItem
                key={`mobile-${i}`}
                text={item.text}
                variant={item.variant}
                side={item.side}
                delay={0.1 + i * 0.06}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
