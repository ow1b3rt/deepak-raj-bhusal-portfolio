import { defineEntity } from "@/packages/admin/index.jsx";
import { CalendarCheck } from "lucide-react";

export const bookings = defineEntity({
  slug: "bookings",
  label: "Bookings",
  icon: CalendarCheck,
  titleField: "customerName",
  roles: ["admin", "staff"],
  canCreate: false,
  filters: [
    {
      field: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Completed", value: "completed" },
      ],
    },
  ],
  fields: [
    { name: "customerName", type: "text", label: "Customer Name", column: "right" },
    { name: "customerPhone", type: "text", label: "Customer Phone", column: "right" },
    { name: "packageName", type: "text", label: "Package Name" },
    { name: "travelDate:date", type: "date", label: "Booking Date" },
    {
      name: "status:status",
      type: "select",
      label: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Completed", value: "completed" },
      ],
    },
  ],
});
