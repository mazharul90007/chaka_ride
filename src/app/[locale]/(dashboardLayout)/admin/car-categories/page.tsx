"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Loader2,
  AlertCircle
} from "lucide-react";
import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory
} from "@/hooks/useCarCategory";
import { CarCategory } from "@/types";
import { toast } from "sonner";

export default function CarCategoriesAdmin() {
  const { data: categoriesData, isLoading } = useGetCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CarCategory | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryNameBn: "",
    description: "",
    descriptionBn: "",
    seat: "",
    seatBn: "",
    luggage: "",
    luggageBn: "",
    ac: "",
    acBn: "",
    fuel: "",
    fuelBn: "",
    features: [] as Array<{ featureTitle: string; featureTitleBn?: string; featureDescription: string; featureDescriptionBn?: string; featureIcon?: string }>,
    categoryIcon: null as string | null,
    photos: [] as string[]
  });

  const [iconFile, setIconFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const categories = categoriesData?.data || [];
  const filteredCategories = categories.filter(c =>
    c.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (category?: CarCategory) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        categoryName: category.categoryName || "",
        categoryNameBn: category.categoryNameBn || "",
        description: category.description || "",
        descriptionBn: category.descriptionBn || "",
        seat: category.seat || "",
        seatBn: category.seatBn || "",
        luggage: category.luggage || "",
        luggageBn: category.luggageBn || "",
        ac: category.ac || "",
        acBn: category.acBn || "",
        fuel: category.fuel || "",
        fuelBn: category.fuelBn || "",
        features: category.features || [],
        categoryIcon: category.categoryIcon || null,
        photos: category.photos || [],
      });
    } else {
      setEditingCategory(null);
      setFormData({
        categoryName: "",
        categoryNameBn: "",
        description: "",
        descriptionBn: "",
        seat: "",
        seatBn: "",
        luggage: "",
        luggageBn: "",
        ac: "",
        acBn: "",
        fuel: "",
        fuelBn: "",
        features: [],
        categoryIcon: null,
        photos: [],
      });
    }
    setIconFile(null);
    setPhotoFiles([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    // The backend expects all text data as a JSON string under the 'data' field
    payload.append("data", JSON.stringify(formData));

    if (iconFile) {
      payload.append("categoryIcon", iconFile);
    }
    if (photoFiles.length > 0) {
      photoFiles.forEach(file => {
        payload.append("photos", file);
      });
    }

    if (editingCategory) {
      updateMutation.mutate(
        { id: editingCategory.id, data: payload },
        { onSuccess: handleCloseModal }
      );
    } else {
      createMutation.mutate(payload, { onSuccess: handleCloseModal });
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [
        ...formData.features,
        { featureTitle: "", featureTitleBn: "", featureDescription: "", featureDescriptionBn: "", featureIcon: "" }
      ]
    });
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features];
    (newFeatures[index] as any)[field] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Car className="size-5 md:size-6 text-(--brand-primary)" />
            Car Categories
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Manage your fleet categories, pricing, and features.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full sm:w-48 md:w-60 rounded-lg border border-slate-200 bg-white pl-9 pr-4 text-sm font-medium outline-none transition-all focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="h-10 px-4 rounded-lg bg-(--brand-primary) text-xs md:text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-sm whitespace-nowrap flex items-center gap-2"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Add Category</span>
          </button>
        </div>
      </header>

      {/* Main Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Category Info</th>
                <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Specs</th>
                <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Assets</th>
                <th className="px-5 md:px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence mode="popLayout">
                {isLoading ? (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-sm"><Loader2 className="size-5 animate-spin mx-auto" /></td></tr>
                ) : filteredCategories.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-16 text-center text-slate-400 font-medium">No categories found.</td></tr>
                ) : (
                  filteredCategories.map((cat) => (
                    <motion.tr
                      key={cat.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-5 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-15 rounded-lg bg-blue-50 flex items-center justify-center font-bold text-blue-600 overflow-hidden border border-blue-100 shrink-0">
                            {cat.categoryIcon ? (
                              <img src={cat.categoryIcon} alt="" className="size-full object-cover" />
                            ) : (
                              <Car className="size-5" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{cat.categoryName}</p>
                            {cat.categoryNameBn && (
                              <p className="text-[10px] font-medium text-slate-400 mt-0.5">{cat.categoryNameBn}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 md:px-6 py-4 space-y-1">
                        <div className="flex gap-4 text-xs font-medium text-slate-600">
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md">{cat.seat} Seats</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md">{cat.luggage} Luggages</span>
                        </div>
                        <div className="flex gap-4 text-xs font-medium text-slate-600">
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md">{cat.ac}</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md">{cat.fuel}</span>
                        </div>
                      </td>
                      <td className="px-5 md:px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <ImageIcon className="size-4 text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">{cat.photos?.length || 0} Photos</span>
                        </div>
                      </td>
                      <td className="px-5 md:px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(cat)}
                            className="size-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-200 cursor-pointer"
                          >
                            <Edit2 className="size-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(cat.id)}
                            className="size-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-100 cursor-pointer"
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

      {/* Create / Edit Modal */}
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
              className="fixed left-1/2 top-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-[110] max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                  <XCircle className="size-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-6">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Category Name *</label>
                        <input type="text" required value={formData.categoryName} onChange={e => setFormData({ ...formData, categoryName: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Category Name (BN)</label>
                        <input type="text" value={formData.categoryNameBn} onChange={e => setFormData({ ...formData, categoryNameBn: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Description *</label>
                        <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none min-h-[80px]" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Description (BN)</label>
                        <textarea value={formData.descriptionBn} onChange={e => setFormData({ ...formData, descriptionBn: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none min-h-[80px]" />
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-6">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Specifications</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Seats *</label>
                        <input type="text" required value={formData.seat} onChange={e => setFormData({ ...formData, seat: e.target.value })} placeholder="e.g. 4" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none mb-2" />
                        <input type="text" value={formData.seatBn} onChange={e => setFormData({ ...formData, seatBn: e.target.value })} placeholder="BN: 8" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Luggage *</label>
                        <input type="text" required value={formData.luggage} onChange={e => setFormData({ ...formData, luggage: e.target.value })} placeholder="e.g. 2 Big" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none mb-2" />
                        <input type="text" value={formData.luggageBn} onChange={e => setFormData({ ...formData, luggageBn: e.target.value })} placeholder="BN: ২ বড়" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">AC Type *</label>
                        <input type="text" required value={formData.ac} onChange={e => setFormData({ ...formData, ac: e.target.value })} placeholder="e.g. AC" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none mb-2" />
                        <input type="text" value={formData.acBn} onChange={e => setFormData({ ...formData, acBn: e.target.value })} placeholder="BN: এসি" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Fuel Type *</label>
                        <input type="text" required value={formData.fuel} onChange={e => setFormData({ ...formData, fuel: e.target.value })} placeholder="e.g. Octane" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none mb-2" />
                        <input type="text" value={formData.fuelBn} onChange={e => setFormData({ ...formData, fuelBn: e.target.value })} placeholder="BN: অকটেন" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary)/10 outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Features</h3>
                      <button type="button" onClick={handleAddFeature} className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                        <Plus className="size-3" /> Add Feature
                      </button>
                    </div>
                    {formData.features.map((feature, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 relative">
                        <button type="button" onClick={() => handleRemoveFeature(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 transition-colors p-1">
                          <Trash2 className="size-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Title</label>
                            <input type="text" required value={feature.featureTitle} onChange={e => handleFeatureChange(idx, 'featureTitle', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs outline-none" placeholder="EN" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Title (BN)</label>
                            <input type="text" value={feature.featureTitleBn} onChange={e => handleFeatureChange(idx, 'featureTitleBn', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs outline-none" placeholder="BN" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Description</label>
                            <input type="text" required value={feature.featureDescription} onChange={e => handleFeatureChange(idx, 'featureDescription', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs outline-none" placeholder="EN" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Description (BN)</label>
                            <input type="text" value={feature.featureDescriptionBn} onChange={e => handleFeatureChange(idx, 'featureDescriptionBn', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs outline-none" placeholder="BN" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Feature Icon (Icon Name)</label>
                            <input type="text" value={feature.featureIcon || ""} onChange={e => handleFeatureChange(idx, 'featureIcon', e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs outline-none" placeholder="e.g. lucide-star" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Media */}
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Media</h3>
                    
                    {/* Category Icon */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-700">Category Icon</label>
                      <div className="flex items-center gap-4">
                        {formData.categoryIcon && (
                          <div className="relative size-20 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 group">
                            <img src={formData.categoryIcon} alt="Icon" className="size-full object-cover" />
                            <button 
                              type="button"
                              onClick={() => setFormData({ ...formData, categoryIcon: null })}
                              className="absolute inset-0 bg-rose-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <Trash2 className="size-5" />
                            </button>
                          </div>
                        )}
                        <input type="file" accept="image/*" onChange={e => setIconFile(e.target.files?.[0] || null)} className="flex-1 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-(--brand-primary) hover:file:bg-blue-100" />
                      </div>
                    </div>

                    {/* Gallery Photos */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-700">Gallery Photos (Max 10)</label>
                      
                      {/* Existing Photos */}
                      {formData.photos.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4">
                          {formData.photos.map((url, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg border border-slate-200 overflow-hidden bg-slate-50 group">
                              <img src={url} alt={`Photo ${idx + 1}`} className="size-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => {
                                  const newPhotos = formData.photos.filter((_, i) => i !== idx);
                                  setFormData({ ...formData, photos: newPhotos });
                                }}
                                className="absolute inset-0 bg-rose-600/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              >
                                <Trash2 className="size-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <input type="file" accept="image/*" multiple onChange={e => setPhotoFiles(Array.from(e.target.files || []))} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-(--brand-primary) hover:file:bg-blue-100" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                  <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-lg bg-(--brand-primary) text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                    {isPending ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
                    {editingCategory ? "Save Changes" : "Create Category"}
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
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Category?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete this car category? This action cannot be undone.
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
