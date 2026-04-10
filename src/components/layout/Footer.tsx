"use client";

import { Link } from "@/i18n/navigation";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaFacebookF, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { type SubmitEvent, useCallback, useId, useState } from "react";

type ContactKey = "call" | "email" | "address";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const contactPanelId = useId();
  const [openContact, setOpenContact] = useState<ContactKey | null>("call");

  const toggleContact = useCallback((key: ContactKey) => {
    setOpenContact((prev) => (prev === key ? null : key));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function handleSubscribe(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", label: t("linkAbout") },
    { href: "/cars", label: t("linkCars") },
    { href: "/service", label: t("linkCarTypes") },
    { href: "/contact", label: t("linkContact") },
  ] as const;

  return (
    <footer
      className="relative z-10 mt-auto border-t border-slate-200/80 bg-(--footer-bg) pt-12 pb-6 sm:pt-14 sm:pb-8"
      aria-labelledby="footer-heading"
    >
      {/* Clip at page bottom: blur + translate would otherwise spill below the footer and read as extra gap / scroll. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 overflow-hidden sm:h-36"
        aria-hidden
      >
        <div
          className="absolute bottom-0 left-1/2 h-48 w-[min(100vw,40rem)] -translate-x-1/2 rounded-full opacity-[0.35] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--brand-primary) 28%, transparent), transparent 72%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <h2 id="footer-heading" className="sr-only">
          {t("footerNav")}
        </h2>

        {/* Main columns */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          {/* Brand + social */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 sm:gap-2"
            >
              <Image
                src="/assets/images/chaka_ride_logo.png"
                alt={tNav("logoAlt")}
                width={40}
                height={40}
                className="size-9 object-contain sm:size-10"
              />
              <span className="text-xl font-bold tracking-tight sm:text-[22px]">
                <span className="text-(--brand-primary)">CHAKA</span>
                <span className="text-slate-900">RIDE</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-pretty text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {t("brandBlurb")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={t("socialWhatsapp")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full border-2 border-(--brand-primary) text-(--brand-primary) transition-colors hover:bg-(--brand-primary) hover:text-white"
                aria-label={t("socialWhatsappAria")}
              >
                <FaWhatsapp className="size-5" aria-hidden />
              </a>
              <a
                href={t("socialFacebook")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full border-2 border-(--brand-primary) text-(--brand-primary) transition-colors hover:bg-(--brand-primary) hover:text-white"
                aria-label={t("socialFacebookAria")}
              >
                <FaFacebookF className="size-[1.05rem]" aria-hidden />
              </a>
              <a
                href={t("socialYoutube")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-11 items-center justify-center rounded-full border-2 border-(--brand-primary) text-(--brand-primary) transition-colors hover:bg-(--brand-primary) hover:text-white"
                aria-label={t("socialYoutubeAria")}
              >
                <FaYoutube className="size-5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-4 lg:col-start-5">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
              {t("quickLinksTitle")}
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href} className="flex items-start gap-2.5">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-(--brand-primary)"
                    aria-hidden
                  />
                  <Link
                    href={href}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-(--brand-primary) sm:text-[15px]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
              {t("subscribeTitle")}
            </h3>
            <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {t("subscribeBlurb")}
            </p>
            <form
              className="mt-5 flex max-w-md items-center gap-1 rounded-full border-2 border-(--brand-primary)/35 bg-white py-1 pr-1 pl-4 shadow-sm ring-1 ring-slate-200/60 focus-within:border-(--brand-primary)/55 focus-within:ring-(--brand-primary)/20"
              onSubmit={handleSubscribe}
            >
              <label htmlFor="footer-email" className="sr-only">
                {t("emailLabel")}
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("emailPlaceholder")}
                className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:outline-none"
              />
              <button
                type="submit"
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--brand-primary) text-white transition-colors hover:bg-(--brand-primary-hover) focus-visible:ring-2 focus-visible:ring-(--brand-primary) focus-visible:ring-offset-2 focus-visible:outline-none sm:size-11"
                aria-label={t("subscribeSubmitAria")}
              >
                <ArrowUpRight
                  className="size-5"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </button>
            </form>

            <div className="mt-4 flex max-w-xl items-start gap-3 sm:gap-4">
              <div className="shrink-0">
                <div className="inline-flex items-center gap-0.5 rounded-full bg-slate-900/4 p-1 ring-1 ring-slate-900/6">
                  {(
                    [
                      {
                        key: "call" as const,
                        label: t("callTitle"),
                        icon: Phone,
                      },
                      {
                        key: "email" as const,
                        label: t("writeTitle"),
                        icon: Mail,
                      },
                      {
                        key: "address" as const,
                        label: t("addressTitle"),
                        icon: MapPin,
                      },
                    ] as const
                  ).map(({ key, label, icon: Icon }) => {
                    const isOpen = openContact === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleContact(key)}
                        aria-expanded={isOpen}
                        aria-controls={contactPanelId}
                        title={label}
                        className={`relative flex size-11 cursor-pointer items-center justify-center rounded-full transition-[color,background-color,transform] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-(--brand-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--footer-bg) focus-visible:outline-none sm:size-12 ${
                          isOpen
                            ? "bg-(--brand-primary) text-white shadow-sm"
                            : "text-slate-500 hover:bg-white/80 hover:text-(--brand-primary)"
                        }`}
                      >
                        <Icon
                          className="size-[1.2rem] sm:size-[1.35rem]"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <span className="sr-only">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                id={contactPanelId}
                className="min-h-14 min-w-0 flex-1 border-l border-slate-200/70 pl-3 sm:min-h-15 sm:pl-4"
                aria-live="polite"
              >
                {openContact ? (
                  <div>
                    {openContact === "call" && (
                      <div>
                        <p className="text-[11px] font-medium text-slate-500">
                          {t("callTitle")}
                        </p>
                        <a
                          href={`tel:${t("callTel")}`}
                          className="mt-0.5 block text-lg font-semibold tracking-tight text-slate-900 transition-colors hover:text-(--brand-primary) sm:text-xl"
                        >
                          {t("callValue")}
                        </a>
                      </div>
                    )}
                    {openContact === "email" && (
                      <div>
                        <p className="text-[11px] font-medium text-slate-500">
                          {t("writeTitle")}
                        </p>
                        <a
                          href={`mailto:${t("writeEmail")}`}
                          className="mt-0.5 block break-all text-sm font-medium leading-snug text-slate-900 transition-colors hover:text-(--brand-primary) sm:text-[15px]"
                        >
                          {t("writeValue")}
                        </a>
                      </div>
                    )}
                    {openContact === "address" && (
                      <div>
                        <p className="text-[11px] font-medium text-slate-500">
                          {t("addressTitle")}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-slate-800 sm:text-[15px]">
                          {t("addressValue")}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="flex h-full min-h-14 items-center sm:min-h-15"
                    aria-hidden
                  >
                    <div className="flex gap-2 opacity-35">
                      <span className="size-1 rounded-full bg-slate-400" />
                      <span className="size-1 rounded-full bg-slate-400" />
                      <span className="size-1 rounded-full bg-slate-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 sm:flex-row sm:pt-7">
          <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
            {t("copyright", { year })}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex size-10 items-center justify-center rounded-full border-2 border-(--brand-primary) text-(--brand-primary) transition-colors hover:bg-(--brand-primary) hover:text-white focus-visible:ring-2 focus-visible:ring-(--brand-primary) focus-visible:ring-offset-2 focus-visible:outline-none sm:size-11"
            aria-label={t("backToTopAria")}
          >
            <ArrowUp className="size-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
