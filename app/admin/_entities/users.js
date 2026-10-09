import { defineEntity } from "@/packages/admin/index.jsx";
import { Users } from "lucide-react";

export const users = defineEntity({
  slug: "users",
  label: "Users",
  icon: Users,
  titleField: "name",
  roles: ["admin", "staff"],
  fields: [
    { name: "name", type: "text", label: "Name", required: true },
    { name: "email", type: "email", label: "Email", required: true },
    { name: "password", type: "password", label: "Password", invisible: true },
    {
      name: "role",
      type: "select",
      column: "right",
      label: "Role",
      options: ["admin", "editor", "author"],
    },
    { name: "avatar", type: "image", label: "Avatar", invisible: true, column: "right" },
  ],
  filters: [
    {
      field: "role",
      label: "Roles",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Author", value: "author" },
      ],
    },
  ],
});
