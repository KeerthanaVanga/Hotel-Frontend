import type { CheckIn } from "../../types/CheckIn";

const STATUS_STYLE = {
  "checked-in": "bg-emerald-500/15 text-emerald-400",
  upcoming: "bg-indigo-500/15 text-indigo-400",
  cancelled: "bg-red-500/15 text-red-400",
};

export default function CheckInTable({
  checkins,
  onCancel,
}: {
  checkins: CheckIn[];
  onCancel: (id: string) => void;
}) {
  return (
    <>
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block rounded-xl border border-[#3A1A22] bg-[#241217] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-[#3A1A22] text-[#F5DEB3]/60">
            <tr>
              <th className="px-4 py-3 text-left">Guest</th>
              <th className="px-4 py-3">Room</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Guests</th>
              <th className="px-4 py-3">Nights</th>
              <th className="px-4 py-3">From → To</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#3A1A22]">
            {checkins.map((c) => (
              <tr key={c.id} className="hover:bg-white/5">
                <td className="px-4 py-3">{c.guestName}</td>
                <td className="px-4 py-3 text-center">{c.roomType}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      STATUS_STYLE[c.status]
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">{c.bookingDate}</td>
                <td className="px-4 py-3 text-center">
                  {c.adults}A / {c.children}C
                </td>
                <td className="px-4 py-3 text-center">{c.nights}</td>
                <td className="px-4 py-3 text-center">
                  {c.fromDate} → {c.toDate}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onCancel(c.id)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="space-y-4 md:hidden">
        {checkins.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-[#3A1A22] bg-[#241217] p-4 space-y-2"
          >
            <div className="flex justify-between">
              <p className="font-medium text-[#F5DEB3]">{c.guestName}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  STATUS_STYLE[c.status]
                }`}
              >
                {c.status}
              </span>
            </div>

            <p className="text-sm text-[#F5DEB3]/70">{c.roomType}</p>
            <p className="text-sm">
              Guests: {c.adults}A / {c.children}C
            </p>
            <p className="text-sm">Nights: {c.nights}</p>
            <p className="text-sm">
              {c.fromDate} → {c.toDate}
            </p>

            <button
              onClick={() => onCancel(c.id)}
              className="mt-2 w-full rounded-md border border-[#3A1A22] py-2 text-sm text-red-400 hover:border-red-400"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
