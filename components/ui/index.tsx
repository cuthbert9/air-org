import Link from "next/link";

import type { Partner, PartnerStatus, TrendPoint } from "@/types";
import {
  formatNumber,
  formatPercent,
  formatTzs,
} from "@/lib/mock/partners";
import { cn, formatSyncTime } from "@/lib/utils";

export function Card({
  title,
  children,
  className,
  action,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-surface p-5 shadow-sm",
        className,
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          {title ? (
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          ) : (
            <span />
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatusBadge({ status }: { status: PartnerStatus }) {
  const styles: Record<PartnerStatus, string> = {
    active: "bg-emerald-50 text-emerald-700",
    degraded: "bg-amber-50 text-amber-700",
    inactive: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}

export function PrimaryButton({
  href,
  children,
  className,
  type = "button",
  onClick,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded bg-airtel px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-airtel-dark",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded border border-airtel bg-white px-4 py-2.5 text-sm font-semibold text-airtel transition-colors hover:bg-red-50",
        className,
      )}
    >
      {children}
    </Link>
  );
}

function KpiIcon({ kind }: { kind: "revenue" | "tx" | "users" | "success" }) {
  const paths = {
    revenue: "M4 16l4-4 3 3 5-7",
    tx: "M5 8h10M5 12h10M5 16h6",
    users: "M8 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm6 0a2 2 0 100-4 2 2 0 000 4zM4 18c.8-2 2.6-3 4-3s3.2 1 4 3m2-3c1.2.2 2.4 1 3 3",
    success: "M5 11l3 3 7-7",
  };

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-airtel text-airtel">
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path d={paths[kind]} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function KpiTile({
  label,
  value,
  kind,
}: {
  label: string;
  value: string;
  kind: "revenue" | "tx" | "users" | "success";
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
            {value}
          </p>
        </div>
        <KpiIcon kind={kind} />
      </div>
    </div>
  );
}

export function KpiGrid({
  revenueTzs,
  transactions,
  activeSubscribers,
  successRate,
}: {
  revenueTzs: number;
  transactions: number;
  activeSubscribers: number;
  successRate: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiTile label="Revenue" value={formatTzs(revenueTzs)} kind="revenue" />
      <KpiTile
        label="Transactions"
        value={formatNumber(transactions)}
        kind="tx"
      />
      <KpiTile
        label="Active subscribers"
        value={formatNumber(activeSubscribers)}
        kind="users"
      />
      <KpiTile
        label="Success rate"
        value={formatPercent(successRate)}
        kind="success"
      />
    </div>
  );
}

export function TrendBars({
  title,
  points,
}: {
  title: string;
  points: TrendPoint[];
}) {
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <Card title={title}>
      <div className="flex h-44 items-end gap-3">
        {points.map((point) => (
          <div
            key={point.label}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div
              className="w-full rounded-t bg-gradient-to-t from-airtel-deep via-airtel to-[#ff4d4d]"
              style={{ height: `${(point.value / max) * 100}%` }}
              title={`${point.label}: ${formatNumber(point.value)}k`}
            />
            <span className="text-xs font-medium text-muted">{point.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">Daily transaction volume (thousands)</p>
    </Card>
  );
}

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {partner.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{partner.category}</p>
        </div>
        <StatusBadge status={partner.status} />
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-foreground/80">
        {partner.description}
      </p>
      <p className="mt-4 text-xs text-muted">
        Last sync: {formatSyncTime(partner.lastSync)}
      </p>
      <div className="mt-4">
        <PrimaryButton href={`/partners/${partner.id}`} className="w-full">
          View dashboard
        </PrimaryButton>
      </div>
    </article>
  );
}
