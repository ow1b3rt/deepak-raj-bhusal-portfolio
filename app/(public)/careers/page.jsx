import { CareerSection } from "@/features/career/CareerSection"
import { getJobs, getOpenPositions } from "@/features/career/career.api"

const JOBS_PER_PAGE = 5

export async function generateMetadata({ searchParams }) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const isFirst = currentPage <= 1

  return {
    title: isFirst
      ? "Careers | Deepak Raj Bhusal"
      : `Careers – Page ${currentPage} | Deepak Raj Bhusal`,
    description:
      "Join our team and work on impactful initiatives. Have an idea, opportunity, or collaboration in mind? Let's start a conversation.",
    alternates: {
      canonical: isFirst ? "/careers" : `/careers?page=${currentPage}`,
    },
  }
}

export default async function CareersPage({ searchParams }) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1

  const [{ items: jobs, totalPages, total }, openPositions] = await Promise.all([
    getJobs({ page: currentPage, limit: JOBS_PER_PAGE }),
    getOpenPositions(),
  ])

  return (
    <div className="min-h-[70vh] pb-16">
      <CareerSection
        jobs={jobs}
        openPositions={openPositions}
        pagination={{ page: currentPage, totalPages, total }}
      />
    </div>
  )
}
