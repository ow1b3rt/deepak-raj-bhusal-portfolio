"use client";

import { useApi, useGet } from "@/packages/admin";

import { FaqEditable } from "@/components/organisms/Faq/FaqEditable";

export default function FaqPage() {
  const { data } = useGet("/layouts/faqs");
  const { post } = useApi();

  const handleChange = async (updatedSection) => {
    const response = await post("/layouts/faqs", updatedSection);
  };

  return (
    <section className="flex w-full flex-col gap-8 p-4">
      <FaqEditable key={data} section={data?.layout} onSave={handleChange} />
    </section>
  );
}
