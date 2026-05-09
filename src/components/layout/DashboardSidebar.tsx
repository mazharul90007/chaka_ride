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
  ShieldCheck,
  Navigation,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface DashboardSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({ isMobile, onClose }: DashboardSidebarProps) {
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
      { label: "Queries", href: "/admin/queries", icon: Navigation },
      { label: "Car Categories", href: "/admin/car-categories", icon: Car },
      { label: "Settings", href: "/profile", icon: Settings },
    ],
  }[role] || [];

  return (
    <motion.div
      animate={{ width: isMobile ? "100%" : (isCollapsed ? 80 : 280) }}
      className={`relative flex h-full flex-col border-r border-slate-200 bg-white transition-all z-50 ${isMobile ? "w-full" : ""}`}
    >
      <div className="flex h-[72px] items-center justify-between px-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-(--brand-primary)">CHAKA</span>
            <span className="text-slate-900 font-extrabold ml-1">RIDE</span>
          </span>
        </Link>
        
        {isMobile ? (
          <button onClick={onClose} className="p-2 rounded-lg bg-slate-50 text-slate-400">
            <X size={20} />
          </button>
        ) : (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex size-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors ml-auto"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={isMobile ? onClose : undefined}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                ? "bg-(--brand-primary) text-white shadow-md shadow-blue-900/10"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <item.icon className={`size-5 shrink-0 ${isActive ? "text-white" : "group-hover:text-slate-900"}`} />
              {(!isCollapsed || isMobile) && <span className="font-semibold text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-50">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-500 transition-all hover:bg-red-50 hover:text-red-600">
          <LogOut className="size-5 shrink-0" />
          {(!isCollapsed || isMobile) && <span className="font-semibold text-sm">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}
