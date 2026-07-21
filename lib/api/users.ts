import { getApiBaseUrl } from "@/lib/utils";
import type { CreateUserInput, User } from "@/types";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const response = await fetch(`${getApiBaseUrl()}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}
