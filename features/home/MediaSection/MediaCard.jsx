"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { ArrowUpRight, Play } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const easeOut = [0.22, 1, 0.36, 1]

function getYouTubeId(url = "") {
  const match = url?.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  )
  return match ? match[1] : null
}

const thumbClass =
  "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"

function MediaThumb({ item }) {
  const media = item.media ?? item.image // fallback for old data
  const src = media?.src
  const alt = media?.alt || item.title || ""
  const isVideo = item.type === "video" || item.isVideo

  if (!src) return null

  if (isVideo) {
    const ytId = getYouTubeId(src)

    if (ytId) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
          alt={alt}
          className={thumbClass}
        />
      )
    }

    return (
      <video
        src={`${src}#t=0.1`}
        muted
        playsInline
        preload="metadata"
        className={thumbClass}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
    />
  )
}

function VideoModal({ src, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const ytId = getYouTubeId(src)

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video player"}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
      >
        ×
      </button>

      <div
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {ytId ? (
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            title={title || "Video"}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className="aspect-video w-full"
            src={src}
            controls
            autoPlay
            playsInline
          />
        )}
      </div>
    </div>,
    document.body
  )
}

export function MediaCard({ item, index }) {
  const [open, setOpen] = useState(false)

  const media = item.media ?? item.image // fallback for old data
  const src = media?.src
  const isVideo = item.type === "video" || item.isVideo

  const body = (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-muted text-left sm:aspect-5/4 lg:aspect-4/3">
      <MediaThumb item={item} />

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-1/2",
          "bg-linear-to-t from-black/70 via-black/30 to-transparent",
          "opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0"
        )}
      />

      {isVideo && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-transform duration-500 group-hover:scale-0 group-hover:opacity-0 sm:size-14 lg:size-16">
            <Play className="ml-0.5 size-5 fill-current sm:size-6 lg:size-7" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6",
          "opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0"
        )}
      >
        <p className="text-lg leading-snug font-extrabold text-white sm:text-xl lg:text-2xl">
          {item.title}
        </p>
      </div>

      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end",
          "bg-linear-to-t from-black/85 via-black/50 to-transparent",
          "p-4 sm:p-5 lg:p-6",
          "opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        )}
      >
        <h3 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
          {item.title}
        </h3>

        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-white/85 sm:text-sm lg:text-base">
          {item.description}
        </p>

      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
      className="group relative h-full"
    >
      {isVideo ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Play video${item.title ? `: ${item.title}` : ""}`}
            className="block h-full w-full cursor-pointer"
          >
            {body}
          </button>

          {open && (
            <VideoModal
              src={src}
              title={item.title || media?.alt}
              onClose={() => setOpen(false)}
            />
          )}
        </>
      ) : (
        <div className="block h-full">{body}</div>
      )}
    </motion.div>
  )
}
