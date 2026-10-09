// src/app/admin/bookings/[id]/page.js
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminLayout, useApi, useGet, useToast } from "@/packages/admin";
import { ArrowLeft, Loader2 } from "lucide-react";

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled", "completed"];

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  completed: "bg-gray-100 text-gray-600 ring-gray-500/20",
};

const PACKAGE_OPTION_LABEL = {
  standard: "Standard",
  deluxe: "Deluxe",
  premium: "Premium",
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

function formatCurrency(value) {
  if (value == null) return null;
  return `Rs. ${Number(value).toLocaleString("en-US")}`;
}

export default function BookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const { patch } = useApi();

  const { data, isLoading, mutate } = useGet(`/bookings/${id}`);
  const [updating, setUpdating] = useState(false);

  if (isLoading) {
    return (
      <AdminLayout title="Booking">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 size={16} className="animate-spin" />
          Loading…
        </div>
      </AdminLayout>
    );
  }

  const booking = data?.item;
  if (!booking) {
    return (
      <AdminLayout title="Booking">
        <p className="text-sm text-gray-500">Booking not found.</p>
      </AdminLayout>
    );
  }

  const travellerCount = (booking.adults ?? 0) + (booking.children ?? 0);
  const total = formatCurrency(booking.packagePrice * travellerCount);

  const handleStatusChange = async (nextStatus) => {
    if (nextStatus === booking.status) return;
    setUpdating(true);
    const res = await patch(`/bookings/${id}`, { status: nextStatus });
    setUpdating(false);
    if (res?.ok !== false && res) {
      toast.success("Status updated.");
      mutate();
    } else {
      toast.error("Could not update status.");
    }
  };

  return (
    <AdminLayout title="Booking">
      <div className="flex flex-col gap-6">
        {/* Status */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
              Status
            </span>
            <span
              className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${STATUS_STYLES[booking.status] ?? STATUS_STYLES.pending}`}
            >
              {booking.status}
            </span>
          </div>

          <div className="flex gap-1.5">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                disabled={updating || s === booking.status}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  s === booking.status
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Customer */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Customer</h2>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-gray-400">Name</dt>
              <dd className="text-sm font-medium text-gray-900">{booking.customerName}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Email</dt>
              <dd className="text-sm font-medium text-gray-900">
                <a href={`mailto:${booking.customerEmail}`} className="hover:underline">
                  {booking.customerEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Phone</dt>
              <dd className="text-sm font-medium text-gray-900">
                {booking.customerPhone ? (
                  <a href={`tel:${booking.customerPhone}`} className="hover:underline">
                    {booking.customerPhone}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Header card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                {PACKAGE_OPTION_LABEL[booking.packageOption] ?? booking.packageOption} package
              </span>
              <h1 className="text-xl font-semibold text-gray-900">{booking.packageName}</h1>
            </div>

            {total && (
              <div className="text-right">
                <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                  Total
                </span>
                <span className="text-xl font-semibold text-gray-900">{total}</span>
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Travel date
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(booking.travelDate)}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Travellers
              </span>
              <span className="text-sm font-medium text-gray-900">
                {travellerCount} total
                <span className="ml-1 font-normal text-gray-400">
                  ({booking.adults ?? 0} adult{booking.adults === 1 ? "" : "s"}
                  {booking.children
                    ? `, ${booking.children} child${booking.children === 1 ? "" : "ren"}`
                    : ""}
                  )
                </span>
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium tracking-wide text-gray-400 uppercase">
                Submitted
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatDateTime(booking.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-2 text-sm font-semibold text-gray-900">Notes</h2>
            <p className="text-sm whitespace-pre-wrap text-gray-600">{booking.notes}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
