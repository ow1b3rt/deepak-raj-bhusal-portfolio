"use client";

import { useRef, useState } from "react";
import { MediaLibraryModal, resolveUrl, setPath } from "@/packages/admin";
import { FaGripVertical, FaPlus, FaTrash, FaPlay } from "react-icons/fa";

import { ImageContainer } from "@/components/molecules/ImageContainer";

const THEMES = {
  lightblue: "bg-primary-blue-dark/10 text-primary-blue-dark",
  darkblue: "bg-primary-blue-dark text-white",
};

function getYouTubeId(url = "") {
  const match = url?.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

// media.type may be "video" or a mime like "video/mp4"
const getType = (media) => (media?.type?.startsWith("video") ? "video" : "image");

// old items used `image` and may have no `type`, `title` or `description`
const normalizeItem = (item) => {
  const { image, media, type, ...rest } = item;
  return {
    ...rest,
    type: type ?? "image",
    media: media ?? image ?? { src: "", alt: "" },
    title: item.title ?? null,
    description: item.description ?? null,
  };
};

function GalleryCardEditable({
  item,
  path,
  onChange,
  onMediaClick,
  onYouTubeChange,
  onRemove,
  dropProps,
  dragHandleProps,
}) {
  const cardRef = useRef(null);
  const theme = item.theme ?? "lightblue";
  const isVideo = item.type === "video";
  const ytId = getYouTubeId(item.media?.src);

  return (
    <div
      ref={cardRef}
      onDragOver={dropProps.onDragOver}
      onDrop={dropProps.onDrop}
      className="relative flex w-full flex-col gap-3 rounded-2xl border border-gray-200 p-3 shadow-sm"
    >
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
        <span
          className="cursor-move rounded bg-white/80 p-1 text-black/50 shadow"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setDragImage(cardRef.current, 20, 20);
            dragHandleProps.onDragStart(e);
          }}
        >
          <FaGripVertical size={14} />
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="rounded bg-white/80 p-1 text-black/50 shadow hover:text-red-600"
        >
          <FaTrash size={14} />
        </button>
      </div>

      {item.media?.src ? (
        isVideo ? (
          <div
            className="relative aspect-square w-full flex-1 cursor-pointer overflow-hidden rounded-xl bg-black"
            onClick={onMediaClick}
          >
            {ytId ? (
              <img
                src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                alt={item.media.alt || ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                src={`${item.media.src}#t=0.1`}
                className="h-full w-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
            )}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow">
                <FaPlay size={16} className="ml-0.5 text-black" />
              </span>
            </span>
          </div>
        ) : (
          <ImageContainer
            className="aspect-square w-full flex-1 cursor-pointer rounded-xl"
            src={item.media.src}
            alt={item.media.alt}
            onClick={onMediaClick}
          />
        )
      ) : (
        <div
          className="flex aspect-square w-full flex-1 cursor-pointer items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400"
          onClick={onMediaClick}
        >
          Select image or video
        </div>
      )}

      <input
        className="w-full text-sm"
        placeholder="Alt text"
        value={item.media?.alt ?? ""}
        onChange={onChange(`${path}.media.alt`)}
      />

      <input
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        placeholder="Or paste a YouTube link"
        value={ytId ? item.media?.src ?? "" : ""}
        onChange={onYouTubeChange}
      />

      <input
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold"
        placeholder="Title"
        value={item.title ?? ""}
        onChange={onChange(`${path}.title`)}
      />

      <textarea
        className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm"
        placeholder="Description"
        rows={3}
        value={item.description ?? ""}
        onChange={onChange(`${path}.description`)}
      />

      <input
        className={`w-full rounded-xl py-3 text-center text-lg font-bold ${THEMES[theme]}`}
        placeholder="Label (optional)"
        value={item.label ?? ""}
        onChange={onChange(`${path}.label`)}
      />
    </div>
  );
}

export const HomeGalleryEditable = ({ section: initialSection, onChange, onSave }) => {
  const [section, setSection] = useState(() =>
    initialSection
      ? { ...initialSection, items: (initialSection.items ?? []).map(normalizeItem) }
      : initialSection
  );
  const [mediaIndex, setMediaIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!section) return null;

  const update = (next) => {
    setSection(next);
    onChange?.(next);
  };

  const handleChange = (path) => (e) => {
    const value = e.target.value === "" ? null : e.target.value;
    update(setPath(section, path, value));
  };

  const handleMediaSelect = (media) => {
    const base = `items.${mediaIndex}`;
    let next = setPath(section, `${base}.media.src`, resolveUrl(media));
    next = setPath(next, `${base}.type`, getType(media));
    update(next);
    setMediaIndex(null);
  };

  const handleYouTube = (i) => (e) => {
    const value = e.target.value.trim();
    let next = setPath(section, `items.${i}.media.src`, value);
    next = setPath(next, `items.${i}.type`, value ? "video" : "image");
    update(next);
  };

  const addItem = () => {
    update({
      ...section,
      items: [
        ...section.items,
        {
          type: "image",
          media: { src: "", alt: "" },
          title: null,
          description: null,
          label: null,
        },
      ],
    });
  };

  const removeItem = (i) => {
    update({ ...section, items: section.items.filter((_, idx) => idx !== i) });
  };

  const reorder = (from, to) => {
    const items = [...section.items];
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    update({ ...section, items });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave?.(section);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item, i) => (
          <GalleryCardEditable
            key={i}
            item={item}
            path={`items.${i}`}
            onChange={handleChange}
            onMediaClick={() => setMediaIndex(i)}
            onYouTubeChange={handleYouTube(i)}
            onRemove={() => removeItem(i)}
            dragHandleProps={{
              onDragStart: (e) => e.dataTransfer.setData("text/plain", String(i)),
            }}
            dropProps={{
              onDragOver: (e) => e.preventDefault(),
              onDrop: (e) => {
                e.preventDefault();
                const from = Number(e.dataTransfer.getData("text/plain"));
                if (from !== i) reorder(from, i);
              },
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addItem}
          className="flex w-fit items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-bold text-black/60"
        >
          <FaPlus size={12} /> Add item
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-black rounded-lg px-6 py-2 font-bold text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Gallery"}
        </button>
      </div>

      {mediaIndex !== null && (
        <MediaLibraryModal
          name={`items.${mediaIndex}.media.src`}
          onClose={() => setMediaIndex(null)}
          onSelect={handleMediaSelect}
        />
      )}
    </div>
  );
};
