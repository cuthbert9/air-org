import { NextResponse } from "next/server";

import {
  createDelivery,
  getDeliveries,
} from "@/services/deliveryService";
import type { CreateDeliveryInput } from "@/types";

export async function GET() {
  try {
    const deliveries = await getDeliveries();
    return NextResponse.json(deliveries);
  } catch (error) {
    console.error("GET /api/deliveries failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch deliveries" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateDeliveryInput;

    if (
      !body.userId ||
      !body.pickupLocation?.trim() ||
      !body.destination?.trim()
    ) {
      return NextResponse.json(
        { error: "userId, pickupLocation, and destination are required" },
        { status: 400 },
      );
    }

    const delivery = await createDelivery({
      userId: Number(body.userId),
      pickupLocation: body.pickupLocation.trim(),
      destination: body.destination.trim(),
      status: body.status?.trim(),
    });

    return NextResponse.json(delivery, { status: 201 });
  } catch (error) {
    console.error("POST /api/deliveries failed:", error);

    if (error instanceof Error && error.message === "User not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to create delivery" },
      { status: 500 },
    );
  }
}
