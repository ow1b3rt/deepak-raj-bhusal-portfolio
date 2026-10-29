"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useLenis } from "lenis/react"
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaX,
  FaYoutube,
} from "react-icons/fa6"
import { SiGmail } from "react-icons/si"

import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const LEFT_LINKS = [
  { label: "Story", id: "story" },
  { label: "Ventures", id: "ventures" },
  { label: "Impact", id: "impact" },
]

const RIGHT_LINKS = [
  { label: "Insights", id: "insights" },
  { label: "Media", id: "media" },
]

const CORPORATE_ITEMS = [
  { label: "Partnership", href: "/partnership" },
  { label: "Blogs", href: "/blogs" },
  { label: "Careers", href: "/careers" },
]

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/deepakraj.bhusal",
    Icon: FaFacebookF,
  },
  {
    label: "LinkedIn",
    href: "https://np.linkedin.com/in/deepakraj-bhusal-b173a45b",
    Icon: FaLinkedinIn,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bhusaldeepakraj",
    Icon: FaInstagram,
  },
  {
    label: "Twitter",
    href: "https://x.com/DeepakRajBhusa1",
    Icon: FaX,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/@deepakrajbhusal21",
    Icon: FaYoutube,
  },
  {
    label: "Gmail",
    href: "mailto:contact@deepakrajbhusal.com",
    Icon: SiGmail,
  },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [corporateOpen, setCorporateOpen] = React.useState(false)
  const [mobileCorporateOpen, setMobileCorporateOpen] = React.useState(false)
  const [activeId, setActiveId] = React.useState(null)
  const corporateRef = React.useRef(null)
  const dropdownTimeoutRef = React.useRef(null)

  const lenis = useLenis()
  const pathname = usePathname()
  const router = useRouter()

  const isHomePage = pathname === "/"

  const scrollToSection = (id) => {
    if (!isHomePage) {
      router.push(`/#${id}`)
      return
    }
    const el = document.getElementById(id)
    if (!el) {
      // Graceful fallback if a section id isn't rendered directly
      if (id === "impact") {
        const fallback =
          document.getElementById("ventures") ||
          document.getElementById("timeline")
        if (fallback) {
          if (lenis) lenis.scrollTo(fallback, { offset: -80, duration: 1.2 })
          else fallback.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
      return
    }
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Active section observer on home page
  React.useEffect(() => {
    setActiveId(null)

    if (!isHomePage) return

    const allSectionIds = [
      "story",
      "ventures",
      "impact",
      "insights",
      "media",
      "blogs",
    ]
    let observer = null
    const observedElements = new Set()

    const initObserver = () => {
      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((e) => e.isIntersecting)
              .sort(
                (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
              )

            if (visible[0]) setActiveId(visible[0].target.id)
          },
          { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        )
      }

      allSectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el && !observedElements.has(el)) {
          observer.observe(el)
          observedElements.add(el)
        }
      })
    }

    initObserver()

    const mutationObserver = new MutationObserver(() => {
      initObserver()
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (observer) observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [pathname, isHomePage])

  // Handle outside click for corporate dropdown
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (corporateRef.current && !corporateRef.current.contains(e.target)) {
        setCorporateOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setCorporateOpen(true)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCorporateOpen(false)
    }, 150)
  }

  const isLinkActive = (id) => {
    if (isHomePage) {
      return activeId === id
    }
    if (pathname === `/${id}`) return true
    return false
  }

  const isCorporateActive =
    pathname === "/partnership" || pathname.startsWith("/blogs") || pathname.startsWith("/careers") || pathname.startsWith("/career")

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-4 z-50 flex w-full justify-center px-2 sm:px-4 lg:px-6"
    >
      {/* Desktop / Tablet Navbar */}
      <nav
        className={cn(
          "container mx-auto hidden w-full items-center justify-between",
          "rounded-[28px] border border-red-500/15 bg-white/95 dark:bg-zinc-950/90",
          "px-5 py-2.5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md md:flex lg:px-7 lg:py-3"
        )}
      >
        {/* Left Social Icons - All 6 restored */}
        <div className="flex items-center gap-1.5 lg:gap-2">
          {SOCIALS.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-7.5 items-center justify-center rounded-full border border-chart-3 text-chart-3 transition-colors hover:bg-chart-3 hover:text-primary-foreground lg:size-8.5"
            >
              <Icon className="size-3.5 lg:size-4" />
            </Link>
          ))}
        </div>

        {/* Center: Left Links + DRB Logo + Right Links */}
        <div className="flex flex-1 items-center justify-center gap-2 lg:gap-4 xl:gap-6">
          {/* Left Navigation Links */}
          <ul className="flex items-center gap-1 lg:gap-2">
            {LEFT_LINKS.map((link) => {
              const active = isLinkActive(link.id)
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      "cursor-pointer rounded-full px-2 py-1 text-[15px] transition-colors md:text-base lg:px-3 lg:text-lg xl:px-4 xl:text-xl",
                      active
                        ? "font-semibold text-[#EA0614]"
                        : "font-medium text-neutral-800 hover:text-[#EA0614] dark:text-neutral-200 dark:hover:text-[#EA0614]"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* DRB Logo - Center and prominent */}
          <Link
            href="/"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
            }}
            aria-label="Home"
            className="shrink-0 px-2 transition-transform duration-200 hover:scale-105"
          >
            <Image
              src="/images/drb-logo.png"
              alt="DRB Logo"
              width={160}
              height={64}
              priority
              className="h-11 w-auto object-contain sm:h-12 md:h-12 lg:h-14 xl:h-15"
            />
          </Link>

          {/* Right Navigation Links + Corporate Dropdown */}
          <ul className="flex items-center gap-1 lg:gap-2">
            {RIGHT_LINKS.map((link) => {
              const active = isLinkActive(link.id)
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      "cursor-pointer rounded-full px-2 py-1 text-[15px] transition-colors md:text-base lg:px-3 lg:text-lg xl:px-4 xl:text-xl",
                      active
                        ? "font-semibold text-[#EA0614]"
                        : "font-medium text-neutral-800 hover:text-[#EA0614] dark:text-neutral-200 dark:hover:text-[#EA0614]"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}

            {/* Corporate Dropdown */}
            <li
              ref={corporateRef}
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                type="button"
                onClick={() => setCorporateOpen((prev) => !prev)}
                className={cn(
                  "flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[15px] transition-colors md:text-base lg:px-3 lg:text-lg xl:px-4 xl:text-xl",
                  isCorporateActive || corporateOpen
                    ? "font-semibold text-[#EA0614]"
                    : "font-medium text-neutral-800 hover:text-[#EA0614] dark:text-neutral-200 dark:hover:text-[#EA0614]"
                )}
                aria-expanded={corporateOpen}
                aria-haspopup="true"
              >
                <span>Corporate</span>
                <ChevronDown
                  className={cn(
                    "size-4 transition-transform duration-200 lg:size-4.5 xl:size-5",
                    corporateOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence>
                {corporateOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 z-50 mt-2 min-w-[170px] -translate-x-1/2 overflow-hidden rounded-xl border border-red-500/10 bg-white p-1.5 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    {CORPORATE_ITEMS.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setCorporateOpen(false)}
                          className={cn(
                            "block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors lg:text-base",
                            isActive
                              ? "bg-red-50 font-semibold text-[#EA0614] dark:bg-red-950/30"
                              : "text-neutral-700 hover:bg-neutral-100 hover:text-[#EA0614] dark:text-neutral-300 dark:hover:bg-zinc-800"
                          )}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>

        {/* Right Connect Button */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/connect-now"
            className="block cursor-pointer rounded-xl bg-[#EA0614] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d60512] hover:shadow-md lg:px-6 lg:py-2.5 lg:text-base xl:text-lg"
          >
            Connect
          </Link>
        </motion.div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={cn(
          "flex w-full items-center justify-between md:hidden",
          "rounded-2xl border border-red-500/15 bg-white/95 backdrop-blur-md dark:bg-zinc-950/90",
          "px-4 py-2.5 shadow-sm"
        )}
      >
        <Link href="/" aria-label="Home">
          <Image
            src="/images/drb-logo.png"
            alt="DRB Logo"
            width={120}
            height={48}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              aria-label="Open menu"
              className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted"
            >
              <Menu className="size-5 text-[#EA0614]" />
            </motion.button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[85vw] max-w-sm bg-background p-6"
          >
            <SheetHeader className="border-b border-border pb-4">
              <SheetTitle className="text-left">
                <Image
                  src="/images/drb-logo.png"
                  alt="DRB Logo"
                  width={140}
                  height={56}
                  priority
                  className="h-10 w-auto object-contain"
                />
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-1">
              {/* Primary Links */}
              {[...LEFT_LINKS, ...RIGHT_LINKS].map((link, i) => {
                const active = isLinkActive(link.id)
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.04 * i,
                      duration: 0.25,
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
                        "block w-full cursor-pointer rounded-lg px-4 py-2.5 text-left text-base font-medium transition-colors",
                        "hover:bg-muted",
                        active
                          ? "font-semibold text-[#EA0614]"
                          : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                )
              })}

              {/* Mobile Corporate Collapsible */}
              <div className="border-t border-border/60 pt-2">
                <button
                  type="button"
                  onClick={() => setMobileCorporateOpen((prev) => !prev)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2.5 text-left text-base font-medium text-foreground/80 hover:bg-muted"
                >
                  <span
                    className={cn(
                      isCorporateActive && "font-semibold text-[#EA0614]"
                    )}
                  >
                    Corporate
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      mobileCorporateOpen && "rotate-180"
                    )}
                  />
                </button>

                {mobileCorporateOpen && (
                  <div className="mt-1 ml-4 flex flex-col gap-1 border-l-2 border-red-500/20 pl-2">
                    {CORPORATE_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                          pathname === item.href
                            ? "font-semibold text-[#EA0614]"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Socials - All 6 restored */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5 px-2">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border border-chart-3 text-chart-3 transition-colors hover:bg-chart-3 hover:text-primary-foreground"
                  >
                    <Icon className="size-4" />
                  </Link>
                ))}
              </div>

              {/* Mobile Connect Button */}
              <div className="mt-6">
                <Link
                  href="/connect-now"
                  onClick={() => setOpen(false)}
                  className="block h-11 w-full cursor-pointer rounded-xl bg-[#EA0614] px-4 text-center text-base leading-[2.75rem] font-semibold text-white shadow-sm transition-colors hover:bg-[#d60512]"
                >
                  Connect
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
