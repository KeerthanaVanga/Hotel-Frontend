import Skeleton from "../ui/Skeleton";
import CheckInOptionsTableSkeleton from "../checkin-options/CheckInOptionsPageSkeleton";

export default function CheckInOptionsPageSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-10 w-28" />
      </div>

      <CheckInOptionsTableSkeleton />
    </section>
  );
}
