import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col justify-center px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          Full-stack Next.js
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Air Delivery Platform
        </h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">
          A minimal App Router project with Neon PostgreSQL, Drizzle ORM,
          Route Handlers, and TanStack Query.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Open dashboard
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
