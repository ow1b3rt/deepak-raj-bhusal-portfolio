"use client"
import { SafeImage } from "@/components/ui/safe-image"
import { MoreButton } from "@/components/shared/MoreButton"
import { resolveUrl } from "@/lib/utils"
import { motion } from "motion/react"
import { ArrowUpRight, FileText } from "lucide-react"

export function ArticleCard({ article, cardClass, imageClass }) {
  if (!article) {
    return null
  }

  const mediaUrl = resolveUrl(article.thumbnailUrl)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex ${cardClass ?? ""} gap-4 md:gap-6`}
    >
      {/* Thumbnail (or fallback PDF icon) */}
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-100 ${imageClass ?? "md:w-1/4"}`}
      >
        {mediaUrl ? (
          <SafeImage
            src={mediaUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col ${cardClass?.includes("row") ? "justify-between py-1" : "gap-2 md:gap-4"}`}
      >
        {/* Author / co-authors row */}
        <div className="flex flex-col gap-0.5">
          {article.author && (
            <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest text-gray-400 md:text-sm">
              <FileText className="h-3 w-3" />
              {article.author}
            </span>
          )}
          {article.coAuthors && (
            <span className="text-xs text-gray-400">
              with {article.coAuthors}
            </span>
          )}
        </div>
        <h2 className="line-clamp-2 text-xl font-bold md:text-2xl xl:text-3xl">
          {article.title}
        </h2>
        {article.description && (
          <p className="line-clamp-2 text-sm text-gray-600 md:text-base xl:text-lg">
            {article.description}
          </p>
        )}
        <MoreButton
          href={`/articles/${article.slug}`}
          content={
            <span className="font-bold">
              Read Article{" "}
              <ArrowUpRight className="ml-1 inline-block h-4 w-4" />
            </span>
          }
        />
      </div>
    </motion.div>
  )
}
