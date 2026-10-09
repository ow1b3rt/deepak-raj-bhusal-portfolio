"use client";

import { useParams } from "next/navigation";
import { useApi, useGet } from "@/packages/admin";

import { HomeServicesEditable } from "@/components/organisms/home/HomeServices/HomeServicesEditable";

export default function SectionPage() {
  const { section } = useParams();
  const { data } = useGet(`/layouts/${section}`);
  const { post } = useApi();

  const handleSave = async (updatedSection) => {
    await post(`/layouts/${section}`, updatedSection);
  };

  return (
    <section className="flex w-full flex-col gap-8 p-4">
      <HomeServicesEditable
        key={data}
        section={data?.layout}
        onSave={handleSave}
        sectionName={section}
      />
    </section>
  );
}
