import type { CheckInOption } from "../../types/CheckInOption";

function formatCheckInPrice(price: number, isFree: boolean) {
  if (isFree || price === 0) return "Free";
  return `₹${price}`;
}

export default function CheckInOptionsTable({
  options,
  onEdit,
  onDelete,
  processingId,
}: {
  options: CheckInOption[];
  onEdit: (option: CheckInOption) => void;
  onDelete: (option: CheckInOption) => void;
  processingId: string | null;
}) {
  return (
    <div className="rounded-xl border border-[#3A1A22] bg-[#241217] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-[#3A1A22] text-[#F5DEB3]/60">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-center">Time Range</th>
            <th className="px-4 py-3 text-center">Tag</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#3A1A22]">
          {options.map((option) => (
            <tr key={option.id} className="hover:bg-white/5">
              <td className="px-4 py-3 font-medium text-[#F5DEB3]">
                {option.title}
              </td>
              <td className="px-4 py-3 text-center">{option.timeRange}</td>
              <td className="px-4 py-3 text-center">
                <span className="rounded-full bg-[#D4AF37]/10 px-2.5 py-1 text-xs font-medium text-[#D4AF37]">
                  {option.tag}
                </span>
              </td>
              <td className="px-4 py-3 text-[#F5DEB3]/80">
                {option.description}
              </td>
              <td className="px-4 py-3 text-right text-[#F5DEB3]">
                {formatCheckInPrice(option.checkinPrice, option.isFree)}
              </td>
              <td className="px-4 py-3 text-right space-x-3">
                <button
                  onClick={() => onEdit(option)}
                  disabled={processingId === option.id}
                  className="text-sm text-[#D4AF37] hover:opacity-90 disabled:opacity-50"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(option)}
                  disabled={processingId === option.id}
                  className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
