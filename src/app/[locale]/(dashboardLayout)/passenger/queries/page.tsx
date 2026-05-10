"use client";

import { useTranslations } from "next-intl";
import { useMyQueries } from "@/hooks/useMyQueries";
import { motion } from "framer-motion";
import { Navigation, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";
import Image from "next/image";

export default function PassengerQueriesPage() {
  const { data, isLoading } = useMyQueries();
  const queries = data?.data || [];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Navigation className="size-5 md:size-6 text-(--brand-primary)" />
            My Inquiries
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Track the status of your ride inquiries and price requests.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 font-medium">Loading your inquiries...</div>
        ) : queries.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
              <FileText className="size-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Inquiries Yet</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              You haven't made any special ride requests or price inquiries yet. Use the Smart Assistant on the home page to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {queries.map((query: any) => (
              <motion.div 
                key={query.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 md:p-6 hover:bg-slate-50/50 transition-colors flex flex-col lg:flex-row gap-6 lg:items-center justify-between"
              >
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    <Navigation className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
                      {query.pickupLocation} <span className="text-slate-400 font-normal">to</span> {query.destination}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        {query.pickupDate} at {query.pickupTime}
                      </span>
                      {query.carCategory && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {query.carCategory.categoryName}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {query.tripType === "ONE_WAY" ? "One Way" : "Round Trip"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-6 border-t border-slate-100 lg:border-t-0 pt-4 lg:pt-0">
                  <div className="text-left lg:text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    {query.status === 'PENDING' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="size-3.5" /> Pending Review
                      </span>
                    )}
                    {query.status === 'CONTACTED' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <Navigation className="size-3.5" /> Contacted
                      </span>
                    )}
                    {query.status === 'COMPLETED' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="size-3.5" /> Completed
                      </span>
                    )}
                    {query.status === 'CANCELLED' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="size-3.5" /> Cancelled
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Submitted On</p>
                    <p className="text-sm font-bold text-slate-700">
                      {new Date(query.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
