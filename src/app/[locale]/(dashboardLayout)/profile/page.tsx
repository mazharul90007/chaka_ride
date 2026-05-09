"use client";

import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Camera,
  Settings,
  Save,
  Loader2,
  Calendar,
  Truck,
  CreditCard,
  UserCheck,
  Car,
  Navigation,
  Edit2,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";

const ReadOnlyField = ({ label, value, icon: Icon }: { label: string, value: string | undefined, icon: any }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    <div className="flex items-center gap-3 h-11 bg-slate-50 border border-slate-100 rounded-lg px-4">
      <Icon className="size-4 text-slate-400 shrink-0" />
      <span className="text-sm font-medium text-slate-700 truncate">{value || "Not provided"}</span>
    </div>
  </div>
);

export default function SettingsPage() {
  const { data: session } = useSession();
  const { data: profileData, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [formData, setFormData] = useState<any>({
    name: "",
    phone: "",
    address: "",
    licenseNumber: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleNumber: "",
    dob: "",
    gender: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profileData?.data) {
      const u = profileData.data;
      const roleData = (u.driver || u.passenger || u.admin || {}) as any;
      setFormData({
        name: u.name || "",
        dob: u.dob ? new Date(u.dob).toISOString().split('T')[0] : "",
        gender: u.gender || "",
        phone: roleData.phone || "",
        address: roleData.address || "",
        licenseNumber: roleData.licenseNumber || "",
        vehicleType: roleData.vehicleType || "",
        vehicleModel: roleData.vehicleModel || "",
        vehicleNumber: roleData.vehicleNumber || "",
      });
    }
  }, [profileData]);

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
      form.append("file", selectedFile);
    }
    form.append("data", JSON.stringify(formData));
    updateProfile.mutate(form, {
      onSuccess: () => setIsEditing(false)
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-(--brand-primary)" />
      </div>
    );
  }

  const role = (session?.user as any)?.role || "PASSENGER";

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
          <Settings className="size-6 text-(--brand-primary)" />
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">Update your personal information and profile settings.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Image Section */}
        <section className="bg-blue-50/80 p-6 md:p-8 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group shrink-0">
              <div className="size-24 md:size-28 rounded-2xl bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                {previewUrl || profileData?.data?.image ? (
                  <img src={previewUrl || profileData?.data?.image || ""} alt="Profile" className="size-full object-cover" />
                ) : (
                  <UserIcon className="size-12 text-slate-300" />
                )}
              </div>
              {isEditing && (
                <label className="absolute -bottom-2 -right-2 size-9 rounded-lg bg-white border border-blue-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-(--brand-primary) cursor-pointer transition-all hover:scale-110">
                  <Camera className="size-4" />
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              )}
            </div>
            
            <div className="text-center sm:text-left flex flex-col items-center sm:items-start flex-1">
              <h3 className="font-bold text-slate-900 text-lg">Profile Photo</h3>
              <p className="text-sm text-slate-600 mt-1 mb-4 max-w-xs text-center sm:text-left">
                Upload a clear photo to help your {role === 'DRIVER' ? 'passengers' : 'drivers'} recognize you.
              </p>
              
              {isEditing ? (
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-(--brand-primary) text-sm font-semibold rounded-lg cursor-pointer transition-colors border border-blue-200 shadow-sm">
                  <Camera className="size-4" />
                  Upload New Photo
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-sm font-bold text-white hover:opacity-90 transition-opacity bg-(--brand-primary) px-4 py-2 rounded-lg shadow-md shadow-blue-900/10"
                >
                  <Edit2 className="size-4" />
                  Edit Photo
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <UserCheck className="size-5 text-(--brand-primary)" />
              <h2 className="text-lg font-bold text-slate-900">Basic Information</h2>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-sm font-medium text-(--brand-primary) hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg"
              >
                <Edit2 className="size-4" />
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!isEditing ? (
              <>
                <ReadOnlyField label="Full Name" value={formData.name} icon={UserIcon} />
                <ReadOnlyField label="Email Address" value={session?.user?.email as string} icon={Mail} />
                <ReadOnlyField label="Date of Birth" value={formData.dob} icon={Calendar} />
                <ReadOnlyField label="Gender" value={formData.gender} icon={UserIcon} />
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={session?.user?.email}
                      disabled
                      className="w-full h-11 bg-slate-100 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
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
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg px-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Role Specific Information */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Phone className="size-5 text-(--brand-primary)" />
              <h2 className="text-lg font-bold text-slate-900">{role === 'DRIVER' ? 'Professional Details' : 'Contact Details'}</h2>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 text-sm font-medium text-(--brand-primary) hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg"
              >
                <Edit2 className="size-4" />
                Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!isEditing ? (
              <>
                <ReadOnlyField label="Phone Number" value={formData.phone} icon={Phone} />
                {role === 'PASSENGER' && (
                  <div className="md:col-span-2">
                    <ReadOnlyField label="Home Address" value={formData.address} icon={MapPin} />
                  </div>
                )}
                {role === 'DRIVER' && (
                  <>
                    <ReadOnlyField label="Driving License" value={formData.licenseNumber} icon={CreditCard} />
                    <ReadOnlyField label="Vehicle Type" value={formData.vehicleType} icon={Truck} />
                    <ReadOnlyField label="Vehicle Model" value={formData.vehicleModel} icon={Car} />
                    <ReadOnlyField label="Vehicle Reg. Number" value={formData.vehicleNumber} icon={Navigation} />
                  </>
                )}
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                    />
                  </div>
                </div>

                {role === 'PASSENGER' && (
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Home Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Enter your permanent address"
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                      />
                    </div>
                  </div>
                )}

                {role === 'DRIVER' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Driving License</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={formData.licenseNumber}
                          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Type</label>
                      <div className="relative">
                        <Truck className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={formData.vehicleType}
                          onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                          placeholder="e.g. SUV, Sedan"
                          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Model</label>
                      <div className="relative">
                        <Car className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={formData.vehicleModel}
                          onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                          placeholder="e.g. Toyota Noah 2019"
                          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle Reg. Number</label>
                      <div className="relative">
                        <Navigation className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={formData.vehicleNumber}
                          onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                          placeholder="Dhaka Metro-GA-123456"
                          className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>

        {isEditing && (
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 pb-12">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                if (profileData?.data) {
                  const u = profileData.data;
                  const roleData = (u.driver || u.passenger || u.admin || {}) as any;
                  setFormData({
                    name: u.name || "",
                    dob: u.dob ? new Date(u.dob).toISOString().split('T')[0] : "",
                    gender: u.gender || "",
                    phone: roleData.phone || "",
                    address: roleData.address || "",
                    licenseNumber: roleData.licenseNumber || "",
                    vehicleType: roleData.vehicleType || "",
                    vehicleModel: roleData.vehicleModel || "",
                    vehicleNumber: roleData.vehicleNumber || "",
                  });
                  setPreviewUrl(null);
                  setSelectedFile(null);
                }
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
