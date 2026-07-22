import type {
  OverviewMetrics,
  Partner,
  PartnerMetrics,
  TrendPoint,
} from "@/types";

export const partners: Partner[] = [
  {
    id: "tigopay-hub",
    name: "TigoPay Hub",
    category: "Mobile Money",
    status: "active",
    lastSync: "2026-07-22T00:45:00Z",
    description:
      "Mobile money aggregation partner for wallet top-ups, P2P, and merchant payments.",
  },
  {
    id: "streamzone",
    name: "StreamZone",
    category: "Content / VAS",
    status: "active",
    lastSync: "2026-07-22T00:40:00Z",
    description:
      "Entertainment and VAS partner for data-bundled streaming subscriptions.",
  },
];

const partnerMetrics: Record<string, PartnerMetrics> = {
  "tigopay-hub": {
    partnerId: "tigopay-hub",
    revenueTzs: 4_820_000_000,
    transactions: 1_245_600,
    activeSubscribers: 890_400,
    successRate: 98.4,
    trend: [
      { label: "Mon", value: 620 },
      { label: "Tue", value: 710 },
      { label: "Wed", value: 680 },
      { label: "Thu", value: 760 },
      { label: "Fri", value: 820 },
      { label: "Sat", value: 910 },
      { label: "Sun", value: 870 },
    ],
    topProducts: [
      { name: "Wallet Top-up", volume: 512_000, revenueTzs: 2_100_000_000 },
      { name: "P2P Transfer", volume: 388_000, revenueTzs: 1_450_000_000 },
      { name: "Merchant Pay", volume: 210_000, revenueTzs: 920_000_000 },
    ],
    recentTransactions: [
      {
        id: "tx-1",
        reference: "TP-884201",
        product: "Wallet Top-up",
        amountTzs: 25_000,
        status: "success",
        createdAt: "2026-07-22T00:41:00Z",
      },
      {
        id: "tx-2",
        reference: "TP-884198",
        product: "P2P Transfer",
        amountTzs: 80_000,
        status: "success",
        createdAt: "2026-07-22T00:38:00Z",
      },
      {
        id: "tx-3",
        reference: "TP-884190",
        product: "Merchant Pay",
        amountTzs: 15_500,
        status: "failed",
        createdAt: "2026-07-22T00:32:00Z",
      },
      {
        id: "tx-4",
        reference: "TP-884175",
        product: "Wallet Top-up",
        amountTzs: 10_000,
        status: "pending",
        createdAt: "2026-07-22T00:28:00Z",
      },
    ],
  },
  streamzone: {
    partnerId: "streamzone",
    revenueTzs: 1_960_000_000,
    transactions: 486_200,
    activeSubscribers: 312_800,
    successRate: 96.1,
    trend: [
      { label: "Mon", value: 210 },
      { label: "Tue", value: 240 },
      { label: "Wed", value: 255 },
      { label: "Thu", value: 230 },
      { label: "Fri", value: 290 },
      { label: "Sat", value: 340 },
      { label: "Sun", value: 320 },
    ],
    topProducts: [
      { name: "Daily Stream Pack", volume: 198_000, revenueTzs: 720_000_000 },
      { name: "Weekly Plus", volume: 156_000, revenueTzs: 680_000_000 },
      { name: "Sports Pass", volume: 88_000, revenueTzs: 410_000_000 },
    ],
    recentTransactions: [
      {
        id: "tx-5",
        reference: "SZ-120441",
        product: "Daily Stream Pack",
        amountTzs: 1_500,
        status: "success",
        createdAt: "2026-07-22T00:44:00Z",
      },
      {
        id: "tx-6",
        reference: "SZ-120438",
        product: "Weekly Plus",
        amountTzs: 7_000,
        status: "success",
        createdAt: "2026-07-22T00:39:00Z",
      },
      {
        id: "tx-7",
        reference: "SZ-120430",
        product: "Sports Pass",
        amountTzs: 12_000,
        status: "success",
        createdAt: "2026-07-22T00:33:00Z",
      },
      {
        id: "tx-8",
        reference: "SZ-120421",
        product: "Daily Stream Pack",
        amountTzs: 1_500,
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
    value: point.value + rest.reduce((sum, s) => sum + (s[index]?.value ?? 0), 0),
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
