import { useQuery } from "@tanstack/react-query";
import { queryApi } from "@/lib/api-client";

export const useMyQueries = () => {
  return useQuery({
    queryKey: ["myQueries"],
    queryFn: () => queryApi.getMyQueries(),
  });
};
