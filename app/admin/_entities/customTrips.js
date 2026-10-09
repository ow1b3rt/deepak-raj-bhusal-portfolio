import { defineEntity } from "@/packages/admin/index.jsx";
import { MapPinned } from "lucide-react";

export const customTrip = defineEntity({
  slug: "customTrip",
  label: "Custom Trips",
  icon: MapPinned,
  titleField: "name",
  roles: ["admin", "staff"],
  fields: [
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "text", label: "Email" },
    { name: "phone", type: "text", label: "Phone", column: "right" },
    { name: "destination", type: "text", label: "Destination", column: "right" },
    {
      name: "status:status",
      type: "select",
      label: "Status",
      column: "right",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Completed", value: "completed" },
      ],
    },
    { name: "travelDate", type: "date", label: "Travel Date", column: "right", invisible: true },
    {
      name: "noOfTravellers",
      type: "number",
      label: "No. of Travellers",
      column: "right",
      invisible: true,
    },
    { name: "tripType", type: "text", label: "Trip Type", column: "right", invisible: true },
    {
      name: "accommodation",
      type: "text",
      label: "Accommodation",
      column: "right",
      invisible: true,
    },
    { name: "tripNotes", type: "textarea", label: "Trip Notes", invisible: true },
  ],
});
