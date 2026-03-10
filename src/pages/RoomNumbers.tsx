import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Hash } from "lucide-react";

import EmptyState from "../components/ui/EmptyState";
import Pagination from "../components/ui/Pagination";
import RoomNumbersTable from "../components/rooms/RoomNumbersTable";
import RoomNumbersTableSkeleton from "../components/rooms/skeletons/RoomNumbersTableSkeleton";
import { getRoomNumbers } from "../api/rooms.api";
import type { RoomNumber } from "../types/RoomNumber";

const ITEMS_PER_PAGE = 8;

export default function RoomNumbersPage() {
  const [page, setPage] = useState(1);

  const {
    data: roomNumbers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["room-numbers"],
    queryFn: getRoomNumbers,
    select: (response): RoomNumber[] =>
      response.data.map((row) => ({
        id: row.id,
        roomNumber: row.room_number,
        status: row.status,
        roomId: row.room_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        room: {
          roomId: row.rooms.room_id,
          roomName: row.rooms.room_name,
          roomType: row.rooms.room_type,
          price: Number(row.rooms.price),
          totalRooms: row.rooms.total_rooms,
          roomsAvailable: row.rooms.rooms_available,
          bookedRooms: row.rooms.booked_rooms,
          guests: row.rooms.guests,
        },
      })),
  });

  const paginatedRows = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return roomNumbers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [page, roomNumbers]);

  const totalPages = Math.ceil(roomNumbers.length / ITEMS_PER_PAGE);

  if (isError) {
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-serif text-[#F5DEB3]">Room Numbers</h1>
        <p className="text-red-400">
          {(error as Error)?.message || "Failed to load room numbers"}
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-[#F5DEB3]">Room Numbers</h1>
        <span className="rounded-md border border-[#3A1A22] bg-[#241217] px-3 py-2 text-sm text-[#F5DEB3]/70">
          Total: {roomNumbers.length}
        </span>
      </div>

      {isLoading ? (
        <RoomNumbersTableSkeleton />
      ) : roomNumbers.length === 0 ? (
        <div className="rounded-xl border border-[#3A1A22] bg-[#241217] p-6">
          <EmptyState
            title="No room numbers found"
            description="No room-number entries were returned by the backend."
            icon={<Hash className="h-8 w-8 text-[#D4AF37]" />}
          />
        </div>
      ) : (
        <>
          <RoomNumbersTable rows={paginatedRows} />

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
