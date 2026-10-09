"use client"
import { motion } from "motion/react"
import { EducationCard } from "./EducationCard"
import { educationData } from "./education.data"
import { Heading } from "@/components/shared/Heading"

export function EducationList({ data = educationData }) {
  const { title, items } = data

  return (
    <section className="rounded-[2rem] bg-[#fff8f8] px-6 py-12 sm:px-12 lg:px-[7%]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Heading className="self-center text-center">{title}</Heading>
      </motion.div>

      <div className="relative mt-2 divide-y divide-neutral-300">
        {items.map((item, index) => (
          <EducationCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}
