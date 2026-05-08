import { useQuery } from "@tanstack/react-query";
import { carApi } from "@/lib/api-client";

export const useGetCars = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["cars", params],
    queryFn: () => carApi.getAll(params),
  });
};

export const useGetCar = (id: string) => {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => carApi.getOne(id),
    enabled: !!id,
  });
};
