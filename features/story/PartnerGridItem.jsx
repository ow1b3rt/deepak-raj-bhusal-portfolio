"use client"
import { data } from "./data"
import { SafeImage } from "@/components/ui/safe-image"
import { motion } from "motion/react"

export function PartnerGridItem({ gridArea }) {
  const { partnersData } = data
  const { partners } = partnersData

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex gap-4 bg-none ${gridArea}`}
    >
      <div className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-1 font-bold text-red-600">
        <span className="text-base font-extrabold tracking-widest uppercase md:text-lg">
          VISION
        </span>
        <span className="px-1 text-xl leading-none text-red-600">•</span>
        <span className="text-base font-extrabold tracking-widest uppercase md:text-lg">
          LEADERSHIP
        </span>
        <span className="px-1 text-xl leading-none text-red-600">•</span>
        <span className="text-base font-extrabold tracking-widest uppercase md:text-lg">
          IMPACT
        </span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4 rounded-xl bg-white px-4 py-1">
        {partners.map((p) => (
          <div key={p.id} className="flex items-center justify-center">
            {p.image ? (
              <div className="relative h-10 w-24">
                <SafeImage
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-sm font-semibold text-gray-500">
                {p.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
