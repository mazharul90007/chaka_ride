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
import { Link } from "@/i18n/navigation";

export default function DriverDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  const stats = [
    { label: "Today's Earnings", value: "৳2,400", icon: Wallet, color: "text-green-600", bg: "bg-green-100" },
    { label: "Completed Rides", value: "156", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Driver Rating", value: "4.8", icon: Star, color: "text-yellow-600", bg: "bg-yellow-100" },
  ];

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
              2 Pending
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
                {[1, 2].map((id) => (
                  <tr key={id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 md:size-10 rounded-lg bg-blue-50 flex items-center justify-center font-bold text-blue-600">
                          <Car className="size-4 md:size-5" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-bold text-slate-900">Airport Pick-up</p>
                          <p className="text-[10px] font-medium text-slate-400">14km • 35 mins away</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-4 space-y-1.5">
                      <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-600 font-medium">
                        <div className="size-1.5 rounded-full bg-blue-500" />
                        <span className="truncate max-w-[150px]">Hazrat Shahjalal Airport</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-600 font-medium">
                        <div className="size-1.5 rounded-full bg-orange-500" />
                        <span className="truncate max-w-[150px]">Dhanmondi, Road 27</span>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-4 text-right">
                      <p className="text-sm font-bold text-slate-900">৳1,200</p>
                    </td>
                    <td className="px-5 md:px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5 md:gap-2">
                        <button className="size-7 md:size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                          <CheckCircle2 className="size-3.5 md:size-4" />
                        </button>
                        <button className="size-7 md:size-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                          <XCircle className="size-3.5 md:size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4 md:space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertCircle className="size-5" />
              <h3 className="text-sm font-bold">Maintenance Alert</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Your vehicle documents are expiring in <span className="text-slate-900 font-bold">12 days</span>. Please update them to avoid service disruption.
            </p>
            <button className="mt-4 w-full h-8 md:h-9 rounded-lg bg-amber-50 hover:bg-amber-100 text-[10px] md:text-xs font-bold text-amber-700 transition-all border border-amber-200">
              Update Documents
            </button>
          </div>

          <div className="rounded-xl bg-(--brand-primary) p-5 md:p-6 text-white shadow-lg shadow-blue-900/20">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Calendar className="size-4" />
              Upcoming Schedule
            </h3>
            <div className="mt-4 rounded-lg bg-white/10 p-3 backdrop-blur-sm border border-white/10">
              <p className="text-xs font-bold">Tomorrow, 08:30 AM</p>
              <p className="text-[10px] mt-1 text-blue-100">Reserved Ride • Uttara</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
