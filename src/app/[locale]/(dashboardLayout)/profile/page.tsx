"use client";

import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  Settings,
  Save,
  Loader2,
  Edit2,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";

// Split Components
import { ProfileAvatar } from "./_components/ProfileAvatar";
import { BasicInfoSection } from "./_components/BasicInfoSection";
import { RoleSpecificSection } from "./_components/RoleSpecificSection";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { data: profileData, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [formData, setFormData] = useState<any>({
    name: session?.user?.name || "",
    phone: "",
    address: "",
    licenseNumber: "",
    vehicleCategoryId: "",
    vehicleModel: "",
    vehicleNumber: "",
    dob: "",
    gender: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let u = null;
    if (profileData) {
      if ((profileData as any).success && (profileData as any).data) {
        u = (profileData as any).data;
      } else if ((profileData as any).id) {
        u = profileData;
      }
    }
    
    if (u && typeof u === 'object') {
      const roleData = (u.driver || u.passenger || u.admin || {}) as any;
      
      setFormData({
        name: u.name || session?.user?.name || "",
        dob: u.dob ? new Date(u.dob).toISOString().split('T')[0] : "",
        gender: u.gender || "",
        phone: roleData.phone || "",
        address: roleData.address || "",
        licenseNumber: roleData.licenseNumber || "",
        vehicleCategoryId: roleData.vehicleCategoryId || "",
        vehicleModel: roleData.vehicleModel || "",
        vehicleNumber: roleData.vehicleNumber || "",
      });
    }
  }, [profileData, session]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    if (selectedFile) {
      form.append("image", selectedFile);
    }
    form.append("data", JSON.stringify(formData));
    updateProfile.mutate(form, {
      onSuccess: () => setIsEditing(false)
    });
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-slate-300" />
      </div>
    );
  }

  const user = (profileData as any)?.data || profileData;
  const role = user?.role || "PASSENGER";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="border-b border-slate-100 relative">
          <ProfileAvatar 
            previewUrl={previewUrl}
            userImage={user?.image}
            userName={user?.name}
            userEmail={user?.email}
            isEditing={isEditing}
            onFileChange={handleFileChange}
          />

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="absolute top-8 right-8 h-10 px-4 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-2 shadow-sm"
            >
              <Edit2 className="size-4" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Content Tabs/Sections */}
        <div className="divide-y divide-slate-100">
          <BasicInfoSection 
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
            userEmail={user?.email}
          />

          <RoleSpecificSection 
            role={role}
            isEditing={isEditing}
            formData={formData}
            setFormData={setFormData}
          />

          {/* Settings Info */}
          <div className="p-8 bg-slate-50/50">
            <div className="flex gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100/50">
              <Settings className="size-5 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Privacy Control</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Your personal data is encrypted and only visible to you and our administration team. 
                  Profile updates may require a few moments to sync across all ride-sharing services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="w-full sm:w-auto h-12 px-8 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <X className="size-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateProfile.isPending}
              className="w-full sm:w-auto h-12 px-10 rounded-xl bg-(--brand-primary) text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
              {updateProfile.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save All Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
