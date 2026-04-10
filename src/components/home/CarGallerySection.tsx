"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const GALLERY = [
  {
    key: "noah" as const,
    image: "/assets/images/car-gallery/noah-car.jpg",
    href: "/cars/noah",
  },
  {
    key: "hiace" as const,
    image: "/assets/images/car-gallery/hiace-car2.jpg",
    href: "/cars/hiace",
  },
  {
    key: "sedan" as const,
    image: "/assets/images/car-gallery/sedan-car.jpg",
    href: "/cars/sedan-economy",
  },
  {
    key: "premium" as const,
    image: "/assets/images/car-gallery/sedan-premium-car.jpg",
    href: "/cars/sedan-premium",
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

export default function CarGallerySection() {
  const t = useTranslations("CarGallery");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-gallery-card]");
    const gap = 20;
    const step = (card?.offsetWidth ?? el.clientWidth * 0.72) + gap;
    el.scrollBy({
      left: dir === "next" ? step : -step,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="car-gallery"
      className="relative w-full overflow-x-hidden bg-(--hero-bg) py-8 sm:py-10 lg:py-12"
      aria-labelledby="car-gallery-heading"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-64 w-[min(100vw,48rem)] -translate-x-1/2 rounded-full opacity-[0.32] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 30%, transparent), transparent 72%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.header
          className="mb-8 flex flex-col items-center gap-6 sm:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-64px" }}
          variants={headlineContainer}
        >
          <div className="flex flex-col items-center text-center">
            <motion.p
              variants={headlineLine}
              className="text-base font-medium tracking-tight text-slate-600 sm:text-lg"
            >
              {t("eyebrow")}
            </motion.p>
            <motion.span
              variants={headlineLine}
              className="mx-auto mt-3 mb-3 block h-0.5 w-14 rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mt-4 sm:mb-4 sm:w-20"
              aria-hidden
            />
            <motion.h2
              id="car-gallery-heading"
              variants={headlineLine}
              className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              {t("title")}
            </motion.h2>
          </div>

          <motion.div
            variants={headlineLine}
            className="flex items-center gap-3"
            role="group"
            aria-label={t("navLabel")}
          >
            <button
              type="button"
              onClick={() => scrollByDir("prev")}
              className="flex size-11 items-center justify-center rounded-full bg-(--brand-primary) text-white shadow-md transition-colors hover:bg-(--brand-primary-hover) focus-visible:ring-2 focus-visible:ring-(--brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--hero-bg) focus-visible:outline-none sm:size-12"
              aria-label={t("prev")}
            >
              <ChevronLeft className="size-6" strokeWidth={2.25} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByDir("next")}
              className="flex size-11 items-center justify-center rounded-full bg-(--brand-primary) text-white shadow-md transition-colors hover:bg-(--brand-primary-hover) focus-visible:ring-2 focus-visible:ring-(--brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--hero-bg) focus-visible:outline-none sm:size-12"
              aria-label={t("next")}
            >
              <ChevronRight className="size-6" strokeWidth={2.25} aria-hidden />
            </button>
          </motion.div>
        </motion.header>

        <div
          ref={scrollRef}
          className={cn(
            "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5",
            "lg:grid lg:snap-none lg:grid-cols-4 lg:gap-4 lg:overflow-visible",
            "[&::-webkit-scrollbar]:hidden",
          )}
          tabIndex={0}
          aria-label={t("stripLabel")}
        >
          {GALLERY.map((item) => (
            <GalleryCard
              key={item.key}
              item={item}
              title={t(`cards.${item.key}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  title,
}: {
  item: (typeof GALLERY)[number];
  title: string;
}) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isActive = pressed || hovered;

  return (
    <Link
      href={item.href}
      data-gallery-card
      className={cn(
        "group/card relative aspect-3/5 min-w-[min(82vw,280px)] shrink-0 snap-center overflow-hidden rounded-[1.75rem] shadow-lg ring-1 ring-slate-200/80",
        "transition-shadow duration-300 hover:shadow-xl hover:ring-slate-300/90",
        "lg:min-w-0",
        "touch-manipulation",
      )}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => {
        setPressed(false);
        setHovered(false);
      }}
      onPointerCancel={() => setPressed(false)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
    >
      <motion.div
        className="absolute inset-0 origin-center"
        whileHover={{ scale: 1.09 }}
        whileTap={{ scale: 1.09 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <Image
          src={item.image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 82vw, 25vw"
          priority={false}
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-linear-to-b from-slate-950/55 via-slate-950/10 to-slate-950/40"
        aria-hidden
      />

      <h3 className="pointer-events-none absolute top-4 left-4 z-10 max-w-[min(100%,12rem)] text-lg font-bold tracking-tight text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.55)] sm:top-5 sm:left-5 sm:text-xl">
        {title}
      </h3>

      <span
        className={cn(
          "pointer-events-none absolute right-4 bottom-4 z-10 flex size-11 items-center justify-center rounded-full bg-(--brand-primary) text-white shadow-md ring-2 ring-white/30 transition-all duration-200 sm:right-5 sm:bottom-5 sm:size-12",
          isActive &&
            "scale-105 bg-(--brand-primary-hover) shadow-lg ring-white/40",
        )}
        aria-hidden
      >
        <motion.span
          className="flex items-center justify-center will-change-transform"
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArrowUpRight
            className="size-5 sm:size-[1.35rem]"
            strokeWidth={2.4}
          />
        </motion.span>
      </span>
    </Link>
  );
}
