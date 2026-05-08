import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api-client";
import { toast } from "sonner";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: () => adminApi.getStats(),
  });
};

export const useAdminDrivers = () => {
  return useQuery({
    queryKey: ["admin", "drivers"],
    queryFn: () => adminApi.getDrivers(),
  });
};

export const useAdminPassengers = () => {
  return useQuery({
    queryKey: ["admin", "passengers"],
    queryFn: () => adminApi.getPassengers(),
  });
};

export const useAdminQueries = () => {
  return useQuery({
    queryKey: ["admin", "queries"],
    queryFn: () => adminApi.getQueries(),
  });
};

export const useUpdateDriverStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.updateDriverStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "drivers"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      toast.success("Driver status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
};

export const useUpdateQueryStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminApi.updateQueryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "queries"] });
      toast.success("Ride status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update status");
    },
  });
};
