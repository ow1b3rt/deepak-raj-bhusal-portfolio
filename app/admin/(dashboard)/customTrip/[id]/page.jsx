// src/app/admin/customTrip/[id]/page.js
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminLayout, useApi, useGet, useToast } from "@/packages/admin";
import { Loader2 } from "lucide-react";

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed"];

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  completed: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

function formatDate(value) {
  if (!value) return "—";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

export default function CustomTripDetailPage() {
  const { id } = useParams();
  const toast = useToast();
  const { patch } = useApi();

  const { data, isLoading, mutate } = useGet(`/customTrip/${id}`);
  const [updating, setUpdating] = useState(false);

  if (isLoading) {
    return (
      <AdminLayout title="Custom Trip">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 size={16} className="animate-spin" />
          Loading…
        </div>
      </AdminLayout>
    );
  }

  const trip = data?.item;
  if (!trip) {
    return (
      <AdminLayout title="Custom Trip">
        <p className="text-sm text-gray-500">Custom trip request not found.</p>
      </AdminLayout>
    );
  }

  const handleStatusChange = async (nextStatus) => {
    if (nextStatus === trip.status) return;
    setUpdating(true);
    const res = await patch(`/customTrip/${id}`, { status: nextStatus });
    setUpdating(false);
    if (res?.ok !== false && res) {
      toast.success("Status updated.");
      mutate();
    } else {
      toast.error("Could not update status.");
    }
  };

  return (
    <AdminLayout title="Custom Trip Request">
      <div className="flex flex-col gap-6">
        {/* Status */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
              Status
            </span>
            <span
              className={`inline-flex w-fit items-center rounded px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${STATUS_STYLES[trip.status] ?? STATUS_STYLES.pending}`}
            >
              {trip.status}
            </span>
          </div>

          <div className="flex gap-1.5">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                disabled={updating || s === trip.status}
                className={`rounded border px-3 py-1.5 text-xs font-medium capitalize transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  s === trip.status
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
              <dd className="text-sm font-medium text-gray-900">{trip.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Email</dt>
              <dd className="text-sm font-medium text-gray-900">
                <a href={`mailto:${trip.email}`} className="hover:underline">
                  {trip.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Phone</dt>
              <dd className="text-sm font-medium text-gray-900">
                {trip.phone ? (
                  <a href={`tel:${trip.phone}`} className="hover:underline">
                    {trip.phone}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Trip details */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
              Destination
            </span>
            <h1 className="text-xl font-semibold text-gray-900">{trip.destination || "—"}</h1>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Travel Date
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(trip.travelDate)}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Travellers
              </span>
              <span className="text-sm font-medium text-gray-900">
                {trip.noOfTravellers ?? "—"}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Trip Type
              </span>
              <span className="text-sm font-medium text-gray-900">{trip.tripType || "—"}</span>
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Accommodation
              </span>
              <span className="text-sm font-medium text-gray-900">{trip.accommodation || "—"}</span>
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Submitted
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatDateTime(trip.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Trip notes */}
        {trip.tripNotes && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-2 text-sm font-semibold text-gray-900">Trip Notes</h2>
            <p className="text-sm whitespace-pre-wrap text-gray-600">{trip.tripNotes}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
