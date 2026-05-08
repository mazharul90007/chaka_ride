"use client";

import { useTranslations } from "next-intl";
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { 
  Car, 
  Clock, 
  MapPin, 
  Star, 
  TrendingUp, 
  Wallet,
  ArrowRight
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function PassengerDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  const stats = [
    { label: "Total Rides", value: "12", icon: Car, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Spent", value: "৳4,500", icon: Wallet, color: "text-green-600", bg: "bg-green-100" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-yellow-600", bg: "bg-yellow-100" },
  ];

  return (
    <div className="p-6 lg:p-10">
      <header className="mb-10">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-slate-900"
        >
          Welcome back, {user?.name.split(" ")[0] || "Passenger"}! 👋
        </motion.h1>
        <p className="mt-2 text-slate-500 font-medium">Here's what's happening with your rides today.</p>
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

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Rides</h2>
            <Link href="/passenger/rides" className="text-sm font-bold text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          
          <div className="space-y-6">
            {[1, 2].map((id) => (
              <div key={id} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100">
                <div className="flex size-10 items-center justify-center rounded-full bg-white text-slate-400">
                  <Clock className="size-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900">Dhaka to Sylhet</p>
                    <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 font-medium">May 12, 2024 • Toyota Noah</p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <MapPin className="size-3" />
                    <span>Dhanmondi 27 → Zindabazar, Sylhet</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="flex-1 rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold">Need a ride?</h3>
            <p className="mt-2 text-slate-400 font-medium">Book a car in minutes with vetted drivers and transparent pricing.</p>
            <Link
              href="/"
              className="mt-8 group flex w-fit items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:bg-slate-100 active:scale-95"
            >
              Book Now
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex-1 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Your Savings</h3>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <TrendingUp className="size-6" />
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                You've saved <span className="font-bold text-slate-900">৳1,200</span> this month compared to local rentals.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
