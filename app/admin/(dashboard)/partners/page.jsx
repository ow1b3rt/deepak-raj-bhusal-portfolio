"use client";

import { useEffect, useState } from "react";
import { useApi, useGet, useToast } from "@/packages/admin";

import OfficialPartnersEditable from "@/components/templates/editables/OfficialPartnersEditable";

export default function PartnersLayout() {
  const { post } = useApi();
  const { data } = useGet("/layouts/partners");
  const toast = useToast();
  const [sectionData, setSectionData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.layout) {
      setSectionData(data.layout); // { title, list: [{ name, logo }, ...] }
    }
  }, [data]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await post("/layouts/partners", sectionData, {
        success: () => toast.success("Partners saved successfully!"),
        error: (err) => toast.error(`Failed to save partners: ${err.message}`),
      });
    } finally {
      setSaving(false);
    }
  };

  if (!sectionData) return null;

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Official Partners</h3>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="cursor-pointer rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <OfficialPartnersEditable section={sectionData} onChange={setSectionData} />
    </div>
  );
}
