import { defineEntity } from "@/packages/admin/index.jsx";
import { Users2 } from "lucide-react";

export const workshop = defineEntity({
  slug: "workshop",
  label: "Workshop Inquiries",
  icon: Users2,
  titleField: "firstName",
  roles: ["admin", "staff"],
  filters: [
    {
      field: "status",
      label: "Status",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Converted", value: "converted" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      field: "workshopDetails",
      label: "Workshop Type",
      options: [
        { label: "Team Building Workshop", value: "team_building_workshop" },
        { label: "Corporate Team Building", value: "corporate_team_building" },
        { label: "Leadership Workshop", value: "leadership_workshop" },
        { label: "Outdoor Team Activity", value: "outdoor_team_activity" },
        { label: "Customized Workshop", value: "customized_workshop" },
        { label: "Other", value: "other" },
      ],
    },
    {
      field: "participants",
      label: "Participants",
      options: [
        { label: "0-10", value: "0-10" },
        { label: "10-20", value: "10-20" },
        { label: "20-50", value: "20-50" },
      ],
    },
  ],
  fields: [
    { name: "name", type: "text", label: "Name", column: "right" },
    { name: "phone", type: "text", label: "Phone", column: "right" },
    { name: "org", type: "text", label: "Company/Organization", column: "right" },
    {
      name: "status",
      type: "select",
      label: "Status",
      column: "right",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Converted", value: "converted" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      name: "workshopDetails",
      type: "select",
      label: "Workshop Type",
      options: [
        { label: "Team Building Workshop", value: "team_building_workshop" },
        { label: "Corporate Team Building", value: "corporate_team_building" },
        { label: "Leadership Workshop", value: "leadership_workshop" },
        { label: "Outdoor Team Activity", value: "outdoor_team_activity" },
        { label: "Customized Workshop", value: "customized_workshop" },
        { label: "Other", value: "other" },
      ],
    },
  ],
});
