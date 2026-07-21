import type { Delivery, User } from "@/types";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">{title}</h2>
      {children}
    </section>
  );
}

export function LoadingState({ label }: { label: string }) {
  return <p className="text-sm text-zinc-500">{label}</p>;
}

export function ErrorState({ message }: { message: string }) {
  return <p className="text-sm text-red-600">{message}</p>;
}

export function EmptyState({ message }: { message: string }) {
  return <p className="text-sm text-zinc-500">{message}</p>;
}

export function UserList({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <EmptyState message="No users yet." />;
  }

  return (
    <ul className="divide-y divide-zinc-100">
      {users.map((user) => (
        <li key={user.id} className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-zinc-900">{user.name}</p>
            <p className="text-sm text-zinc-500">{user.email}</p>
          </div>
          <span className="text-xs text-zinc-400">#{user.id}</span>
        </li>
      ))}
    </ul>
  );
}

export function DeliveryList({ deliveries }: { deliveries: Delivery[] }) {
  if (deliveries.length === 0) {
    return <EmptyState message="No deliveries yet." />;
  }

  return (
    <ul className="divide-y divide-zinc-100">
      {deliveries.map((delivery) => (
        <li key={delivery.id} className="py-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium text-zinc-900">
                {delivery.pickupLocation} → {delivery.destination}
              </p>
              <p className="text-sm text-zinc-500">User #{delivery.userId}</p>
            </div>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium capitalize text-zinc-700">
              {delivery.status}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
