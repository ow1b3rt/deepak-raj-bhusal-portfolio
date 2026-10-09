import { defineEntity } from "@/packages/admin/index.jsx";
import { ContactRound } from "lucide-react";

export const contact = defineEntity({
  slug: "contact",
  label: "Contacts",
  icon: ContactRound,
  titleField: "email",
  canCreate: false,
  roles: ["admin", "staff"],
  fields: [
    { name: "firstName", type: "text", label: "First Name", column: "right", editable: false },
    { name: "lastName", type: "text", label: "Last Name", column: "right", editable: false },
    { name: "email", type: "text", label: "Email", column: "right", editable: false },
    { name: "phone", type: "text", label: "Mobile Number", column: "right", editable: false },
    { name: "company", type: "text", label: "Company / Organization", column: "right", editable: false },
    { name: "interest", type: "text", label: "Interest", column: "right", editable: false },
    {
      name: "createdAt:date",
      type: "date",
      label: "Received at",
      invisible: true,
      editable: false,
    },
    { name: "message", type: "textarea", label: "Message", editable: false },
  ],
});
