"use client";

import { useDriverTrips } from "@/hooks/useTrip";
import { motion } from "framer-motion";
import { 
  Wallet, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Car,
  Download
} from "lucide-react";

export default function DriverEarningsPage() {
  const { data: tripsData, isLoading } = useDriverTrips();
  const finalized = tripsData?.data?.finalized || [];

  // Calculate stats
  const totalEarned = finalized
    .filter((t: any) => t.status === "COMPLETED")
    .reduce((sum: number, trip: any) => sum + (trip.finalPrice || 0), 0);
    
  const pendingClearance = finalized
    .filter((t: any) => t.status === "ASSIGNED")
    .reduce((sum: number, trip: any) => sum + (trip.finalPrice || 0), 0);

  // Calculate Monthly Earnings for Chart (Last 6 months)
  const monthlyEarnings = new Array(6).fill(0).map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return {
      month: d.toLocaleString('default', { month: 'short', year: 'numeric' }),
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

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Wallet className="size-5 md:size-6 text-emerald-600" />
            Earnings Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Track your revenue, pending payments, and transaction history.
          </p>
        </div>
        
        <button className="h-10 px-4 rounded-lg bg-emerald-600 text-xs md:text-sm font-semibold text-white transition-all hover:bg-emerald-700 active:scale-95 shadow-sm whitespace-nowrap flex items-center gap-2">
          <Download className="size-4" />
          <span className="hidden sm:inline">Download Report</span>
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-10 md:size-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <Wallet className="size-5 md:size-6" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md text-emerald-600 bg-emerald-50">
              <ArrowUpRight className="size-3" /> Available Now
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Total Earned</p>
            <p className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">৳{totalEarned.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-10 md:size-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Clock className="size-5 md:size-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Clearance</p>
            <p className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">৳{pendingClearance.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-10 md:size-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <CheckCircle2 className="size-5 md:size-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Trips</p>
            <p className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">{finalized.filter((t: any) => t.status === "COMPLETED").length}</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Chart */}
        <div className="lg:col-span-3 rounded-xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm flex flex-col h-full min-h-[350px]">
          <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight mb-8">Revenue History (6 Months)</h3>
          
          <div className="flex-1 flex items-end gap-2 sm:gap-6 mt-4 h-64 w-full border-b border-slate-100 pb-2">
            {monthlyEarnings.map((data, idx) => {
              const heightPercent = maxEarnings > 0 ? (data.earnings / maxEarnings) * 100 : 0;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end group h-full">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-3 rounded absolute -mt-10 pointer-events-none whitespace-nowrap z-10 shadow-lg font-bold">
                    ৳{data.earnings.toLocaleString()}
                  </div>
                  {/* Bar */}
                  <div className="w-full relative flex justify-center h-full items-end">
                    <div 
                      className="w-full max-w-[60px] bg-emerald-500 rounded-t-md transition-all duration-500 ease-out hover:bg-emerald-600"
                      style={{ height: `${Math.max(heightPercent, 2)}%` }}
                    />
                  </div>
                  {/* Label */}
                  <p className="text-xs text-slate-500 font-bold mt-4">{data.month}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-3 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-5 md:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date</th>
                  <th className="px-5 md:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Trip Detail</th>
                  <th className="px-5 md:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-5 md:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading transactions...</td></tr>
                ) : finalized.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-500">No earnings recorded yet.</td></tr>
                ) : (
                  finalized.map((trip: any) => (
                    <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 md:px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{new Date(trip.updatedAt).toLocaleDateString()}</p>
                        <p className="text-[10px] text-slate-500">{new Date(trip.updatedAt).toLocaleTimeString()}</p>
                      </td>
                      <td className="px-5 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`size-8 rounded-lg flex items-center justify-center ${trip.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            <Car className="size-4" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm font-bold text-slate-900">{trip.pickupLocation} → {trip.destination}</p>
                            <p className="text-[10px] text-slate-500">{trip.passenger?.name || trip.fullName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 md:px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${trip.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {trip.status === 'COMPLETED' ? 'PAID' : 'PENDING'}
                        </span>
                      </td>
                      <td className="px-5 md:px-6 py-4 text-right">
                        <p className={`text-sm font-bold ${trip.status === 'COMPLETED' ? 'text-emerald-600' : 'text-slate-900'}`}>
                          {trip.status === 'COMPLETED' ? '+' : ''}৳{trip.finalPrice || 0}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
