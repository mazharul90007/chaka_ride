"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  CheckCheck,
  ClipboardList,
  PhoneCall,
  Users,
  type LucideIcon,
} from "lucide-react";

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

const cardsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
} as const;

const cardReveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

type StepMeta = {
  step: string;
  title: string;
  description: string;
  bullets: [string, string, string];
  icon: LucideIcon;
  /** Solid card surface + border (start → processing → complete) */
  surface: string;
  stepNumberClass: string;
  iconTileClass: string;
  bulletRowClass: string;
  checkWrapClass: string;
  checkClass: string;
};

function StepConnector() {
  return (
    <div
      className="mx-2 hidden min-w-0 flex-1 items-center gap-1.5 sm:flex"
      aria-hidden
    >
      <div className="h-px min-w-2 flex-1 bg-linear-to-r from-transparent via-(--brand-primary)/35 to-transparent" />
      <div className="size-2 shrink-0 rotate-45 rounded-sm border border-(--brand-primary)/30 bg-white shadow-[0_0_0_1px_color-mix(in_srgb,var(--brand-primary)_12%,transparent)]" />
      <div className="h-px min-w-2 flex-1 bg-linear-to-l from-transparent via-(--brand-primary)/35 to-transparent" />
    </div>
  );
}

function StepCard({ meta }: { meta: StepMeta }) {
  const {
    step,
    title,
    description,
    bullets,
    icon: Icon,
    surface,
    stepNumberClass,
    iconTileClass,
    bulletRowClass,
    checkWrapClass,
    checkClass,
  } = meta;

  return (
    <motion.article
      variants={cardReveal}
      whileHover={{
        y: -4,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7",
        surface,
      )}
    >
      <div className="relative mb-6 flex w-full items-center justify-between gap-3 sm:justify-start sm:gap-1">
        <span
          className={cn(
            "text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl",
            stepNumberClass,
          )}
        >
          {step}
        </span>
        <StepConnector />
        <div
          className={cn(
            "relative flex size-14 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:size-16",
            iconTileClass,
          )}
        >
          <Icon
            className="relative size-7 text-(--brand-primary) sm:size-8"
            strokeWidth={1.65}
            aria-hidden
          />
        </div>
      </div>

      <h3 className="relative text-lg font-bold leading-snug text-slate-900 sm:text-xl">
        {title}
      </h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
        {description}
      </p>
      <ul className="relative mt-5 space-y-3">
        {bullets.map((line) => (
          <li
            key={line}
            className={cn(
              "flex gap-3 rounded-xl border py-2 pr-3 pl-2 text-sm text-slate-800 shadow-sm",
              bulletRowClass,
            )}
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg border",
                checkWrapClass,
              )}
            >
              <CheckCheck
                className={cn("size-4", checkClass)}
                strokeWidth={2.35}
                aria-hidden
              />
            </span>
            <span className="flex min-w-0 flex-1 items-center leading-snug">
              {line}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  const steps: StepMeta[] = [
    {
      step: "01",
      title: t("step1Title"),
      description: t("step1Description"),
      bullets: [t("step1Bullet1"), t("step1Bullet2"), t("step1Bullet3")],
      icon: ClipboardList,
      surface: "border-sky-100/90 bg-sky-50",
      stepNumberClass: "text-sky-800",
      iconTileClass: "border-sky-100/80 bg-white",
      bulletRowClass: "border-sky-100/70 bg-white/90",
      checkWrapClass: "border-sky-100/80 bg-sky-50/80",
      checkClass: "text-sky-700",
    },
    {
      step: "02",
      title: t("step2Title"),
      description: t("step2Description"),
      bullets: [t("step2Bullet1"), t("step2Bullet2"), t("step2Bullet3")],
      icon: Users,
      surface: "border-amber-100/90 bg-amber-50",
      stepNumberClass: "text-amber-900",
      iconTileClass: "border-amber-100/80 bg-white",
      bulletRowClass: "border-amber-100/70 bg-white/90",
      checkWrapClass: "border-amber-100/80 bg-amber-50/80",
      checkClass: "text-amber-800",
    },
    {
      step: "03",
      title: t("step3Title"),
      description: t("step3Description"),
      bullets: [t("step3Bullet1"), t("step3Bullet2"), t("step3Bullet3")],
      icon: PhoneCall,
      surface: "border-emerald-100/90 bg-emerald-50",
      stepNumberClass: "text-emerald-900",
      iconTileClass: "border-emerald-100/80 bg-white",
      bulletRowClass: "border-emerald-100/70 bg-white/90",
      checkWrapClass: "border-emerald-100/80 bg-emerald-50/80",
      checkClass: "text-emerald-700",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-x-hidden bg-(--hero-bg) py-8 sm:py-10 lg:py-12"
      aria-labelledby="how-it-works-heading"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-[min(96vw,48rem)] -translate-x-1/2 rounded-full opacity-[0.42] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 68% 52% at 50% 42%, color-mix(in srgb, var(--brand-primary) 38%, transparent) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headlineContainer}
        >
          <motion.p
            variants={headlineLine}
            className="text-base font-medium tracking-tight text-slate-600 sm:text-lg"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.span
            variants={headlineLine}
            className="mx-auto mt-3 mb-3 block h-0.5 w-14 max-w-[min(5rem,24vw)] rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mt-4 sm:mb-4 sm:w-20"
            aria-hidden
          />
          <motion.h2
            id="how-it-works-heading"
            variants={headlineLine}
            className="text-balance text-3xl leading-[1.12] font-extrabold tracking-tight sm:text-4xl sm:leading-[1.1] lg:text-5xl lg:leading-[1.08]"
          >
            <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
              {t("title")}
            </span>
          </motion.h2>
          <motion.p
            variants={headlineLine}
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="relative mt-12 grid gap-4 sm:mt-14 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-48px" }}
          variants={cardsContainer}
        >
          {steps.map((meta) => (
            <StepCard key={meta.step} meta={meta} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
