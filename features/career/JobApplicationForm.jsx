"use client"

import React, { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Loader2, Paperclip, X, ChevronDown, CheckCircle2 } from "lucide-react"
import { toast } from "@/components/ui/toast"
import {
  QUALIFICATIONS,
  EXPERIENCE_YEARS,
  EMPLOYMENT_TYPES,
} from "./career.data"
import { submitJobApplication } from "./career.api"

const PHONE_REGEX = /^(\d{10}|\+\d{1,13}|\+\d{1,3} \d{10})$/
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_CV_SIZE_BYTES = 20 * 1024 * 1024

const inputCls =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm md:text-base text-neutral-800 placeholder:text-neutral-400 outline-none transition-all focus:border-[#EA0614] focus:ring-2 focus:ring-[#EA0614]/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-zinc-800 dark:text-white"

const selectCls =
  "w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm md:text-base text-neutral-800 outline-none transition-all focus:border-[#EA0614] focus:ring-2 focus:ring-[#EA0614]/20 disabled:opacity-50 dark:border-neutral-700 dark:bg-zinc-800 dark:text-white"

const SelectChevron = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-neutral-500">
    <ChevronDown className="h-4 w-4" />
  </div>
)

export function JobApplicationForm({
  defaultPosition = "",
  positions = [],
  onSuccess,
}) {
  const reduce = useReducedMotion()

  const [form, setForm] = useState({
    position: defaultPosition,
    applicationType: "Full-Time",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    highestQualification: "",
    fieldOfStudy: "",
    institutionName: "",
    graduationYear: "",
    totalExperience: "",
    currentPosition: "",
    relevantExperience: "",
    declarationAccepted: false,
  })

  const [cvFile, setCvFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    if (!file) return

    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      toast.add({
        type: "error",
        description: "CV must be a PDF, DOC, or DOCX file.",
      })
      e.target.value = ""
      return
    }

    if (file.size > MAX_CV_SIZE_BYTES) {
      toast.add({
        type: "error",
        description: "CV must be smaller than 20 MB.",
      })
      e.target.value = ""
      return
    }

    setCvFile(file)
    e.target.value = ""
  }

  const removeFile = () => {
    setCvFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.add({
        type: "error",
        description: "First name and last name are required.",
      })
      return
    }

    if (!form.email.trim()) {
      toast.add({
        type: "error",
        description: "Email address is required.",
      })
      return
    }

    if (!PHONE_REGEX.test(form.phone)) {
      toast.add({
        type: "error",
        description:
          "Phone number must be valid (e.g. 10 digits or +977 9812345678).",
      })
      return
    }

    if (!form.highestQualification) {
      toast.add({
        type: "error",
        description: "Please select your highest qualification.",
      })
      return
    }

    if (!cvFile) {
      toast.add({
        type: "error",
        description: "Please upload your CV / Resume to continue.",
      })
      return
    }

    if (!form.declarationAccepted) {
      toast.add({
        type: "error",
        description: "Please accept the declaration to submit your application.",
      })
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()

      Object.entries(form).forEach(([key, value]) => {
        formData.append(
          key,
          value === null || value === undefined ? "" : String(value)
        )
      })

      const fullName = `${form.firstName} ${form.lastName}`.trim()
      formData.append("full_name", fullName)
      formData.append(
        "description",
        form.relevantExperience || `Application for ${form.position || "open position"}`
      )
      if (form.linkedIn) {
        formData.append("portfolio", form.linkedIn)
      }

      const matchingPos = positions.find((p) => p.value === form.position)
      if (matchingPos?.id) {
        formData.append("job_id", matchingPos.id)
      }

      if (cvFile) {
        formData.append("resume", cvFile)
      }

      await submitJobApplication(formData)

      toast.add({
        type: "success",
        description:
          "Application submitted successfully! Our team will review your profile.",
      })

      setSubmitted(true)
      if (onSuccess) onSuccess()
    } catch (err) {
      toast.add({
        type: "error",
        description:
          err?.message || "Submission failed. Please check your inputs and try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const positionOptions =
    positions.length > 0
      ? positions
      : defaultPosition
        ? [{ value: defaultPosition, label: defaultPosition }]
        : []

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-red-50 text-[#EA0614] dark:bg-red-950/40">
          <CheckCircle2 className="size-10" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white">
          Application Received!
        </h3>
        <p className="mt-2 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
          Thank you for applying. We will review your credentials and reach out to you directly if your profile matches the role requirements.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setForm({
              position: defaultPosition,
              applicationType: "Full-Time",
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              location: "",
              linkedIn: "",
              highestQualification: "",
              fieldOfStudy: "",
              institutionName: "",
              graduationYear: "",
              totalExperience: "",
              currentPosition: "",
              relevantExperience: "",
              declarationAccepted: false,
            })
            setCvFile(null)
          }}
          className="mt-6 rounded-xl bg-[#EA0614] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#d60512]"
        >
          Submit Another Application
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Position Selection ────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="position"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
          >
            Position Applying For
          </label>
          <div className="relative">
            <select
              id="position"
              name="position"
              value={form.position}
              onChange={handleChange}
              disabled={loading}
              className={selectCls}
            >
              <option value="">Select a position</option>
              {positionOptions.map((pos) => (
                <option key={pos.value} value={pos.value}>
                  {pos.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </div>

        <div>
          <label
            htmlFor="applicationType"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
          >
            Employment Type
          </label>
          <div className="relative">
            <select
              id="applicationType"
              name="applicationType"
              value={form.applicationType}
              onChange={handleChange}
              disabled={loading}
              className={selectCls}
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </div>
      </div>

      {/* ── Personal Info ────────────────────────────────────────── */}
      <div>
        <h4 className="border-b border-neutral-100 pb-2 text-sm font-bold uppercase tracking-wider text-[#EA0614] dark:border-neutral-800">
          Personal Information
        </h4>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Deepak"
              disabled={loading}
              required
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Bhusal"
              disabled={loading}
              required
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="yourname@domain.com"
              disabled={loading}
              required
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+977 9812345678"
              disabled={loading}
              required
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Location / City
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Kathmandu, Nepal"
              disabled={loading}
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              LinkedIn / Portfolio URL
            </label>
            <input
              type="url"
              name="linkedIn"
              value={form.linkedIn}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              disabled={loading}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── Education & Experience ────────────────────────────────── */}
      <div>
        <h4 className="border-b border-neutral-100 pb-2 text-sm font-bold uppercase tracking-wider text-[#EA0614] dark:border-neutral-800">
          Qualifications & Experience
        </h4>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Highest Qualification *
            </label>
            <div className="relative">
              <select
                name="highestQualification"
                value={form.highestQualification}
                onChange={handleChange}
                disabled={loading}
                required
                className={selectCls}
              >
                <option value="">Select qualification</option>
                {QUALIFICATIONS.map((q) => (
                  <option key={q.value} value={q.value}>
                    {q.label}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Field of Study
            </label>
            <input
              type="text"
              name="fieldOfStudy"
              value={form.fieldOfStudy}
              onChange={handleChange}
              placeholder="Computer Science, Japanese, etc."
              disabled={loading}
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Institution Name
            </label>
            <input
              type="text"
              name="institutionName"
              value={form.institutionName}
              onChange={handleChange}
              placeholder="University or Institute"
              disabled={loading}
              className={inputCls}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Total Work Experience
            </label>
            <div className="relative">
              <select
                name="totalExperience"
                value={form.totalExperience}
                onChange={handleChange}
                disabled={loading}
                className={selectCls}
              >
                <option value="">Select experience</option>
                {EXPERIENCE_YEARS.map((exp) => (
                  <option key={exp.value} value={exp.value}>
                    {exp.label}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
          </div>

          <div className="col-span-full">
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Current / Most Recent Position
            </label>
            <input
              type="text"
              name="currentPosition"
              value={form.currentPosition}
              onChange={handleChange}
              placeholder="e.g. Junior IT Support at ABC Corp"
              disabled={loading}
              className={inputCls}
            />
          </div>

          <div className="col-span-full">
            <label className="mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Relevant Experience / Brief Pitch
            </label>
            <textarea
              name="relevantExperience"
              rows={3}
              value={form.relevantExperience}
              onChange={handleChange}
              placeholder="Share a short summary of your background, key achievements, or motivation..."
              disabled={loading}
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* ── CV / Resume Upload ───────────────────────────────────── */}
      <div>
        <h4 className="border-b border-neutral-100 pb-2 text-sm font-bold uppercase tracking-wider text-[#EA0614] dark:border-neutral-800">
          CV / Resume Upload *
        </h4>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {cvFile ? (
            <div className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/60 px-4 py-2 text-sm font-medium text-neutral-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-white">
              <Paperclip className="h-4 w-4 text-[#EA0614]" />
              <span className="max-w-[240px] truncate">{cvFile.name}</span>
              <button
                type="button"
                onClick={removeFile}
                disabled={loading}
                className="ml-2 text-neutral-400 hover:text-[#EA0614]"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#EA0614] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#d60512]">
              <Paperclip className="h-4 w-4" />
              <span>Choose Resume File</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                disabled={loading}
                onChange={handleFileChange}
              />
            </label>
          )}

          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            PDF, DOC or DOCX (max 20 MB)
          </span>
        </div>
      </div>

      {/* ── Declaration ─────────────────────────────────────────── */}
      <div className="rounded-xl bg-neutral-50 p-4 dark:bg-zinc-800/60">
        <label className="flex cursor-pointer items-start gap-3 select-none">
          <input
            type="checkbox"
            name="declarationAccepted"
            checked={form.declarationAccepted}
            onChange={handleChange}
            disabled={loading}
            required
            className="mt-0.5 size-4.5 rounded border-neutral-300 text-[#EA0614] accent-[#EA0614] focus:ring-[#EA0614]"
          />
          <span className="text-xs md:text-sm text-neutral-700 leading-relaxed dark:text-neutral-300">
            I confirm that the information provided in this application is accurate and true to the best of my knowledge, and I consent to the processing of my credentials for evaluation and recruitment purposes.
          </span>
        </label>
      </div>

      {/* ── Submit ──────────────────────────────────────────────── */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#EA0614] px-8 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-[#d60512] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <span>Submit Application</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
