"use client"

import Link from "next/link"
import { ArrowUp, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Pagenav — URL-driven pagination nav.
 *
 * @param {number|string} page        - Current active page
 * @param {number|string} totalPages  - Total number of pages
 * @param {string}        basePath    - Base path for links (e.g. "/careers")
 * @param {string}        className   - Extra wrapper classes
 */
export function Pagenav({ page = 1, totalPages = 1, basePath = "", className = "" }) {
  const current = Number(page || 1)
  const total = Number(totalPages || 1)
  const prevDisabled = current <= 1
  const nextDisabled = current >= total

  const href = (p) => (basePath ? `${basePath}?page=${p}` : `?page=${p}`)

  return (
    <div className={cn("mt-12 flex w-full flex-wrap items-center justify-between gap-4 px-2 sm:px-4", className)}>
      <div className="flex items-center gap-2">
        {/* Prev */}
        <Link
          href={href(prevDisabled ? 1 : current - 1)}
          aria-disabled={prevDisabled}
          className={cn(
            "group flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
            prevDisabled
              ? "pointer-events-none border-neutral-200 text-neutral-300 dark:border-neutral-700 dark:text-neutral-600"
              : "border-neutral-200 text-neutral-700 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900",
          )}
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Previous
        </Link>

        {/* Page indicator */}
        {total > 1 && (
          <span className="hidden text-sm text-neutral-400 sm:inline dark:text-neutral-500">
            Page{" "}
            <span className="font-semibold text-neutral-700 dark:text-neutral-200">{current}</span>{" "}
            of{" "}
            <span className="font-semibold text-neutral-700 dark:text-neutral-200">{total}</span>
          </span>
        )}

        {/* Next */}
        {!nextDisabled && (
          <Link
            href={href(current + 1)}
            className="group flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900"
          >
            Next
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* Back to Top */}
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        }}
        className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#EA0614] transition-colors hover:text-neutral-900 dark:hover:text-white"
      >
        <ArrowUp className="h-4 w-4" />
        Back to top
      </button>
    </div>
  )
}
