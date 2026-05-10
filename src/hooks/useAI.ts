import { useMutation } from "@tanstack/react-query";
import { aiApi } from "@/lib/api-client";

export const useRecommendVehicle = () => {
  return useMutation({
    mutationFn: (data: {
      pickup: string;
      destination: string;
      passengers: number;
      purpose?: string;
      specialRequirements?: string;
    }) => aiApi.recommend(data),
  });
};
