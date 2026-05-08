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
  Clock
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
    <div className="p-6 lg:p-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-slate-900"
          >
            Driver Dashboard
          </motion.h1>
          <p className="mt-2 text-slate-500 font-medium">Manage your rides, earnings, and availability.</p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm border border-slate-100">
           <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
             ON
           </div>
           <span className="text-sm font-bold text-slate-700 pr-3">Online Mode</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className={`flex size-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Pending Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">New Requests</h2>
            <span className="flex size-6 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
              2
            </span>
          </div>
          
          <div className="space-y-6">
            {[1, 2].map((id) => (
              <div key={id} className="group relative flex flex-col gap-4 rounded-2xl border border-slate-50 bg-slate-50/50 p-6 transition-all hover:border-blue-100 hover:bg-blue-50/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-white flex items-center justify-center text-slate-400">
                      <Car className="size-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Airport Pick-up</p>
                      <p className="text-xs font-medium text-slate-500">14km • 35 mins away</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-slate-900">৳1,200</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="size-1.5 rounded-full bg-blue-500" />
                    <span>Hazrat Shahjalal International Airport</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="size-1.5 rounded-full bg-orange-500" />
                    <span>Dhanmondi, Road 27</span>
                  </div>
                </div>

                <div className="mt-2 flex gap-3">
                  <button className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95">
                    Accept Request
                  </button>
                  <button className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 active:scale-95">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl shadow-blue-200"
          >
            <h3 className="text-xl font-bold">Upcoming Schedule</h3>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <Calendar className="size-5" />
                <div>
                  <p className="text-sm font-bold">Tomorrow, 08:30 AM</p>
                  <p className="text-xs font-medium text-blue-100">Reserved Ride • Uttara</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 text-orange-600">
              <AlertCircle className="size-5" />
              <h3 className="font-bold">Maintenance Alert</h3>
            </div>
            <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">
              Your vehicle documents are expiring in <span className="text-slate-900 font-bold">12 days</span>. Please update them soon.
            </p>
            <button className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700">
              Update Documents
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
