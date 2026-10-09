import { defineEntity } from "@/packages/admin/index.jsx";
import { ContactRound } from "lucide-react";

export const contact = defineEntity({
  slug: "contact",
  label: "Contacts",
  icon: ContactRound,
  titleField: "title",
  canCreate: false,
  roles: ["admin", "staff"],
  fields: [
    { name: "name", type: "text", label: "Name", column: "right", editable: false },
    { name: "email", type: "text", label: "Email", column: "right", editable: false },
    { name: "phone", type: "text", label: "Mobile Number", column: "right", editable: false },
    {
      name: "createdAt:date",
      type: "date",
      label: "Received at",
      invisible: true,
      editable: false,
    },
    { name: "subject", type: "text", label: "Subject", editable: false },
    { name: "message", type: "textarea", label: "Message", editable: false },
  ],
});
