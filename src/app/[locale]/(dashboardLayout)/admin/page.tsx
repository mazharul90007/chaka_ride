"use client";

import { useTranslations } from "next-intl";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { 
  Users, 
  Car, 
  TrendingUp, 
  AlertCircle,
  FileText,
  ShieldCheck,
  MoreVertical,
  Search
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  const stats = [
    { label: "Active Users", value: "1,284", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Total Drivers", value: "452", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Revenue", value: "৳452,000", icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
    { label: "Active Trips", value: "84", icon: Car, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="p-6 lg:p-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-slate-900"
          >
            System Overview
          </motion.h1>
          <p className="mt-2 text-slate-500 font-medium">Monitoring Chaka Ride platform performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
          <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800">
            Export Report
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className={`flex size-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color} mb-4`}>
              <stat.icon className="size-6" />
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Verification Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Driver Verification Queue</h2>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Driver</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Vehicle</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3].map((id) => (
                  <tr key={id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                          {id === 1 ? "MA" : id === 2 ? "RK" : "SH"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Driver Name {id}</p>
                          <p className="text-xs font-medium text-slate-500">Joined 2h ago</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-medium text-slate-700">Toyota Noah</p>
                      <p className="text-xs text-slate-400 font-medium">Dhaka Metro-GA-1234</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600">
                        Pending
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 transition-colors">
                        <MoreVertical className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Notifications/Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="flex gap-4">
                <div className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-full ${
                  id % 2 === 0 ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                }`}>
                  {id % 2 === 0 ? <FileText className="size-4" /> : <ShieldCheck className="size-4" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {id % 2 === 0 ? "System report generated" : "New driver verified"}
                  </p>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
