"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Car,
  Headset,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

const SKYLINE = "/assets/images/why_chose_us/purbachal.jpg";
const CAR = "/assets/images/why_chose_us/car-png.png";

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
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

const columnContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.22 },
  },
} as const;

const itemReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const centerReveal = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

function SectionDivider() {
  return (
    <div
      className="h-px w-full bg-linear-to-r from-transparent via-(--brand-primary)/30 to-transparent"
      aria-hidden
    />
  );
}

function FeatureBlock({
  icon: Icon,
  title,
  body,
  side,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  side: "left" | "right";
}) {
  const row = side === "left" ? "flex-row-reverse" : "flex-row";

  return (
    <motion.div
      variants={itemReveal}
      whileHover={{
        y: -3,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      className={cn(
        "flex gap-4 rounded-2xl border border-(--brand-primary)/10 bg-white/80 p-5 shadow-sm",
        "backdrop-blur-sm transition-[box-shadow,border-color] duration-300 hover:border-(--brand-primary)/18 hover:shadow-md sm:p-6",
        row,
        side === "left" ? "lg:justify-end lg:text-right" : "lg:text-left",
      )}
    >
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-xl border border-(--brand-primary)/12 bg-white shadow-sm ring-1 ring-(--brand-primary)/6 sm:size-14",
        )}
      >
        <Icon
          className="size-6 text-(--brand-primary) sm:size-7"
          strokeWidth={1.65}
          aria-hidden
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  const t = useTranslations("WhyChooseUs");

  return (
    <section
      id="why-choose-us"
      className="relative w-full overflow-x-hidden bg-(--hero-bg) py-8 sm:py-10 lg:py-12"
      aria-labelledby="why-choose-us-heading"
    >
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-80 w-[min(100vw,52rem)] -translate-x-1/2 rounded-full opacity-[0.38] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 32%, transparent), transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.header
          className="relative mx-auto mb-12 max-w-3xl text-center sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-72px" }}
          variants={headlineContainer}
        >
          <motion.p
            variants={headlineLine}
            className="flex items-center justify-center gap-2 text-base font-medium tracking-tight text-slate-600 sm:text-lg"
          >
            <span className="font-semibold text-orange-600">
              {t("eyebrow")}
            </span>
          </motion.p>
          <motion.span
            variants={headlineLine}
            className="mx-auto mt-3 mb-3 block h-0.5 w-14 max-w-[min(5rem,24vw)] rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mt-4 sm:mb-4 sm:w-20"
            aria-hidden
          />
          <motion.h2
            id="why-choose-us-heading"
            variants={headlineLine}
            className="text-balance text-3xl leading-[1.12] font-extrabold tracking-tight sm:text-4xl sm:leading-[1.1] lg:text-5xl lg:leading-[1.08]"
          >
            <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
              {t("title")}
            </span>
          </motion.h2>
        </motion.header>

        <div className="grid items-center gap-10 overflow-visible sm:gap-12 lg:grid-cols-[1fr_minmax(260px,300px)_1fr] lg:gap-10 xl:gap-14">
          {/* Left column */}
          <motion.div
            className="order-2 flex flex-col gap-8 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={columnContainer}
          >
            <FeatureBlock
              side="left"
              icon={Car}
              title={t("feature1Title")}
              body={t("feature1Body")}
            />
            <SectionDivider />
            <FeatureBlock
              side="left"
              icon={Headset}
              title={t("feature2Title")}
              body={t("feature2Body")}
            />
          </motion.div>

          {/* Center: vertical pill + car — glow matches hero language */}
          <motion.div
            className="order-1 flex justify-center overflow-visible pb-20 sm:pb-24 lg:order-2 lg:pb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-32px" }}
            variants={centerReveal}
          >
            <div className="relative w-[min(72vw,240px)] sm:w-[270px]">
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[120%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 48% at 50% 45%, color-mix(in srgb, var(--brand-primary) 28%, transparent), transparent 68%)",
                }}
                aria-hidden
              />
              <div className="relative aspect-12/20 w-full overflow-hidden rounded-full border border-slate-200/90 bg-slate-100 shadow-lg ring-1 ring-(--hero-form-ring)">
                <Image
                  src={SKYLINE}
                  alt={t("skylineAlt")}
                  fill
                  className="object-cover object-[center_25%]"
                  sizes="(max-width: 1024px) 280px, 300px"
                  priority={false}
                />
              </div>
              <Image
                src={CAR}
                alt={t("carAlt")}
                width={640}
                height={340}
                className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-auto w-[138%] max-w-none -translate-x-1/2 translate-y-[18%] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(15,23,42,0.28)]"
                sizes="(max-width: 1024px) 100vw, 380px"
              />
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="order-3 flex flex-col gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={columnContainer}
          >
            <FeatureBlock
              side="right"
              icon={MapPin}
              title={t("feature3Title")}
              body={t("feature3Body")}
            />
            <SectionDivider />
            <FeatureBlock
              side="right"
              icon={ShieldCheck}
              title={t("feature4Title")}
              body={t("feature4Body")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
