import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";

import Pagination from "../components/ui/Pagination";
import BookingsTable from "../components/bookings/BookingTable";
import BookingsTableSkeleton from "../components/bookings/BookingsTableSkeleton";
import EmptyState from "../components/ui/EmptyState";

import type { BookingRow } from "../types/BookingRow";
import { getUpcomingBookings } from "../api/bookings.api";

const ITEMS_PER_PAGE = 4;

function daysBetween(fromISO: string, toISO: string) {
  const from = new Date(fromISO);
  const to = new Date(toISO);
  const diffMs = to.getTime() - from.getTime();
  return Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
}

function toDateOnly(iso: string) {
  return iso?.split("T")?.[0] ?? iso;
}

export default function BookingsPage() {
  const [page, setPage] = useState(1);

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings", "upcoming"],
    queryFn: getUpcomingBookings,
    select: (response): BookingRow[] =>
      response.data.map((b) => ({
        id: String(b.booking_id),
        guestName: b.users?.name ?? "Unknown",
        roomType: b.rooms?.room_type ?? "-",
        roomName: b.rooms?.room_name ?? "-",
        status: (b.status as BookingRow["status"]) || "upcoming",
        bookingDate: toDateOnly(b.created_at),
        adults: b.adults ?? 0,
        children: b.children ?? 0,
        nights: daysBetween(b.check_in, b.check_out),
        fromDate: toDateOnly(b.check_in),
        toDate: toDateOnly(b.check_out),
      })),
  });

  // Reset page when data changes
  useEffect(() => {
    setPage(1);
  }, [bookings.length]);

  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return bookings.slice(start, start + ITEMS_PER_PAGE);
  }, [page, bookings]);

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-serif text-[#F5DEB3]">
          Bookings
        </h1>
        <BookingsTableSkeleton />
      </section>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError) {
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-serif text-[#F5DEB3]">
          Bookings
        </h1>
        <p className="text-red-400">
          {(error as Error)?.message || "Failed to load bookings"}
        </p>
      </section>
    );
  }

  /* ---------------- Page ---------------- */
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-serif text-[#F5DEB3]">
        Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-[#3A1A22] bg-linear-to-b from-[#241217] to-[#1F1216] p-6">
          <EmptyState
            title="No upcoming bookings"
            description="There are currently no upcoming bookings."
            icon={<CalendarDays className="h-8 w-8 text-[#D4AF37]" />}
          />
        </div>
      ) : (
        <>
          <BookingsTable
            bookings={paginated}
            onCancel={(id) => {
              console.log("Cancel booking:", id);
              // Later: useMutation + invalidateQueries
            }}
          />

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </section>
  );
}
