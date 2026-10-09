"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Eye, Loader2 } from "lucide-react";

import { useApi } from "../../contexts/ApiContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";
import { articleSchema, newsArticleSchema } from "../../lib/jsonld.js";
import { getRuntimeConfig } from "../../lib/runtime.config.js";
import { isUuid, removeEmptyFields } from "../../utils/utils.js";
import { Textarea } from "../atoms/Input.jsx";
import { Form } from "../molecules/Form.jsx";
import { InputFields } from "../molecules/InputFields.jsx";
import ArticleEditor from "../organisms/BlockNote.jsx";
import { DateTime } from "../organisms/DateTime.jsx";
import { SchemaEditor } from "../organisms/SchemaEditor.jsx";
import { ImageUploader } from "./ImageUploader.jsx";

/* -------------------------------------------------------------------------- */
/* Constants & helpers                                                        */
/* -------------------------------------------------------------------------- */

const PUBLISH_ROLES = ["admin", "editor", "junior_editor"];
const TABS = ["Post", "Meta", "SEO"];

const canPublish = (role) => PUBLISH_ROLES.includes(role);

function formatTimeAgo(date) {
  if (!date) return null;
  const diffMin = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} days ago`;
  return new Date(date).toLocaleDateString();
}

// The backend returns camelCase (metaTitle, canonicalUrl, ...) but the inputs are named in
// snake_case, and Form fills inputs by matching `name` against `defaults`. Add the aliases.
function toFormDefaults(defaults) {
  if (!defaults) return {};
  return {
    ...defaults,
    meta_title: defaults.meta_title ?? defaults.metaTitle ?? "",
    meta_description: defaults.meta_description ?? defaults.metaDescription ?? "",
    canonical_url: defaults.canonical_url ?? defaults.canonicalUrl ?? "",
    og_title: defaults.og_title ?? defaults.ogTitle ?? "",
    og_description: defaults.og_description ?? defaults.ogDescription ?? "",
    redirect_url: defaults.redirect_url ?? defaults.redirectUrl ?? "",
  };
}

function parseSchema(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

// Saved values merged with whatever the user changed in the uploaders this session
function resolveUploads(defaults, uploads) {
  const pick = (key, fallback) => (key in uploads ? uploads[key] : fallback);

  const imageUrls = [
    pick("og", defaults?.og_image_url),
    defaults?.cover_image_url,
    pick("thumbnail", defaults?.thumbnail_url),
  ].filter((url) => url && !url.startsWith("blob:")); // blob: = local preview, not a real URL

  return {
    images: [...new Set(imageUrls)],
    thumbnailId: pick("thumbnailId", defaults?.thumbnail),
  };
}

function resolveThumbnail(thumbnailId, formValues) {
  if (thumbnailId) return thumbnailId;
  return [formValues.thumbnail_id, formValues.thumbnail].find((value) => isUuid(value));
}

function buildSchema({ siteUrl, contentType, slug, title, description, publishedAt, images }) {
  const shared = {
    url: slug ? `${siteUrl}/${contentType}/${slug}` : siteUrl,
    title,
    excerpt: description,
    publishedAt: publishedAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return contentType === "article"
    ? articleSchema({ ...shared, imageUrl: images[0] ?? null })
    : newsArticleSchema({ ...shared, images });
}

// Maps form fields to the backend's camelCase schema and strips empty values
function buildPayload({ formValues, title, content, description, thumbnail, status, schema }) {
  return removeEmptyFields({
    title,
    content,
    status,
    publishedAt: formValues.publishedAt || undefined,
    metaTitle: formValues.meta_title || undefined,
    metaDescription: formValues.meta_description || undefined,
    canonicalUrl: formValues.canonical_url || undefined,
    ogTitle: formValues.og_title || title,
    ogDescription: description || undefined,
    redirectUrl: formValues.redirect_url || undefined,
    thumbnail,
    schema: schema ? JSON.stringify(schema) : undefined,
  });
}

/* -------------------------------------------------------------------------- */
/* Small UI pieces                                                            */
/* -------------------------------------------------------------------------- */

function SidebarSection({ title, children, className }) {
  return (
    <section
      className={`rounded-xl border border-gray-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className || ""}`}
    >
      <header className="mb-3">
        <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">{title}</h3>
      </header>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

// Inactive panels are hidden, not unmounted, so their inputs keep their values
// and are still submitted with the form.
function TabPanel({ active, children }) {
  return <div className={active ? "space-y-4" : "hidden"}>{children}</div>;
}

function StatusInfo({ status, updatedAt, createdAt }) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <span>
        Status: <strong className="font-medium text-gray-900 capitalize">{status}</strong>
      </span>
      {updatedAt && (
        <span className="hidden lg:inline">Last saved {formatTimeAgo(updatedAt)}</span>
      )}
      {createdAt && (
        <span className="hidden xl:inline">Created: {new Date(createdAt).toLocaleString()}</span>
      )}
    </div>
  );
}

function ActionButtons({ isEdit, loading, userCanPublish }) {
  return (
    <div className="flex items-center gap-3">
      {isEdit && (
        <button
          type="submit"
          name="action"
          value="preview"
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <Eye size={18} /> Preview
        </button>
      )}

      <button
        type="submit"
        name="action"
        value="draft"
        disabled={loading}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
      >
        Save Draft
      </button>

      <button
        type="submit"
        name="action"
        value={userCanPublish ? "published" : "pending"}
        disabled={loading}
        className="inline-flex items-center rounded-lg bg-black px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-black/80 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Saving...
          </>
        ) : userCanPublish ? (
          "Publish"
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
}

// Plain uncontrolled textarea: value comes from defaultValue, read back from the form on submit
function TitleField({ defaultValue }) {
  const grow = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <textarea
      ref={grow}
      name="title"
      placeholder="Add title"
      defaultValue={defaultValue}
      onInput={(e) => grow(e.currentTarget)}
      rows={1}
      required
      className="w-full resize-none overflow-hidden border-none bg-transparent p-0 font-serif text-5xl leading-tight font-bold text-gray-900 placeholder-gray-300 focus:border-none focus:ring-0 focus:outline-none"
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

function SidebarTabs({ active, onChange }) {
  return (
    <div className="flex shrink-0 gap-1 border-b border-gray-200 bg-white px-3 pt-3">
      {TABS.map((tab, index) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(index)}
          className={`relative flex-1 rounded-t-md px-4 py-2.5 text-sm font-medium transition-colors ${
            active === index ? "text-gray-900" : "text-gray-400 hover:text-gray-700"
          }`}
        >
          {tab}
          {active === index && (
            <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gray-900" />
          )}
        </button>
      ))}
    </div>
  );
}

function PostPanel({ publishedAt, thumbnailUrl, onThumbnailChange }) {
  return (
    <>
      <SidebarSection title="Status & Visibility">
        <DateTime name="publishedAt" defaultValue={publishedAt} />
      </SidebarSection>

      <SidebarSection title="Article Settings">
        <ImageUploader
          name="thumbnail"
          id="thumb-image-input"
          caption="Thumbnail"
          defaultCover={thumbnailUrl}
          setCoverImage={onThumbnailChange}
        />
      </SidebarSection>
    </>
  );
}

function MetaPanel() {
  return (
    <>
      <SidebarSection title="Search Result">
        <InputFields fields={["meta_title", "meta_description:text"]} />
      </SidebarSection>

      <SidebarSection title="Canonical URL">
        <InputFields fields={["canonical_url"]} />
      </SidebarSection>
    </>
  );
}

function SeoPanel({ active, ogDescription, ogImageUrl, onOgImageChange, schema }) {
  return (
    <>
      <SidebarSection title="Social Sharing">
        <InputFields fields={["og_title"]} />
        <Textarea
          name="og_description"
          placeholder="OG description (optional)"
          defaultValue={ogDescription}
        />
        <ImageUploader
          name="og_image_url"
          id="og-image-uploader"
          caption="OG Image"
          defaultCover={ogImageUrl}
          setCoverImage={onOgImageChange}
        />
      </SidebarSection>

      <SidebarSection title="Structured Data">
        {schema ? (
          // Mounted only while visible, so a code editor never measures itself while hidden
          active && <SchemaEditor schema={schema} />
        ) : (
          <p className="text-sm text-gray-500">Generated automatically when you save.</p>
        )}
      </SidebarSection>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* PostForm                                                                   */
/* -------------------------------------------------------------------------- */

export function PostForm({ defaults = null, onSubmit }) {
  const isEdit = Boolean(defaults);
  const rteRef = useRef(null);
  const uploads = useRef({}); // image changes made in the uploaders; only needed for the JSON-LD
  const { post, patch } = useApi();
  const { user } = useAuth();
  const toast = useToast();
  const { host: siteUrl } = getRuntimeConfig(); // public site URL, used for JSON-LD links

  // UI-only state. None of the form data lives in React state: Form owns the values.
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0); // remounts the form after a successful create

  useEffect(() => {
    uploads.current = {};
  }, [defaults?.id]);

  const formDefaults = useMemo(() => toFormDefaults(defaults), [defaults]);
  const savedSchema = useMemo(() => parseSchema(defaults?.schema), [defaults]);
  const publishedAt = defaults?.publishedAt ?? defaults?.published_at;

  const handleThumbnailChange = (media) => {
    uploads.current.thumbnailId = media?.id ?? null;
    uploads.current.thumbnail = media?.id ? media.url : null;
  };

  const handleOgImageChange = (media) => {
    uploads.current.og = media?.url ?? null;
  };

  const handleSubmit = async (formValues) => {
    const title = (formValues.title ?? "").trim();
    const content = ((await rteRef.current?.getHtml()) ?? "").trim();

    if (!title) {
      toast.error("Please enter a blog title.");
      return;
    }
    if (!content) {
      toast.error("Please enter content for the blog.");
      return;
    }

    const action = formValues.action || "published";
    const description = (formValues.og_description || formValues.meta_description || "").trim();
    const { images, thumbnailId } = resolveUploads(defaults, uploads.current);

    const payload = buildPayload({
      formValues,
      title,
      content,
      description,
      thumbnail: resolveThumbnail(thumbnailId, formValues),
      status: action === "published" ? "published" : "draft",
      schema: buildSchema({
        siteUrl,
        contentType: defaults?.content_type ?? "news",
        slug: defaults?.slug ?? "",
        title,
        description,
        publishedAt,
        images,
      }),
    });

    setLoading(true);
    try {
      const request = isEdit ? patch : post;
      await request(isEdit ? `/blogs/${defaults.id}` : "/blogs", payload, {
        success: (res) => {
          toast.success(isEdit ? "Blog updated successfully!" : "Blog created successfully!");
          uploads.current = {};
          setFormKey((prev) => prev + 1);
          onSubmit?.(res);
        },
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to save blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 flex h-[85vh] flex-col overflow-hidden rounded-sm bg-white p-4 font-sans text-gray-900">
      <Form
        key={defaults?.id ?? `new-${formKey}`}
        defaults={formDefaults}
        onSubmit={handleSubmit}
        className="flex h-full flex-col overflow-hidden"
      >
        {/* Top action bar */}
        <div className="relative flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
          <StatusInfo
            status={defaults?.status ?? "new"}
            updatedAt={defaults?.updatedAt}
            createdAt={publishedAt}
          />
          <ActionButtons
            isEdit={isEdit}
            loading={loading}
            userCanPublish={canPublish(user?.role)}
          />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Editor (left) */}
          <div className="flex-1 scrollbar-none overflow-y-auto scroll-smooth bg-white">
            <div className="mx-auto w-full max-w-[840px] px-8 py-12 lg:px-12">
              <TitleField defaultValue={defaults?.title} />

              <div className="mt-8 min-h-[400px]">
                <ArticleEditor ref={rteRef} initialHTML={defaults?.content} />
              </div>
            </div>
          </div>

          {/* Sidebar (right) */}
          <div className="flex w-[350px] shrink-0 flex-col border-l border-gray-200 bg-gray-50/60">
            <SidebarTabs active={activeTab} onChange={setActiveTab} />

            <div className="flex-1 scrollbar-none overflow-y-auto p-4">
              <TabPanel active={activeTab === 0}>
                <PostPanel
                  publishedAt={publishedAt}
                  thumbnailUrl={defaults?.thumbnail_url ?? null}
                  onThumbnailChange={handleThumbnailChange}
                />
              </TabPanel>

              <TabPanel active={activeTab === 1}>
                <MetaPanel />
              </TabPanel>

              <TabPanel active={activeTab === 2}>
                <SeoPanel
                  active={activeTab === 2}
                  ogDescription={formDefaults.og_description}
                  ogImageUrl={defaults?.og_image_url ?? null}
                  onOgImageChange={handleOgImageChange}
                  schema={savedSchema}
                />
              </TabPanel>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
