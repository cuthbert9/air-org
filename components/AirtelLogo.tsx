import Link from "next/link";

import { cn } from "@/lib/utils";

export default function AirtelLogo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "onRed";
}) {
  const onRed = variant === "onRed";

  return (
    <Link
      href="/dashboard"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span
        aria-hidden
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
          onRed ? "bg-white text-airtel" : "bg-airtel text-white",
        )}
      >
        a
      </span>
      <span
        className={cn(
          "text-xl font-bold tracking-tight lowercase",
          onRed ? "text-white" : "text-airtel",
        )}
      >
        airtel
      </span>
      <span
        className={cn(
          "hidden text-xs font-medium uppercase tracking-wide sm:inline",
          onRed ? "text-white/80" : "text-muted",
        )}
      >
        Partner Portal
      </span>
    </Link>
  );
}
