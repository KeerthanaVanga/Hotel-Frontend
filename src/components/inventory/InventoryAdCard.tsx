import type { HotelInventory } from "../../types/Inventory";
import { Star } from "lucide-react";

export default function InventoryAdCard({
  hotel,
}: {
  hotel: HotelInventory;
}) {
  return (
    <div
  className="
    w-64 flex-none
    rounded-xl border border-[#3A1A22]
    bg-[#241217] p-3
    hover:border-[#D4AF37]
    transition
  "
>

      <img
        src={hotel.image}
        className="h-36 w-full rounded-lg object-cover"
      />

      <h4 className="mt-2 font-medium text-[#F5DEB3] line-clamp-2">
        {hotel.name}
      </h4>

      <div className="mt-1 flex items-center gap-1 text-sm text-[#F5DEB3]/70">
        <Star size={14} className="text-yellow-400" />
        {hotel.rating} ({hotel.reviews})
      </div>

      <p className="mt-1 text-[#D4AF37] font-semibold">
        ₹{hotel.price}
      </p>
    </div>
  );
}
