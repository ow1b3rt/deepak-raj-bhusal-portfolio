"use client";

import { useParams } from "next/navigation";
import { useGet } from "@/packages/admin";
import { CalendarDays, Loader2, Mail, MessageSquareText, Phone, UserRound } from "lucide-react";

function FieldTile({ icon: Icon, label, value, fullWidth = false }) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${fullWidth ? "sm:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-gray-500 uppercase">
        {Icon && <Icon size={14} className="text-gray-400" />}
        {label}
      </div>
      <div className="mt-2 text-sm whitespace-pre-wrap text-gray-900">
        {value || <span className="text-gray-400">—</span>}
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return null;
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ContactDetailPage() {
  const { id } = useParams();
  const { data, loading } = useGet(`/contact/${id}`);
  const record = data?.item;

  return (
    <section className="flex w-full flex-col gap-5 p-4 sm:p-6">
      {loading ? (
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
          <Loader2 size={18} className="animate-spin text-gray-400" />
          Loading…
        </div>
      ) : !record ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
          Record not found.
        </div>
      ) : (
        <>
          {/* Header card */}
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
              <UserRound size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-semibold text-gray-900">{record.name}</h2>
              <p className="truncate text-sm text-gray-500">{record.email}</p>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldTile icon={Mail} label="Email" value={record.email} />
            <FieldTile icon={Phone} label="Mobile Number" value={record.phone} />
            <FieldTile
              icon={CalendarDays}
              label="Received at"
              value={formatDate(record.createdAt)}
            />
            <FieldTile icon={MessageSquareText} label="Subject" value={record.subject} />
            <FieldTile icon={MessageSquareText} label="Message" value={record.message} fullWidth />
          </div>
        </>
      )}
    </section>
  );
}
