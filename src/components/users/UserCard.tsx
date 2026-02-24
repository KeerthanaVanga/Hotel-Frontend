import { Pencil } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  whatsappNumber: string;
  checkIn: string | null;
  checkOut: string | null;
  paymentStatus: string | null;
};

export default function UserCard({ user }: { user: User }) {
  const paymentLabel = user.paymentStatus ?? "Not choosed";

  const paymentStyle =
    paymentLabel.toLowerCase() === "paid"
      ? "bg-green-600/20 text-green-400"
      : paymentLabel.toLowerCase() === "pending"
        ? "bg-yellow-600/20 text-yellow-400"
        : paymentLabel.toLowerCase() === "failed"
          ? "bg-red-600/20 text-red-400"
          : "bg-gray-600/20 text-gray-400";

  return (
    <div className="rounded-xl border border-[#3A1A22] bg-[#241217] p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-medium text-[#F5DEB3]">{user.name}</p>

        <button className="text-[#D4AF37] hover:underline">
          <Pencil size={16} />
        </button>
      </div>

      {/* Email */}
      <p className="text-sm text-[#F5DEB3]/70">{user.email}</p>

      {/* WhatsApp */}
      <p className="text-sm text-[#F5DEB3]/70">
        WhatsApp: {user.whatsappNumber}
      </p>

      {/* Booking Info */}
      <div className="text-sm text-[#F5DEB3]/70 space-y-1">
        <p>
          Check In:{" "}
          {user.checkIn ? new Date(user.checkIn).toLocaleDateString() : "-"}
        </p>

        <p>
          Check Out:{" "}
          {user.checkOut ? new Date(user.checkOut).toLocaleDateString() : "-"}
        </p>

        <div className="flex items-center gap-2">
          <span>Payment:</span>
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium ${paymentStyle}`}
          >
            {paymentLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
