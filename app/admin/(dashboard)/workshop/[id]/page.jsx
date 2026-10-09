// src/app/admin/workshop-inquiries/[id]/page.js
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminLayout, useApi, useGet, useToast } from "@/packages/admin";
import { Loader2 } from "lucide-react";

const STATUS_OPTIONS = ["new", "contacted", "converted", "closed"];

const STATUS_STYLES = {
  new: "bg-blue-50 text-blue-700 ring-blue-600/20",
  contacted: "bg-amber-50 text-amber-700 ring-amber-600/20",
  converted: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  closed: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

const WORKSHOP_TYPE_LABEL = {
  team_building_workshop: "Team Building Workshop",
  corporate_team_building: "Corporate Team Building",
  leadership_workshop: "Leadership Workshop",
  outdoor_team_activity: "Outdoor Team Activity",
  customized_workshop: "Customized Workshop",
  other: "Other",
};

const PREFERRED_TIME_LABEL = {
  morning: "Morning",
  afternoon: "Afternoon",
  full_day: "Full Day",
};

function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function WorkshopInquiryDetailPage() {
  const { id } = useParams();
  const toast = useToast();
  const { patch } = useApi();

  const { data, isLoading, mutate } = useGet(`/workshop/${id}`);
  const [updating, setUpdating] = useState(false);

  if (isLoading) {
    return (
      <AdminLayout title="Workshop Inquiry">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 size={16} className="animate-spin" />
          Loading…
        </div>
      </AdminLayout>
    );
  }

  const inquiry = data?.item;
  if (!inquiry) {
    return (
      <AdminLayout title="Workshop Inquiry">
        <p className="text-sm text-gray-500">Inquiry not found.</p>
      </AdminLayout>
    );
  }

  const handleStatusChange = async (nextStatus) => {
    if (nextStatus === inquiry.status) return;
    setUpdating(true);
    const res = await patch(`/workshop/${id}`, { status: nextStatus });
    setUpdating(false);
    if (res?.ok !== false && res) {
      toast.success("Status updated.");
      mutate();
    } else {
      toast.error("Could not update status.");
    }
  };

  return (
    <AdminLayout title="Workshop Inquiry">
      <div className="flex flex-col gap-6">
        {/* Status */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
              Status
            </span>
            <span
              className={`inline-flex w-fit items-center rounded px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${STATUS_STYLES[inquiry.status] ?? STATUS_STYLES.new}`}
            >
              {inquiry.status}
            </span>
          </div>

          <div className="flex gap-1.5">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                disabled={updating || s === inquiry.status}
                className={`rounded border px-3 py-1.5 text-xs font-medium capitalize transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  s === inquiry.status
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Contact</h2>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-gray-400">Name</dt>
              <dd className="text-sm font-medium text-gray-900">{inquiry.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Email</dt>
              <dd className="text-sm font-medium text-gray-900">
                <a href={`mailto:${inquiry.email}`} className="hover:underline">
                  {inquiry.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Phone</dt>
              <dd className="text-sm font-medium text-gray-900">
                <a href={`tel:${inquiry.phone}`} className="hover:underline">
                  {inquiry.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Company/Organization</dt>
              <dd className="text-sm font-medium text-gray-900">{inquiry.org}</dd>
            </div>
          </dl>
        </div>

        {/* Workshop details */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                Workshop Type
              </span>
              <h1 className="text-xl font-semibold text-gray-900">
                {WORKSHOP_TYPE_LABEL[inquiry.workshopDetails] ?? inquiry.workshopDetails}
              </h1>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Participants
              </span>
              <span className="text-sm font-medium text-gray-900">{inquiry.participants}</span>
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Preferred Time
              </span>
              <span className="text-sm font-medium text-gray-900">
                {PREFERRED_TIME_LABEL[inquiry.preferredTime] ?? inquiry.preferredTime}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Submitted
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatDateTime(inquiry.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Additional info */}
        {inquiry.additionalInformation && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-2 text-sm font-semibold text-gray-900">Additional Information</h2>
            <p className="text-sm whitespace-pre-wrap text-gray-600">
              {inquiry.additionalInformation}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
