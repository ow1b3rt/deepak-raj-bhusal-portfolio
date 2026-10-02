"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"

const easeOut = [0.22, 1, 0.36, 1] as const

const featuredVenturesData = {
  title: {
    prefix: "Featured ",
    highlight: "Ventures",
  },
  items: [
    {
      id: "01",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec. Purus ipsum euismod sit venenatis tortor. Nunc suspendisse sit a dolor lobortis. Nullam pharetra nibh et morbi nunc neque.",
      bullets: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
      image: {
        src: "/images/person/hero.jpg",
        alt: "Featured venture 01",
      },
      href: "#",
    },
    {
      id: "02",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec. Purus ipsum euismod sit venenatis tortor. Nunc suspendisse sit a dolor lobortis. Nullam pharetra nibh et morbi nunc neque.",
      bullets: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
      image: {
        src: "/images/person/hero.jpg",
        alt: "Featured venture 02",
      },
      href: "#",
    },
    {
      id: "03",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec. Purus ipsum euismod sit venenatis tortor. Nunc suspendisse sit a dolor lobortis. Nullam pharetra nibh et morbi nunc neque. Non tortor porta ultricies tellus. Tellus nunc enim egestas sapien vitae et ornare. Morbi cursus tellus tempor sit pellentesque. Cum adipiscing faucibus consectetur metus feugiat. Urna vitae viverra morbi suspendisse. Magna convallis quis integer velit ornare ac euismod sit.",
      bullets: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
      image: {
        src: "/images/person/hero.jpg",
        alt: "Featured venture 03",
      },
      href: "#",
    },
    {
      id: "04",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec. Purus ipsum euismod sit venenatis tortor. Nunc suspendisse sit a dolor lobortis. Nullam pharetra nibh et morbi nunc neque.",
      bullets: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
      image: {
        src: "/images/person/hero.jpg",
        alt: "Featured venture 04",
      },
      href: "#",
    },
  ],
}

type Venture = (typeof featuredVenturesData.items)[number]

function VentureItem({
  venture,
  isOpen,
  onToggle,
  index,
}: {
  venture: Venture
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const isExpandable = Boolean(venture.description)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: easeOut }}
      className={cn(
        "overflow-hidden rounded-2xl border border-chart-3/60 bg-background transition-colors",
        isOpen && "border-chart-3"
      )}
    >
      <button
        type="button"
        onClick={isExpandable ? onToggle : undefined}
        className={cn(
          "flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-8 sm:py-6 lg:px-10 lg:py-7",
          isExpandable && "cursor-pointer"
        )}
      >
        <span className="shrink-0 text-2xl font-extrabold text-chart-3 sm:text-3xl lg:text-4xl">
          {venture.id}.
        </span>

        <span className="flex-1 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
          {venture.title}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
          className="shrink-0 text-chart-3"
        >
          <ArrowUpRight
            className="size-6 sm:size-7 lg:size-8"
            strokeWidth={2.5}
          />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpandable && isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-6 px-5 pb-6 sm:px-8 sm:pb-8 md:grid-cols-2 md:gap-8 lg:gap-12 lg:px-10 lg:pb-10">
              <div>
                <p className="text-sm leading-relaxed text-foreground sm:text-base lg:text-lg xl:text-xl">
                  {venture.description}
                </p>

                {venture.bullets && (
                  <ul className="mt-5 space-y-1.5 lg:mt-6">
                    {venture.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm font-medium text-foreground sm:text-base xl:text-lg"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={venture.href}
                  className="group mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-chart-3 px-5 text-primary-foreground hover:bg-chart-3/90 lg:mt-8"
                >
                  Learn More
                  <span className="inline-flex w-0 -translate-x-2 items-center justify-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-4 shrink-0" />
                  </span>
                </Link>
              </div>

              {venture.image && (
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="relative aspect-4/3 w-full lg:aspect-3/2">
                    <Image
                      src={venture.image.src}
                      alt={venture.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FeaturedVentures() {
  const { title, items } = featuredVenturesData
  const defaultOpen = items.findIndex((i) => i.description)
  const [openIndex, setOpenIndex] = React.useState<number | null>(
    defaultOpen >= 0 ? defaultOpen : null
  )

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="ventures"
      className="relative w-full bg-chart-1/10 py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto rounded-2xl p-4 sm:p-6 lg:p-8 lg:py-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {title.prefix}
          <span className="text-chart-3">{title.highlight}</span>
        </motion.h2>

        <div className="mx-auto mt-10 flex flex-col gap-4 sm:mt-12 sm:gap-5 lg:mt-14 lg:gap-6">
          {items.map((venture, i) => (
            <VentureItem
              key={venture.id}
              venture={venture}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
