"use client";

import { useSession } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Car, 
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Activity,
  Plus,
  Sparkles,
  BrainCircuit
} from "lucide-react";
import { useAdminStats, useAdminDrivers, useUpdateDriverStatus } from "@/hooks/useAdmin";
import { aiApi } from "@/lib/api-client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const { data: statsData, isLoading: isStatsLoading } = useAdminStats();
  const { data: driversData, isLoading: isDriversLoading } = useAdminDrivers();
  const updateStatus = useUpdateDriverStatus();

  const [briefing, setBriefing] = useState<string>("");
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchBriefing = async () => {
    setIsBriefingLoading(true);
    try {
      const res = await aiApi.getBriefing();
      // Access res.data.briefing because of the global ResponseInterceptor
      const briefingText = res?.data?.briefing || res?.briefing || res?.message || "Welcome back! Platform is performing within normal parameters.";
      setBriefing(briefingText);
    } catch (err) {
      setBriefing("Good morning! The platform is running smoothly. Check your pending tasks to stay ahead.");
    } finally {
      setIsBriefingLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefing();
  }, []);
  
  const stats = [
    { 
      label: "Total Drivers", 
      value: statsData?.data?.totalDrivers || 0, 
      icon: ShieldCheck, 
      color: "text-blue-700", 
      bg: "bg-blue-50" 
    },
    { 
      label: "Total Passengers", 
      value: statsData?.data?.totalPassengers || 0, 
      icon: Users, 
      color: "text-indigo-700", 
      bg: "bg-indigo-50" 
    },
    { 
      label: "Total Cars", 
      value: statsData?.data?.totalCars || 0, 
      icon: Car, 
      color: "text-emerald-700", 
      bg: "bg-emerald-50" 
    },
    { 
      label: "Pending Verifications", 
      value: statsData?.data?.pendingDrivers || 0, 
      icon: Clock, 
      color: "text-amber-700", 
      bg: "bg-amber-50" 
    },
  ];

  const pendingDrivers = driversData?.data?.filter((d: any) => d.status === "PENDING") || [];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Activity className="size-5 md:size-6 text-(--brand-primary)" />
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Welcome, {session?.user?.name?.split(' ')[0] || "Admin"}. Tracking Chaka Ride stats.
          </p>
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
          <button className="h-10 px-4 rounded-lg bg-(--brand-primary) text-xs md:text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-sm whitespace-nowrap">
            <span className="hidden sm:inline">Generate Reports</span>
            <span className="sm:hidden flex items-center gap-1"><Plus size={14}/> Report</span>
          </button>
        </div>
      </header>


      {/* AI Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => {
            setIsDrawerOpen(true);
            if (!briefing) fetchBriefing();
          }}
          className="group relative flex size-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-110 hover:rotate-12 active:scale-95"
        >
          <Sparkles className={`size-6 ${isBriefingLoading ? 'animate-pulse' : ''}`} />
          <div className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-xl animate-in fade-in slide-in-from-right-2">
            ✨ Get AI Briefing
          </div>
        </button>
      </div>

      {/* AI Briefing Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="size-6" />
                  <div>
                    <h3 className="text-base font-bold">AI Platform Assistant</h3>
                    <p className="text-[10px] text-blue-100 font-medium">Smart Morning Briefing</p>
                  </div>
                </div>
                <button onClick={() => setIsDrawerOpen(false)} className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <XCircle className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {isBriefingLoading ? (
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse" />
                    <div className="h-4 w-3/4 bg-slate-100 rounded-full animate-pulse" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded-full animate-pulse" />
                    <div className="pt-8 flex justify-center">
                      <div className="size-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                    </div>
                    <p className="text-center text-xs font-bold text-slate-400 mt-4">AI is analyzing your platform data...</p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative">
                      <div className="absolute -left-2 top-0 h-full w-1 bg-blue-600 rounded-full" />
                      <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium pl-4">
                        {briefing}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                        <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1">
                          <CheckCircle2 className="size-3" /> Healthy
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Uptime</p>
                        <p className="text-xs font-bold text-blue-600 mt-1">99.99%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <button 
                  onClick={() => fetchBriefing()}
                  disabled={isBriefingLoading}
                  className="w-full h-11 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  <Clock className="size-4" />
                  Refresh Briefing
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="size-3" /> 8%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="mt-1 text-xl md:text-2xl font-bold text-slate-900">
                {isStatsLoading ? "..." : stat.value.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
        {/* Verification Queue */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">Pending Verifications</h2>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full uppercase">
              {pendingDrivers.length} Pending
            </span>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Driver</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Vehicle</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {isDriversLoading ? (
                    <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-sm">Loading...</td></tr>
                  ) : pendingDrivers.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-16 text-center text-slate-400 font-medium">No pending requests.</td></tr>
                  ) : (
                    pendingDrivers.map((driver: any) => (
                      <motion.tr 
                        key={driver.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-5 md:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="size-8 md:size-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 overflow-hidden border border-slate-200">
                              {driver.user.image ? <img src={driver.user.image} className="size-full object-cover" /> : driver.user.name?.[0]}
                            </div>
                            <div>
                              <p className="text-xs md:text-sm font-bold text-slate-900">{driver.user.name}</p>
                              <p className="text-[10px] font-medium text-slate-400 truncate max-w-[120px]">{driver.user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 md:px-6 py-4">
                          <p className="text-xs md:text-sm font-semibold text-slate-700">{driver.vehicleModel || "Standard"}</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase">{driver.vehicleType}</p>
                        </td>
                        <td className="px-5 md:px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-0.5 text-[9px] md:text-[10px] font-bold text-amber-600 uppercase">
                            PENDING
                          </span>
                        </td>
                        <td className="px-5 md:px-6 py-4">
                          <div className="flex items-center justify-end gap-1.5 md:gap-2">
                            <button 
                              onClick={() => updateStatus.mutate({ id: driver.id, status: "APPROVED" })}
                              className="size-7 md:size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                            >
                              <CheckCircle2 className="size-3.5 md:size-4" />
                            </button>
                            <button 
                              onClick={() => updateStatus.mutate({ id: driver.id, status: "REJECTED" })}
                              className="size-7 md:size-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                            >
                              <XCircle className="size-3.5 md:size-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-4 md:space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Platform Health</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Service Uptime</span>
                  <span className="text-emerald-500">99.9%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[99%] rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500">Query Response</span>
                  <span className="text-blue-500">Fast</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[75%] rounded-full bg-blue-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-(--brand-primary) p-5 md:p-6 text-white shadow-lg shadow-blue-900/20">
            <h3 className="font-bold text-sm">System Update</h3>
            <p className="text-[11px] md:text-xs text-blue-100 mt-2 leading-relaxed">
              New analytics engine is now active. Check the reports section for deeper insights.
            </p>
            <button className="mt-4 w-full h-8 md:h-9 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] md:text-xs font-bold transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
