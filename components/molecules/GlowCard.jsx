
"use client"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "motion/react"
import { useEffect } from "react"

export default function GlowCard() {
  const x = useMotionValue(70)
  const y = useMotionValue(0)

  useEffect(() => {
    const cx = animate(x, [70, 30, 70], {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    })
    const cy = animate(y, [0, 40, 0], {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    })
    return () => {
      cx.stop()
      cy.stop()
    }
  }, [x, y])

  const background = useMotionTemplate`radial-gradient(ellipse at ${x}% ${y}%, rgba(246,67,73,0.14) 0%, rgba(246,67,73,0.06) 35%, transparent 70%)`

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
