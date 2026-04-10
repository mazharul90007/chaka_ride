"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import Image from "next/image";

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
} as const;

const cardFloat = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const FEATURE_ACCENTS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
];

const WHY_ICON_COLORS = [
  "bg-(--brand-primary)/10 text-(--brand-primary)",
  "bg-violet-100 text-violet-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
];

interface ServicePageContentProps {
  slug: string;
  featureIcons: [LucideIcon, LucideIcon, LucideIcon];
  whyIcons: [LucideIcon, LucideIcon, LucideIcon, LucideIcon];
  image?: string;
}

const rowReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const listContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.18 },
  },
} as const;

function FaqRow({
  num,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  num: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={rowReveal}
      className="group/row border-b border-slate-200/70 last:border-b-0"
    >
      <h3 className="text-lg leading-snug font-bold tracking-tight sm:text-xl">
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={onToggle}
          className={cn(
            "flex w-full items-start gap-3 rounded-xl px-3 py-5 text-left transition-[background-color,color] duration-200 sm:gap-4 sm:py-6",
            "hover:bg-slate-100/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-primary)/35 focus-visible:ring-offset-2",
            isOpen && "bg-slate-50/90",
          )}
        >
          <span
            className={cn(
              "w-8 shrink-0 pt-1 text-left text-lg tabular-nums sm:w-9 sm:text-xl",
              isOpen ? "text-(--brand-primary)" : "text-slate-900",
            )}
          >
            {num}.
          </span>
          <span className="min-w-0 flex-1 pr-2 leading-snug text-slate-900 sm:pr-3">
            {question}
          </span>
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 sm:size-11",
              isOpen
                ? "border-(--brand-primary)/30 bg-(--brand-primary)/10 text-(--brand-primary) shadow-sm"
                : "border-slate-200/90 bg-white text-slate-800 shadow-sm group-hover/row:border-slate-300 group-hover/row:shadow",
            )}
            aria-hidden
          >
            <ChevronDown
              className={cn(
                "size-5 transition-transform duration-300 sm:size-[1.35rem]",
                isOpen && "rotate-180",
              )}
              strokeWidth={2.25}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex gap-3 px-3 pb-6 sm:gap-4 sm:pb-7">
              <span className="w-8 shrink-0 sm:w-9" aria-hidden />
              <p className="max-w-2xl min-w-0 flex-1 text-base leading-relaxed text-slate-600 sm:text-lg">
                {answer}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FaqSection({ t }: { t: any }) {
  const count = parseInt(t("faqCount"), 10) || 5;
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggle = useCallback(
    (i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
    [],
  );

  return (
    <section className="relative w-full overflow-x-hidden bg-(--hero-bg) py-12 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute top-1/3 right-0 -z-10 h-72 w-[min(100vw,42rem)] translate-x-1/4 rounded-full opacity-[0.35] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 34%, transparent), transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.header
          className="relative mb-8 sm:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-72px" }}
          variants={headlineContainer}
        >
          <motion.span
            variants={headlineLine}
            className="relative mb-2 block text-base font-medium tracking-tight text-slate-600 sm:mb-3 sm:text-lg"
          >
            {t("faqEyebrow")}
          </motion.span>
          <motion.span
            variants={headlineLine}
            className="relative mb-3 block h-0.5 w-14 rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mb-4 sm:w-20"
            aria-hidden
          />
          <motion.h2
            variants={headlineLine}
            className="relative max-w-3xl text-balance text-2xl leading-[1.1] font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
          >
            <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
              {t("faqTitle")}
            </span>
          </motion.h2>
        </motion.header>

        {/* Accordion */}
        <motion.div
          className="border-t border-slate-200/70 pt-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={listContainer}
        >
          {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
            <FaqRow
              key={n}
              num={n}
              question={t(`faq${n}Q`)}
              answer={t(`faq${n}A`)}
              isOpen={openIndex === n}
              onToggle={() => toggle(n)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicePageContent({
  slug,
  featureIcons,
  whyIcons,
  image,
}: ServicePageContentProps) {
  const serviceImage = image ?? "/assets/images/why_chose_us/purbachal.jpg";
  const t = useTranslations(`ServicePage.${slug}`);
  const tFooter = useTranslations("Footer");

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) pb-12 sm:pb-16 lg:pb-20">
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 z-0 h-72 w-[min(100vw,48rem)] -translate-x-1/2 rounded-full opacity-[0.4] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 32%, transparent), transparent 72%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-8 text-center sm:px-6 sm:pt-12 lg:pt-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headlineContainer}
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
              className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {([1, 2, 3] as const).map((n) => {
              const Icon = featureIcons[n - 1];
              const accent = FEATURE_ACCENTS[n - 1];
              return (
                <motion.div
                  key={n}
                  variants={cardFloat}
                  whileHover={{
                    y: -6,
                    transition: {
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-7"
                >
                  <div
                    className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div className="absolute -top-12 -right-12 size-32 rounded-full bg-linear-to-br from-(--brand-primary)/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <motion.div
                    className={`mb-4 flex size-13 items-center justify-center rounded-xl bg-linear-to-br ${accent} shadow-md sm:size-14`}
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon
                      className="size-6 text-white sm:size-7"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </motion.div>

                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {t(`feature${n}Title`)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
                    {t(`feature${n}Body`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose section */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) py-16 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute top-0 right-0 z-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(45,125,210,0.3), transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-72px" }}
            variants={headlineContainer}
            className="mb-12 text-center sm:mb-14"
          >
            <motion.p
              variants={headlineLine}
              className="text-base font-semibold text-(--brand-primary) sm:text-lg"
            >
              {t("whyEyebrow")}
            </motion.p>
            <motion.span
              variants={headlineLine}
              className="mx-auto mt-3 mb-3 block h-0.5 w-14 rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mt-4 sm:mb-4 sm:w-20"
              aria-hidden
            />
            <motion.h2
              variants={headlineLine}
              className="text-balance text-2xl leading-[1.15] font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
            >
              <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
                {t("whyTitle")}
              </span>
            </motion.h2>
          </motion.div>

          {/* Two-column: image + points */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image side */}
            <motion.div
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
              initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-slate-100 shadow-xl ring-1 ring-slate-200/60">
                <Image
                  src={serviceImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Points side */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={staggerContainer}
            >
              {([1, 2, 3, 4] as const).map((n) => {
                const Icon = whyIcons[n - 1];
                const colorClass = WHY_ICON_COLORS[n - 1];
                return (
                  <motion.div
                    key={n}
                    variants={cardFloat}
                    className="flex gap-4"
                  >
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${colorClass} sm:size-12`}
                    >
                      <Icon
                        className="size-5 sm:size-6"
                        strokeWidth={1.8}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                        {t(`why${n}Title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
                        {t(`why${n}Body`)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <FaqSection t={t} />

      {/* CTA section */}
      <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20">
        <div className="mx-auto px-4 text-center sm:px-6">
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
