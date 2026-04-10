"use client";

import { motion } from "framer-motion";
import {
  Car,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MapPinned,
  Shield,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
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

const statPop = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const cardFloat = {
  hidden: { opacity: 0, y: 40, scale: 0.92, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const ACCENT_COLORS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-yellow-400",
  "from-rose-500 to-pink-400",
  "from-indigo-500 to-blue-400",
];

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={statPop}
      whileHover={{
        y: -5,
        scale: 1.03,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-(--brand-primary)/10 bg-white/80 px-6 py-7 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-(--brand-primary)/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative text-3xl font-extrabold tracking-tight text-(--brand-primary) sm:text-4xl">
        {value}
      </span>
      <span className="relative text-sm font-medium text-slate-600">
        {label}
      </span>
    </motion.div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
}) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.div
      variants={cardFloat}
      whileHover={{
        y: -6,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
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

      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
        {body}
      </p>
    </motion.div>
  );
}

const VALUE_ICONS: LucideIcon[] = [
  Shield,
  HeartHandshake,
  Users,
  MapPinned,
  Clock,
  Sparkles,
];

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const tFooter = useTranslations("Footer");

  return (
    <>
      {/* Hero banner */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) pb-12 sm:pb-16 lg:pb-20">
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 z-0 h-72 w-[min(100vw,48rem)] -translate-x-1/2 rounded-full opacity-[0.4] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 32%, transparent), transparent 72%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-8 text-center sm:px-6 sm:pt-12 lg:pt-12">
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
              {t("intro")}
            </motion.p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="relative z-10 mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 px-4 sm:mt-16 sm:grid-cols-4 sm:gap-6 sm:px-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <StatCard value={t("stat1Value")} label={t("stat1Label")} />
          <StatCard value={t("stat2Value")} label={t("stat2Label")} />
          <StatCard value={t("stat3Value")} label={t("stat3Label")} />
          <StatCard value={t("stat4Value")} label={t("stat4Label")} />
        </motion.div>
      </section>

      {/* Mission section */}
      <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        {/* Decorative background accents */}
        <div
          className="pointer-events-none absolute -top-20 -left-20 z-0 h-80 w-80 rounded-full opacity-[0.06] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--brand-primary), transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 z-0 h-72 w-72 rounded-full opacity-[0.05] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.8), transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image side */}
            <motion.div
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
              initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="relative">
                {/* Decorative frame behind the image */}
                <div className="absolute -top-3 -left-3 z-0 h-full w-full rounded-2xl border-2 border-dashed border-(--brand-primary)/20 sm:-top-4 sm:-left-4" />

                <div className="relative z-10 aspect-4/3 w-full overflow-hidden rounded-2xl bg-slate-100 shadow-xl ring-1 ring-slate-200/60">
                  <Image
                    src="/assets/images/why_chose_us/purbachal.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <Image
                  src="/assets/images/why_chose_us/car-png.png"
                  alt=""
                  width={640}
                  height={340}
                  className="pointer-events-none absolute -bottom-6 left-1/2 z-20 h-auto w-[85%] max-w-none -translate-x-1/2 object-contain drop-shadow-[0_20px_40px_rgba(15,23,42,0.22)]"
                  sizes="(max-width: 1024px) 80vw, 400px"
                />

                {/* Floating badge */}
                <motion.div
                  className="absolute -right-3 top-6 z-20 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-slate-100 sm:-right-5 sm:top-8"
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-(--brand-primary)/10">
                    <Car
                      className="size-5 text-(--brand-primary)"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold leading-none text-slate-900">
                      {t("stat2Value")}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {t("stat2Label")}
                    </p>
                  </div>
                </motion.div>

                {/* Floating badge bottom-left */}
                <motion.div
                  className="absolute -left-3 bottom-12 z-20 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-slate-100 sm:-left-5 sm:bottom-14"
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50">
                    <Target
                      className="size-5 text-emerald-600"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold leading-none text-slate-900">
                      {t("stat1Value")}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {t("stat1Label")}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-72px" }}
              variants={headlineContainer}
            >
              <motion.p
                variants={headlineLine}
                className="flex items-center gap-2 text-base font-semibold text-(--brand-primary) sm:text-lg"
              >
                {t("missionEyebrow")}
              </motion.p>
              <motion.span
                variants={headlineLine}
                className="mt-3 mb-3 block h-0.5 w-14 rounded-full bg-linear-to-r from-(--brand-primary) to-transparent opacity-80 sm:mt-4 sm:mb-4 sm:w-20"
                aria-hidden
              />
              <motion.h2
                variants={headlineLine}
                className="text-balance text-2xl leading-[1.15] font-extrabold tracking-tight sm:text-3xl lg:text-4xl"
              >
                <span className="bg-linear-to-br from-[#0f2744] from-25% via-[#1e4a8c] via-55% to-[#2d7dd2] bg-clip-text text-transparent">
                  {t("missionTitle")}
                </span>
              </motion.h2>
              <motion.p
                variants={headlineLine}
                className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-600 sm:text-base"
              >
                {t("missionBody")}
              </motion.p>

              {/* Highlight checklist */}
              <motion.ul variants={headlineLine} className="mt-7 space-y-3">
                {([1, 2, 3] as const).map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-(--brand-primary)/10">
                      <CheckCircle2
                        className="size-4 text-(--brand-primary)"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="text-[15px] leading-relaxed text-slate-700 sm:text-base">
                      {t(`missionHighlight${n}`)}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="relative w-full overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute top-0 right-0 z-0 h-96 w-96 translate-x-1/3 -translate-y-1/4 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(45,125,210,0.3), transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-80 w-80 -translate-x-1/4 translate-y-1/4 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.3), transparent 70%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <motion.header
            className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-72px" }}
            variants={headlineContainer}
          >
            <motion.p
              variants={headlineLine}
              className="text-base font-semibold text-(--brand-primary) sm:text-lg"
            >
              {t("valuesEyebrow")}
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
                {t("valuesTitle")}
              </span>
            </motion.h2>
          </motion.header>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            style={{ perspective: "1000px" }}
          >
            {([1, 2, 3, 4, 5, 6] as const).map((n) => (
              <ValueCard
                key={n}
                icon={VALUE_ICONS[n - 1]}
                title={t(`value${n}Title`)}
                body={t(`value${n}Body`)}
                index={n - 1}
              />
            ))}
          </motion.div>
        </div>
      </section>

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
