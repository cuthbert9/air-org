"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createUser, fetchUsers } from "@/lib/api/users";
import type { CreateUserInput } from "@/types";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
