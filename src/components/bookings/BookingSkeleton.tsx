export default function BookingListSkeleton() {
  return (
    <section className="rounded-xl border border-[#3A1A22] bg-[#241217] p-6">
      <div className="mb-6 h-5 w-40 rounded bg-[#3A1A22] animate-pulse" />

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4 rounded-lg p-3 animate-pulse">
            <div className="h-12 w-12 rounded-full bg-[#3A1A22]" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 rounded bg-[#3A1A22]" />
              <div className="h-3 w-64 rounded bg-[#3A1A22]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
