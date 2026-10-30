"use client"
import { ItemHead } from "."
import { SafeImage } from "@/components/ui/safe-image"
import { motion } from "motion/react"

export function LeadershipGridItem({ gridArea }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col gap-4 rounded-xl bg-white p-6 ${gridArea}`}
    >
      <ItemHead
        text="Leadership & Vision"
        className="w-2/3 text-red-600 uppercase"
      />
      <p className="text-sm leading-relaxed text-gray-600 md:text-xl">
        A passionate professional committed to leadership, innovation, and
        meaningful contributions to society.
      </p>
      <div className="relative mt-2 flex-1 w-full min-h-[280px] sm:min-h-[320px] lg:min-h-[340px] overflow-hidden rounded-xl">
        <SafeImage
          src="/images/person/deepak-leadership.jpeg"
          alt="Leadership"
          fill
          className="object-cover object-top"
        />
      </div>
    </motion.div>
  )
}
