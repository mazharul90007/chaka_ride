"use client";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import UserNav from "@/components/layout/UserNav";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { Loader2, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();

  // Force light mode in dashboard
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Loader2 className="size-10 animate-spin text-(--brand-primary)" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-shrink-0 z-50">
        <DashboardSidebar />
      </aside>
      
      {/* Mobile Sidebar Overlay & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] lg:hidden shadow-2xl"
            >
              <DashboardSidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 w-full">
        {/* Responsive Header */}
        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between lg:justify-end border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 md:px-8 gap-4">
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex lg:hidden size-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 md:gap-4">
            <UserNav />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 p-4 md:p-0">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
