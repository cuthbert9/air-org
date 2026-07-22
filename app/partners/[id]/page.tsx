import { notFound } from "next/navigation";

import {
  Card,
  KpiGrid,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  TrendBars,
} from "@/components/ui";
import {
  formatNumber,
  formatTzs,
  getPartnerById,
  getPartnerMetrics,
} from "@/lib/mock/partners";
import { formatSyncTime } from "@/lib/utils";

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = getPartnerById(id);
  const metrics = getPartnerMetrics(id);

  if (!partner || !metrics) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Partner dashboard
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">
              {partner.name}
            </h1>
            <StatusBadge status={partner.status} />
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {partner.description}
          </p>
          <p className="mt-2 text-xs text-muted">
            {partner.category} · Last sync {formatSyncTime(partner.lastSync)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <SecondaryButton href="/dashboard">All partners</SecondaryButton>
          <PrimaryButton href="/partners">Directory</PrimaryButton>
        </div>
      </div>

      <div className="space-y-6">
        <KpiGrid
          revenueTzs={metrics.revenueTzs}
          transactions={metrics.transactions}
          activeSubscribers={metrics.activeSubscribers}
          successRate={metrics.successRate}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <TrendBars
            title={`${partner.name} · 7-day volume`}
            points={metrics.trend}
          />

          <Card title="Top products">
            <ul className="divide-y divide-border">
              {metrics.topProducts.map((product) => (
                <li
                  key={product.name}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted">
                      {formatNumber(product.volume)} volume
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-airtel">
                    {formatTzs(product.revenueTzs)}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card title="Recent transactions">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-2 py-3 font-medium">Reference</th>
                  <th className="px-2 py-3 font-medium">Product</th>
                  <th className="px-2 py-3 font-medium">Amount</th>
                  <th className="px-2 py-3 font-medium">Status</th>
                  <th className="px-2 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {metrics.recentTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-2 py-3 font-medium">{tx.reference}</td>
                    <td className="px-2 py-3 text-muted">{tx.product}</td>
                    <td className="px-2 py-3">{formatTzs(tx.amountTzs)}</td>
                    <td className="px-2 py-3 capitalize">
                      <span
                        className={
                          tx.status === "success"
                            ? "font-medium text-emerald-700"
                            : tx.status === "failed"
                              ? "font-medium text-airtel"
                              : "font-medium text-amber-700"
                        }
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-muted">
                      {formatSyncTime(tx.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
