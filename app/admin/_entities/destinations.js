import { defineEntity } from "@/packages/admin/index.jsx";
import { MapPin } from "lucide-react";

export const destinations = defineEntity({
  slug: "destinations",
  label: "Destinations",
  icon: MapPin,
  titleField: "name",
  roles: ["admin", "staff"],
  fields: [
    { name: "name", type: "text", label: "Name" },
    {
      name: "type",
      type: "select",
      label: "Type",
      options: [
        { label: "National", value: "national" },
        { label: "International", value: "international" },
      ],
    },
    { name: "googleUrl", type: "text", label: "Google URL", invisible: true },
    { name: "description", type: "textarea", label: "Description", invisible: true },
    { name: "thumbnail", type: "image", label: "Thumbnail", column: "right", invisible: true },
    { name: "gallery", type: "medialist", label: "Gallery", invisible: true },
  ],
});
