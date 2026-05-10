"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car as CarIcon,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { Car } from "@/types";

interface CarCardProps {
  car: Car;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

export function CarCard({ car, onEdit, onDelete, onViewDetails }: CarCardProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos = car.photos || [];

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
    >
      {/* Car Image Slider */}
      <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden group/slider">
        <AnimatePresence mode="wait">
          {photos.length > 0 ? (
            <motion.img
              key={currentPhoto}
              src={photos[currentPhoto]}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full flex items-center justify-center"><CarIcon className="size-12 text-slate-300" /></div>
          )}
        </AnimatePresence>

        {photos.length > 1 && (
          <>
            <button 
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button 
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-700 opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="size-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {photos.map((_, i) => (
                <div key={i} className={`size-1.5 rounded-full ${i === currentPhoto ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          </>
        )}

        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
          car.status === "APPROVED" ? "bg-emerald-500/90 text-white" :
          car.status === "PENDING" ? "bg-amber-500/90 text-white" :
          "bg-rose-500/90 text-white"
        }`}>
          {car.status}
        </div>
      </div>

      {/* Car Info */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{car.model}</h3>
            {car.modelBn && (
              <p className="text-xs font-medium text-slate-400 mb-1">{car.modelBn}</p>
            )}
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{car.registrationNumber}</p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
            {car.category?.categoryName}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Color</p>
            <p className="text-sm font-bold text-slate-700">{car.color} {car.colorBn ? `(${car.colorBn})` : ""}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Year</p>
            <p className="text-sm font-bold text-slate-700">{car.year} {car.yearBn ? `(${car.yearBn})` : ""}</p>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <button
            onClick={onViewDetails}
            className="w-full h-10 rounded-lg bg-slate-50 text-slate-600 text-sm font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-2 border border-slate-100"
          >
            <Eye className="size-4" /> View Details
          </button>
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex-1 h-10 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Edit2 className="size-4" /> Edit
            </button>
            <button
              onClick={onDelete}
              className="size-10 rounded-lg border border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
