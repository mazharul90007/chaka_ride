export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role: "PASSENGER" | "DRIVER" | "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  seats: number;
  category: string;
  pricePerDay: number;
  status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedData<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}
