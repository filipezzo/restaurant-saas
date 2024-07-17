import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex h-[240px] w-full items-center justify-center">
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
}
