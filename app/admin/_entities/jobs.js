import { defineEntity } from "@/packages/admin/index.jsx"
import { Briefcase } from "lucide-react"

export const jobs = defineEntity({
  slug: "jobs",
  label: "Jobs",
  icon: Briefcase,
  titleField: "title",
  roles: ["admin", "staff"],
  fields: [
    { name: "title", type: "text", label: "Title", required: true },
    { name: "salary", type: "text", label: "Salary", required: true },
    { name: "experience", type: "text", label: "Required Experience (Years)" },
    {
      name: "workingMode",
      type: "select",
      label: "Working Mode",
      options: [
        { value: "onsite", label: "Onsite" },
        { value: "hybrid", label: "Hybrid" },
        { value: "remote", label: "Remote" },
      ],
      defaultValue: "onsite",
      required: true,
    },
    {
      name: "status",
      type: "select",
      label: "Job Status",
      options: [
        { value: "open", label: "Open" },
        { value: "close", label: "Closed" },
      ],
      defaultValue: "open",
      required: true,
    },
    {
      name: "description:textarea",
      type: "editor",
      label: "Job Description / Summary",
      required: true,
      invisible: true,
    },
    {
      name: "content:image",
      type: "image",
      label: "Featured Image",
      invisible: true,
      column: "right",
    },
  ],
  filters: [
    {
      name: "workingMode",
      label: "Working Mode",
      options: [
        { value: "onsite", label: "Onsite" },
        { value: "hybrid", label: "Hybrid" },
        { value: "remote", label: "Remote" },
      ],
    },
    {
      name: "status",
      label: "Status",
      options: [
        { value: "open", label: "Open" },
        { value: "close", label: "Closed" },
      ],
    },
  ],
})
