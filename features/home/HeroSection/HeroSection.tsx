"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { heroData } from "./heroData"

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: i * 0.08, ease: easeOut },
  }),
}

export function Hero() {
  const { eyebrow, headline, description, cta, image, caption } = heroData

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof document === "undefined") return
    const el = document.getElementById(cta.targetId)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.pushState(null, "", cta.href)
  }

  return (
    <section
      id="home"
      className="relative container mx-auto w-full bg-transparent px-4"
    >
      <div className="mx-auto grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-18 lg:gap-16 lg:px-0">
        <div className="order-2 md:order-1">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-base font-semibold tracking-wide text-chart-3 uppercase lg:text-2xl"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground lg:text-6xl xl:text-7xl"
          >
            {headline.line1}
            <br />
            {headline.line2Prefix}
            <span className="text-destructive">{headline.line2Highlight}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-2xl text-base leading-relaxed text-foreground lg:text-xl"
          >
            {description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8"
          >
            <Link
              href={cta.href}
              onClick={handleCtaClick}
              className="group inline-flex items-center gap-2 rounded-xl bg-chart-3 px-5 py-2 text-base font-semibold text-primary-foreground md:text-xl lg:px-6 lg:py-4"
            >
              <span>{cta.label}</span>
              <span className="inline-flex w-0 -translate-x-2 items-center justify-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowUpRight className="size-6 shrink-0" />
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easeOut }}
          className="order-1 md:order-2"
        >
          <div className="relative overflow-hidden rounded-xl">
            <div className="relative aspect-4/5 max-h-176 w-full overflow-hidden sm:aspect-5/6">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rotate-1 object-cover object-top"
              />
            </div>

            <div className="rounded-t-xl bg-background px-5 py-4 text-center text-xl font-bold text-foreground sm:px-6 sm:py-5 lg:text-4xl">
              {caption.prefix}
              <span className="text-chart-3">{caption.highlight}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
