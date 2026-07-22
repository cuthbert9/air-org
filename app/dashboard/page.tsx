import PartnerComparison from "@/components/PartnerComparison";
import { KpiGrid, TrendBars } from "@/components/ui";
import { getOverviewMetrics } from "@/lib/mock/partners";

export default function DashboardPage() {
  const overview = getOverviewMetrics();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 overflow-hidden rounded-lg bg-gradient-to-r from-airtel-deep via-airtel to-[#ff3333] p-6 text-white shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-white/80">
          Combined view
        </p>
        <h1 className="mt-1 text-3xl font-bold">Partners overview</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/90">
          Analytics across all connected partners. Select a partner from the
          switcher to drill into individual performance.
        </p>
      </div>

      <div className="space-y-6">
        <KpiGrid
          revenueTzs={overview.revenueTzs}
          transactions={overview.transactions}
          activeSubscribers={overview.activeSubscribers}
          successRate={overview.successRate}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <TrendBars title="7-day volume trend" points={overview.trend} />
          <PartnerComparison />
        </div>
      </div>
    </div>
  );
}
