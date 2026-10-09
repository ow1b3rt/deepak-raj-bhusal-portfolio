"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SafeImage } from "@/components/ui/safe-image";

function getYouTubeId(url = "") {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

function VideoModal({ src, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const ytId = getYouTubeId(src);

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
  );
}

export function GalleryCard({ item }) {
  const [open, setOpen] = useState(false);

  if (!item) {
    return null;
  }

  const media = item.media ?? item.image; // fallback for old data
  const src = media?.src;
  const alt = media?.alt || item.title;

  if (item.type === "video") {
    const ytId = getYouTubeId(src);

    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Play video${alt ? `: ${alt}` : ""}`}
          className="group relative block w-full cursor-pointer"
        >
          {ytId ? (
            <img
              src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
              alt={alt || ""}
              className="pointer-events-none aspect-video h-auto w-full rounded-2xl object-cover shadow-md"
            />
          ) : (
            <video
              src={`${src}#t=0.1`}
              muted
              playsInline
              preload="metadata"
              className="pointer-events-none h-auto w-full rounded-2xl shadow-md"
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20 transition group-hover:bg-black/40">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-black">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>

        {open && (
          <VideoModal src={src} title={alt} onClose={() => setOpen(false)} />
        )}
      </>
    );
  }

  // default: image
  return (
    <SafeImage
      src={src}
      alt={alt}
      height={0}
      width={0}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      objectFit="contain"
      className="w-full h-auto rounded-2xl shadow-md"
    />
  );
}
