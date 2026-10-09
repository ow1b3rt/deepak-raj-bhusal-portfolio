// src/app/admin/packages/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AdminLayout,
  Form,
  ImageUploader,
  Input,
  MediaListUploader,
  removeEmptyFields,
  Select,
  Textarea,
  useApi,
  useGet,
  useToast,
} from "@/packages/admin";
import { Loader2 } from "lucide-react";

import { PackageDaysField } from "@/components/organisms/admin/PackageDaysField.jsx";
import { PackageDestinationsField } from "@/components/organisms/admin/PackageDestinationsField.jsx";

const subcategoryFilter = {
  tour: {
    title: "Subcategory",
    options: ["Cultural", "City", "Wildlife", "Religious", "International"],
  },
  adventure: {
    title: "Subcategory",
    options: ["Trekking", "Camping", "Rafting", "Skiing", "Hunting", "Paragliding"],
  },
};

const CATEGORY_OPTIONS = ["adventure", "tour"];
const PACKAGE_TYPE_OPTIONS = ["Family", "Couple", "Solo", "Group"];

function coerceNumberFields(values, fieldNames) {
  const coerced = { ...values };
  for (const name of fieldNames) {
    const raw = coerced[name];
    if (raw != null && raw !== "" && !isNaN(Number(raw))) {
      coerced[name] = Number(raw);
    }
  }
  return coerced;
}

function coerceJsonFields(values, fieldNames) {
  const coerced = { ...values };
  for (const name of fieldNames) {
    if (typeof coerced[name] === "string" && coerced[name] !== "") {
      try {
        coerced[name] = JSON.parse(coerced[name]);
      } catch {
        coerced[name] = undefined;
      }
    }
  }
  return coerced;
}

export default function PackageEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const { post, patch } = useApi();

  const isNew = id === "new";
  const apiPath = "/packages";
  const { data, isLoading } = useGet(isNew ? null : `${apiPath}/${id}`);

  // Lifted so subcategory's option list can react to category — these two
  // fields can no longer be independently uncontrolled like the rest of
  // the form.
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  // Seed from the fetched record once it arrives (edit mode). Guarded so
  // it only runs once real data lands, not on every render.
  useEffect(() => {
    if (data?.item) {
      setCategory(data.item.category ?? "");
      setSubcategory(data.item.subcategory ?? "");
    }
  }, [data]);

  if (!isNew && isLoading) {
    return (
      <AdminLayout title="Package">
        <Loader2 size={18} className="animate-spin text-gray-400" />
        Loading…
      </AdminLayout>
    );
  }

  const subcategoryOptions = subcategoryFilter[category]?.options ?? [];

  async function handleSubmit(values) {
    let payload = coerceJsonFields(values, ["destinations", "days"]);
    payload = coerceNumberFields(payload, ["price", "discountedPrice"]);
    payload = removeEmptyFields(payload);

    const url = isNew ? apiPath : `${apiPath}/${id}`;
    const res = isNew ? await post(url, payload) : await patch(url, payload);

    if (res?.ok) {
      toast.success(`Package ${isNew ? "created" : "updated"} successfully`);
      router.replace("/admin/packages");
    }
    return res;
  }

  return (
    <AdminLayout title={`${isNew ? "New" : "Edit"} Package`} formId="package-form">
      <Form
        defaults={data?.item ?? {}}
        id="package-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 rounded-sm border border-gray-200 bg-white p-6">
          {/* Top row — thumbnail + core identity fields side by side */}
          <div className="flex flex-col gap-20 sm:flex-row">
            <div className="w-full max-w-72 sm:flex-1 sm:shrink-0">
              <ImageUploader name="thumbnail" caption="Thumbnail" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <Input name="title" placeholder="Title" required />

              <div className="flex gap-4">
                <Input name="price" type="number" placeholder="Price" required />
                <Input
                  name="discountedPrice"
                  type="number"
                  placeholder="Discounted price (optional)"
                />
              </div>

              <div className="flex gap-4">
                <Select
                  name="category"
                  placeholder="Category"
                  required
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory(""); // old subcategory may not belong to the new category
                  }}
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>

                <Select
                  name="subcategory"
                  placeholder={subcategoryFilter[category]?.title ?? "Subcategory"}
                  required
                  disabled={!category}
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  {subcategoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>

                <Select name="packageType" placeholder="Package Type" required>
                  {PACKAGE_TYPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Full-width sections below */}
          <Textarea name="description" placeholder="Description" />

          <div className="border-t border-gray-100 pt-4">
            <PackageDestinationsField name="destinations" caption="Destinations" />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <PackageDaysField name="days" caption="Itinerary Days" />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <MediaListUploader name="gallery" caption="Gallery" />
          </div>
        </div>
      </Form>
    </AdminLayout>
  );
}
