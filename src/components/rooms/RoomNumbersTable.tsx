import type { RoomNumber } from "../../types/RoomNumber";

type RoomNumbersTableProps = {
  rows: RoomNumber[];
};

function getStatusClasses(status: RoomNumber["status"]) {
  if (status === "available") {
    return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
  }

  if (status === "booked") {
    return "bg-rose-500/10 text-rose-300 border-rose-500/20";
  }

  return "bg-amber-500/10 text-amber-300 border-amber-500/20";
}

export default function RoomNumbersTable({ rows }: RoomNumbersTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#3A1A22] bg-[#241217]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[#F5DEB3]/80">
          <thead className="bg-[#1F1216] text-xs uppercase tracking-wider text-[#F5DEB3]/60">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Room Number</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Room Name</th>
              <th className="px-4 py-3">Room Type</th>
              <th className="px-4 py-3">Guests</th>
              <th className="px-4 py-3">Price / Night</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((roomNumber, index) => (
              <tr key={roomNumber.id} className="border-t border-[#3A1A22]">
                <td className="px-4 py-3 text-[#F5DEB3]/60">{index + 1}</td>
                <td className="px-4 py-3 font-semibold text-[#F5DEB3]">
                  {roomNumber.roomNumber}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full border px-2 py-1 text-xs font-medium capitalize ${getStatusClasses(roomNumber.status)}`}
                  >
                    {roomNumber.status}
                  </span>
                </td>
                <td className="px-4 py-3">{roomNumber.room.roomName}</td>
                <td className="px-4 py-3">{roomNumber.room.roomType}</td>
                <td className="px-4 py-3">{roomNumber.room.guests}</td>
                <td className="px-4 py-3 text-[#D4AF37]">
                  ₹{roomNumber.room.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
