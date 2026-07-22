"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { getPartners } from "@/lib/mock/partners";
import { cn } from "@/lib/utils";

export default function PartnerSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const partners = getPartners();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const activePartner = partners.find((partner) =>
    pathname.startsWith(`/partners/${partner.id}`),
  );

  const label = activePartner?.name ?? "All partners";

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function selectAll() {
    setOpen(false);
    router.push("/dashboard");
  }

  function selectPartner(id: string) {
    setOpen(false);
    router.push(`/partners/${id}`);
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-w-[10rem] items-center justify-between gap-2 rounded border border-border bg-white px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-airtel"
      >
        <span className="truncate">{label}</span>
        <span aria-hidden className="text-muted">
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute right-0 z-40 mt-1 w-56 overflow-hidden rounded border border-border bg-white shadow-lg"
        >
          <li role="option" aria-selected={!activePartner}>
            <button
              type="button"
              onClick={selectAll}
              className={cn(
                "block w-full px-3 py-2.5 text-left text-sm hover:bg-red-50",
                !activePartner && "bg-red-50 font-semibold text-airtel",
              )}
            >
              All partners
            </button>
          </li>
          {partners.map((partner) => (
            <li
              key={partner.id}
              role="option"
              aria-selected={activePartner?.id === partner.id}
            >
              <button
                type="button"
                onClick={() => selectPartner(partner.id)}
                className={cn(
                  "block w-full px-3 py-2.5 text-left text-sm hover:bg-red-50",
                  activePartner?.id === partner.id &&
                    "bg-red-50 font-semibold text-airtel",
                )}
              >
                {partner.name}
              </button>
            </li>
          ))}
          <li className="border-t border-border">
            <Link
              href="/partners"
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-airtel hover:bg-red-50"
            >
              View partner directory
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
