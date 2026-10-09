"use client";

import { useEffect, useRef, useState } from "react";
import {
  AdminLayout,
  ArticleEditor,
  ImageUploader,
  Input,
  Textarea,
  useApi,
  useGet,
  useToast,
} from "@/packages/admin";
import { GripVertical, ImageOff, Loader2, Plus, Trash2 } from "lucide-react";

import { resolveUrl } from "@/lib/utils";

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const emptyService = () => ({
  id: `service-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  title: "",
  image: "",
  descriptionHtml: "",
});

const FORM_ID = "services-layout-form";

export default function ServicesPageLayoutAdmin() {
  const { post } = useApi();
  const toast = useToast();
  const { data, loading } = useGet("/layouts/services");

  const [title, setTitle] = useState("");
  const [backgroundText, setBackgroundText] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);
  const [saving, setSaving] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const rteRefs = useRef({}); // { [serviceId]: ArticleEditor instance }

  useEffect(() => {
    if (loading || hydrated) return;

    const layout = data?.layout;
    if (layout) {
      setTitle(layout.title ?? "");
      setBackgroundText(layout.backgroundText ?? "");
      setHeroImage(layout.heroImage ?? "");
      setDescription(layout.description ?? "");
      setServices(layout.services ?? []);
      setHydrated(true);
    }
  }, [data, loading, hydrated]);

  const updateService = (id, patch) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const addService = () => setServices((prev) => [...prev, emptyService()]);

  const removeService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    delete rteRefs.current[id];
  };

  const moveService = (index, dir) => {
    setServices((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const servicesWithHtml = await Promise.all(
        services.map(async (service) => {
          const ref = rteRefs.current[service.id];
          const descriptionHtml = ref ? await ref.getHtml() : (service.descriptionHtml ?? "");
          return {
            ...service,
            descriptionHtml,
            slug: slugify(service.title),
          };
        }),
      );

      await post("/layouts/services", {
        title,
        backgroundText,
        heroImage,
        description,
        services: servicesWithHtml,
      });

      toast.success("Services page layout saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save layout");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !hydrated) {
    return (
      <AdminLayout title="Services Page">
        <Loader2 size={18} className="animate-spin text-gray-400" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Services Page"
      formId={FORM_ID}
      buttonLabel={saving ? "Saving..." : "Save Layout"}
    >
      <form id={FORM_ID} onSubmit={handleSave} className="flex flex-col gap-8">
        {/* Hero & Intro */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-900 uppercase">
            Hero & Intro
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-[224px_1fr]">
            <div>
              <ImageUploader
                name="hero-image"
                caption="Hero background image"
                mode="url"
                defaultCover={heroImage}
                setCoverImage={(url) => setHeroImage(resolveUrl({ url: url }))}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                name="backgroundText"
                placeholder="Background Text"
                value={backgroundText}
                onChange={(e) => setBackgroundText(e.target.value)}
              />
              <Input
                name="title"
                placeholder="Page Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                name="description"
                placeholder="Page Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold tracking-wider text-gray-900 uppercase">
              Services{" "}
              <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                {services.length}
              </span>
            </h3>
            <button
              type="button"
              onClick={addService}
              className="flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
            >
              <Plus size={14} /> Add service
            </button>
          </div>

          {services.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 py-12 text-center">
              <ImageOff size={22} className="text-gray-300" />
              <p className="text-sm text-gray-400">No services yet</p>
              <button
                type="button"
                onClick={addService}
                className="mt-1 flex items-center gap-1 rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-black/80"
              >
                <Plus size={14} /> Add your first service
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {service.title || "Untitled service"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      title="Move up"
                      onClick={() => moveService(index, -1)}
                      disabled={index === 0}
                      className="rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 disabled:opacity-30"
                    >
                      <GripVertical size={14} className="rotate-90" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeService(service.id)}
                      className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>

                {/* Card body */}
                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-[200px_1fr]">
                  <ImageUploader
                    name={`service-${service.id}-image`}
                    caption="Image"
                    mode="url"
                    defaultCover={service.image}
                    setCoverImage={(url) =>
                      updateService(service.id, { image: resolveUrl({ url: url }) })
                    }
                  />

                  <div className="flex flex-col gap-4">
                    <Input
                      name={`service-${service.id}-title`}
                      placeholder="Title"
                      value={service.title}
                      onChange={(e) => updateService(service.id, { title: e.target.value })}
                    />

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <div className="min-h-[180px] rounded-md border border-gray-200 p-2">
                        <ArticleEditor
                          ref={(el) => {
                            if (el) rteRefs.current[service.id] = el;
                          }}
                          initialHTML={service.descriptionHtml}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </form>
    </AdminLayout>
  );
}
