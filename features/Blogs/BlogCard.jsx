"use client"
import { SafeImage } from "@/components/ui/safe-image"
import { MoreButton } from "@/components/shared/MoreButton"
import { resolveUrl, stripHtml } from "@/lib/utils"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

export function BlogCard({ blog, cardClass, imageClass }) {
  if (!blog) {
    return null
  }
  console.log("card", cardClass)
  const mediaUrl = resolveUrl(blog.media?.url)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex ${cardClass ?? ""} gap-4 md:gap-6`}
    >
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl ${imageClass ?? "md:w-1/4"}`}
      >
        <SafeImage
          src={mediaUrl}
          alt={blog.media?.alt || blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw,25vw"
        />
      </div>

      <div
        className={`flex flex-1 flex-col ${cardClass?.includes("row") ? "justify-between py-1" : "gap-2 md:gap-4"}`}
      >
        <span className="text-xs text-gray-500 md:text-base xl:text-lg">
          {blog.author?.name}
        </span>
        <h2 className="line-clamp-2 text-xl font-bold md:text-2xl xl:text-3xl">
          {blog.title}
        </h2>
        <p className="line-clamp-2 text-sm text-gray-600 md:text-base xl:text-lg">
          {stripHtml(blog.content)}
        </p>
        <MoreButton
          href={`/blogs/${blog.slug}`}
          content={
            <span className="font-bold">
              Read More <ArrowUpRight className="ml-1 inline-block h-4 w-4" />
            </span>
          }
        />
      </div>
    </motion.div>
  )
}
