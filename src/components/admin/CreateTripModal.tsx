"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, User } from "lucide-react";
import { useCreateTrip } from "@/hooks/useTrip";
import { useAdminDrivers } from "@/hooks/useAdmin";
import { useGetCategories } from "@/hooks/useCarCategory";
import { toast } from "sonner";

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function CreateTripModal({ isOpen, onClose, initialData }: CreateTripModalProps) {
  const { data: driversData } = useAdminDrivers();
  const { data: categoriesData } = useGetCategories();
  const createTrip = useCreateTrip();

  const drivers = driversData?.data?.filter((d: any) => d.status === "APPROVED") || [];
  const categories = categoriesData?.data || [];

  const [formData, setFormData] = useState({
    fullName: "",
    whatsAppNumber: "",
    pickupLocation: "",
    destination: "",
    tripType: "ONE_WAY",
    pickupDate: "",
    pickupTime: "",
    carCategoryId: "",
    requestedPrice: "",
    email: "",
  });
  
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        whatsAppNumber: initialData.whatsAppNumber || "",
        pickupLocation: initialData.pickupLocation || "",
        destination: initialData.destination || "",
        tripType: initialData.tripType || "ONE_WAY",
        pickupDate: initialData.pickupDate || "",
        pickupTime: initialData.pickupTime || "",
        carCategoryId: initialData.carCategoryId || "",
        requestedPrice: initialData.requestedPrice || "",
        email: initialData.email || "",
      });
    } else {
      setFormData({
        fullName: "",
        whatsAppNumber: "",
        pickupLocation: "",
        destination: "",
        tripType: "ONE_WAY",
        pickupDate: "",
        pickupTime: "",
        carCategoryId: "",
        requestedPrice: "",
        email: "",
      });
    }
    setSelectedDrivers([]);
  }, [initialData, isOpen]);

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDrivers.length === 0) {
      toast.error("Please select at least one driver");
      return;
    }

    try {
      await createTrip.mutateAsync({
        ...formData,
        requestedPrice: formData.requestedPrice ? parseFloat(formData.requestedPrice) : undefined,
        driverIds: selectedDrivers,
      });
      toast.success("Trip created and requests sent to drivers!");
      onClose();
    } catch (error) {
      toast.error("Failed to create trip");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">Create New Trip</h2>
              <button onClick={onClose} className="size-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500">
                <XCircle className="size-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateTrip} className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Passenger Name *</label>
                  <input required type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">WhatsApp / Phone *</label>
                  <input required type="text" value={formData.whatsAppNumber} onChange={(e) => setFormData({...formData, whatsAppNumber: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none" placeholder="01XXXXXXXXX" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Passenger Email (Optional)</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none" placeholder="passenger@example.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pickup Location *</label>
                  <input required type="text" value={formData.pickupLocation} onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none" placeholder="Dhanmondi, Dhaka" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Destination *</label>
                  <input required type="text" value={formData.destination} onChange={(e) => setFormData({...formData, destination: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none" placeholder="Cox's Bazar" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Trip Type *</label>
                  <select required value={formData.tripType} onChange={(e) => setFormData({...formData, tripType: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none bg-white">
                    <option value="ONE_WAY">One Way</option>
                    <option value="ROUND_TRIP">Round Trip</option>
                    <option value="HOURLY">Hourly</option>
                    <option value="DAILY">Daily</option>
                    <option value="MONTHLY">Monthly</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Car Category *</label>
                  <select required value={formData.carCategoryId} onChange={(e) => setFormData({...formData, carCategoryId: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none bg-white">
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pickup Date *</label>
                  <input required type="date" value={formData.pickupDate} onChange={(e) => setFormData({...formData, pickupDate: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pickup Time *</label>
                  <input required type="time" value={formData.pickupTime} onChange={(e) => setFormData({...formData, pickupTime: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none" />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Requested Price (Optional)</label>
                  <input type="number" value={formData.requestedPrice} onChange={(e) => setFormData({...formData, requestedPrice: e.target.value})} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-(--brand-primary) focus:ring-1 focus:ring-(--brand-primary) outline-none" placeholder="e.g. 5000" />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="size-4 text-(--brand-primary)" />
                  Assign Drivers (Select multiple) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-1">
                  {drivers.map((driver: any) => (
                    <label key={driver.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedDrivers.includes(driver.id) ? 'border-(--brand-primary) bg-(--brand-primary)/5' : 'border-slate-200 hover:border-slate-300'}`}>
                      <input 
                        type="checkbox" 
                        checked={selectedDrivers.includes(driver.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedDrivers([...selectedDrivers, driver.id]);
                          else setSelectedDrivers(selectedDrivers.filter(id => id !== driver.id));
                        }}
                        className="size-4 rounded border-slate-300 text-(--brand-primary) focus:ring-(--brand-primary)"
                      />
                      <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
                        {driver.user.image ? (
                          <img src={driver.user.image} alt="" className="size-full object-cover" />
                        ) : (
                          <User className="size-4 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">{driver.user.name}</p>
                        <p className="text-[10px] text-slate-500">{driver.vehicleModel || 'No vehicle info'}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="h-10 px-5 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={createTrip.isPending} className="h-10 px-5 rounded-lg bg-(--brand-primary) text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                  {createTrip.isPending ? 'Creating...' : 'Create & Assign Trip'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
