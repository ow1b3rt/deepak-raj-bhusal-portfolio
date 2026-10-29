"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  AdminLayout,
  useApi,
  useGet,
  useToast,
} from "@/packages/admin"
import {
  ArrowLeft,
  Briefcase,
  ExternalLink,
  FileCheck,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react"
import { resolveUrl } from "@/lib/utils"

const STATUS_OPTIONS = [
  "pending",
  "shortlisted",
  "interviewed",
  "hired",
  "rejected",
]

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  shortlisted: "bg-blue-50 text-blue-700 border border-blue-200",
  interviewed: "bg-purple-50 text-purple-700 border border-purple-200",
  hired: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border border-rose-200",
}

const formatDateTime = (value) =>
  value ? new Date(value).toLocaleString() : "—"

function getFileKind(url = "") {
  const clean = url.split("?")[0].toLowerCase()
  if (/\.(png|jpe?g|webp|gif|avif)$/.test(clean)) return "image"
  if (clean.endsWith(".pdf")) return "pdf"
  return "other"
}

function DetailItem({ label, value, wide = false, isLink = false }) {
  return (
    <div className={`flex flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
        {label}
      </span>
      {isLink && value ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
        >
          {value}
          <ExternalLink size={14} />
        </a>
      ) : (
        <span className="text-sm font-medium text-gray-900 whitespace-pre-wrap">
          {value || "—"}
        </span>
      )}
    </div>
  )
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-4 flex items-center gap-2.5 border-b border-gray-100 pb-3">
        {Icon && <Icon className="h-5 w-5 text-gray-500" />}
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {children}
      </div>
    </section>
  )
}

export default function CandidateDetailPage() {
  const { id } = useParams()
  const toast = useToast()
  const { patch } = useApi()

  const { data, isLoading, mutate } = useGet(`/careers/${id}`)
  const item = data?.item

  const [selectedStatus, setSelectedStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  const currentStatus = selectedStatus ?? item?.status ?? "pending"
  const savedStatus = item?.status ?? "pending"

  const cvUrl = item?.resumeUrl ? resolveUrl(item.resumeUrl) : null
  const cvKind = getFileKind(item?.resumeUrl || "")

  async function handleStatusSave() {
    if (!selectedStatus || selectedStatus === savedStatus) return
    setSaving(true)
    try {
      const res = await patch(`/careers/${id}`, { status: selectedStatus })
      if (res?.ok || res?.success) {
        toast.success("Candidate status updated successfully")
        if (mutate) mutate()
      }
    } catch (err) {
      toast.error(err?.message || "Failed to update status")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout title="Candidate Details">
        <div className="flex h-64 items-center justify-center gap-2 text-sm text-gray-500">
          <Loader2 size={18} className="animate-spin text-gray-400" />
          Loading candidate data…
        </div>
      </AdminLayout>
    )
  }

  if (!item) {
    return (
      <AdminLayout title="Candidate Details">
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Candidate record not found.
          <div className="mt-4">
            <Link
              href="/admin/careers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
            >
              <ArrowLeft size={16} /> Back to candidates
            </Link>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={item.full_name || "Candidate Details"}>
      <div className="flex flex-col gap-6">
        {/* Back Link & Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/admin/careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={16} /> Back to Candidates
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                STATUS_STYLES[savedStatus] ?? "bg-gray-100 text-gray-700"
              }`}
            >
              {savedStatus || "pending"}
            </span>

            <select
              value={currentStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={saving}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 capitalize shadow-xs transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleStatusSave}
              disabled={saving || !selectedStatus || selectedStatus === savedStatus}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-1.5 text-sm font-medium text-white shadow-xs transition-all hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              Save Status
            </button>
          </div>
        </div>

        {/* Candidate Summary Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Applied For: {item.jobTitle || "Open Application"}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {item.full_name}
              </h2>
            </div>
            <p className="text-xs text-gray-500">
              Submitted: {formatDateTime(item.createdAt || item.created_at)}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            {item.email && (
              <span className="inline-flex items-center gap-1.5">
                <Mail size={15} className="text-gray-400" />
                <a href={`mailto:${item.email}`} className="hover:underline">
                  {item.email}
                </a>
              </span>
            )}
            {item.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone size={15} className="text-gray-400" />
                <a href={`tel:${item.phone}`} className="hover:underline">
                  {item.phone}
                </a>
              </span>
            )}
            {item.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-gray-400" />
                {item.location}
              </span>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Application Details */}
          <SectionCard title="Application Details" icon={Briefcase}>
            <DetailItem label="Position" value={item.jobTitle} />
            <DetailItem label="Employment Type" value={item.applicationType} />
          </SectionCard>

          {/* Personal Information */}
          <SectionCard title="Personal Information" icon={User}>
            <DetailItem label="Full Name" value={item.full_name} />
            <DetailItem label="Email" value={item.email} />
            <DetailItem label="Phone" value={item.phone} />
            <DetailItem label="Location" value={item.location} />
            <DetailItem
              label="LinkedIn / Portfolio"
              value={item.portfolio}
              isLink={Boolean(item.portfolio)}
              wide
            />
          </SectionCard>

          {/* Education Information */}
          <SectionCard title="Education Information" icon={GraduationCap}>
            <DetailItem
              label="Highest Qualification"
              value={item.highestQualification}
            />
            <DetailItem label="Field of Study" value={item.fieldOfStudy} />
            <DetailItem
              label="Institution Name"
              value={item.institutionName}
            />
            <DetailItem label="Graduation Year" value={item.graduationYear} />
          </SectionCard>

          {/* Work Experience */}
          <SectionCard title="Work Experience" icon={Briefcase}>
            <DetailItem
              label="Total Experience"
              value={
                item.totalExperience
                  ? `${item.totalExperience} ${
                      item.totalExperience === "1" ? "Year" : "Years"
                    }`
                  : "—"
              }
            />
            <DetailItem
              label="Current / Previous Position"
              value={item.currentPosition}
            />
            <DetailItem
              label="Relevant Experience"
              value={item.relevantExperience || item.description}
              wide
            />
          </SectionCard>
        </div>

        {/* Documents / Resume Section */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2.5">
              <FileCheck className="h-5 w-5 text-gray-500" />
              <h3 className="text-base font-semibold text-gray-900">
                Documents & Verification
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <span>Declaration Accepted:</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  item.declarationAccepted
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.declarationAccepted ? "Yes" : "No"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Curriculum Vitae (CV) / Resume
            </span>

            {cvUrl ? (
              <div className="flex flex-col gap-4">
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-xs transition-colors hover:border-blue-500 hover:text-blue-600"
                >
                  <FileText size={18} className="text-blue-600" />
                  <span>Open CV in new tab</span>
                  <ExternalLink size={14} className="text-gray-400" />
                </a>

                {cvKind === "pdf" && (
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                    <iframe
                      src={cvUrl}
                      title="CV Preview"
                      className="h-[650px] w-full border-0"
                    />
                  </div>
                )}

                {cvKind === "image" && (
                  <div className="relative max-h-[600px] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cvUrl}
                      alt="CV Document"
                      className="mx-auto max-h-[580px] object-contain"
                    />
                  </div>
                )}

                {cvKind === "other" && (
                  <p className="text-sm text-gray-500">
                    Direct in-browser preview is not supported for this file format.
                    Please click the button above to view or download the file.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No CV or resume file attached to this record.
              </p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
