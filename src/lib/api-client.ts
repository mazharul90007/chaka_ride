import { ApiResponse, Car, User, PaginatedData, Driver, Passenger, Admin, CarCategory } from "@/types";
import { api } from "./axiosInstance";

export const authApi = {
  // Better-Auth handles most of this, but we can add custom endpoints here
  getMe: async () => {
    const response = await api.get<ApiResponse<User>>("/auth/me");
    return response.data;
  },
};

export const carApi = {
  getAll: async (params?: Record<string, any>) => {
    const response = await api.get<ApiResponse<Car[]>>("/car/all", { params });
    return response.data;
  },
  getMyCars: async () => {
    const response = await api.get<ApiResponse<Car[]>>("/car/my-cars");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get<ApiResponse<Car>>(`/car/${id}`);
    return response.data;
  },
  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<Car>>("/car", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id: string, data: FormData) => {
    const response = await api.patch<ApiResponse<Car>>(`/car/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/car/${id}`);
    return response.data;
  },
};

export const queryApi = {
  create: async (data: any) => {
    const response = await api.post<ApiResponse<any>>("/query/create", data);
    return response.data;
  },
};


export const carCategoryApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<CarCategory[]>>("/car/categories");
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get<ApiResponse<CarCategory>>(`/car/category/${id}`);
    return response.data;
  },
  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<CarCategory>>("/car/category", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id: string, data: FormData) => {
    const response = await api.patch<ApiResponse<CarCategory>>(`/car/category/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/car/category/${id}`);
    return response.data;
  },
};

export const userApi = {
  getProfile: async () => {
    const response = await api.get<ApiResponse<User>>("/user/profile");
    return response.data;
  },
  updateProfile: async (payload: FormData) => {
    const response = await api.patch<ApiResponse<User>>("/user/profile", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export interface AdminStats {
  totalDrivers: number;
  totalPassengers: number;
  totalCars: number;
  pendingDrivers: number;
}

export interface RideQuery {
  id: string;
  fullName: string;
  email: string;
  whatsAppNumber: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  status: "PENDING" | "CONTACTED" | "COMPLETED" | "CANCELLED";
  tripType: "ONE_WAY" | "ROUND_TRIP";
  carCategory?: {
    categoryName: string;
    categoryNameBn?: string;
  };
}

export const adminApi = {
  getStats: async () => {
    const response = await api.get<ApiResponse<AdminStats>>("/admin/stats");
    return response.data;
  },
  getDrivers: async () => {
    const response = await api.get<ApiResponse<(Driver & { user: User })[]>>("/admin/drivers");
    return response.data;
  },
  getPassengers: async () => {
    const response = await api.get<ApiResponse<(Passenger & { user: User })[]>>("/admin/passengers");
    return response.data;
  },
  getAdmins: async () => {
    const response = await api.get<ApiResponse<(Admin & { user: User })[]>>("/admin/admins");
    return response.data;
  },
  updateDriverStatus: async (id: string, status: string) => {
    const response = await api.patch(`/admin/driver/${id}/status`, { status });
    return response.data;
  },
  // Ride/Query management
  getQueries: async () => {
    const response = await api.get<ApiResponse<RideQuery[]>>("/query/all");
    return response.data;
  },
  updateQueryStatus: async (id: string, status: string) => {
    const response = await api.patch(`/query/${id}/status`, { status });
    return response.data;
  },
  bulkDeleteQueries: async (ids: string[]) => {
    const response = await api.delete<ApiResponse<null>>("/query/bulk-delete", {
      data: { ids },
    });
    return response.data;
  },
};
