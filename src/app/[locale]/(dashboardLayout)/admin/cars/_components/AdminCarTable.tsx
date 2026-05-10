"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Car as CarIcon,
  Edit2,
  Trash2,
  Loader2,
  User as UserIcon
} from "lucide-react";
import { Car } from "@/types";

interface AdminCarTableProps {
  cars: Car[];
  isLoading: boolean;
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
}

export function AdminCarTable({
  cars,
  isLoading,
  onEdit,
  onDelete
}: AdminCarTableProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Car Details</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Driver</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center"><Loader2 className="size-5 animate-spin mx-auto text-slate-400" /></td></tr>
              ) : cars.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-16 text-center text-slate-400 font-medium">No cars found.</td></tr>
              ) : (
                cars.map((car) => (
                  <motion.tr
                    key={car.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="size-16 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
                          {car.photos?.[0] ? (
                            <img src={car.photos[0]} alt="" className="size-full object-cover" />
                          ) : (
                            <CarIcon className="size-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{car.model}</p>
                          {car.modelBn && (
                            <p className="text-[10px] font-medium text-slate-400 -mt-0.5 mb-1">{car.modelBn}</p>
                          )}
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{car.registrationNumber}</p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            {car.color} {car.colorBn ? `(${car.colorBn})` : ""} • {car.year} {car.yearBn ? `(${car.yearBn})` : ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100">
                          {car.driver?.user?.image ? (
                            <img src={car.driver.user.image} alt="" className="size-full object-cover" />
                          ) : (
                            <UserIcon className="size-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{car.driver?.user?.name}</p>
                          <p className="text-[10px] font-medium text-slate-400">{car.driver?.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        car.status === "APPROVED" ? "bg-emerald-50 text-emerald-600" :
                        car.status === "PENDING" ? "bg-amber-50 text-amber-600" :
                        "bg-rose-50 text-rose-600"
                      }`}>
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                        {car.category?.categoryName || "Unassigned"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(car)}
                          className="size-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200"
                        >
                          <Edit2 className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete(car.id)}
                          className="size-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all border border-rose-100"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
