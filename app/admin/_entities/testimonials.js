import { defineEntity } from "@/packages/admin/index.jsx";
import { Bell } from "lucide-react";

export const testimonials = defineEntity({
  slug: "testimonials",
  label: "Testimonials",
  icon: Bell,
  titleField: "title",
  roles: ["admin", "staff"],
  fields: [
    { name: "name", type: "text", label: "Name", required: true },
    { name: "description", type: "textarea", label: "Description" },
    { name: "rating", type: "number", label: "Rating" },
    {
      name: "image:image",
      type: "image",
      label: "Image",
      invisible: true,
      column: "right",
    },
  ],
});
