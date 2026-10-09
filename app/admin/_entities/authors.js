import { defineEntity } from "@/packages/admin/index.jsx";
import { PenSquare } from "lucide-react";

export const authors = defineEntity({
  slug: "authors",
  label: "Authors",
  icon: PenSquare,
  titleField: "userId",
  roles: ["admin", "staff"],
  fields: [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "phone", type: "text", label: "Phone" },
    { name: "bio", type: "textarea", label: "Bio" },
    { name: "password", type: "password", label: "Password", invisible: true },
    { name: "avatar", type: "image", label: "Avatar", invisible: true, column: "right" },
  ],
});
