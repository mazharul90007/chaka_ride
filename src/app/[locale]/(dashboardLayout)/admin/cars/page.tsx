"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car as CarIcon,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Filter,
  User as UserIcon
} from "lucide-react";
import {
  useGetAllCars,
  useUpdateCar,
  useDeleteCar
} from "@/hooks/useCars";
import { useGetCategories } from "@/hooks/useCarCategory";
import { Car } from "@/types";
import { toast } from "sonner";

export default function AdminCarsPage() {
  const { data: carsData, isLoading } = useGetAllCars();
  const { data: categoriesData } = useGetCategories();
  const updateMutation = useUpdateCar();
  const deleteMutation = useDeleteCar();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    model: "",
    modelBn: "",
    year: "",
    yearBn: "",
    description: "",
    descriptionBn: "",
    registrationNumber: "",
    engineNumber: "",
    chassisNumber: "",
    color: "",
    colorBn: "",
    categoryId: "",
    status: "PENDING" as "PENDING" | "APPROVED" | "REJECTED",
    photos: [] as string[]
  });

  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const cars = carsData?.data || [];
  const categories = categoriesData?.data || [];

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.driver?.user?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" || car.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenModal = (car: Car) => {
    setEditingCar(car);
    setFormData({
      model: car.model || "",
      modelBn: car.modelBn || "",
      year: car.year || "",
      yearBn: car.yearBn || "",
      description: car.description || "",
      descriptionBn: car.descriptionBn || "",
      registrationNumber: car.registrationNumber || "",
      engineNumber: car.engineNumber || "",
      chassisNumber: car.chassisNumber || "",
      color: car.color || "",
      colorBn: car.colorBn || "",
      categoryId: car.categoryId || "",
      status: car.status || "PENDING",
      photos: car.photos || [],
    });
    setPhotoFiles([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCar(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;

    const payload = new FormData();
    // Include existing photos that we want to keep
    payload.append("data", JSON.stringify(formData));

    if (photoFiles.length > 0) {
      photoFiles.forEach(file => {
        payload.append("photos", file);
      });
    }

    updateMutation.mutate(
      { id: editingCar.id, data: payload },
      { onSuccess: handleCloseModal }
    );
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <CarIcon className="size-5 md:size-6 text-(--brand-primary)" />
            Manage All Cars
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Review, approve, and manage driver vehicles.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search model, plate, driver..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full sm:w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-slate-400 ml-2" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:border-(--brand-primary)"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Table */}
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
                ) : filteredCars.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-16 text-center text-slate-400 font-medium">No cars found.</td></tr>
                ) : (
                  filteredCars.map((car) => (
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
                            onClick={() => handleOpenModal(car)}
                            className="size-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200"
                          >
                            <Edit2 className="size-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(car.id)}
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

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[110] max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Edit2 className="size-5 text-blue-600" />
                  Edit Car Details
                </h2>
                <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
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

                  <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Description</label>
                      <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none min-h-[80px]" />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Description (BN)</label>
                      <textarea value={formData.descriptionBn} onChange={e => setFormData({ ...formData, descriptionBn: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none min-h-[80px]" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Status *</label>
                      <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none font-bold">
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Car Category *</label>
                      <select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none">
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Engine Number</label>
                      <input type="text" value={formData.engineNumber} onChange={e => setFormData({ ...formData, engineNumber: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Chassis Number</label>
                      <input type="text" value={formData.chassisNumber} onChange={e => setFormData({ ...formData, chassisNumber: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) outline-none" />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">Vehicle Photos</h3>
                    
                    {/* Existing Photos */}
                    {formData.photos.length > 0 && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                        {formData.photos.map((url, idx) => (
                          <div key={idx} className="relative aspect-square rounded-lg border border-slate-200 overflow-hidden group bg-slate-50">
                            <img src={url} alt="" className="size-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setFormData({ ...formData, photos: formData.photos.filter((_, i) => i !== idx) })}
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
                  <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={updateMutation.isPending} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                    {updateMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
              onClick={() => setDeleteId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[110] p-6 text-center"
            >
              <div className="size-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Car?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete this vehicle record? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
                  Cancel
                </button>
                <button onClick={confirmDelete} disabled={deleteMutation.isPending} className="flex-1 py-2.5 rounded-lg bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 flex items-center justify-center gap-2">
                  {deleteMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
