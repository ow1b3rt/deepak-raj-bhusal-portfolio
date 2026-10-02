"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const easeOut = [0.22, 1, 0.36, 1] as const

const impactData = {
  title: {
    line1: "Recent Project for ",
    line2: "International Clients",
  },
  projects: [
    {
      id: "01",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec.",
      image: {
        src: "/images/person/hero.jpg",
        alt: "Recent project 01",
      },
      href: "#",
    },
    {
      id: "02",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec.",
      image: {
        src: "/images/person/hero.jpg",
        alt: "Recent project 02",
      },
      href: "#",
    },
    {
      id: "03",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec.",
      image: {
        src: "/images/person/hero.jpg",
        alt: "Recent project 03",
      },
      href: "#",
    },
    {
      id: "04",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec.",
      image: {
        src: "/images/person/hero.jpg",
        alt: "Recent project 04",
      },
      href: "#",
    },
    {
      id: "04",
      title: "Lorem Ipsum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Dolor tincidunt sit et eget bibendum a cras donec.",
      image: {
        src: "/images/person/hero.jpg",
        alt: "Recent project 04",
      },
      href: "#",
    },
  ],
}

type Project = (typeof impactData.projects)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
      className="group"
    >
      <Link
        href={project.href}
        className="block overflow-hidden rounded-3xl bg-chart-1/10 p-4 transition-all duration-300 hover:bg-chart-1/25 sm:p-5"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-4/3 w-full">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 sm:mt-5">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground sm:text-xl lg:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1.5 line-clamp-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Arrow button */}
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:size-11",
              "border border-chart-3/40 bg-card text-chart-3",
              "group-hover:border-chart-3 group-hover:bg-chart-3 group-hover:text-primary-foreground"
            )}
          >
            <motion.span
              initial={false}
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="inline-flex"
            >
              <ArrowUpRight className="size-4 sm:size-5" strokeWidth={2.5} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function Impact() {
  const { title, projects } = impactData

  return (
    <section
      id="impact"
      className="relative w-full bg-background py-16 md:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              {title.line1}
              <br />
              <span className="text-chart-3">{title.line2}</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
              {projects
                .filter((_, i) => i % 2 === 0)
                .map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i * 2}
                  />
                ))}
            </div>

            <div className="flex flex-col gap-5 sm:gap-6 md:mt-16 lg:mt-20 lg:gap-8">
              {projects
                .filter((_, i) => i % 2 === 1)
                .map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i * 2 + 1}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
