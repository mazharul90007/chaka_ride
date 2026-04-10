"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa6";

const TESTIMONIALS = [
  {
    key: "1" as const,
    image: "/assets/images/testimonials/customer1.jpg",
    rating: 5 as const,
  },
  {
    key: "2" as const,
    image: "/assets/images/testimonials/customer2.jpg",
    rating: 4 as const,
  },
  {
    key: "3" as const,
    image: "/assets/images/testimonials/customer3.jpg",
    rating: 5 as const,
  },
];

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
} as const;

const headlineLine = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const cardsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
} as const;

const cardReveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

function StarRating({ label, filled }: { label: string; filled: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < filled;
        return (
          <Star
            key={i}
            className={cn(
              "size-3.5 shrink-0 sm:size-4",
              isFilled
                ? "fill-(--brand-primary) text-(--brand-primary)"
                : "fill-slate-100 text-slate-300",
            )}
            strokeWidth={isFilled ? 0 : 1.35}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[number] }) {
  const t = useTranslations("Testimonials");
  const quote = t(`items.${item.key}.quote`);
  const name = t(`items.${item.key}.name`);

  return (
    <motion.article
      variants={cardReveal}
      className="relative flex min-h-[280px] flex-col rounded-[1.35rem] border border-slate-200/90 bg-white/85 p-6 pb-24 shadow-sm ring-1 ring-(--brand-primary)/8 backdrop-blur-sm transition-shadow duration-300 hover:shadow-md sm:min-h-[300px] sm:rounded-3xl sm:p-7 sm:pb-28"
    >
      <div className="absolute -top-1 -right-1 z-10 flex min-h-13 min-w-27 items-center justify-center rounded-bl-2xl bg-(--hero-bg) px-3 py-2 sm:min-h-14 sm:min-w-30">
        <StarRating
          filled={item.rating}
          label={t("starsLabel", { count: item.rating })}
        />
      </div>

      <FaQuoteLeft
        className="mb-1 size-7 shrink-0 text-(--brand-primary) sm:size-9"
        aria-hidden
      />

      <blockquote className="relative z-0 flex-1 py-4">
        <p className="text-pretty text-sm leading-relaxed text-slate-700 sm:text-[15px]">
          {quote}
        </p>
      </blockquote>

      <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3 sm:bottom-6 sm:left-6">
        <div
          className="relative size-14 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md ring-2 ring-slate-200/90 sm:size-16"
          style={{
            boxShadow:
              "0 0 0 4px color-mix(in srgb, var(--brand-primary) 7%, white)",
          }}
        >
          <Image
            src={item.image}
            alt={t("avatarAlt", { name })}
            width={128}
            height={128}
            className="size-full object-cover"
            sizes="64px"
          />
        </div>
        <div className="min-w-0 pt-1">
          <p className="truncate text-base font-bold text-slate-900 sm:text-lg">
            {name}
          </p>
          <p className="text-sm text-slate-600">{t("role")}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("Testimonials");

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-x-hidden bg-(--hero-bg) py-8 sm:py-10 lg:py-12"
      aria-labelledby="testimonials-heading"
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

        {/* Headline */}
        <motion.header
          className="relative mx-auto mb-10 max-w-3xl text-center sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
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
            id="testimonials-heading"
            variants={headlineLine}
            className="text-balance text-3xl leading-[1.12] font-extrabold tracking-tight sm:text-4xl sm:leading-[1.1] lg:text-5xl lg:leading-[1.08]"
          >
            <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
              {t("title")}
            </span>
          </motion.h2>
        </motion.header>

        {/* Testimonials cards */}
        <motion.div
          className="relative grid gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-48px" }}
          variants={cardsContainer}
        >
          {TESTIMONIALS.map((item) => (
            <TestimonialCard key={item.key} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
