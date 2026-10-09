import { defineEntity } from "@/packages/admin/index.jsx";
import { ContactRound } from "lucide-react";

export const contact = defineEntity({
  slug: "contact",
  label: "Contacts",
  icon: ContactRound,
  titleField: "title",
  roles: ["admin", "staff"],
  fields: [
    { name: "name", type: "text", label: "Name", column: "right" },
    { name: "email", type: "text", label: "Email", column: "right" },
    { name: "phone", type: "text", label: "Phone", column: "right" },
    { name: "subject", type: "text", label: "Subject" },
    { name: "message", type: "textarea", label: "Message" },
  ],
});
