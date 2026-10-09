import { defineEntity } from "@/packages/admin/index.jsx";
import { Package } from "lucide-react";

export const packages = defineEntity({
  slug: "packages",
  label: "Packages",
  icon: Package,
  titleField: "title",
  canCreate: false,
  roles: ["admin", "staff"],
  fields: [
    { name: "title", type: "text", label: "Title" },
    {
      name: "category",
      type: "select",
      label: "Category",
      options: [
        { label: "Adventure", value: "adventure" },
        { label: "Tour", value: "tour" },
      ],
    },
    {
      name: "subcategory",
      type: "select",
      label: "Subcategory",
      options: [
        { label: "Tour/Cultural", value: "Cultural" },
        { label: "Tour/City", value: "City" },
        { label: "Tour/Wildlife", value: "Wildlife" },
        { label: "Tour/Religious", value: "Religious" },
        { label: "Tour/International", value: "International" },
        { label: "Adventure/Trekking", value: "Trekking" },
        { label: "Adventure/Camping", value: "Camping" },
        { label: "Adventure/Rafting", value: "Rafting" },
        { label: "Adventure/Skiing", value: "Skiing" },
        { label: "Adventure/Hunting", value: "Hunting" },
        { label: "Adventure/Paragliding", value: "Paragliding" },
      ],
    },
    { name: "packageType", type: "text", label: "Package Type", invisible: true },
    { name: "price", type: "number", label: "Price" },
    { name: "discountedPrice", type: "number", label: "Discounted Price", invisible: true },
    { name: "description", type: "textarea", label: "Description", invisible: true },
    { name: "thumbnail", type: "image", label: "Thumbnail", column: "right", invisible: true },
  ],
});
