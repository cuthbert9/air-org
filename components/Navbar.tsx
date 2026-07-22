"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AirtelLogo from "@/components/AirtelLogo";
import PartnerSwitcher from "@/components/PartnerSwitcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/partners", label: "Partners" },
];

export default function Navbar() {
  const pathname = usePathname();
  const hideChrome = pathname === "/login";

  if (hideChrome) {
    return null;
  }

  return (
    <header className="border-b border-border bg-white">
      <div className="bg-[#efefef] px-6 py-1.5 text-xs text-muted">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span>Partner Portal · Internal</span>
          <span>Airtel Tanzania</span>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3">
        <AirtelLogo />

        <div className="flex flex-1 flex-wrap items-center justify-end gap-4 sm:gap-6">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      active
                        ? "text-airtel"
                        : "text-foreground hover:text-airtel",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <PartnerSwitcher />

          <Link
            href="/login"
            className="rounded bg-airtel px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-airtel-dark"
          >
            Operator
          </Link>
        </div>
      </nav>
    </header>
  );
}
