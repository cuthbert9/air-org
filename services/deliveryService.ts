import { desc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { deliveries } from "@/db/schema";
import type { CreateDeliveryInput, Delivery } from "@/types";
import { getUserById } from "@/services/userService";

function toDelivery(record: typeof deliveries.$inferSelect): Delivery {
  return {
    id: record.id,
    userId: record.userId,
    pickupLocation: record.pickupLocation,
    destination: record.destination,
    status: record.status,
    createdAt: record.createdAt.toISOString(),
  };
}

export async function getDeliveries(): Promise<Delivery[]> {
  const rows = await getDb()
    .select()
    .from(deliveries)
    .orderBy(desc(deliveries.createdAt));
  return rows.map(toDelivery);
}

export async function createDelivery(
  input: CreateDeliveryInput,
): Promise<Delivery> {
  const user = await getUserById(input.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const [row] = await getDb()
    .insert(deliveries)
    .values({
      userId: input.userId,
      pickupLocation: input.pickupLocation,
      destination: input.destination,
      status: input.status ?? "pending",
    })
    .returning();

  return toDelivery(row);
}

export async function getDeliveriesByUserId(
  userId: number,
): Promise<Delivery[]> {
  const rows = await getDb()
    .select()
    .from(deliveries)
    .where(eq(deliveries.userId, userId))
    .orderBy(desc(deliveries.createdAt));

  return rows.map(toDelivery);
}
