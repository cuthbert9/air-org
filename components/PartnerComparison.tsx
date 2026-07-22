import Link from "next/link";

import { Card, PrimaryButton, StatusBadge } from "@/components/ui";
import {
  formatNumber,
  formatPercent,
  formatTzs,
  getPartnerMetrics,
  getPartners,
} from "@/lib/mock/partners";

export default function PartnerComparison() {
  const partners = getPartners();

  return (
    <Card title="Shareholder comparison">
      <div className="grid gap-4 lg:grid-cols-2">
        {partners.map((partner) => {
          const metrics = getPartnerMetrics(partner.id);
          if (!metrics) return null;

          return (
            <div
              key={partner.id}
              className="rounded-lg border border-border p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted">
                    {partner.category} · {partner.ownershipPercent}% stake
                  </p>
                </div>
                <StatusBadge status={partner.status} />
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <dt className="text-xs text-muted">Returns</dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {formatTzs(metrics.revenueTzs)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Distributions</dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {formatNumber(metrics.transactions)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted">Yield</dt>
                  <dd className="mt-1 text-sm font-semibold">
                    {formatPercent(metrics.successRate)}
                  </dd>
                </div>
              </dl>

              <div className="mt-4">
                <PrimaryButton
                  href={`/partners/${partner.id}`}
                  className="w-full"
                >
                  View details
                </PrimaryButton>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted">
        Need the full list?{" "}
        <Link href="/partners" className="font-semibold text-airtel">
          Browse shareholders
        </Link>
      </p>
    </Card>
  );
}
