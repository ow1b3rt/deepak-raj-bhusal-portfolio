"use client"
import { ItemHead } from "."
import { motion } from "motion/react"

export function VisionGridItem({ gridArea }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative bg-black text-white ${gridArea}`}
    >
      <div className="absolute right-0 bottom-0 left-0 z-10 -ml-4 flex h-[150%] rounded-tl-lg bg-red-50 pt-4 pl-4">
        <div className="flex flex-1 flex-col gap-2 rounded-xl bg-[radial-gradient(ellipse_at_55%_85%,#e0605c_0%,#d44a4b_35%,#c1303d_65%,#a8243a_100%)] p-5">
          <ItemHead text="turning vision into action" className="text-white" />
          <p className="text-xl leading-snug text-white/80">
            Driven by purpose, collaboration, and a commitment to creating
            meaningful opportunities and lasting impact.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
