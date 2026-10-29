import { defineEntity } from "@/packages/admin/index.jsx";
import { BookOpen } from "lucide-react";

export const articles = defineEntity({
  slug: "articles",
  label: "Articles",
  icon: BookOpen,
  titleField: "title",
  roles: ["admin", "author"],
  fields: [
    { name: "title:bold", type: "text", label: "Title", required: true },
    {
      name: "status:status",
      type: "select",
      label: "Status",
      options: ["draft", "published"],
      required: true,
    },
    { name: "publishedAt:date", type: "date", label: "Published At" },
    {
      name: "description:textarea",
      type: "editor",
      label: "Description / Summary",
      invisible: true,
    },
    {
      name: "author",
      type: "text",
      label: "Author",
      invisible: true,
    },
    {
      name: "coAuthors",
      type: "text",
      label: "Co-Authors (comma-separated)",
      invisible: true,
    },
    {
      name: "thumbnail:image",
      type: "image",
      label: "Thumbnail Image",
      invisible: true,
      column: "right",
    },
    {
      name: "pdfId:pdf",
      type: "pdf",
      label: "PDF Document",
      invisible: true,
      column: "right",
    },
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
