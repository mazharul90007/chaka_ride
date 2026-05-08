"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useSession } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Car,
  Users,
  MapPin,
  Wallet,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const user = session?.user as any;
  const role = (user?.role?.toLowerCase() || "passenger") as "passenger" | "driver" | "admin";

  const menuItems = {
    passenger: [
      { label: "Overview", href: "/passenger", icon: LayoutDashboard },
      { label: "My Rides", href: "/passenger/rides", icon: Car },
      { label: "Payments", href: "/passenger/payments", icon: Wallet },
      { label: "Profile", href: "/profile", icon: Settings },
    ],
    driver: [
      { label: "Dashboard", href: "/driver", icon: LayoutDashboard },
      { label: "Trip Requests", href: "/driver/requests", icon: MapPin },
      { label: "Earnings", href: "/driver/earnings", icon: Wallet },
      { label: "My Car", href: "/driver/car", icon: Car },
      { label: "Settings", href: "/profile", icon: Settings },
    ],
    admin: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Drivers", href: "/admin/drivers", icon: ShieldCheck },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Rides", href: "/admin/rides", icon: Car },
      { label: "Settings", href: "/profile", icon: Settings },
    ],
  }[role] || [];

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="relative flex h-screen flex-col border-r border-slate-200 bg-white transition-all"
    >
      <div className="flex h-[72px] items-center justify-between px-6 border-b border-slate-50">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-(--brand-primary)">CHAKA</span>
              <span className="text-slate-900 font-black italic">DASH</span>
            </span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex size-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all ${isActive
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <item.icon className={`size-5 shrink-0 ${isActive ? "text-white" : "group-hover:text-slate-900"}`} />
              {!isCollapsed && <span className="font-bold text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-slate-500 transition-all hover:bg-red-50 hover:text-red-600">
          <LogOut className="size-5 shrink-0" />
          {!isCollapsed && <span className="font-bold text-sm">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}
