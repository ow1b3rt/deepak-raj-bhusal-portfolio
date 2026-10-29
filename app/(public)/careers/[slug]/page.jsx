import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Banknote, ArrowLeft } from "lucide-react"
import { getJobBySlug, getOpenPositions } from "@/features/career/career.api"
import { JobApplicationForm } from "@/features/career/JobApplicationForm"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const job = await getJobBySlug(slug)

  if (!job) {
    return {
      title: "Job Position | Careers",
    }
  }

  return {
    title: `${job.title} | Careers - Deepak Raj Bhusal`,
    description: job.overview?.[0] || "Explore career opportunities.",
  }
}

export default async function CareerDetailPage({ params }) {
  const { slug } = await params
  const [job, openPositions] = await Promise.all([
    getJobBySlug(slug),
    getOpenPositions(),
  ])

  if (!job) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      {/* Hero Header */}
      <div className="mt-6 flex flex-col items-start justify-between gap-8 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm md:flex-row md:p-8 dark:border-neutral-800 dark:bg-zinc-900">
        <div className="flex-1">
          <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#EA0614] dark:bg-red-950/40">
            {job.badge || "Open Opportunity"}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-neutral-900 md:text-4xl dark:text-white">
            {job.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4.5 text-[#EA0614]" />
              <span>{job.workingMode || job.workingHours || "Onsite"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Banknote className="size-4.5 text-[#EA0614]" />
              <span>{job.salary}</span>
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xs font-bold tracking-wider text-neutral-500 uppercase">
              Experience Required:
            </span>
            <p className="mt-0.5 text-lg font-bold text-neutral-900 dark:text-white">
              <span className="text-[#EA0614]">{job.experienceYears}+</span>{" "}
              Years
            </p>
          </div>
        </div>

        {job.imgSrc && (
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl md:w-72">
            <Image
              src={job.imgSrc}
              alt={job.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Job Details Section */}
      <div className="mt-8 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm md:p-8 dark:border-neutral-800 dark:bg-zinc-900">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Role Overview
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-300">
          {job.overview?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {job.responsibilities?.length > 0 && (
          <div className="mt-6 border-t border-neutral-100 pt-6 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Key Responsibilities
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-600 md:text-base dark:text-neutral-300">
              {job.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {job.niceToHave?.length > 0 && (
          <div className="mt-6 border-t border-neutral-100 pt-6 dark:border-neutral-800">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Requirements & Skills
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-600 md:text-base dark:text-neutral-300">
              {job.niceToHave.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Application Form */}
      <div className="mt-10 rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm md:p-10 dark:border-neutral-800 dark:bg-zinc-900">
        <div className="border-b border-neutral-100 pb-4 dark:border-neutral-800">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Apply for this Role
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Please fill out your details and attach your CV/Resume to submit
            your application.
          </p>
        </div>

        <div className="mt-6">
          <JobApplicationForm
            defaultPosition={job.title}
            positions={openPositions}
          />
        </div>
      </div>
    </div>
  )
}
