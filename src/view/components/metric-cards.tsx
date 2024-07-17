import { Skeleton } from "./ui/skeleton";

export default function MetricCardsSkeleton() {
  return (
    <>
      <Skeleton className="mt-1 h-7 w-36" />
      <Skeleton className="mt-1 h-4 w-52" />
    </>
  );
}
