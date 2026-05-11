"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileText, Scale, UserCheck, AlertTriangle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function TermsAndConditionsPage() {
  const t = useTranslations("TermsPage");

  const sections = [
    { icon: FileText, title: t("section1Title"), body: t("section1Body") },
    { icon: ShieldCheck, title: t("section2Title"), body: t("section2Body") },
    { icon: AlertTriangle, title: t("section3Title"), body: t("section3Body") },
    { icon: UserCheck, title: t("section4Title"), body: t("section4Body") },
    { icon: Scale, title: t("section5Title"), body: t("section5Body") },
    { icon: Mail, title: t("section6Title"), body: t("section6Body") },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 py-16 sm:py-20 lg:py-24">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-(--brand-primary)/5 blur-3xl" />
        <div className="absolute top-[20%] -right-[5%] h-[30%] w-[30%] rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm font-bold tracking-wider text-(--brand-primary) uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-(--brand-primary)" />
            <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400 italic">
              {t("lastUpdated")}
            </p>
          </motion.div>

          {/* Intro Card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm sm:p-8"
          >
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {t("intro")}
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="grid gap-8 sm:grid-cols-1">
            {sections.map((section, idx) => (
              <motion.section
                key={idx}
                variants={itemVariants}
                className="group relative flex gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all duration-300 hover:border-(--brand-primary)/30 hover:shadow-md sm:p-8"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-(--brand-primary) transition-colors group-hover:bg-(--brand-primary) group-hover:text-white">
                  <section.icon className="size-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-(--brand-primary) transition-colors">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {section.body}
                  </p>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            variants={itemVariants}
            className="text-center text-slate-500 dark:text-slate-400 text-sm"
          >
            <p>
              By continuing to use our site, you acknowledge that you have read and understood these terms.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
