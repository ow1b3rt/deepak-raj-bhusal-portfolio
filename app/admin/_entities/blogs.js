import { defineEntity } from "@/packages/admin/index.jsx";
import { Newspaper } from "lucide-react";

export const blogs = defineEntity({
  slug: "blogs",
  label: "Blogs",
  icon: Newspaper,
  titleField: "title",
  roles: ["admin", "author"],
  fields: [
    { name: "title:bold", type: "text", label: "Title", required: true },
    { name: "viewCount", type: "number", label: "View Count" },
    {
      name: "status:status",
      type: "select",
      label: "Status",
      options: ["draft", "published"],
      required: true,
    },
    { name: "publishedAt:date", type: "date", label: "Published At" },
  ],
  filters: [
    {
      field: "status",
      label: "Status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
  ],
});
