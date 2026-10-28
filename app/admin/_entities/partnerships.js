import { defineEntity } from "@/packages/admin/index.jsx"
import { Handshake } from "lucide-react"

export const partnership = defineEntity({
  slug: "partnership",
  label: "Partnerships",
  icon: Handshake,
  titleField: "email",
  canCreate: false,
  roles: ["admin", "staff"],
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      column: "right",
      editable: false,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      column: "right",
      editable: false,
    },
    {
      name: "email",
      type: "text",
      label: "Email",
      column: "right",
      editable: false,
    },
    {
      name: "phone",
      type: "text",
      label: "Mobile Number",
      column: "right",
      editable: false,
    },
    {
      name: "company",
      type: "text",
      label: "Company / Organization",
      column: "right",
      editable: false,
    },
    {
      name: "createdAt:date",
      type: "date",
      label: "Received at",
      invisible: true,
      editable: false,
    },
    { name: "message", type: "textarea", label: "Message", editable: false },
  ],
})
