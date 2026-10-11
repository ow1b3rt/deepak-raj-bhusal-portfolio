"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa6"

const easeOut = [0.22, 1, 0.36, 1]

const footerData = {
  eyebrow: "LET'S CONNECT",
  title: "LET'S WORK TOGETHER",
  description:
    "Have an idea or project in mind? Let's connect and turn your vision into meaningful results.",
  cta: {
    label: "GET IN TOUCH",
    href: "/connect-now",
  },
}

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "Twitter", href: "https://twitter.com", Icon: FaTwitter },
]

export function Footer() {
  const { eyebrow, title, description, cta } = footerData

  return (
    <footer id="connect" className="relative container mx-auto pb-4">
      {/* ── CTA Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="red-gradient relative overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-10 sm:py-20 md:py-24 lg:rounded-[2.5rem] lg:px-16 lg:py-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_60%)]"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="text-xs font-bold tracking-[0.2em] text-primary-foreground/90 sm:text-sm lg:text-xl"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
            className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-primary-foreground drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
            className="mt-6 max-w-4xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base lg:text-xl"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
            className="mt-12 sm:mt-14 lg:mt-16"
          >
            <Link
              href={cta.href}
              className="group inline-flex flex-col items-center gap-4"
            >
              <motion.span
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="flex size-16 items-center justify-center rounded-full bg-background text-chart-3 shadow-lg md:size-20 lg:size-20"
              >
                <ArrowUpRight
                  className="size-7 transition-transform duration-300 ease-out group-hover:rotate-45 sm:size-8 lg:size-10"
                  strokeWidth={2.5}
                />
              </motion.span>

              <span className="text-xs font-bold tracking-[0.2em] text-primary-foreground sm:text-sm md:text-base">
                {cta.label}
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-3 flex items-center justify-between gap-3 px-2 sm:flex-row sm:gap-0">
        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {socials.map(({ label, href, Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              variants={{
                hidden: { opacity: 0, y: 12, scale: 0.75 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: easeOut } },
              }}
              whileHover={{ scale: 1.2, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              className="flex size-8 items-center justify-center rounded-full border border-foreground/30 text-foreground/70 transition-colors duration-200 hover:border-chart-3 hover:text-chart-3 sm:size-9"
            >
              <Icon className="size-3.5 sm:size-4" />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="text-center text-foreground/70 sm:text-right sm:text-sm"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
        >
          <span className="text-xl font-semibold">
            {" "}
            ©All Right Reserved By{" "}
          </span>
          <span className="text-xl font-semibold text-chart-3">
            <a href="https://enlighteninfosys.com/" target="_blank">
              Enlighten Infosys Pvt. Ltd.{" "}
            </a>
          </span>
        </motion.p>
      </div>
    </footer>
  )
}
