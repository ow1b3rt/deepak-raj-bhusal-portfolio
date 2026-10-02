"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeatureSplit({
  title,
  description,
  bullets = [],
  cta,
  image,
  headingLevel = 2,
  align = "center",
  mediaPosition = "right",
  className = "",
  contentClassName = "",
  mediaClassName = "",
  id,
}) {
  const reduce = useReducedMotion()
  const Heading = `h${Math.min(Math.max(headingLevel, 1), 6)}`

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  }

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const mediaFirst = mediaPosition === "left"

  const ctaBaseClass =
    "group inline-flex h-11 items-center gap-2 rounded-xl bg-chart-3 px-6 " +
    "text-sm font-semibold text-primary-foreground transition-colors " +
    "hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-card md:text-lg"

  return (
    <section id={id} className={["relative w-full", className].join(" ")}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        variants={container}
        className="relative mx-auto flex w-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-white text-card-foreground shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_20px_60px_-30px_rgba(0,0,0,0.15)] lg:max-h-200 2xl:max-h-240"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-card"
        />

        <div
          className={[
            "relative grid gap-8 p-6 sm:p-8 md:gap-10 md:p-10",
            "lg:h-full lg:min-h-0 lg:grid-cols-2 lg:gap-14 lg:p-14",
            align === "center" ? "lg:items-center" : "lg:items-start",
          ].join(" ")}
        >
          <div
            className={[
              "flex flex-col",
              "lg:min-h-0 lg:scrollbar-none lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden",
              mediaFirst ? "lg:order-2" : "lg:order-1",
              contentClassName,
            ].join(" ")}
          >
            {title ? (
              <motion.div variants={item}>
                <Heading className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-4xl">
                  {title}
                </Heading>
              </motion.div>
            ) : null}

            {description ? (
              <motion.p
                variants={item}
                className="mt-5 max-w-prose text-base leading-7 text-muted-foreground sm:leading-8 lg:text-xl"
              >
                {description}
              </motion.p>
            ) : null}

            {bullets.length > 0 ? (
              <motion.ul
                variants={item}
                className="mt-6 space-y-2 pl-5 text-base text-foreground lg:text-xl"
              >
                {bullets.map((b, i) => (
                  <li
                    key={typeof b === "string" ? `${b}-${i}` : (b.id ?? i)}
                    className="relative list-disc pl-1 marker:text-foreground/70"
                  >
                    {typeof b === "string" ? b : b.label}
                  </li>
                ))}
              </motion.ul>
            ) : null}

            {cta ? (
              <motion.div variants={item} className="mt-8">
                {cta.href ? (
                  <Link
                    href={cta.href}
                    onClick={cta.onClick}
                    className={ctaBaseClass}
                  >
                    {cta.label}
                    {cta.icon !== false && (
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-6"
                      />
                    )}
                  </Link>
                ) : (
                  <Button
                    type="button"
                    size={cta.size ?? "lg"}
                    variant={cta.variant ?? "default"}
                    onClick={cta.onClick}
                    className={ctaBaseClass}
                  >
                    {cta.label}
                    {cta.icon !== false && (
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-6"
                      />
                    )}
                  </Button>
                )}
              </motion.div>
            ) : null}
          </div>

          {image ? (
            <motion.div
              variants={item}
              className={[
                "relative mx-auto w-full overflow-hidden rounded-2xl ring-1 ring-border/60",
                "aspect-16/10 max-w-md",
                "sm:max-w-full",
                "lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-0 lg:max-w-none",
                mediaFirst ? "lg:order-1" : "lg:order-2",
                mediaClassName,
              ].join(" ")}
            >
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                fill
                sizes={image.sizes ?? "(min-width: 1024px) 50vw, 100vw"}
                className={image.className ?? "object-cover"}
                priority={image.priority ?? false}
              />
            </motion.div>
          ) : null}
        </div>
      </motion.div>
    </section>
  )
}
