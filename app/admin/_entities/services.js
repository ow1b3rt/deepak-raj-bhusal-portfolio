import { defineEntity } from "@/packages/admin/index.jsx";
import { Handshake } from "lucide-react";

export const services = defineEntity({
  slug: "services",
  label: "Services",
  icon: Handshake,
  titleField: "userId",
  roles: ["admin", "staff"],
  fields: [{ name: "name", type: "text", label: "Name" }],
});
