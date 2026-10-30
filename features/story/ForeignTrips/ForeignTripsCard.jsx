"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

export function ForeignTripsCard({ item, index = 0, className = "" }) {
  const [hasError, setHasError] = useState(false);

  const imgSrc = hasError && item.fallbackUrl ? item.fallbackUrl : item.imageUrl || item.fallbackUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
      className={`relative w-full h-full min-h-[220px] rounded-2xl md:rounded-3xl overflow-hidden group shadow-sm bg-neutral-100 dark:bg-neutral-800 cursor-pointer ${className}`}
      style={item.area ? { gridArea: item.area } : undefined}
    >
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={item.title || "Foreign Trip / Conference"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
          className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 text-sm">
          {item.title}
        </div>
      )}

      {/* Description overlay displayed at all times */}
      {(item.title || item.description || item.date) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-4 sm:p-5 md:p-6 text-white z-10 pointer-events-none">
          {item.date && (
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-chart-3 mb-1 drop-shadow-xs">
              {item.date}
            </span>
          )}
          {item.title && (
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-white mb-1 drop-shadow-sm">
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className="text-xs sm:text-sm text-neutral-200/95 leading-relaxed line-clamp-2 md:line-clamp-3 font-normal drop-shadow-xs">
              {item.description}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
