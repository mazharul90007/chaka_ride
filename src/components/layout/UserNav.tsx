"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import {
  User,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronDown,
  UserCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";

export default function UserNav() {
  const t = useTranslations("Nav");
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) {
    return <div className="h-10 w-24 animate-pulse rounded-full bg-slate-200"></div>;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Button
          component={Link}
          href="/login"
          variant="contained"
          className="rounded-full !bg-(--brand-primary) hover:!bg-(--brand-primary-hover) px-6 py-2.5 text-sm font-bold text-white transition-all shadow-md shadow-blue-900/10 normal-case"
        >
          {t("login")}
        </Button>
      </div>
    );
  }

  const user = session.user as any;
  const role = user.role?.toLowerCase() || "passenger";
  const dashboardHref = `/${role}`;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 transition-all hover:border-slate-300 hover:shadow-sm"
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 overflow-hidden">
          {user.image ? (
            <Image src={user.image} alt={user.name} width={32} height={32} />
          ) : (
            <User className="size-5" />
          )}
        </div>
        <span className="hidden text-sm font-bold text-slate-700 sm:block">
          {user.name.split(" ")[0]}
        </span>
        <ChevronDown className={`size-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
          >
            <div className="px-3 py-2 border-b border-slate-100 mb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("dashboard")}</p>
              <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
            </div>

            <Link
              href={dashboardHref}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-(--brand-primary)"
            >
              <LayoutDashboard className="size-4" />
              {t("dashboard")}
            </Link>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-(--brand-primary)"
            >
              <UserCircle className="size-4" />
              Profile Settings
            </Link>

            <div className="h-px bg-slate-100 my-1" />

            <button
              onClick={async () => {
                await signOut();
                setIsOpen(false);
                router.push("/");
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="size-4" />
              {t("logout")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
