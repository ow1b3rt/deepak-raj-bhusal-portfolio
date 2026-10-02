"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { cn } from "@/lib/utils"

export function ScrollToTop({
  showAfter = 400,
  className = "",
  ariaLabel = "Scroll to top",
}) {
  const [visible, setVisible] = React.useState(false)
  const lenis = useLenis()

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [showAfter])

  const handleClick = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={handleClick}
          aria-label={ariaLabel}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "fixed right-4 bottom-4 cursor-pointer z-50 sm:right-6 sm:bottom-6",
            "flex size-12 items-center justify-center rounded-full",
            "border-2 border-chart-3 bg-background text-chart-3",
            "shadow-md transition-colors",
            "hover:bg-chart-3 hover:text-primary-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
            className
          )}
        >
          <ArrowUp className="size-6" strokeWidth={2.5} aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
