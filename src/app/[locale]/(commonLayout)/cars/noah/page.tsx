"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AirVent,
  DoorOpen,
  Fuel,
  Luggage,
  ShieldCheck,
  Sofa,
  Users,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";

const IMAGES = [
  "/assets/images/noah/noah-car1.jpg",
  "/assets/images/noah/noah-car2.jpg",
  "/assets/images/noah/noah-car3.jpg",
  "/assets/images/noah/noah-car4.jpg",
];

const headlineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
} as const;

const headlineLine = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
} as const;

const cardFloat = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const SPEC_ICONS: LucideIcon[] = [Users, Luggage, AirVent, Fuel];

const FEATURE_ICONS: LucideIcon[] = [Sofa, DoorOpen, Volume2, ShieldCheck];
const FEATURE_ACCENTS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-yellow-400",
];

export default function NoahPage() {
  const t = useTranslations("NoahPage");
  const tFooter = useTranslations("Footer");
  const [activeImg, setActiveImg] = useState(0);

  const selectImage = useCallback((i: number) => setActiveImg(i), []);

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) pb-10 sm:pb-14 lg:pb-16">
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 z-0 h-72 w-[min(100vw,48rem)] -translate-x-1/2 rounded-full opacity-[0.4] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 32%, transparent), transparent 72%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-10 lg:pt-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headlineContainer}
            className="mb-10 text-center sm:mb-12"
          >
            <motion.p
              variants={headlineLine}
              className="flex items-center justify-center gap-2 text-base font-medium tracking-tight text-slate-600 sm:text-lg"
            >
              <span className="font-semibold text-(--brand-primary)">
                {t("eyebrow")}
              </span>
            </motion.p>
            <motion.span
              variants={headlineLine}
              className="mx-auto mt-3 mb-3 block h-0.5 w-14 rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mt-4 sm:mb-4 sm:w-20"
              aria-hidden
            />
            <motion.h1
              variants={headlineLine}
              className="text-balance text-3xl leading-[1.12] font-extrabold tracking-tight sm:text-4xl sm:leading-[1.1] lg:text-5xl lg:leading-[1.08]"
            >
              <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
                {t("title")}
              </span>
            </motion.h1>
            <motion.p
              variants={headlineLine}
              className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          {/* Image gallery + specs */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              {/* Main image */}
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-slate-100 shadow-xl ring-1 ring-slate-200/60">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={IMAGES[activeImg]}
                      alt={`${t("title")} - ${activeImg + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={activeImg === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {IMAGES.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => selectImage(i)}
                    className={cn(
                      "relative aspect-16/10 overflow-hidden rounded-xl ring-2 transition-all duration-200",
                      activeImg === i
                        ? "ring-(--brand-primary) shadow-md scale-[1.03]"
                        : "ring-transparent opacity-70 hover:opacity-100 hover:ring-slate-300",
                    )}
                  >
                    <Image
                      src={src}
                      alt={`${t("title")} thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12vw"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Specs + quick info */}
            <motion.div
              initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.7,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="flex flex-col gap-6"
            >
              {/* Spec cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {([1, 2, 3, 4] as const).map((n) => {
                  const Icon = SPEC_ICONS[n - 1];
                  return (
                    <div
                      key={n}
                      className="flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--brand-primary)/10">
                        <Icon
                          className="size-5 text-(--brand-primary)"
                          strokeWidth={1.8}
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          {t(`spec${n}Label`)}
                        </p>
                        <p className="text-sm font-bold text-slate-900">
                          {t(`spec${n}Value`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feature list */}
              <div className="space-y-4">
                {([1, 2, 3, 4] as const).map((n) => {
                  const Icon = FEATURE_ICONS[n - 1];
                  const accent = FEATURE_ACCENTS[n - 1];
                  return (
                    <div key={n} className="flex gap-4">
                      <div
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${accent} shadow-sm`}
                      >
                        <Icon
                          className="size-5 text-white"
                          strokeWidth={1.8}
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[15px] font-bold text-slate-900 sm:text-base">
                          {t(`feature${n}Title`)}
                        </h3>
                        <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                          {t(`feature${n}Body`)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) py-16 sm:py-20">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-80 w-[min(100vw,52rem)] -translate-x-1/2 rounded-full opacity-[0.08] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, var(--brand-primary), transparent 72%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto px-4 text-center sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-72px" }}
            variants={headlineContainer}
          >
            <motion.h2
              variants={headlineLine}
              className="text-balance text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
            >
              {t("ctaTitle")}
            </motion.h2>
            <motion.p
              variants={headlineLine}
              className="mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-600 sm:text-base"
            >
              {t("ctaBody")}
            </motion.p>
            <motion.div variants={headlineLine} className="mt-8">
              <a
                href={tFooter("socialWhatsapp")}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-wa-cta inline-flex items-center gap-2.5 rounded-full bg-(--brand-primary) px-7 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-(--brand-primary-hover)"
              >
                {t("ctaButton")}
                <span className="nav-wa-cta__icon-ring flex size-9 items-center justify-center rounded-full bg-white transition-colors">
                  <FaWhatsapp
                    className="nav-wa-cta__icon size-[18px] text-(--brand-primary) transition-colors"
                    aria-hidden
                  />
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
