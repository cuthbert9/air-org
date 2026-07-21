"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createDelivery, fetchDeliveries } from "@/lib/api/deliveries";
import type { CreateDeliveryInput } from "@/types";

export function useDeliveries() {
  return useQuery({
    queryKey: ["deliveries"],
    queryFn: fetchDeliveries,
  });
}

export function useCreateDelivery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateDeliveryInput) => createDelivery(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    },
  });
}
