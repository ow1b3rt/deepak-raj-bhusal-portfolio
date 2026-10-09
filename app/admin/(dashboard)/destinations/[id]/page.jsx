"use client";

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

import { DestinationContentField } from "@/components/organisms/admin/DestinationContentField.jsx";

const TYPE_OPTIONS = [
  { label: "National", value: "national" },
  { label: "International", value: "international" },
];

function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
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

export default function DestinationEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const { post, patch } = useApi();

  const isNew = id === "new";
  const apiPath = "/destinations";
  const { data, isLoading } = useGet(isNew ? null : `${apiPath}/${id}`);

  if (!isNew && isLoading) {
    return (
      <AdminLayout title="Destination">
        <Loader2 size={18} className="animate-spin text-gray-400" />
        Loading…
      </AdminLayout>
    );
  }

  const defaults = data?.item ?? {};

  async function handleSubmit(values) {
    let payload = coerceJsonFields(values, ["content"]);
    payload.slug = payload.slug?.trim() || slugify(values.name || "");
    payload = removeEmptyFields(payload);

    const url = isNew ? apiPath : `${apiPath}/${id}`;
    const res = isNew ? await post(url, payload) : await patch(url, payload);

    if (res?.ok) {
      toast.success(`Destination ${isNew ? "created" : "updated"} successfully`);
      router.replace("/admin/destinations");
    }
    return res;
  }

  return (
    <AdminLayout title={`${isNew ? "New" : "Edit"} Destination`} formId="destination-form">
      <Form
        defaults={defaults}
        id="destination-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-6 rounded-sm border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-20 sm:flex-row">
            <div className="w-full max-w-72 sm:flex-1 sm:shrink-0">
              <ImageUploader name="thumbnail" caption="Thumbnail" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <Input name="name" placeholder="Name" required />
              <Input name="slug" placeholder="Slug (auto-generated from name if left blank)" />

              <Select name="type" placeholder="Type" required>
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>

              <Input name="googleUrl" placeholder="Google URL" />
            </div>
          </div>

          <Textarea name="description" placeholder="Description" />

          <div className="border-t border-gray-100 pt-4">
            <DestinationContentField name="content" caption="Destination Content" />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <MediaListUploader name="gallery" caption="Gallery" />
          </div>
        </div>
      </Form>
    </AdminLayout>
  );
}
