"use client";

import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { 
  Car, 
  Wallet, 
  Star, 
  TrendingUp, 
  Activity,
  Search,
  Plus,
  ArrowUpRight,
  Clock,
  MapPin,
  ArrowRight,
  Zap
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function PassengerDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  const stats = [
    { 
      label: "Total Rides", 
      value: "12", 
      icon: Car, 
      color: "text-blue-700", 
      bg: "bg-blue-50",
      trend: "12%",
      trendUp: true
    },
    { 
      label: "Total Spent", 
      value: "৳4,500", 
      icon: Wallet, 
      color: "text-emerald-700", 
      bg: "bg-emerald-50",
      trend: "8%",
      trendUp: false
    },
    { 
      label: "Avg Rating", 
      value: "4.9", 
      icon: Star, 
      color: "text-amber-700", 
      bg: "bg-amber-50",
      trend: "0.1",
      trendUp: true
    },
    { 
      label: "Total Savings", 
      value: "৳1,200", 
      icon: TrendingUp, 
      color: "text-indigo-700", 
      bg: "bg-indigo-50",
      trend: "15%",
      trendUp: true
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Activity className="size-5 md:size-6 text-(--brand-primary)" />
            Passenger Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Welcome back, {user?.name?.split(' ')[0] || "Passenger"}. Here's your ride summary.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Find a ride..." 
              className="h-10 w-full sm:w-48 md:w-60 rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10"
            />
          </div>
          <Link 
            href="/"
            className="h-10 px-4 rounded-lg bg-(--brand-primary) text-xs md:text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-sm whitespace-nowrap flex items-center gap-2"
          >
            <Plus size={16}/> 
            <span className="hidden sm:inline">Book New Ride</span>
            <span className="sm:hidden">Book</span>
          </Link>
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
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md ${stat.trendUp ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50"}`}>
                <ArrowUpRight className={`size-3 ${!stat.trendUp && "rotate-90"}`} /> {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="mt-1 text-xl md:text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
        {/* Recent Rides Table */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">Recent Rides</h2>
            <Link href="/passenger/rides" className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase hover:bg-(--brand-primary) hover:text-white transition-colors">
              View All Rides
            </Link>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Ride Details</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Route</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Fare</th>
                  <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 1, type: "Toyota Noah", date: "May 12, 2024", from: "Dhanmondi 27", to: "Zindabazar, Sylhet", fare: "৳8,500", status: "COMPLETED" },
                  { id: 2, type: "Premium Sedan", date: "May 10, 2024", from: "Banani", to: "Hazrat Shahjalal Airport", fare: "৳1,200", status: "COMPLETED" },
                  { id: 3, type: "Toyota Hiace", date: "May 08, 2024", from: "Uttara", to: "Cox's Bazar", fare: "৳15,000", status: "COMPLETED" },
                ].map((ride) => (
                  <tr key={ride.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 md:size-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 overflow-hidden border border-slate-200">
                          <Car className="size-4 md:size-5" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-bold text-slate-900">{ride.type}</p>
                          <p className="text-[10px] font-medium text-slate-400">{ride.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                          <MapPin className="size-3 text-blue-500" /> {ride.from}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                          <div className="size-3 flex items-center justify-center">
                            <div className="w-0.5 h-2 bg-slate-200" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                          <MapPin className="size-3 text-(--brand-primary)" /> {ride.to}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 md:px-6 py-4">
                      <p className="text-xs md:text-sm font-bold text-slate-900">{ride.fare}</p>
                    </td>
                    <td className="px-5 md:px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] md:text-[10px] font-bold text-emerald-600 uppercase">
                        {ride.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 md:space-y-6">
          {/* Quick Action Card */}
          <div className="rounded-xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 size-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            <h3 className="text-base font-bold flex items-center gap-2">
              <Zap className="size-4 text-yellow-400" />
              Need a Ride?
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Book a premium car in minutes with our top-rated drivers.
            </p>
            <Link 
              href="/"
              className="mt-5 w-full h-10 rounded-lg bg-white text-slate-900 flex items-center justify-center text-xs font-bold transition-all hover:bg-slate-100 active:scale-95 gap-2"
            >
              Book Now
              <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Promotion/Health Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Refer & Earn</h3>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                <p className="text-[11px] font-medium text-indigo-700 leading-relaxed">
                  Invite your friends to Chaka Ride and get <span className="font-bold">৳500 off</span> on your next inter-city trip.
                </p>
              </div>
              <button className="w-full h-9 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                Share Referral Link
              </button>
            </div>
          </div>

          {/* Support Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                <Clock className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">24/7 Support</p>
                <p className="text-[10px] text-slate-400">We're here to help</p>
              </div>
            </div>
            <Link href="/contact" className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-(--brand-primary) hover:border-(--brand-primary) transition-all">
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
