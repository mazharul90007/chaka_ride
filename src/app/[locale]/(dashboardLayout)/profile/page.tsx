"use client";

import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  Settings,
  Save,
  Loader2,
  Edit2,
  X,
  User,
  ShieldCheck,
  Activity
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
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-6 md:pb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <User className="size-5 md:size-6 text-(--brand-primary)" />
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Manage your personal information, security, and preferences.
          </p>
        </div>
        
        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="h-10 px-6 rounded-lg bg-(--brand-primary) text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Edit2 className="size-4" />
            Edit Profile
          </button>
        )}
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Account Information</h2>
            </div>
            
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
                  className="w-full sm:w-auto h-12 px-8 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <X className="size-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfile.isPending}
                  className="w-full sm:w-auto h-12 px-10 rounded-xl bg-(--brand-primary) text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 cursor-pointer"
                >
                  {updateProfile.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                  Save All Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          {/* Avatar Card */}
          <ProfileAvatar 
            previewUrl={previewUrl}
            userImage={user?.image}
            userName={user?.name}
            userEmail={user?.email}
            isEditing={isEditing}
            onFileChange={handleFileChange}
          />

          {/* Privacy Card */}
          <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 text-blue-600 mb-4">
              <ShieldCheck className="size-5" />
              <h3 className="text-sm font-bold">Privacy Control</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Your personal data is encrypted and only visible to you and our administration team. 
              Profile updates may require a few moments to sync.
            </p>
          </div>

          <div className="rounded-xl bg-(--brand-primary) p-6 text-white shadow-lg shadow-blue-900/20">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Activity className="size-4" />
              Account Status
            </h3>
            <div className="mt-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm border border-white/10">
              <p className="text-xs font-bold">Active & Verified</p>
              <p className="text-[10px] mt-1 text-blue-100">All features enabled</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
