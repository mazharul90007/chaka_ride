"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import type { SubmitEvent } from "react";

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

const cardReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
} as const;

const fieldClass = "h-11 border-slate-200/90 bg-white text-slate-900 shadow-sm";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const tFooter = useTranslations("Footer");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const contactCards = [
    {
      icon: Phone,
      title: t("callTitle"),
      value: t("callValue"),
      href: `tel:${t("callTel")}`,
    },
    {
      icon: Mail,
      title: t("emailTitle"),
      value: t("emailValue"),
      href: `mailto:${t("emailAddress")}`,
    },
    {
      icon: MapPin,
      title: t("addressTitle"),
      value: t("addressValue"),
      href: undefined,
    },
    {
      icon: Clock,
      title: t("hoursTitle"),
      value: t("hoursValue"),
      href: undefined,
    },
  ] as const;

  return (
    <>
      {/* Hero banner */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) pb-4 sm:pb-6">
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

      {/* Main content: form + info */}
      <section className="relative w-full bg-(--hero-bg) pb-10 sm:pb-12 lg:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
            {/* Contact form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {t("formTitle")}
                </h2>
                <form
                  className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="text-sm font-semibold text-(--brand-primary)"
                    >
                      {t("nameLabel")}
                      <span className="ml-0.5 font-bold text-destructive">
                        *
                      </span>
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder={t("namePlaceholder")}
                      className={fieldClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="text-sm font-semibold text-(--brand-primary)"
                    >
                      {t("emailLabel")}
                      <span className="ml-0.5 font-bold text-destructive">
                        *
                      </span>
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder={t("emailPlaceholder")}
                      className={fieldClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-phone"
                      className="text-sm font-semibold text-(--brand-primary)"
                    >
                      {t("phoneLabel")}
                    </Label>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={t("phonePlaceholder")}
                      className={fieldClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-subject"
                      className="text-sm font-semibold text-(--brand-primary)"
                    >
                      {t("subjectLabel")}
                      <span className="ml-0.5 font-bold text-destructive">
                        *
                      </span>
                    </Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      required
                      placeholder={t("subjectPlaceholder")}
                      className={fieldClass}
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label
                      htmlFor="contact-message"
                      className="text-sm font-semibold text-(--brand-primary)"
                    >
                      {t("messageLabel")}
                      <span className="ml-0.5 font-bold text-destructive">
                        *
                      </span>
                    </Label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder={t("messagePlaceholder")}
                      className={cn(
                        fieldClass,
                        "h-auto min-h-[120px] w-full resize-y rounded-md border px-3 py-2 text-sm",
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 w-full gap-2 rounded-xl border-0 bg-(--brand-primary) text-base font-semibold text-white shadow-sm hover:bg-(--brand-primary-hover) sm:w-auto sm:px-10"
                    >
                      <Send className="size-4" strokeWidth={2} aria-hidden />
                      {t("send")}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Contact info sidebar */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <div className="space-y-5">
                <motion.h2
                  variants={cardReveal}
                  className="text-xl font-bold text-slate-900 sm:text-2xl"
                >
                  {t("infoTitle")}
                </motion.h2>

                {contactCards.map(({ icon: Icon, title, value, href }) => (
                  <motion.div
                    key={title}
                    variants={cardReveal}
                    className="flex gap-4 rounded-2xl border border-(--brand-primary)/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-(--brand-primary)/12 bg-white shadow-sm ring-1 ring-(--brand-primary)/6">
                      <Icon
                        className="size-5 text-(--brand-primary)"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
                        {title}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 block text-[15px] font-semibold text-slate-900 transition-colors hover:text-(--brand-primary)"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-[15px] font-semibold text-slate-900">
                          {value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* WhatsApp card */}
                <motion.a
                  variants={cardReveal}
                  href={t("whatsappHref")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-wa-cta flex gap-4 rounded-2xl border border-(--brand-primary)/15 bg-(--brand-primary) p-5 shadow-md transition-colors hover:bg-(--brand-primary-hover)"
                >
                  <div className="nav-wa-cta__icon-ring flex size-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <FaWhatsapp
                      className="nav-wa-cta__icon size-6 text-(--brand-primary)"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium tracking-wide text-white/75 uppercase">
                      {t("whatsappTitle")}
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-white">
                      {t("whatsappValue")}
                    </p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="relative w-full overflow-hidden bg-(--hero-bg) pt-0 pb-16 sm:pb-20 lg:pb-24">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-72 w-[min(100vw,52rem)] -translate-x-1/2 rounded-full opacity-[0.3] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 28%, transparent), transparent 72%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Section header */}
          <motion.div
            className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-72px" }}
            variants={headlineContainer}
          >
            <motion.p
              variants={headlineLine}
              className="text-base font-semibold text-(--brand-primary) sm:text-lg"
            >
              {t("mapEyebrow")}
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
                {t("mapTitle")}
              </span>
            </motion.h2>
            <motion.p
              variants={headlineLine}
              className="mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-600 sm:text-base"
            >
              {t("mapSubtitle")}
            </motion.p>
          </motion.div>

          {/* Map card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative border glow */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-3xl opacity-50 blur-md"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 25%, transparent), transparent 50%, color-mix(in srgb, var(--brand-primary) 15%, transparent))",
              }}
              aria-hidden
            />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg">
              <iframe
                title={t("addressTitle")}
                src="https://maps.google.com/maps?q=P9VF%2BM6H+Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="480"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />

              {/* Floating info card */}
              <div className="absolute bottom-5 left-5 z-10 max-w-xs rounded-xl border border-white/40 bg-white/95 p-4 shadow-xl ring-1 ring-slate-900/5 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--brand-primary) shadow-sm">
                    <MapPin
                      className="size-5 text-white"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">
                      Chaka Ride
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                      {t("addressValue")}
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=P9VF%2BM6H+Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-(--brand-primary) px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-(--brand-primary-hover)"
                >
                  <MapPin className="size-3.5" strokeWidth={2.5} aria-hidden />
                  {t("mapDirections")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
