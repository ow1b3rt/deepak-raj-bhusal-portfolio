"use client"

import { easeOut, motion } from "motion/react"
import { BlogCard } from "../../Blogs/BlogCard"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function BlogSection({ blogsData }) {
  const { left, right } = blogsData

  return (
    <section
      id="blogs"
      className="relative w-full bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-10 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Blogs
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <div className="lg:col-span-7">
            {left.map((l) => (
              <BlogCard
                key={l.id}
                blog={l}
                cardClass="flex-col h-full"
                imageClass="w-full"
              />
            ))}
          </div>
          <div className="flex flex-col gap-10 lg:col-span-5">
            {right.map((r) => {
              const count = right.length

              const cardClassName = count === 1 ? "flex-col" : "flex-row"
              const imageClassName =
                count === 1 ? "w-full" : "w-[45%] md:w-[240px] lg:w-[260px] xl:w-[300px] shrink-0"

              return (
                <BlogCard
                  key={r.id}
                  blog={r}
                  cardClass={cardClassName}
                  imageClass={imageClassName}
                />
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-15 flex justify-center"
        >
          <Link
            href="/blogs"
            className="flex items-center gap-2 rounded-2xl bg-foreground px-8 py-3 text-base font-semibold text-background transition-opacity duration-300 hover:opacity-80 md:text-lg"
          >
            More Blog <ArrowUpRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
