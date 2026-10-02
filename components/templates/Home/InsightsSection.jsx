"use client"

import { motion, useReducedMotion } from "motion/react"
import InsightCard from "@/components/molecules/InsightCard"

export default function InsightsSection({
  heading = "Insights",
  items = [],
  headingLevel = 2,
  className = "",
  itemGap = "gap-8 md:gap-12",
}) {
  const reduce = useReducedMotion()
  const Heading = `h${Math.min(Math.max(headingLevel, 1), 6)}`

  if (!items.length) return null

  const cardVariant = {
    hidden: { opacity: 0, y: reduce ? 0 : 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className={["relative w-full", className].join(" ")}
    >
      <div className="container mx-auto w-full px-4 pt-10 sm:px-6 md:pt-14 lg:pt-20">
        {heading ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Heading className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {heading}
            </Heading>
          </motion.div>
        ) : null}
      </div>

      <div className="container mx-auto w-full px-4 pb-16 sm:px-6 md:pb-24">
        <div className={`mt-8 flex flex-col ${itemGap}`}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2, margin: "-60px 0px" }}
              variants={cardVariant}
              transition={{ delay: reduce ? 0 : i * 0.05 }}
            >
              <InsightCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
