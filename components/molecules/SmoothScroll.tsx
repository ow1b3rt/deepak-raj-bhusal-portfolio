"use client"

import { useEffect, ReactNode } from "react"
import Lenis from "lenis"

declare global {
  interface Window {
    lenis?: Lenis
    __lenis?: Lenis
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      prevent: (node) => {
        if (!node || typeof (node as HTMLElement).closest !== "function") return false
        const el = node as HTMLElement
        return (
          el.hasAttribute("data-lenis-prevent") ||
          Boolean(el.closest("[data-lenis-prevent]")) ||
          Boolean(el.closest('[role="dialog"]')) ||
          Boolean(el.closest("[data-radix-portal]"))
        )
      },
    })

    window.lenis = lenis
    window.__lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.lenis
      delete window.__lenis
    }
  }, [])

  return <>{children}</>
}
