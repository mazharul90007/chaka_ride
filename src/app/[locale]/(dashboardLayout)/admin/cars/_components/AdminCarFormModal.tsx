"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Edit2,
  XCircle,
  Loader2,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { Car, CarCategory } from "@/types";

interface AdminCarFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCar: Car | null;
  formData: any;
  setFormData: (data: any) => void;
  photoFiles: File[];
  setPhotoFiles: (files: File[]) => void;
  handleSubmit: (e: React.FormEvent) => void;
  categories: CarCategory[];
  isPending: boolean;
}

export function AdminCarFormModal({
  isOpen,
  onClose,
  editingCar,
  formData,
  setFormData,
  photoFiles,
  setPhotoFiles,
  handleSubmit,
  categories,
  isPending
}: AdminCarFormModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[110] max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Edit2 className="size-5 text-blue-600" />
                Edit Car Details
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                <XCircle className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Model *</label>
                      <input type="text" required value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Model (BN)</label>
                      <input type="text" value={formData.modelBn} onChange={e => setFormData({ ...formData, modelBn: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Year *</label>
                      <input type="text" required value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Year (BN)</label>
                      <input type="text" value={formData.yearBn} onChange={e => setFormData({ ...formData, yearBn: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Color *</label>
                      <input type="text" required value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Color (BN)</label>
                      <input type="text" value={formData.colorBn} onChange={e => setFormData({ ...formData, colorBn: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Registration Number *</label>
                    <input type="text" required value={formData.registrationNumber} onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Status *</label>
                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none">
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Car Category *</label>
                    <select required value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none">
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Engine Number</label>
                      <input type="text" value={formData.engineNumber} onChange={e => setFormData({ ...formData, engineNumber: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Chassis Number</label>
                      <input type="text" value={formData.chassisNumber} onChange={e => setFormData({ ...formData, chassisNumber: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Description</label>
                    <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none min-h-[80px]" />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Vehicle Photos</h3>
                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                      {formData.photos.map((url: string, idx: number) => (
                        <div key={idx} className="relative aspect-square rounded-lg border border-slate-200 overflow-hidden group bg-slate-50">
                          <img src={url} alt="" className="size-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, photos: formData.photos.filter((_: any, i: number) => i !== idx) })}
                            className="absolute inset-0 bg-rose-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Add New Photos</label>
                    <input type="file" multiple accept="image/*" onChange={e => setPhotoFiles(Array.from(e.target.files || []))} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-lg bg-(--brand-primary) text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
