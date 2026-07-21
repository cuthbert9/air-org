import DashboardView from "@/components/DashboardView";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="mt-2 text-zinc-600">
          Users and deliveries fetched with TanStack Query.
        </p>
      </div>
      <DashboardView />
    </div>
  );
}
