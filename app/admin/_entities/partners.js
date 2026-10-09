import { defineEntity } from "@/packages/admin/index.jsx";
import { Handshake } from "lucide-react";

export const partners = defineEntity({
  slug: "partners",
  label: "Partners",
  icon: Handshake,
  titleField: "userId",
  roles: ["admin", "staff"],
  fields: [{ name: "name", type: "text", label: "Name" }],
});
