"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

const FAQ_IMAGE_BACK = "/assets/images/faq/car_faq6.jpg";
const FAQ_IMAGE_FRONT = "/assets/images/faq/car_faq2.jpg";

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
} as const;

const headlineLine = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const imageReveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const listContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.18 },
  },
} as const;

const rowReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const FAQ_KEYS = ["1", "2", "3"] as const;

function FaqRow({
  itemKey,
  isOpen,
  onToggle,
  groupId,
}: {
  itemKey: (typeof FAQ_KEYS)[number];
  isOpen: boolean;
  onToggle: () => void;
  groupId: string;
}) {
  const t = useTranslations("Faq.items");
  const panelId = `${groupId}-panel-${itemKey}`;
  const triggerId = `${groupId}-trigger-${itemKey}`;

  return (
    <motion.div
      variants={rowReveal}
      className="group/row border-b border-slate-200/70 last:border-b-0"
    >
      <h3 className="text-lg leading-snug font-bold tracking-tight sm:text-xl">
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "flex w-full items-start gap-3 rounded-xl px-3 py-5 text-left transition-[background-color,color] duration-200 sm:gap-4 sm:py-6",
            "hover:bg-slate-100/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--brand-primary)/35 focus-visible:ring-offset-2 focus-visible:ring-offset-(--hero-bg)",
            isOpen && "bg-slate-50/90",
          )}
        >
          <span
            className={cn(
              "w-8 shrink-0 pt-1 text-left text-lg tabular-nums sm:w-9 sm:text-xl",
              isOpen ? "text-(--brand-primary)" : "text-slate-900",
            )}
          >
            {itemKey}.
          </span>
          <span className="min-w-0 flex-1 pr-2 leading-snug text-slate-900 sm:pr-3">
            {t(`${itemKey}.question`)}
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
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex gap-3 px-3 pb-6 sm:gap-4 sm:pb-7">
              <span className="w-8 shrink-0 sm:w-9" aria-hidden />
              <p className="max-w-2xl min-w-0 flex-1 text-base leading-relaxed text-slate-600 sm:text-lg">
                {t(`${itemKey}.answer`)}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const t = useTranslations("Faq");
  const groupId = useId();
  const [openKey, setOpenKey] = useState<(typeof FAQ_KEYS)[number]>("1");

  return (
    <section
      id="faq"
      className="relative w-full overflow-x-hidden bg-(--hero-bg) py-8 sm:py-10 lg:py-12"
      aria-labelledby="faq-heading"
    >
      <div
        className="pointer-events-none absolute top-1/3 right-0 -z-10 h-72 w-[min(100vw,42rem)] translate-x-1/4 rounded-full opacity-[0.35] blur-3xl lg:right-1/4 lg:translate-x-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 34%, transparent), transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Visual — same pill frame as WhyChooseUs (rounded-full + aspect-12/20) */}
          <motion.div
            className="relative order-2 flex justify-center overflow-visible lg:order-1 lg:col-span-5 lg:justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-48px" }}
            variants={imageReveal}
          >
            <div className="relative w-[min(86vw,300px)] pb-12 pr-5 sm:w-[340px] sm:pb-14 sm:pr-8 lg:w-full lg:pb-16 lg:pr-10">
              <div
                className="pointer-events-none absolute top-[38%] left-1/2 -z-10 h-[95%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 48% at 50% 45%, color-mix(in srgb, var(--brand-primary) 28%, transparent), transparent 68%)",
                }}
                aria-hidden
              />
              {/* Rear pill — image + overlay are siblings so stacking is predictable (overlay above img) */}
              <div className="relative isolate aspect-12/20 w-[90%] max-w-full overflow-hidden rounded-full border border-slate-200/90 bg-slate-100 shadow-lg ring-1 ring-(--hero-form-ring)">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={FAQ_IMAGE_BACK}
                    alt={t("imageAlt")}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 340px, (max-width: 1280px) 400px, 448px"
                    priority={false}
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, color-mix(in srgb, var(--brand-primary) 28%, transparent), transparent 38%, rgba(15, 23, 42, 0.52))",
                  }}
                  aria-hidden
                />
              </div>
              {/* Front pill — smaller overlap so more of the rear image stays visible */}
              <div className="absolute right-0 bottom-0 z-10 aspect-12/20 w-[68%] translate-x-0 translate-y-4 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-[0_22px_50px_-12px_rgb(15_23_42/0.28)] ring-1 ring-slate-200/80 sm:w-[66%] sm:translate-x-1 sm:translate-y-6 lg:w-[64%] lg:translate-x-2 lg:translate-y-8">
                <Image
                  src={FAQ_IMAGE_FRONT}
                  alt={t("imageAltFront")}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 62vw, (max-width: 1024px) 240px, 288px"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>

          {/* Copy + accordion */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <motion.header
              className="relative mb-8 text-left sm:mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-72px" }}
              variants={headlineContainer}
            >
              <div
                className="pointer-events-none absolute top-1/2 left-0 -z-10 h-48 w-[min(100%,28rem)] -translate-y-1/2 rounded-full opacity-[0.42] blur-3xl sm:h-56 sm:w-[min(100%,36rem)]"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 30% 50%, color-mix(in srgb, var(--brand-primary) 42%, transparent) 0%, transparent 68%)",
                }}
                aria-hidden
              />
              <motion.span
                variants={headlineLine}
                className="relative mb-2 block w-full max-w-4xl text-base font-medium tracking-tight text-slate-600 sm:mb-3 sm:text-lg lg:text-xl"
              >
                {t("eyebrow")}
              </motion.span>
              <motion.span
                variants={headlineLine}
                className="relative mb-3 block h-0.5 w-14 max-w-[min(5rem,24vw)] rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mb-4 sm:w-20"
                aria-hidden
              />
              <motion.h2
                id="faq-heading"
                variants={headlineLine}
                className="relative max-w-4xl text-balance text-3xl leading-[1.08] font-extrabold tracking-tight sm:text-4xl sm:leading-[1.06] lg:text-5xl lg:leading-[1.04]"
              >
                <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
                  {t("title")}
                </span>
              </motion.h2>
            </motion.header>

            <motion.div
              className="mt-2 border-t border-slate-200/70 pt-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={listContainer}
            >
              {FAQ_KEYS.map((key) => (
                <FaqRow
                  key={key}
                  itemKey={key}
                  groupId={groupId}
                  isOpen={openKey === key}
                  onToggle={() => setOpenKey(key)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
