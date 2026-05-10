import { useMutation } from "@tanstack/react-query";
import { aiApi } from "@/lib/api-client";

export const useAIEstimate = () => {
  return useMutation({
    mutationFn: async (data: Parameters<typeof aiApi.estimatePrice>[0]) => {
      const response = await aiApi.estimatePrice(data);
      if (response.error) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};
