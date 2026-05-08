import { ApiResponse, Car, User, PaginatedData } from "@/types";
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
    const response = await api.get<ApiResponse<PaginatedData<Car>>>("/cars", {
      params,
    });
    return response.data;
  },
  getOne: async (id: string) => {
    const response = await api.get<ApiResponse<Car>>(`/cars/${id}`);
    return response.data;
  },
};

export const userApi = {
  getProfile: async () => {
    const response = await api.get<ApiResponse<User>>("/profile");
    return response.data;
  },
  updateProfile: async (payload: Partial<User>) => {
    const response = await api.patch<ApiResponse<User>>("/profile", payload);
    return response.data;
  },
};
