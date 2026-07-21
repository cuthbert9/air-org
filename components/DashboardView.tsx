"use client";

import {
  Card,
  DeliveryList,
  ErrorState,
  LoadingState,
  UserList,
} from "@/components/ui";
import { useDeliveries } from "@/hooks/useDeliveries";
import { useUsers } from "@/hooks/useUsers";

export default function DashboardView() {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useUsers();

  const {
    data: deliveries,
    isLoading: deliveriesLoading,
    isError: deliveriesError,
  } = useDeliveries();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Users">
        {usersLoading && <LoadingState label="Loading users..." />}
        {usersError && <ErrorState message="Could not load users." />}
        {users && <UserList users={users} />}
      </Card>

      <Card title="Deliveries">
        {deliveriesLoading && <LoadingState label="Loading deliveries..." />}
        {deliveriesError && (
          <ErrorState message="Could not load deliveries." />
        )}
        {deliveries && <DeliveryList deliveries={deliveries} />}
      </Card>
    </div>
  );
}
