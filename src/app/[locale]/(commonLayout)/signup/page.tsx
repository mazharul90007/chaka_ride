"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSignup } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight, User, Car, ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const t = useTranslations("Auth.signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"PASSENGER" | "DRIVER">("PASSENGER");

  const signupMutation = useSignup();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate({
      email,
      password,
      name,
      role,
      callbackURL: "/",
    });
  };

  const loading = signupMutation.isPending;

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-slate-50 px-6 py-12">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orange-100/50 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-lg"
      >
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">
          <div className="mb-10 text-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              {t("title")}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-slate-600"
            >
              {t("subtitle")}
            </motion.p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole("PASSENGER")}
                className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-4 transition-all ${
                  role === "PASSENGER"
                    ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-500/10"
                    : "border-slate-100 bg-slate-50 hover:border-slate-200"
                }`}
              >
                <div className={`flex size-12 items-center justify-center rounded-full ${
                  role === "PASSENGER" ? "bg-blue-600 text-white" : "bg-white text-slate-400"
                }`}>
                  <User className="size-6" />
                </div>
                <span className={`text-sm font-bold ${role === "PASSENGER" ? "text-blue-700" : "text-slate-500"}`}>
                  {t("passengerRole")}
                </span>
                {role === "PASSENGER" && (
                  <motion.div layoutId="active-role" className="absolute top-2 right-2">
                    <ShieldCheck className="size-5 text-blue-600" />
                  </motion.div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setRole("DRIVER")}
                className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-4 transition-all ${
                  role === "DRIVER"
                    ? "border-orange-600 bg-orange-50/50 ring-4 ring-orange-500/10"
                    : "border-slate-100 bg-slate-50 hover:border-slate-200"
                }`}
              >
                <div className={`flex size-12 items-center justify-center rounded-full ${
                  role === "DRIVER" ? "bg-orange-600 text-white" : "bg-white text-slate-400"
                }`}>
                  <Car className="size-6" />
                </div>
                <span className={`text-sm font-bold ${role === "DRIVER" ? "text-orange-700" : "text-slate-500"}`}>
                  {t("driverRole")}
                </span>
                {role === "DRIVER" && (
                  <motion.div layoutId="active-role" className="absolute top-2 right-2">
                    <ShieldCheck className="size-5 text-orange-600" />
                  </motion.div>
                )}
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                {t("nameLabel")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <User className="size-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                {t("emailLabel")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="size-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                {t("passwordLabel")}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="size-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group relative flex w-full items-center justify-center overflow-hidden rounded-2xl py-4 px-6 text-sm font-bold text-white transition-all focus:outline-none focus:ring-4 disabled:opacity-70 ${
                role === "PASSENGER" 
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/10" 
                  : "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500/10"
              }`}
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">{t("submit")}</span>
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-slate-500">
            {t("hasAccount")}{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {t("login")}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
