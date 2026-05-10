"use client";

import { useTranslations } from "next-intl";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { 
  Car, 
  Wallet, 
  Star, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowUpRight,
  RefreshCw,
  XCircle
} from "lucide-react";
import { useDriverTrips, useRespondTripRequest } from "@/hooks/useTrip";
import { useGetMyCars } from "@/hooks/useCars";
import { toast } from "sonner";

export default function DriverDashboard() {
  const { data: tripsData, isLoading, refetch } = useDriverTrips();
  const { data: myCarsData } = useGetMyCars();
  const respondRequest = useRespondTripRequest();
  const { data: session } = useSession();
  
  const requests = tripsData?.data?.requests || [];
  const finalized = tripsData?.data?.finalized || [];

  const myCars = myCarsData?.data || [];

  // Calculate real stats
  const totalEarnings = finalized.reduce((sum: number, trip: any) => sum + (trip.finalPrice || 0), 0);
  const completedRides = finalized.filter((t: any) => t.status === "COMPLETED").length;
  const pendingCount = requests.filter((r: any) => r.status === "PENDING").length;

  const stats = [
    { label: "Total Earnings", value: `৳${totalEarnings.toLocaleString()}`, icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Completed Rides", value: completedRides.toString(), icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Total Cars", value: myCars.length.toString(), icon: Car, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Pending Requests", value: pendingCount.toString(), icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  // Calculate Monthly Earnings for Chart (Last 6 months)
  const monthlyEarnings = new Array(6).fill(0).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return {
      month: d.toLocaleString('default', { month: 'short' }),
      year: d.getFullYear(),
      earnings: 0,
      numericMonth: d.getMonth(),
      numericYear: d.getFullYear(),
    };
  }).reverse();

  finalized.forEach((trip: any) => {
    if (!trip.finalPrice) return;
    const tripDate = new Date(trip.updatedAt);
    const match = monthlyEarnings.find(m => m.numericMonth === tripDate.getMonth() && m.numericYear === tripDate.getFullYear());
    if (match) {
      match.earnings += trip.finalPrice;
    }
  });

  const maxEarnings = Math.max(...monthlyEarnings.map(m => m.earnings), 100);

  const handleQuickAction = async (requestId: string, action: "ACCEPTED" | "REJECTED") => {
    try {
      if (action === "ACCEPTED") {
        // For dashboard quick accept, we use requested price or 0
        const req = requests.find((r: any) => r.id === requestId);
        await respondRequest.mutateAsync({
          requestId,
          action: "ACCEPTED",
          offeredPrice: req?.trip?.requestedPrice || 0,
        });
        toast.success("Offer sent to Admin!");
      } else {
        await respondRequest.mutateAsync({ requestId, action: "REJECTED" });
        toast.success("Request declined");
      }
      refetch();
    } catch (error) {
      toast.error("Action failed");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Car className="size-5 md:size-6 text-(--brand-primary)" />
            Driver Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Manage your rides, earnings, and availability.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* A more professional "Online" switch style */}
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 shadow-sm">
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Online</span>
          </div>
          <button className="h-10 px-4 rounded-lg bg-(--brand-primary) text-xs md:text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-sm whitespace-nowrap flex items-center gap-2">
            <RefreshCw className="size-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className={`flex size-10 md:size-12 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="size-5 md:size-6" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md ${stat.label === "Driver Rating" ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50"}`}>
                <ArrowUpRight className="size-3" /> {stat.label === "Driver Rating" ? "0.2" : "12%"}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="mt-1 text-xl md:text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
        {/* Pending Requests */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">New Requests</h2>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full uppercase">
              {pendingCount} Pending
            </span>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Ride Info</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Route</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Fare</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500">
                      No pending requests at the moment.
                    </td>
                  </tr>
                ) : (
                  requests.slice(0, 5).map((req: any) => (
                    <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 md:size-10 rounded-lg bg-blue-50 flex items-center justify-center font-bold text-blue-600">
                            <Car className="size-4 md:size-5" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-bold text-slate-900">{req.trip.tripType.replace('_', ' ')}</p>
                            <p className="text-[10px] font-medium text-slate-400">{req.trip.carCategory.categoryName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 md:px-6 py-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-600 font-medium">
                          <div className="size-1.5 rounded-full bg-blue-500" />
                          <span className="truncate max-w-[150px]">{req.trip.pickupLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-600 font-medium">
                          <div className="size-1.5 rounded-full bg-orange-500" />
                          <span className="truncate max-w-[150px]">{req.trip.destination}</span>
                        </div>
                      </td>
                      <td className="px-5 md:px-6 py-4 text-right">
                        <p className="text-sm font-bold text-slate-900">৳{req.trip.requestedPrice || 'Open'}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{req.trip.pickupDate}</p>
                      </td>
                      <td className="px-5 md:px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5 md:gap-2">
                          {req.status === 'PENDING' ? (
                            <>
                              <button 
                                onClick={() => handleQuickAction(req.id, "ACCEPTED")}
                                className="size-7 md:size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm cursor-pointer"
                              >
                                <CheckCircle2 className="size-3.5 md:size-4" />
                              </button>
                              <button 
                                onClick={() => handleQuickAction(req.id, "REJECTED")}
                                className="size-7 md:size-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm cursor-pointer"
                              >
                                <XCircle className="size-3.5 md:size-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">BID SENT</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Info / Chart */}
        <div className="space-y-4 md:space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm flex flex-col h-full min-h-[300px]">
            <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight mb-6">Earnings Overview</h3>
            
            <div className="flex-1 flex items-end gap-2 sm:gap-4 mt-4 h-48 w-full">
              {monthlyEarnings.map((data, idx) => {
                const heightPercent = maxEarnings > 0 ? (data.earnings / maxEarnings) * 100 : 0;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end group h-full">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-2 rounded absolute -mt-8 pointer-events-none whitespace-nowrap z-10">
                      ৳{data.earnings.toLocaleString()}
                    </div>
                    {/* Bar */}
                    <div className="w-full relative flex justify-center h-full items-end">
                      <div 
                        className="w-full max-w-[40px] bg-emerald-500 rounded-t-sm transition-all duration-500 ease-out hover:bg-emerald-600"
                        style={{ height: `${Math.max(heightPercent, 2)}%` }} // min 2% height for visibility
                      />
                    </div>
                    {/* Label */}
                    <p className="text-[10px] text-slate-500 font-medium mt-2">{data.month}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
