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
    <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center space-y-4">
      <div className="relative group">
        <motion.div
          whileHover={isEditing ? { scale: 1.05 } : {}}
          className="size-32 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md relative bg-slate-50"
        >
          {previewUrl || userImage ? (
            <img src={previewUrl || userImage || ""} alt="" className="size-full object-cover" />
          ) : (
            <div className="size-full flex items-center justify-center bg-slate-50">
              <UserIcon className="size-12 text-slate-300" />
            </div>
          )}
          
          {isEditing && (
            <label className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center cursor-pointer text-white">
              <Camera className="size-6 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
              <input type="file" className="hidden" accept="image/*" onChange={onFileChange} />
            </label>
          )}
        </motion.div>
        <div className="absolute -bottom-1 -right-1 size-6 rounded-lg bg-white shadow-md flex items-center justify-center border border-slate-50">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          {userName || "New User"}
        </h3>
        <div className="flex items-center justify-center gap-1.5 text-slate-400">
          <Mail className="size-3" />
          <span className="text-xs font-medium truncate max-w-[180px]">{userEmail}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-1">
        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-bold uppercase tracking-wider border border-blue-100">
          Active
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider border border-emerald-100">
          Verified
        </span>
      </div>
    </div>
  );
};
