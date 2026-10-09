import { defineEntity } from "@/packages/admin/index.jsx";
import { ContactRound } from "lucide-react";

export const contact = defineEntity({
  slug: "contact",
  label: "Contacts",
  icon: ContactRound,
  titleField: "email",
  roles: ["admin", "staff"],
  fields: [
    { name: "firstName", type: "text", label: "First Name", column: "right" },
    { name: "lastName", type: "text", label: "Last Name", column: "right" },
    { name: "email", type: "text", label: "Email", column: "right" },
    { name: "phone", type: "text", label: "Phone", column: "right" },
    { name: "company", type: "text", label: "Company / Organization", column: "right" },
    { name: "interest", type: "text", label: "Interest", column: "right" },
    { name: "message", type: "textarea", label: "Message" },
  ],
});
