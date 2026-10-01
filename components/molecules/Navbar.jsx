"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { motion } from "motion/react"
import { useLenis } from "lenis/react"
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6"

import { cn } from "@/lib/utils"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Story", id: "story" },
  { label: "Ventures", id: "ventures" },
  { label: "Impact", id: "impact" },
  { label: "Insights", id: "insights" },
  { label: "Media", id: "media" },
]

const LEFT_LINKS = navLinks.slice(0, 3)
const RIGHT_LINKS = navLinks.slice(3)

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [activeId, setActiveId] = React.useState("home")
  const lenis = useLenis()

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const isActive = (id) => activeId === id

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-4 z-50 flex w-full justify-center px-4"
    >
      <nav
        className={cn(
          "container mx-auto hidden w-full items-center gap-4 rounded-2xl border border-border",
          "bg-background/85 px-6 py-1 shadow-sm backdrop-blur-md md:flex lg:gap-6"
        )}
      >
        <div className="flex items-center gap-2 lg:gap-3">
          {socials.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-8 items-center justify-center rounded-full border border-chart-3 text-chart-3 transition-colors hover:bg-chart-3 hover:text-primary-foreground lg:size-9"
            >
              <Icon className="size-4 lg:size-5" strokeWidth={2.25} />
            </Link>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-center gap-4 lg:gap-8">
          <ul className="flex items-center gap-1 lg:gap-2">
            {LEFT_LINKS.map((link) => {
              const active = isActive(link.id)
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      "cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold transition-colors lg:px-4 lg:text-base xl:text-xl",
                      active
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
          </ul>

          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
            aria-label="Home"
            className="shrink-0"
          >
            <Image
              src="/images/web-logo.png"
              alt="Logo"
              width={120}
              height={48}
              priority
              className="h-10 w-auto object-cover lg:h-16"
            />
          </Link>

          <ul className="flex items-center gap-1 lg:gap-2">
            {RIGHT_LINKS.map((link) => {
              const active = isActive(link.id)
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      "cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold transition-colors lg:px-4 lg:text-base xl:text-xl",
                      active
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <button
            type="button"
            onClick={() => scrollToSection("connect")}
            className="block cursor-pointer rounded-xl bg-chart-3 px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-chart-3/90 lg:px-7 xl:text-xl lg:py-2.5 lg:text-base"
          >
            Connect
          </button>
        </motion.div>
      </nav>

      <nav
        className={cn(
          "flex w-full items-center justify-between md:hidden",
          "rounded-2xl border border-primary/40 bg-background/85 backdrop-blur-md",
          "px-4 py-2 shadow-sm"
        )}
      >
        <Image
          src="/images/web-logo.png"
          alt="Logo"
          width={64}
          height={40}
          priority
          className="h-9 w-auto object-contain"
        />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <motion.div
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
              className="outline-none"
            >
              <Menu className="size-5 text-chart-3" />
            </motion.div>
          </SheetTrigger>

          <SheetContent side="right" className="w-75 bg-background sm:w-90">
            <SheetHeader>
              <SheetTitle className="text-left text-primary">
                <Image
                  src="/images/web-logo.png"
                  alt="Logo"
                  width={64}
                  height={40}
                  priority
                  className="h-15 w-24 object-cover"
                />
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-1 px-4">
              {navLinks.map((link, i) => {
                const active = isActive(link.id)
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.04,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        setTimeout(() => scrollToSection(link.id), 250)
                      }}
                      className={cn(
                        "block w-full cursor-pointer rounded-lg px-4 py-3 text-left text-base font-medium transition-colors",
                        "hover:bg-muted",
                        active ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.35 }}
                className="mt-4 flex items-center gap-3 px-4"
              >
                {socials.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-chart-3 text-chart-3 transition-colors hover:bg-chart-3 hover:text-primary-foreground"
                  >
                    <Icon className="size-4" strokeWidth={2.25} />
                  </Link>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => scrollToSection("connect"), 250)
                  }}
                  className="mt-4 block h-11 w-full cursor-pointer rounded-xl bg-chart-3 px-4 text-center text-base font-semibold text-primary-foreground"
                >
                  Connect
                </button>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
