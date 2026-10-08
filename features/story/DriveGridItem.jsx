"use client"
import { ItemHead } from "."
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

export function DriveGridItem({ gridArea }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative flex min-h-[300px] flex-col justify-between rounded-3xl bg-black p-8 text-white md:min-h-[350px] ${gridArea ?? ""}`}
    >
      <div>
        <ItemHead text="View My Profile" className="text-white" />

        <p className="mt-4 max-w-[280px] text-base leading-snug text-white/80 md:text-lg">
          Explore my professional background and experience.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <button className="flex items-center gap-2 rounded-xl border border-white px-6 py-3 text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:cursor-pointer hover:bg-white hover:text-black md:text-base">
          Download CV
          <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <p className="text-sm text-white/80 sm:text-right md:text-base">
          or email us at
          <br />
          <a href="mailto:drb@gmail.com" className="text-white hover:underline">
            drb@gmail.com
          </a>
        </p>
      </div>
    </motion.div>
  )
}
