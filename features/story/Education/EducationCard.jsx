"use client"
import { motion } from "motion/react"

export function EducationCard({ item, index = 0 }) {
  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className="relative flex items-start gap-6 py-10 sm:gap-10"
    >
      {/* logo */}
      {/*
      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-900 sm:size-28 lg:size-32">
        { item.logo && (
          <SafeImage
            src={resolveUrl(item.logo)}
            alt={item.title}
            fill
            className='object-cover'
          />
        /}
      </div>
*/}

      {/* Animated accent line */}
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.1 + 0.15,
        }}
        style={{ originY: 0 }}
        className="absolute left-0 top-8 h-[calc(100%-2rem)] w-[3px] rounded-full bg-gradient-to-b from-primary to-primary/20"
        aria-hidden="true"
      />

      {/* text */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 pl-5 sm:pl-6 sm:pt-2">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.1 + 0.1,
          }}
          className="text-2xl font-bold text-neutral-900 sm:text-4xl"
        >
          {item.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.1 + 0.18,
          }}
          className="max-w-xl text-base text-neutral-800 sm:text-lg"
        >
          {item.description}
        </motion.p>

        {/* period — mobile only */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.35, delay: index * 0.1 + 0.22 }}
          className="mt-2 text-lg font-semibold text-chart-3 md:hidden"
        >
          {item.period}
        </motion.span>
      </div>

      {/* period — desktop */}
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.1 + 0.2,
        }}
        className="hidden shrink-0 pr-8 text-2xl font-semibold text-chart-3 md:block"
      >
        {item.period}
      </motion.span>
    </motion.div>
  )
}
