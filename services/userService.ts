import { desc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { users } from "@/db/schema";
import type { CreateUserInput, User } from "@/types";

function toUser(record: typeof users.$inferSelect): User {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    createdAt: record.createdAt.toISOString(),
  };
}

export async function getUsers(): Promise<User[]> {
  const rows = await getDb().select().from(users).orderBy(desc(users.createdAt));
  return rows.map(toUser);
}

export async function createUser(input: CreateUserInput): Promise<User> {
  const [row] = await getDb()
    .insert(users)
    .values({
      name: input.name,
      email: input.email,
    })
    .returning();

  return toUser(row);
}

export async function getUserById(id: number): Promise<User | null> {
  const [row] = await getDb().select().from(users).where(eq(users.id, id)).limit(1);
  return row ? toUser(row) : null;
}
