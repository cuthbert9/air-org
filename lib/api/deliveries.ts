import { getApiBaseUrl } from "@/lib/utils";
import type { CreateDeliveryInput, Delivery } from "@/types";

export async function fetchDeliveries(): Promise<Delivery[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/deliveries`);

  if (!response.ok) {
    throw new Error("Failed to fetch deliveries");
  }

  return response.json();
}

export async function createDelivery(
  input: CreateDeliveryInput,
): Promise<Delivery> {
  const response = await fetch(`${getApiBaseUrl()}/api/deliveries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create delivery");
  }

  return response.json();
}
