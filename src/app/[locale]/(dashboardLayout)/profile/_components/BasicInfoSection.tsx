"use client";

import { Calendar, User as UserIcon, Mail } from "lucide-react";
import { ReadOnlyField } from "./ReadOnlyField";

interface BasicInfoSectionProps {
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
  userEmail: string;
}

export const BasicInfoSection = ({
  isEditing,
  formData,
  setFormData,
  userEmail
}: BasicInfoSectionProps) => {
  return (
    <div className="p-8 space-y-6">
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
        <UserIcon className="size-4 text-(--brand-primary)" />
        Basic Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg px-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <ReadOnlyField label="Full Name" value={formData.name} icon={UserIcon} />
            <ReadOnlyField label="Date of Birth" value={formData.dob} icon={Calendar} />
            <ReadOnlyField label="Gender" value={formData.gender} icon={UserIcon} />
          </>
        )}
        <ReadOnlyField label="Email Address" value={userEmail} icon={Mail} />
      </div>
    </div>
  );
};
