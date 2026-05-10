import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api as axiosInstance } from "@/lib/axiosInstance";

// Admin: Get all trips
export const useAdminTrips = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
  return useQuery({
    queryKey: ["adminTrips", params],
    queryFn: async () => {
      const response = await axiosInstance.get("/trip/admin", { params });
      return response.data;
    },
  });
};

// Admin: Create Trip
export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tripData: any) => {
      const response = await axiosInstance.post("/trip", tripData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminTrips"] });
    },
  });
};

// Admin: Approve Driver Bid
export const useApproveDriverBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ tripId, requestId }: { tripId: string; requestId: string }) => {
      const response = await axiosInstance.patch(`/trip/${tripId}/approve-driver/${requestId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminTrips"] });
    },
  });
};

// Admin: Reject Driver Bid
export const useRejectDriverBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ tripId, requestId }: { tripId: string; requestId: string }) => {
      const response = await axiosInstance.patch(`/trip/${tripId}/reject-bid/${requestId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminTrips"] });
    },
  });
};

// Driver: Get assigned trips
export const useDriverTrips = () => {
  return useQuery({
    queryKey: ["driverTrips"],
    queryFn: async () => {
      const response = await axiosInstance.get("/trip/driver");
      return response.data;
    },
  });
};

// Driver: Respond to Trip Request
export const useRespondTripRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ requestId, action, offeredPrice }: { requestId: string; action: string; offeredPrice?: number }) => {
      const response = await axiosInstance.patch(`/trip/request/${requestId}/respond`, {
        action,
        offeredPrice,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["driverTrips"] });
    },
  });
};

// Passenger: Get their trips
export const usePassengerTrips = () => {
  return useQuery({
    queryKey: ["passengerTrips"],
    queryFn: async () => {
      const response = await axiosInstance.get("/trip/passenger");
      return response.data;
    },
  });
};
