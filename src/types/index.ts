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
  model: string;
  modelBn?: string | null;
  year: string;
  yearBn?: string | null;
  description?: string | null;
  descriptionBn?: string | null;
  registrationNumber: string;
  engineNumber?: string | null;
  chassisNumber?: string | null;
  color: string;
  colorBn?: string | null;
  photos: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  driverId: string;
  categoryId: string;
  category?: CarCategory;
  driver?: Driver & { user: User };
  createdAt: string;
  updatedAt: string;
}

export interface CarCategory {
  id: string;
  categoryName: string;
  categoryNameBn?: string | null;
  description: string;
  descriptionBn?: string | null;
  seat: string;
  seatBn?: string | null;
  luggage: string;
  luggageBn?: string | null;
  ac: string;
  acBn?: string | null;
  fuel: string;
  fuelBn?: string | null;
  features: Array<{ 
    featureTitle: string; 
    featureTitleBn?: string; 
    featureDescription: string; 
    featureDescriptionBn?: string; 
    featureIcon?: string 
  }>;
  categoryIcon?: string | null;
  photos: string[];
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
