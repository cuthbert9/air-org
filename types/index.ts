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
