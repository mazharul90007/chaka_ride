"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  CheckCircle2,
  XCircle,
  Truck
} from "lucide-react";
import { useAdminDrivers, useUpdateDriverStatus } from "@/hooks/useAdmin";

export default function AdminDriversPage() {
  const { data: driversData, isLoading } = useAdminDrivers();
  const updateStatus = useUpdateDriverStatus();

  const drivers = driversData?.data || [];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Truck className="size-5 md:size-6 text-(--brand-primary)" />
            Drivers Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">Verify and monitor driver profiles across the system.</p>
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
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Driver Details</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Vehicle Info</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</th>
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
              ) : drivers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-30">
                      <ShieldCheck className="size-12" />
                      <p className="font-bold">No drivers found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                drivers.map((driver: any) => (
                  <motion.tr 
                    key={driver.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 overflow-hidden border border-slate-200">
                          {driver.user.image ? <img src={driver.user.image} className="size-full object-cover" /> : driver.user.name?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{driver.user.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                            <Mail className="size-3" /> {driver.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="font-semibold text-slate-700">{driver.vehicleModel || "N/A"}</p>
                      <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight">{driver.vehicleType}</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="font-semibold text-slate-700">{driver.experienceYears || 0} Years</p>
                      <p className="text-[11px] text-slate-400 font-medium">LIC: {driver.licenseNumber || "N/A"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                        driver.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" :
                        driver.status === "REJECTED" ? "bg-rose-50 text-rose-600" :
                        "bg-amber-50 text-amber-600"
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {driver.status !== "APPROVED" && (
                          <button 
                            onClick={() => updateStatus.mutate({ id: driver.id, status: "APPROVED" })}
                            className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          >
                            <CheckCircle2 className="size-4" />
                          </button>
                        )}
                        {driver.status !== "REJECTED" && (
                          <button 
                            onClick={() => updateStatus.mutate({ id: driver.id, status: "REJECTED" })}
                            className="size-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                          >
                            <XCircle className="size-4" />
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
