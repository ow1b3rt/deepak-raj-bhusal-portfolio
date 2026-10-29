"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Banknote, ArrowUpRight } from "lucide-react"

export function CareerCard({
  job,
  onApply,
}) {
  const {
    title = "IT Officer",
    type = "Onsite",
    postedAgo = "3 Days ago",
    salary = "Rs 35,000 - Rs 50,000",
    description = "Lorem ipsum dolor sit amet consectetur. Eget morbi at varius in sagittis tellus commodo diam scelerisque. Orci quis enim tristique nam neque mauris tellus consectetur.",
    experienceYears = 2,
    imgSrc = "/images/careers/jlpt-desk.jpg",
    slug = "it-officer",
  } = job || {}

  return (
    <article className="group relative flex flex-col md:flex-row items-stretch gap-6 md:gap-8 rounded-[2rem] bg-white p-4 md:p-6 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200/60 dark:bg-zinc-900/90 dark:hover:shadow-black/40">
      {/* ── Left Side: Job Image ── */}
      <div className="relative aspect-[4/3] w-full md:w-[320px] lg:w-[360px] shrink-0 overflow-hidden rounded-[1.5rem] md:rounded-[1.75rem] bg-neutral-100 shadow-xs">
        <Image
          src={imgSrc || "/images/careers/jlpt-desk.jpg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 320px, 360px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* ── Right Side: Job Content ── */}
      <div className="flex flex-1 flex-col justify-between py-1 md:py-2">
        <div>
          {/* Title */}
          <Link href={`/careers/${slug}`}>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 transition-colors hover:text-[#EA0614] md:text-3xl dark:text-white">
              {title}
            </h2>
          </Link>

          {/* Meta Details Row */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold text-neutral-900 md:gap-5 md:text-base dark:text-neutral-200">
            {/* Working Mode (Onsite / Hybrid / Remote) */}
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4.5 text-[#EA0614] stroke-[2.2]" />
              <span>{type}</span>
            </span>

            {/* Posted Time */}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4.5 text-[#EA0614] stroke-[2.2]" />
              <span>{postedAgo}</span>
            </span>

            {/* Salary */}
            <span className="inline-flex items-center gap-1.5">
              <Banknote className="size-4.5 text-[#EA0614] stroke-[2.2]" />
              <span>{salary}</span>
            </span>
          </div>

          {/* Description */}
          <p className="mt-3.5 text-sm leading-relaxed text-neutral-600 md:text-[15px] dark:text-neutral-300">
            {description}
          </p>

          {/* Experience Block */}
          <div className="mt-4">
            <span className="block text-xs font-bold text-neutral-900 md:text-sm dark:text-neutral-200">
              Experience:
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-[#EA0614] md:text-4xl">
                {experienceYears}+
              </span>
              <span className="text-base font-bold text-neutral-900 md:text-lg dark:text-white">
                Years of Experience
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-1">
          <button
            type="button"
            onClick={() => onApply && onApply(job)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#EA0614] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#d60512] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Apply Now</span>
            <ArrowUpRight className="size-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </article>
  )
}
