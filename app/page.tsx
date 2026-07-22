import Link from "next/link";

import { PrimaryButton, SecondaryButton } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
        <div className="grid lg:grid-cols-2">
          <div className="bg-gradient-to-br from-airtel-deep via-airtel to-[#ff4d4d] p-8 text-white sm:p-12">
            <p className="text-sm font-medium uppercase tracking-wide text-white/80">
              Airtel · Internal
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
              Shareholder Portal
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/90">
              Monitor investor companies and ownership performance, then open a
              single shareholder dashboard for dividends, stake, and capital
              events.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded bg-white px-4 py-2.5 text-sm font-semibold text-airtel transition-colors hover:bg-red-50"
              >
                Open dashboard
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded border border-white px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="space-y-5 p-8 sm:p-12">
            <h2 className="text-xl font-semibold text-foreground">
              What you can do
            </h2>
            <ul className="space-y-4 text-sm leading-6 text-muted">
              <li>
                <span className="font-semibold text-foreground">
                  Combined overview —
                </span>{" "}
                dividends, distributions, shares held, and portfolio yield
                across shareholders.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Shareholder switcher —
                </span>{" "}
                jump between all investors and a single company dashboard.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Detail views —
                </span>{" "}
                ownership stake, portfolio lines, and recent capital events.
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <PrimaryButton href="/partners">Browse shareholders</PrimaryButton>
              <SecondaryButton href="/dashboard">
                Investors overview
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
