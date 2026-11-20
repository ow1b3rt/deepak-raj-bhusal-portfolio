import { fetcher } from "@/lib/fetcher"
import { timeAgo, stripHtml, resolveUrl } from "@/lib/utils"
function formatMode(mode = "") {
  if (!mode) return "Onsite"
  const clean = String(mode).toLowerCase()
  if (clean === "hybrid") return "Hybrid"
  if (clean === "remote") return "Remote"
  if (clean === "onsite") return "Onsite"
  return mode.charAt(0).toUpperCase() + mode.slice(1)
}

function toCard(job) {
  const mode = formatMode(job.workingMode || job.workingHours)

  return {
    id: job.id,
    title: job.title,
    type: mode,
    workingMode: job.workingMode || "onsite",
    postedAgo: timeAgo(job.createdAt) || "Recently",
    experienceYears: Number.parseInt(job.experience, 10) || null,
    description: stripHtml(job.description) || "",
    salary: job.salary || "",
    imgSrc: job.imgSrc ? resolveUrl(job.imgSrc) : "/images/careers/jlpt-desk.jpg",
    slug: job.slug,
    href: `/careers/${job.slug}`,
  }
}

/**
 * Fetch paginated jobs list.
 * Only returns jobs with status "open" (or no status field).
 *
 * @param {{ page?: number, limit?: number }} opts
 * @returns {{ items: object[], page: number, totalPages: number, total: number }}
 */
export async function getJobs({ page = 1, limit = 5 } = {}) {
  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(limit),
      status: "open",
    })
    const res = await fetcher(`/jobs?${params}`)
    const items = (res?.items || []).filter(
      (j) => !j.status || j.status === "open",
    )

    const total = res?.total ?? items.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    return {
      items: items.map(toCard),
      page,
      totalPages,
      total,
    }
  } catch (err) {
    console.error("Failed to load jobs from API:", err?.message)
  }

  return {
    items: [],
    page,
    totalPages: 1,
    total: 0,
  }
}

export async function getOpenPositions() {
  try {
    const data = await fetcher("/jobs?limit=100")
    const items = data?.items || []
    return items
      .filter((j) => !j.status || j.status === "open")
      .map((job) => ({
        value: job.title,
        label: job.title,
        slug: job.slug,
        id: job.id,
      }))
  } catch {
    // Return no positions when the jobs API is unavailable.
  }

  return []
}

export async function getJobBySlug(slug) {
  try {
    const host = process.env.NEXT_PUBLIC_API || "http://localhost:5000/api"
    const res = await fetch(`${host}/jobs/slug/${slug}`, {
      cache: "no-store",
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.success && data?.item) {
        const item = data.item
        const details = item.details || {}

        // Extract overview from details JSON or fallback to job description
        let overview = []
        if (details.overview) {
          overview = Array.isArray(details.overview)
            ? details.overview.filter(Boolean)
            : [details.overview]
        }
        if (overview.length === 0 && item.description) {
          overview = [stripHtml(item.description)]
        }

        // Extract responsibilities from details JSON
        const responsibilities = Array.isArray(details.responsibilities)
          ? details.responsibilities.filter(Boolean)
          : []

        // Extract requirements / niceToHave from details JSON
        const niceToHave = Array.isArray(details.requirements)
          ? details.requirements.filter(Boolean)
          : Array.isArray(details.niceToHave)
          ? details.niceToHave.filter(Boolean)
          : []

        const mode = formatMode(item.workingMode || item.workingHours)

        return {
          id: item.id,
          slug: item.slug || slug,
          title: item.title,
          badge: "Career",
          overview,
          responsibilities,
          niceToHave,
          salary: item.salary,
          experienceYears: Number.parseInt(item.experience, 10) || null,
          workingMode: mode,
          workingHours: mode,
          imgSrc: item.imgSrc ? resolveUrl(item.imgSrc) : "/images/careers/jlpt-desk.jpg",
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch job by slug:", err?.message)
  }

  return null
}

export async function submitJobApplication(formData) {
  const host = process.env.NEXT_PUBLIC_API || "http://localhost:5000/api"
  const url = `${host}/careers`

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    credentials: "omit",
  })

  let result = null
  try {
    result = await response.json()
  } catch {
    result = null
  }

  if (!response.ok) {
    throw new Error(result?.message || "Submission failed. Please try again.")
  }

  return result
}
