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
      <p className="text-sm leading-relaxed text-gray-600 md:text-base">
        A passionate professional committed to leadership, innovation, and
        meaningful contributions to society.
      </p>
      <div className="relative mt-2 h-64 lg:48 w-full overflow-hidden rounded-xl">
        <SafeImage
          src="/images/person/ventures.png"
          alt="Leadership"
          fill
          className="object-cover object-top"
        />
      </div>
    </motion.div>
  )
}
