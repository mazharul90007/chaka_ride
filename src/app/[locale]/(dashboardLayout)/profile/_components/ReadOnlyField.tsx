"use client";

import { LucideIcon } from "lucide-react";

interface ReadOnlyFieldProps {
  label: string;
  value: string | undefined;
  icon: LucideIcon;
}

export const ReadOnlyField = ({ label, value, icon: Icon }: ReadOnlyFieldProps) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    <div className="flex items-center gap-3 h-11 bg-slate-50 border border-slate-100 rounded-lg px-4">
      <Icon className="size-4 text-slate-400 shrink-0" />
      <span className="text-sm font-medium text-slate-700 truncate">{value || "Not provided"}</span>
    </div>
  </div>
);
