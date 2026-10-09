"use client";

import { useApi, useGet } from "@/packages/admin";

import { HomeGalleryEditable } from "@/components/organisms/home/HomeGallery/GalleryEditable";

export default function GalleryPage() {
  const { data } = useGet("/layouts/gallery");
  const { post } = useApi();

  const handleSave = async (updatedSection) => {
    await post("/layouts/gallery", updatedSection);
  };

  return (
    <section className="flex w-full flex-col gap-8 p-4">
      <HomeGalleryEditable key={data} section={data?.layout} onSave={handleSave} />
    </section>
  );
}
