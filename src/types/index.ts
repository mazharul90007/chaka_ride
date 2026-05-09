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
  dob?: string | Date | null;
  gender?: string | null;
  createdAt: string;
  updatedAt: string;
  passenger?: Passenger | null;
  driver?: Driver | null;
  admin?: Admin | null;
}

export interface Passenger {
  id: string;
  phone?: string | null;
  address?: string | null;
  userId: string;
}

export interface Driver {
  id: string;
  phone?: string | null;
  licenseNumber?: string | null;
  vehicleCategoryId?: string | null;
  vehicleCategory?: {
    categoryName: string;
    categoryNameBn?: string;
  } | null;
  vehicleModel?: string | null;
  vehicleNumber?: string | null;
  userId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface Admin {
  id: string;
  phone?: string | null;
  userId: string;
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
