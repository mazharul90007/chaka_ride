"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Car as CarIcon,
  XCircle,
  Image as ImageIcon,
  Calendar,
  Palette,
  Hash,
  Activity
} from "lucide-react";
import { Car } from "@/types";

interface CarDetailsModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CarDetailsModal({ car, isOpen, onClose }: CarDetailsModalProps) {
  if (!car) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-[210] overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-(--brand-primary) flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                  <CarIcon className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{car.model}</h2>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{car.registrationNumber}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer">
                <XCircle className="size-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left: Photos */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <ImageIcon className="size-4 text-blue-600" />
                    Vehicle Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {car.photos?.map((url, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
                      >
                        <img src={url} alt="" className="size-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right: Info */}
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                        <Calendar className="size-3" /> Year
                      </p>
                      <p className="text-sm font-bold text-slate-700">{car.year} {car.yearBn ? `(${car.yearBn})` : ""}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                        <Palette className="size-3" /> Color
                      </p>
                      <p className="text-sm font-bold text-slate-700">{car.color} {car.colorBn ? `(${car.colorBn})` : ""}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                        <Hash className="size-3" /> Engine
                      </p>
                      <p className="text-sm font-bold text-slate-700">{car.engineNumber || "N/A"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1.5">
                        <Activity className="size-3" /> Status
                      </p>
                      <span className={`text-xs font-bold uppercase ${car.status === "APPROVED" ? "text-emerald-600" :
                        car.status === "PENDING" ? "text-amber-600" : "text-rose-600"
                        }`}>
                        {car.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl border border-slate-100 bg-blue-50/30">
                      <h4 className="text-xs font-bold text-slate-900 mb-2">Description (EN)</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {car.description || "No English description provided."}
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl border border-slate-100 bg-emerald-50/30">
                      <h4 className="text-xs font-bold text-slate-900 mb-2">Description (BN)</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {car.descriptionBn || "কোনো বিবরণ প্রদান করা হয়নি।"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl bg-(--brand-primary) text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
