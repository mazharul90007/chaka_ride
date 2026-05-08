"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar,
  Car,
  CheckCircle2,
  MessageSquare,
  Navigation,
  Smartphone
} from "lucide-react";
import { useAdminQueries, useUpdateQueryStatus } from "@/hooks/useAdmin";

export default function AdminRidesPage() {
  const { data: queriesData, isLoading } = useAdminQueries();
  const updateStatus = useUpdateQueryStatus();

  const queries = queriesData?.data || [];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Navigation className="size-5 md:size-6 text-(--brand-primary)" />
            Rides & Queries
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">Track and manage customer ride requests and bookings.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="h-10 w-full sm:w-48 md:w-60 rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10"
            />
          </div>
          <button className="h-10 px-4 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 flex items-center gap-2">
            <Filter className="size-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </header>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer Info</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Route</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Trip Details</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-300">Loading...</td>
                  </tr>
                ))
              ) : queries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-30">
                      <Navigation className="size-12" />
                      <p className="font-bold">No ride requests found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                queries.map((query: any) => (
                  <motion.tr 
                    key={query.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100">
                          {query.fullName?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{query.fullName}</p>
                          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                            <Smartphone className="size-3" /> {query.whatsAppNumber}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-[11px] font-semibold text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-3 text-emerald-500" /> {query.pickupLocation}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-3 text-rose-500" /> {query.destination}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Calendar className="size-3.5 text-slate-400" /> {query.pickupDate}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-tight">
                          <Car className="size-3.5 text-slate-400" /> {query.carCategory?.categoryName || "Standard"} • {query.tripType}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                        query.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600" :
                        query.status === "CONTACTED" ? "bg-blue-50 text-blue-600" :
                        query.status === "CANCELLED" ? "bg-slate-100 text-slate-500" :
                        "bg-amber-50 text-amber-600"
                      }`}>
                        {query.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {query.status === "PENDING" && (
                          <button 
                            onClick={() => updateStatus.mutate({ id: query.id, status: "CONTACTED" })}
                            className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            title="Mark Contacted"
                          >
                            <MessageSquare className="size-4" />
                          </button>
                        )}
                        {query.status !== "COMPLETED" && (
                          <button 
                            onClick={() => updateStatus.mutate({ id: query.id, status: "COMPLETED" })}
                            className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                            title="Complete"
                          >
                            <CheckCircle2 className="size-4" />
                          </button>
                        )}
                        <button className="size-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                          <MoreVertical className="size-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
