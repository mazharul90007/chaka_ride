"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HeroCarPicker } from "@/components/home/HeroCarPicker";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { SubmitEvent } from "react";

const HERO_IMAGE =
  "https://res.cloudinary.com/dycrowzen/image/upload/v1774623407/car_iaunmo.png";

const fieldClass =
  "h-10 border-slate-200/90 bg-white text-slate-900 shadow-sm md:h-11";

function openPicker(el: HTMLInputElement) {
  if (typeof el.showPicker !== "function") return;
  try {
    el.showPicker();
  } catch {
    /* ignore: not a direct user gesture or picker already open */
  }
}

function DateTimeFields({
  idPrefix,
  dateLabel,
  timeLabel,
  dateName,
  timeName,
}: {
  idPrefix: string;
  dateLabel: string;
  timeLabel: string;
  dateName: string;
  timeName: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
      <div className="min-w-0 flex-1">
        <Label htmlFor={`${idPrefix}-date`} className="sr-only">
          {dateLabel}
          <span className="text-destructive"> *</span>
        </Label>
        <Input
          id={`${idPrefix}-date`}
          name={dateName}
          type="date"
          required
          className={cn(fieldClass, "min-w-0")}
        />
      </div>
      <div className="min-w-0 flex-1">
        <Label htmlFor={`${idPrefix}-time`} className="sr-only">
          {timeLabel}
          <span className="text-destructive"> *</span>
        </Label>
        <Input
          id={`${idPrefix}-time`}
          name={timeName}
          type="time"
          required
          className={cn(fieldClass, "min-w-0 cursor-pointer")}
          onClick={(e) => openPicker(e.currentTarget)}
        />
      </div>
    </div>
  );
}

const labelClass = "text-sm font-semibold text-(--brand-primary)";

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

function RequiredMark() {
  return (
    <span className="text-destructive ml-0.5 font-bold" aria-hidden>
      *
    </span>
  );
}

export default function HeroSection() {
  const t = useTranslations("Hero");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("fullName") as string)?.trim() || "";

    Swal.fire({
      icon: "success",
      title: t("alertTitle", { name }),
      text: t("alertText"),
      confirmButtonText: t("alertButton"),
      confirmButtonColor: "var(--brand-primary)",
    });

    e.currentTarget.reset();
  }

  return (
    <section className="relative w-full overflow-x-hidden bg-(--hero-bg) pb-8 lg:pb-12">
      <div className="w-full px-4 pt-6 pb-2 sm:px-6 sm:pt-16 lg:px-10 lg:pt-8 xl:px-14">
        {/* Hero headline */}
        <div className="relative mx-auto max-w-5xl px-2">
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-56 w-[min(92vw,42rem)] -translate-x-1/2 -translate-y-[45%] rounded-full opacity-[0.45] blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 50%, color-mix(in srgb, var(--brand-primary) 42%, transparent) 0%, transparent 68%)",
            }}
            aria-hidden
          />
          <motion.h1
            className="relative w-full text-center"
            initial="hidden"
            animate="visible"
            variants={headlineContainer}
          >
            <motion.span
              variants={headlineLine}
              className="mb-2 block text-base font-medium tracking-tight text-slate-600 sm:mb-3 sm:text-lg lg:text-xl"
            >
              {t("headlineLine1")}
            </motion.span>
            <motion.span
              variants={headlineLine}
              className="mx-auto mb-3 block h-0.5 w-14 max-w-[min(5rem,24vw)] rounded-full bg-linear-to-r from-transparent via-(--brand-primary) to-transparent opacity-90 sm:mb-4 sm:w-20"
              aria-hidden
            />
            <motion.span
              variants={headlineLine}
              className="block text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl sm:leading-[1.06] lg:text-6xl lg:leading-[1.04] xl:text-7xl"
            >
              <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
                {t("headlineLine2")}
              </span>
            </motion.span>
          </motion.h1>
        </div>

        {/* Hero form */}
        <motion.div
          className="mt-8 w-full rounded-2xl bg-(--hero-form-bg) p-5 shadow-sm ring-1 ring-(--hero-form-ring) sm:mt-10 sm:p-7 lg:p-8"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <form
            className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2 lg:col-span-3">
              <Label htmlFor="hero-full-name" className={labelClass}>
                {t("fullName")}
                <RequiredMark />
              </Label>
              <Input
                id="hero-full-name"
                name="fullName"
                autoComplete="name"
                required
                placeholder={t("fullNamePlaceholder")}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2 lg:col-span-3">
              <Label htmlFor="hero-mobile" className={labelClass}>
                {t("mobileNumber")}
                <RequiredMark />
              </Label>
              <Input
                id="hero-mobile"
                name="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                placeholder={t("mobilePlaceholder")}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2 lg:col-span-3">
              <Label htmlFor="hero-pickup" className={labelClass}>
                {t("pickupLocation")}
                <RequiredMark />
              </Label>
              <Input
                id="hero-pickup"
                name="pickupLocation"
                required
                placeholder={t("pickupPlaceholder")}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2 lg:col-span-3">
              <Label htmlFor="hero-dropoff" className={labelClass}>
                {t("dropoffLocation")}
                <RequiredMark />
              </Label>
              <Input
                id="hero-dropoff"
                name="dropoffLocation"
                required
                placeholder={t("dropoffPlaceholder")}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2 lg:col-span-3">
              <Label htmlFor="hero-car-trigger" className={labelClass}>
                {t("chooseCar")}
                <RequiredMark />
              </Label>
              <HeroCarPicker fieldClass={fieldClass} />
            </div>
            <div
              role="group"
              aria-labelledby="hero-trip-type-label"
              className="flex min-w-0 flex-col gap-2 lg:col-span-3"
            >
              <span
                id="hero-trip-type-label"
                className={cn(labelClass, "block w-full")}
              >
                {t("tripType")}
                <RequiredMark />
              </span>
              <div className="flex gap-2">
                <label className="relative min-w-0 flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    className="peer sr-only"
                    defaultChecked
                    required
                  />
                  <span className="flex h-10 items-center justify-center rounded-lg border border-slate-200/90 bg-white px-2 text-center text-sm font-medium text-slate-800 shadow-sm peer-checked:border-(--brand-primary) peer-checked:text-(--brand-primary) peer-checked:ring-2 peer-checked:ring-(--brand-primary)/25 md:h-11">
                    {t("oneWay")}
                  </span>
                </label>
                <label className="relative min-w-0 flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    className="peer sr-only"
                  />
                  <span className="flex h-10 items-center justify-center rounded-lg border border-slate-200/90 bg-white px-2 text-center text-sm font-medium text-slate-800 shadow-sm peer-checked:border-(--brand-primary) peer-checked:text-(--brand-primary) peer-checked:ring-2 peer-checked:ring-(--brand-primary)/25 md:h-11">
                    {t("roundTrip")}
                  </span>
                </label>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2 lg:col-span-4">
              <span className={cn("block", labelClass)}>
                {t("pickupDateTime")}
                <RequiredMark />
              </span>
              <DateTimeFields
                idPrefix="pickup"
                dateName="pickupDate"
                timeName="pickupTime"
                dateLabel={t("dateLabel")}
                timeLabel={t("timeLabel")}
              />
            </div>
            <div className="flex items-end md:col-span-2 lg:col-span-2 lg:justify-end">
              <Button
                type="submit"
                size="lg"
                className="h-11 w-full max-w-xs shrink-0 rounded-xl border-0 bg-(--brand-primary) text-base font-semibold text-white shadow-sm hover:bg-(--brand-primary-hover) md:h-12"
              >
                {t("send")}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* View all cars button */}
        <motion.div
          className="my-4 flex w-full justify-center sm:mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/cars"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 gap-3 rounded-xl border-0 bg-(--brand-primary) px-8 text-base font-semibold text-white shadow-md transition-colors hover:bg-(--brand-primary-hover) sm:h-12 sm:px-10",
            )}
          >
            {t("viewAllCars")}
          </Link>
        </motion.div>
      </div>

      {/* Hero image */}
      <motion.div
        className="relative mt-2 w-full sm:-mt-2"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={HERO_IMAGE}
          alt={t("imageAlt")}
          width={1920}
          height={640}
          className="h-auto w-full object-contain object-bottom"
          sizes="100vw"
          priority
        />
      </motion.div>
    </section>
  );
}
