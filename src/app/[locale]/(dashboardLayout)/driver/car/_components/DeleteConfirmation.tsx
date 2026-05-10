"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  title?: string;
  description?: string;
}

export function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  isPending,
  title = "Remove Vehicle?",
  description = "Are you sure you want to remove this vehicle? This action cannot be undone."
}: DeleteConfirmationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
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
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 mb-6">{description}</p>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={onConfirm} disabled={isPending} className="flex-1 py-2.5 rounded-lg bg-rose-600 text-white text-sm font-bold hover:bg-rose-700 flex items-center justify-center gap-2">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
