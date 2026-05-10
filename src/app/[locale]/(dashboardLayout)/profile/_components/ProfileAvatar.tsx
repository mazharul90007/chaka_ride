"use client";

import { motion } from "framer-motion";
import { Camera, Mail, User as UserIcon } from "lucide-react";

interface ProfileAvatarProps {
  previewUrl: string | null;
  userImage: string | null | undefined;
  userName: string;
  userEmail: string;
  isEditing: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileAvatar = ({
  previewUrl,
  userImage,
  userName,
  userEmail,
  isEditing,
  onFileChange
}: ProfileAvatarProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10 bg-gradient-to-br from-slate-50 to-white">
      <div className="relative group">
        <motion.div
          whileHover={isEditing ? { scale: 1.05 } : {}}
          className="size-32 md:size-40 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative bg-slate-100"
        >
          {previewUrl || userImage ? (
            <img src={previewUrl || userImage || ""} alt="" className="size-full object-cover" />
          ) : (
            <div className="size-full flex items-center justify-center bg-slate-100">
              <UserIcon className="size-16 text-slate-300" />
            </div>
          )}
          
          {isEditing && (
            <label className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer text-white">
              <Camera className="size-8 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider">Change Photo</span>
              <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
            </label>
          )}
        </motion.div>
        <div className="absolute -bottom-2 -right-2 size-8 rounded-xl bg-white shadow-lg flex items-center justify-center">
          <div className="size-3 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="text-center md:text-left space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          {userName || "New User"}
        </h1>
        <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500">
          <Mail className="size-4" />
          <span className="text-sm font-medium">{userEmail}</span>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
            Active Account
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider border border-slate-200">
            Verified Identity
          </span>
        </div>
      </div>
    </div>
  );
};
