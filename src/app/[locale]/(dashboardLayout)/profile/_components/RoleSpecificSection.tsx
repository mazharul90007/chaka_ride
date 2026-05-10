"use client";

import {
  Phone,
  MapPin,
  Truck,
  CreditCard,
  Car,
  Navigation,
  Hash
} from "lucide-react";
import { ReadOnlyField } from "./ReadOnlyField";
import { CategorySelect } from "./CategorySelect";

interface RoleSpecificSectionProps {
  role: string;
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

export const RoleSpecificSection = ({
  role,
  isEditing,
  formData,
  setFormData
}: RoleSpecificSectionProps) => {
  const isDriver = role === "DRIVER";
  const isPassenger = role === "PASSENGER";

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
        {isDriver ? <Truck className="size-4 text-(--brand-primary)" /> : <Car className="size-4 text-(--brand-primary)" />}
        {isDriver ? "Driver & Vehicle Details" : "Contact Information"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                  placeholder="+880 1XXX XXXXXX"
                />
              </div>
            </div>

            {isPassenger && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                    placeholder="Dhaka, Bangladesh"
                  />
                </div>
              </div>
            )}

            {isDriver && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">License Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                      placeholder="License Number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Category</label>
                  <div className="relative">
                    <Truck className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 z-10" />
                    <CategorySelect
                      value={formData.vehicleCategoryId}
                      onChange={(val) => setFormData({ ...formData, vehicleCategoryId: val })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Model</label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                      placeholder="e.g. Toyota Corolla"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Plate Number</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                      placeholder="e.g. DHA-KHA-123"
                    />
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <ReadOnlyField label="Phone Number" value={formData.phone} icon={Phone} />
            {isPassenger && <ReadOnlyField label="Address" value={formData.address} icon={MapPin} />}
            {isDriver && (
              <>
                <ReadOnlyField label="License Number" value={formData.licenseNumber} icon={CreditCard} />
                <ReadOnlyField label="Vehicle Model" value={formData.vehicleModel} icon={Navigation} />
                <ReadOnlyField label="Vehicle Plate" value={formData.vehicleNumber} icon={Hash} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

