import type {
  OverviewMetrics,
  Partner,
  PartnerMetrics,
  TrendPoint,
} from "@/types";

export const partners: Partner[] = [
  {
    id: "meru-capital",
    name: "Meru Capital Group",
    category: "Institutional Investor",
    status: "active",
    lastSync: "2026-07-22T00:45:00Z",
    ownershipPercent: 22.5,
    description:
      "Institutional shareholder focused on long-term equity returns across Airtel Tanzania network and digital services.",
  },
  {
    id: "coastal-holdings",
    name: "Coastal Holdings Ltd",
    category: "Strategic Shareholder",
    status: "active",
    lastSync: "2026-07-22T00:40:00Z",
    ownershipPercent: 14.8,
    description:
      "Strategic investor company with board representation and capital participation in infrastructure expansion.",
  },
];

const partnerMetrics: Record<string, PartnerMetrics> = {
  "meru-capital": {
    partnerId: "meru-capital",
    revenueTzs: 4_820_000_000,
    transactions: 48,
    activeSubscribers: 2_250_000,
    successRate: 12.4,
    trend: [
      { label: "Mon", value: 62 },
      { label: "Tue", value: 71 },
      { label: "Wed", value: 68 },
      { label: "Thu", value: 76 },
      { label: "Fri", value: 82 },
      { label: "Sat", value: 55 },
      { label: "Sun", value: 48 },
    ],
    topProducts: [
      {
        name: "Network operations share",
        volume: 1_100_000,
        revenueTzs: 2_100_000_000,
      },
      {
        name: "Mobile money attributable return",
        volume: 780_000,
        revenueTzs: 1_450_000_000,
      },
      {
        name: "Enterprise services share",
        volume: 370_000,
        revenueTzs: 920_000_000,
      },
    ],
    recentTransactions: [
      {
        id: "tx-1",
        reference: "DIV-2026-Q2-01",
        product: "Quarterly dividend",
        amountTzs: 1_200_000_000,
        status: "success",
        createdAt: "2026-07-22T00:41:00Z",
      },
      {
        id: "tx-2",
        reference: "DIST-884198",
        product: "Special distribution",
        amountTzs: 480_000_000,
        status: "success",
        createdAt: "2026-07-22T00:38:00Z",
      },
      {
        id: "tx-3",
        reference: "CALL-884190",
        product: "Capital contribution",
        amountTzs: 250_000_000,
        status: "pending",
        createdAt: "2026-07-22T00:32:00Z",
      },
      {
        id: "tx-4",
        reference: "DIV-2026-Q1-12",
        product: "Quarterly dividend",
        amountTzs: 980_000_000,
        status: "success",
        createdAt: "2026-07-22T00:28:00Z",
      },
    ],
  },
  "coastal-holdings": {
    partnerId: "coastal-holdings",
    revenueTzs: 1_960_000_000,
    transactions: 31,
    activeSubscribers: 1_480_000,
    successRate: 9.8,
    trend: [
      { label: "Mon", value: 21 },
      { label: "Tue", value: 24 },
      { label: "Wed", value: 25 },
      { label: "Thu", value: 23 },
      { label: "Fri", value: 29 },
      { label: "Sat", value: 18 },
      { label: "Sun", value: 16 },
    ],
    topProducts: [
      {
        name: "Tower & spectrum share",
        volume: 620_000,
        revenueTzs: 720_000_000,
      },
      {
        name: "5G rollout attributable return",
        volume: 510_000,
        revenueTzs: 680_000_000,
      },
      {
        name: "Retail channel share",
        volume: 350_000,
        revenueTzs: 410_000_000,
      },
    ],
    recentTransactions: [
      {
        id: "tx-5",
        reference: "DIV-2026-Q2-08",
        product: "Quarterly dividend",
        amountTzs: 520_000_000,
        status: "success",
        createdAt: "2026-07-22T00:44:00Z",
      },
      {
        id: "tx-6",
        reference: "DIST-120438",
        product: "Infrastructure distribution",
        amountTzs: 310_000_000,
        status: "success",
        createdAt: "2026-07-22T00:39:00Z",
      },
      {
        id: "tx-7",
        reference: "CALL-120430",
        product: "Capital contribution",
        amountTzs: 180_000_000,
        status: "success",
        createdAt: "2026-07-22T00:33:00Z",
      },
      {
        id: "tx-8",
        reference: "DIV-2026-Q1-04",
        product: "Quarterly dividend",
        amountTzs: 440_000_000,
        status: "failed",
        createdAt: "2026-07-22T00:21:00Z",
      },
    ],
  },
};

export function getPartners(): Partner[] {
  return partners;
}

export function getPartnerById(id: string): Partner | undefined {
  return partners.find((partner) => partner.id === id);
}

export function getPartnerMetrics(id: string): PartnerMetrics | undefined {
  return partnerMetrics[id];
}

function mergeTrends(series: TrendPoint[][]): TrendPoint[] {
  const [first, ...rest] = series;
  if (!first) return [];

  return first.map((point, index) => ({
    label: point.label,
    value:
      point.value + rest.reduce((sum, s) => sum + (s[index]?.value ?? 0), 0),
  }));
}

export function getOverviewMetrics(): OverviewMetrics {
  const metrics = partners
    .map((partner) => partnerMetrics[partner.id])
    .filter(Boolean) as PartnerMetrics[];

  const revenueTzs = metrics.reduce((sum, m) => sum + m.revenueTzs, 0);
  const transactions = metrics.reduce((sum, m) => sum + m.transactions, 0);
  const activeSubscribers = metrics.reduce(
    (sum, m) => sum + m.activeSubscribers,
    0,
  );
  const successRate =
    metrics.reduce((sum, m) => sum + m.successRate, 0) / metrics.length;

  return {
    revenueTzs,
    transactions,
    activeSubscribers,
    successRate: Number(successRate.toFixed(1)),
    trend: mergeTrends(metrics.map((m) => m.trend)),
  };
}

export function formatTzs(amount: number): string {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-TZ").format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
