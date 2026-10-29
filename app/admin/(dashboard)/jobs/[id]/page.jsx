"use client"

import { useParams, useRouter } from "next/navigation"
import {
  AdminLayout,
  Form,
  ImageUploader,
  Input,
  removeEmptyFields,
  Select,
  Textarea,
  useApi,
  useGet,
  useToast,
} from "@/packages/admin"
import { Loader2 } from "lucide-react"
import { JobDetailsField } from "@/components/organisms/admin/JobDetailsField.jsx"

const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "close", label: "Closed" },
]

const WORKING_MODE_OPTIONS = [
  { value: "onsite", label: "Onsite" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
]

const NEW_JOB_DEFAULTS = {
  workingMode: "onsite",
  status: "open",
}

function coerceJsonFields(values, fieldNames) {
  const coerced = { ...values }
  for (const name of fieldNames) {
    if (typeof coerced[name] === "string" && coerced[name] !== "") {
      try {
        coerced[name] = JSON.parse(coerced[name])
      } catch {
        coerced[name] = undefined
      }
    }
  }
  return coerced
}

export default function JobEditPage() {
  const { id } = useParams()
  const router = useRouter()
  const toast = useToast()
  const { post, patch } = useApi()

  const isNew = id === "new"
  const apiPath = "/jobs"
  const { data, isLoading } = useGet(isNew ? null : `${apiPath}/${id}`)

  if (!isNew && isLoading) {
    return (
      <AdminLayout title="Job">
        <div className="flex h-64 items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 size={18} className="animate-spin text-gray-400" />
          Loading job details…
        </div>
      </AdminLayout>
    )
  }

  const defaults = isNew ? NEW_JOB_DEFAULTS : data?.item ?? {}

  async function handleSubmit(values) {
    let payload = coerceJsonFields(values, ["details"])
    payload = removeEmptyFields(payload)

    const url = isNew ? apiPath : `${apiPath}/${id}`
    const res = isNew ? await post(url, payload) : await patch(url, payload)

    if (res?.ok || res?.success) {
      toast.success(`Job ${isNew ? "created" : "updated"} successfully`)
      router.replace("/admin/jobs")
    }
    return res
  }

  return (
    <AdminLayout title={`${isNew ? "New" : "Edit"} Job`} formId="job-form">
      <Form
        defaults={defaults}
        id="job-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
          {/* Top row: image + core fields side by side */}
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="w-full lg:w-72 shrink-0">
              <ImageUploader name="content" caption="Featured Job Image" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <Input name="title" placeholder="Job Title (e.g. IT Officer)" required />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input name="salary" placeholder="Salary (e.g. Rs 50,000 - Rs 70,000)" required />
                <Input name="experience" placeholder="Required Experience (e.g. 2)" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Select name="workingMode" placeholder="Working Mode" required>
                  {WORKING_MODE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>

                <Select name="status" placeholder="Status" required>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Job Overview / Description */}
          <div className="border-t border-gray-100 pt-4">
            <Textarea
              name="description"
              placeholder="Primary Job Description / Overview"
              required
            />
          </div>

          {/* Detailed Bullet Points (Responsibilities & Requirements) */}
          <div className="border-t border-gray-100 pt-4">
            <JobDetailsField name="details" caption="Job Details & Criteria" />
          </div>
        </div>
      </Form>
    </AdminLayout>
  )
}
