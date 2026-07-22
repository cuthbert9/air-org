"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import AirtelLogo from "@/components/AirtelLogo";
import { PrimaryButton } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="relative min-h-[calc(100vh-0px)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-airtel-deep via-airtel to-[#ff4d4d]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-white/10 lg:block" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <AirtelLogo variant="onRed" />
            <h1 className="mt-8 max-w-md text-4xl font-bold leading-tight">
              Shareholder analytics for Airtel operators
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/90">
              Review combined investor performance, then drill into individual
              shareholder company dashboards for ownership, dividends, and
              capital activity.
            </p>
          </div>

          <div className="w-full max-w-md justify-self-end rounded-lg border border-white/20 bg-white p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-foreground">Sign in</h2>
            <p className="mt-2 text-sm text-muted">
              Mock login — any credentials continue to the portal.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue="operator@airtel.co.tz"
                  className="mt-1 w-full rounded border border-border px-3 py-2.5 text-sm outline-none focus:border-airtel"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  defaultValue="password"
                  className="mt-1 w-full rounded border border-border px-3 py-2.5 text-sm outline-none focus:border-airtel"
                />
              </div>

              <PrimaryButton type="submit" className="w-full">
                Sign in
              </PrimaryButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
