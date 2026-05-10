"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  XCircle, 
  User, 
  Phone, 
  Mail, 
  Car, 
  ShieldCheck, 
  Calendar, 
  UserCircle, 
  MapPin,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface DriverProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: any;
}

export default function DriverProfileModal({ isOpen, onClose, driver }: DriverProfileModalProps) {
  if (!driver) return null;

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {/* Header / Banner */}
              <div className="relative h-32 bg-(--brand-primary) shrink-0">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                <button 
                  onClick={onClose} 
                  className="absolute right-6 top-6 z-10 size-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all active:scale-95"
                >
                  <XCircle className="size-6" />
                </button>
              </div>
              
              <div className="px-8 pb-8">
                {/* Profile Header */}
                <div className="relative -mt-16 mb-8 flex flex-col items-center sm:items-start sm:flex-row gap-6 z-10">
                  <div className="size-32 rounded-3xl bg-white p-1.5 shadow-2xl shrink-0">
                  <div className="size-full rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                    {driver.user.image ? (
                      <img src={driver.user.image} alt={driver.user.name} className="size-full object-cover" />
                    ) : (
                      <User className="size-16 text-slate-300" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left pt-16 sm:pt-20">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{driver.user.name}</h3>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-sm ${
                      driver.status === 'APPROVED' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {driver.status === 'APPROVED' ? <CheckCircle2 className="size-3" /> : <AlertCircle className="size-3" />}
                      {driver.status}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Mail className="size-4" /> {driver.user.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="size-4" /> {driver.phone || driver.user.phone || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle className="size-5 text-(--brand-primary)" />
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">Personal Details</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Calendar className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Date of Birth</p>
                        <p className="text-sm font-bold text-slate-700">{formatDate(driver.user.dob)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                        <User className="size-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Gender</p>
                        <p className="text-sm font-bold text-slate-700 capitalize">{driver.user.gender || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                        <ShieldCheck className="size-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">License Number</p>
                        <p className="text-sm font-bold text-slate-700">{driver.licenseNumber || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Car className="size-5 text-(--brand-primary)" />
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">Vehicle Details</h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                        <Car className="size-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Category & Model</p>
                        <p className="text-sm font-bold text-slate-700">
                          {driver.vehicleCategory?.categoryName || "N/A"} • {driver.vehicleModel || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                        <MapPin className="size-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Vehicle Number</p>
                        <p className="text-sm font-bold text-slate-700">{driver.vehicleNumber || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Driver Status Summary</p>
                      <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${driver.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <p className="text-xs font-bold text-slate-700">
                          {driver.status === 'APPROVED' ? 'Verified Partner' : 'Verification Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0 flex justify-end">
              <button 
                onClick={onClose}
                className="h-11 px-8 rounded-xl bg-(--brand-primary) text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-(--brand-primary)/20"
              >
                Close Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
