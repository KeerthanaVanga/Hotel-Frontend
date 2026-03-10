import Skeleton from "../../ui/Skeleton";

const TABLE_COLUMNS = 7;
const TABLE_ROWS = 8;

export default function RoomNumbersTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#3A1A22] bg-[#241217]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-[#3A1A22] bg-[#1F1216]">
            <tr>
              {Array.from({ length: TABLE_COLUMNS }).map((_, index) => (
                <th key={index} className="px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#3A1A22]">
            {Array.from({ length: TABLE_ROWS }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: TABLE_COLUMNS }).map((_, columnIndex) => (
                  <td key={columnIndex} className="px-4 py-4">
                    <Skeleton className="h-4 w-full max-w-28" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
