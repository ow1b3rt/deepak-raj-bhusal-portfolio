"use client"
import { ItemHead } from "."
import { data } from "./data"
import { motion } from "motion/react"

const { drives } = data // static data, so read it once at module scope

export function DriveGridItem({ gridArea }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col bg-black p-4 text-white ${gridArea ?? ""}`}
    >
      <ItemHead text="what drives me" className="text-white" />

      <ol className="mt-4 flex flex-col justify-center gap-2">
        {drives.map(({ num, detail }) => (
          <li key={num} className="flex items-center gap-3">
            <span className="text-3xl font-extrabold">{num}</span>
            <span className="text-xl text-white/75">{detail}</span>
          </li>
        ))}
      </ol>
    </motion.div>
  )
}
