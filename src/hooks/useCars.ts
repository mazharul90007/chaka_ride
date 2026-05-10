import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carApi } from "@/lib/api-client";
import { toast } from "sonner";
import { Car } from "@/types";

export const useGetAllCars = () => {
  return useQuery({
    queryKey: ["allCars"],
    queryFn: () => carApi.getAll(),
  });
};

export const useGetMyCars = () => {
  return useQuery({
    queryKey: ["myCars"],
    queryFn: () => carApi.getMyCars(),
  });
};

export const useGetCar = (id: string) => {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => carApi.getOne(id),
    enabled: !!id,
  });
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => carApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["myCars"] });
      queryClient.invalidateQueries({ queryKey: ["allCars"] });
      toast.success(response.message || "Car added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add car");
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => carApi.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["myCars"] });
      queryClient.invalidateQueries({ queryKey: ["allCars"] });
      queryClient.invalidateQueries({ queryKey: ["car", response.data?.id] });
      toast.success(response.message || "Car updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update car");
    },
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => carApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myCars"] });
      queryClient.invalidateQueries({ queryKey: ["allCars"] });
      toast.success("Car deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete car");
    },
  });
};
