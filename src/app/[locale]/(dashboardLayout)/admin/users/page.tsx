"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  UserCheck,
  UserMinus,
  MailCheck,
  CalendarDays
} from "lucide-react";
import { useAdminPassengers } from "@/hooks/useAdmin";

export default function AdminUsersPage() {
  const { data: passengersData, isLoading } = useAdminPassengers();

  const passengers = passengersData?.data || [];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="size-5 md:size-6 text-(--brand-primary)" />
            Passenger Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">Manage and view details of all registered passengers.</p>
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
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">User Profile</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Details</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">Type</th>
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
              ) : passengers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-30">
                      <Users className="size-12" />
                      <p className="font-bold">No passengers found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                passengers.map((passenger: any) => (
                  <motion.tr 
                    key={passenger.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-indigo-600 overflow-hidden border border-indigo-100">
                          {passenger.user.image ? <img src={passenger.user.image} className="size-full object-cover" /> : passenger.user.name?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{passenger.user.name}</p>
                          <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                            <CalendarDays className="size-3" /> Joined recently
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                        <Mail className="size-3.5 text-slate-400" /> {passenger.user.email}
                      </p>
                      {passenger.user.emailVerified && (
                        <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mt-1 uppercase tracking-tight">
                          <MailCheck className="size-3" /> Verified
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-tight">
                        Passenger
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="size-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <UserCheck className="size-4" />
                        </button>
                        <button className="size-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                          <UserMinus className="size-4" />
                        </button>
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
