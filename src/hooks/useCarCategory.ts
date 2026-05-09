import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { carCategoryApi, CarCategory } from "@/lib/api-client";
import { toast } from "sonner";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["carCategories"],
    queryFn: () => carCategoryApi.getAll(),
  });
};

export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ["carCategory", id],
    queryFn: () => carCategoryApi.getOne(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => carCategoryApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["carCategories"] });
      toast.success(response.message || "Car category created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create car category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => carCategoryApi.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["carCategories"] });
      queryClient.invalidateQueries({ queryKey: ["carCategory", response.data?.id] });
      toast.success(response.message || "Car category updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update car category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => carCategoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carCategories"] });
      toast.success("Car category deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete car category");
    },
  });
};
