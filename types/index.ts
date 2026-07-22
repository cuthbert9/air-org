export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Delivery {
  id: number;
  userId: number;
  pickupLocation: string;
  destination: string;
  status: string;
  createdAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateDeliveryInput {
  userId: number;
  pickupLocation: string;
  destination: string;
  status?: string;
}

export type PartnerStatus = "active" | "degraded" | "inactive";

export interface Partner {
  id: string;
  name: string;
  category: string;
  status: PartnerStatus;
  lastSync: string;
  description: string;
  ownershipPercent: number;
}

export interface TrendPoint {
  label: string;
  value: number;
}

/** Portfolio / business-unit contribution for a shareholder */
export interface TopProduct {
  name: string;
  volume: number;
  revenueTzs: number;
}

/** Capital event: dividend, distribution, or contribution */
export interface RecentTransaction {
  id: string;
  reference: string;
  product: string;
  amountTzs: number;
  status: "success" | "failed" | "pending";
  createdAt: string;
}

export interface PartnerMetrics {
  partnerId: string;
  /** Dividends / returns attributed (TZS) */
  revenueTzs: number;
  /** Number of capital distributions */
  transactions: number;
  /** Shares held */
  activeSubscribers: number;
  /** Portfolio / ownership yield % */
  successRate: number;
  trend: TrendPoint[];
  topProducts: TopProduct[];
  recentTransactions: RecentTransaction[];
}

export interface OverviewMetrics {
  revenueTzs: number;
  transactions: number;
  activeSubscribers: number;
  successRate: number;
  trend: TrendPoint[];
}
