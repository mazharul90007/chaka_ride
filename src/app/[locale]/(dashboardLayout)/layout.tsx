"use client";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import UserNav from "@/components/layout/UserNav";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <Loader2 className="size-10 animate-spin text-(--brand-primary)" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-[72px] items-center justify-end border-b border-slate-200 bg-white px-8 gap-4">
          <LocaleSwitcher />
          <div className="h-8 w-px bg-slate-100 mx-2" />
          <UserNav />
        </header>
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
