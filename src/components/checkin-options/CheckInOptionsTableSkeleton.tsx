export default function CheckInOptionsTableSkeleton() {
  return (
    <div className="rounded-xl border border-[#3A1A22] bg-[#241217] overflow-hidden animate-pulse">
      <div className="h-11 border-b border-[#3A1A22] bg-white/5" />
      <div className="space-y-3 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 rounded-md bg-white/5" />
        ))}
      </div>
    </div>
  );
}
