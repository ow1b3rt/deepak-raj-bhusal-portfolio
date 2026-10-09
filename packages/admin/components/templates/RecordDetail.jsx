"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { resolveUrl } from "../../utils/utils.js";
import { Badge } from "../atoms/Badge.jsx";

const STATUS_VARIANT = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "primary",
  published: "success",
  draft: "default",
};

function displayValue(value) {
  if (Array.isArray(value)) {
    return value
      .map((v) => (v && typeof v === "object" ? (v.name ?? v.title ?? v.filename ?? v.id) : v))
      .filter(Boolean)
      .join(", ");
  }

  if (value && typeof value === "object" && !(value instanceof Date)) {
    return value.name ?? value.title ?? value.filename ?? value.id ?? JSON.stringify(value);
  }

  return value;
}

function renderValue(field, value) {
  if (value == null || value === "") {
    return <span className="text-gray-400">—</span>;
  }

  const [_, suffix] = field.name.split(":");
  const kind = field.type || suffix;

  if (field.options) {
    const matched = field.options.find(
      (opt) => (typeof opt === "string" ? opt : opt.value) === value,
    );
    const label = matched ? (typeof matched === "string" ? matched : matched.label) : value;
    return <span className="capitalize">{label}</span>;
  }

  if (kind === "date" || kind === "date-time" || field.type === "date") {
    return (
      <span>
        {new Date(value).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    );
  }

  if (kind === "image" || kind === "upload") {
    const src =
      typeof value === "string"
        ? resolveUrl({ url: value })
        : value?.url
          ? resolveUrl(value)
          : null;
    if (!src) return <span className="text-gray-400">—</span>;
    return (
      <img
        src={src}
        alt={field.label}
        className="h-16 w-16 rounded-lg object-cover ring-1 ring-gray-200"
      />
    );
  }

  return <span className="whitespace-pre-wrap">{displayValue(value)}</span>;
}

export function RecordDetail({
  title,
  subtitle,
  icon: Icon,
  backHref,
  fields,
  data = {},
  accentField,
  hideHeader = false,
}) {
  const accentValue = accentField ? data[accentField] : null;

  return (
    <div className="flex flex-col gap-6">
      {!hideHeader && (
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <Link
            href={backHref}
            aria-label="Back"
            className="rounded-full border border-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
          </Link>

          {Icon && (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
              <Icon size={22} />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="truncate text-sm text-gray-500">{subtitle}</p>}
          </div>

          {accentValue && (
            <Badge
              value={accentValue}
              variant={STATUS_VARIANT[accentValue] ?? "default"}
              size="lg"
              className="shrink-0 capitalize"
            />
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const baseName = field.name?.split(":")?.[0];
          const value = data[baseName];
          const fullWidth =
            field.type === "textarea" || (typeof value === "string" && value.length > 100);

          return (
            <div
              key={baseName}
              className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${fullWidth ? "sm:col-span-2" : ""}`}
            >
              <p className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                {field.label}
              </p>
              <div className="mt-1.5 text-sm text-gray-900">{renderValue(field, value)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
