import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md items-center px-6 py-10">
      <div className="w-full rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Minimal login page placeholder for the delivery app.
        </p>

        <form className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Continue to the{" "}
          <Link href="/dashboard" className="font-medium text-zinc-900">
            dashboard
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
