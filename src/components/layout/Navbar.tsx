"use client";

import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher";
import { BD_DIVISIONS } from "@/data/bd-divisions";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { useCallback, useMemo, useState } from "react";

type DropdownItem = {
  label: string;
  href: string;
  children?: DropdownItem[];
};

/* ── Level-3 item (district links) ─────────────────────────────── */

function NavSubItem({ item }: { item: DropdownItem }) {
  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="block px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-(--brand-primary)"
        role="menuitem"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group/sub">
      <Link
        href={item.href}
        className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-(--brand-primary)"
        role="menuitem"
      >
        {item.label}
        <ChevronRight
          className="size-3.5 shrink-0 opacity-50"
          strokeWidth={2}
          aria-hidden
        />
      </Link>
      <div
        className="absolute top-0 left-full z-60 hidden min-w-[200px] pl-1.5 group-hover/sub:block"
        role="presentation"
      >
        <div
          className="max-h-80 overflow-y-auto rounded-lg border border-slate-200/80 bg-white py-1.5 shadow-lg"
          role="menu"
        >
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-(--brand-primary)"
              role="menuitem"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Level-2 item (division routes with district flyout) ───────── */

function NavDropdownItem({ item }: { item: DropdownItem }) {
  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="block px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-(--brand-primary)"
        role="menuitem"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group/nested">
      <Link
        href={item.href}
        className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-(--brand-primary)"
        role="menuitem"
      >
        {item.label}
        <ChevronRight
          className="size-3.5 shrink-0 opacity-50"
          strokeWidth={2}
          aria-hidden
        />
      </Link>
      <div
        className="absolute top-0 left-full z-55 hidden min-w-[210px] pl-1.5 group-hover/nested:block"
        role="presentation"
      >
        <div
          className="relative rounded-lg border border-slate-200/80 bg-white py-1.5 shadow-lg"
          role="menu"
        >
          {item.children.map((child) => (
            <NavSubItem key={child.href} item={child} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Level-1 dropdown panel ────────────────────────────────────── */

function NavDropdown({
  hasDropdown,
  items,
}: {
  hasDropdown: boolean;
  items: DropdownItem[] | undefined;
}) {
  if (!hasDropdown || !items?.length) {
    return null;
  }
  return (
    <div
      className="absolute top-full left-0 z-50 hidden min-w-[220px] pt-3 group-hover:block"
      role="presentation"
    >
      <div
        className="relative rounded-lg border border-slate-200/80 bg-white py-2 shadow-lg"
        role="menu"
      >
        {items.map((item) => (
          <NavDropdownItem key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ── Top-level nav link ────────────────────────────────────────── */

function NavLink({
  href,
  label,
  hasDropdown,
  activePaths,
  dropdownItems,
}: {
  href: string;
  label: string;
  hasDropdown: boolean;
  activePaths: string[];
  dropdownItems: DropdownItem[] | undefined;
}) {
  const pathname = usePathname();
  const active = activePaths.some((p) =>
    p === "/"
      ? pathname === "/"
      : pathname === p || pathname.startsWith(`${p}/`),
  );

  const classes = `inline-flex items-center gap-1 text-[15px] font-medium tracking-tight transition-colors ${
    active
      ? "text-(--brand-primary)"
      : "text-slate-900 hover:text-(--brand-primary)"
  }`;

  return (
    <div className="group relative">
      {hasDropdown ? (
        <span
          className={`${classes} cursor-default`}
          role="button"
          tabIndex={0}
        >
          {label}
          <ChevronDown
            className="size-[15px] opacity-80"
            strokeWidth={2}
            aria-hidden
          />
        </span>
      ) : (
        <Link href={href} className={classes}>
          {label}
        </Link>
      )}
      <NavDropdown hasDropdown={hasDropdown} items={dropdownItems} />
    </div>
  );
}

/* ── Mobile accordion menu ──────────────────────────────────────── */

function MobileAccordionItem({
  item,
  depth,
  onNavigate,
}: {
  item: DropdownItem;
  depth: number;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!item.children?.length;
  const pl = depth === 0 ? "" : depth === 1 ? "pl-4" : "pl-8";

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={`block py-2 text-[15px] font-medium text-slate-900 ${pl}`}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        className={`flex w-full items-center justify-between py-2 text-[15px] font-medium text-slate-900 ${pl}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={`size-4 shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="border-l border-slate-200 ml-2">
          {item.children!.map((child) => (
            <MobileAccordionItem
              key={child.href}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MobileNavMenu({
  items,
  onNavigate,
}: {
  items: { label: string; href: string; dropdown?: DropdownItem[] }[];
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      {items.map((item) =>
        item.dropdown?.length ? (
          <MobileAccordionItem
            key={item.href}
            item={{
              label: item.label,
              href: item.href,
              children: item.dropdown,
            }}
            depth={0}
            onNavigate={onNavigate}
          />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="py-2 text-[15px] font-medium text-slate-900"
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        ),
      )}
    </div>
  );
}

/* ── Navbar ─────────────────────────────────────────────────────── */

export default function Navbar() {
  const locale = useLocale() as "en" | "bn";
  const tNav = useTranslations("Nav");
  const tFooter = useTranslations("Footer");
  const tService = useTranslations("NavDropdown.service");
  const tCars = useTranslations("NavDropdown.cars");
  const tRent = useTranslations("RentMenu");

  const dropdowns = useMemo(
    () => ({
      service: [
        {
          label: tService("airportPickupDrop"),
          href: "/service/airport-pickup-drop",
        },
        {
          label: tService("groupTourMinibus"),
          href: "/service/group-tour-minibus",
        },
        {
          label: tService("hourlyCarRental"),
          href: "/service/hourly-car-rental",
        },
        {
          label: tService("dailyCarRental"),
          href: "/service/daily-car-rental",
        },
        {
          label: tService("monthlyCarRental"),
          href: "/service/monthly-car-rental",
        },
        {
          label: tService("weddingCarRental"),
          href: "/service/wedding-car-rental",
        },
        {
          label: tService("officePickAndDrop"),
          href: "/service/office-pick-and-drop",
        },
        { label: tService("emergencyDrop"), href: "/service/emergency-drop" },
      ] satisfies DropdownItem[],

      cars: [
        { label: tCars("noah"), href: "/cars/noah" },
        { label: tCars("hiace"), href: "/cars/hiace" },
        { label: tCars("sedanPremium"), href: "/cars/sedan-premium" },
        { label: tCars("sedanEconomy"), href: "/cars/sedan-economy" },
        { label: tCars("chanderGari"), href: "/cars/chander-gari" },
      ] satisfies DropdownItem[],

      rent: BD_DIVISIONS.map((fromDiv) => ({
        label: tRent("rentIn", { city: fromDiv.name[locale] }),
        href: `/rent/${fromDiv.slug}`,
        children: BD_DIVISIONS.map((toDiv) => ({
          label: tRent("route", {
            from: fromDiv.name[locale],
            to: toDiv.name[locale],
          }),
          href: `/rent/${fromDiv.slug}/to-${toDiv.slug}`,
          children: toDiv.districts.map((district) => ({
            label: tRent("route", {
              from: fromDiv.name[locale],
              to: district.name[locale],
            }),
            href: `/rent/${fromDiv.slug}-to-${district.slug}`,
          })),
        })),
      })) satisfies DropdownItem[],
    }),
    [locale, tService, tCars, tRent],
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const mobileNavItems = useMemo(
    () => [
      { label: tNav("home"), href: "/" },
      { label: tNav("service"), href: "/service", dropdown: dropdowns.service },
      { label: tNav("cars"), href: "/cars", dropdown: dropdowns.cars },
      { label: tNav("rent"), href: "/rent", dropdown: dropdowns.rent },
      { label: tNav("about"), href: "/about" },
      { label: tNav("contact"), href: "/contact" },
    ],
    [tNav, dropdowns],
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-300/50 bg-(--hero-bg)">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-6">
        <Link
          href="/"
          className="relative flex shrink-0 items-center gap-1 sm:gap-1.5"
        >
          <Image
            src="/assets/images/chaka_ride_logo.png"
            alt={tNav("logoAlt")}
            width={40}
            height={40}
            className="size-9 object-contain sm:size-10"
            priority
          />
          <span className="text-xl font-bold tracking-tight sm:text-[22px]">
            <span className="text-(--brand-primary)">CHAKA</span>
            <span className="text-slate-900">RIDE</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label={tNav("mainNav")}
        >
          <NavLink
            href="/"
            label={tNav("home")}
            hasDropdown={false}
            activePaths={["/"]}
            dropdownItems={undefined}
          />
          <NavLink
            href="/service"
            label={tNav("service")}
            hasDropdown
            activePaths={["/service"]}
            dropdownItems={dropdowns.service}
          />
          <NavLink
            href="/cars"
            label={tNav("cars")}
            hasDropdown
            activePaths={["/cars"]}
            dropdownItems={dropdowns.cars}
          />
          <NavLink
            href="/rent"
            label={tNav("rent")}
            hasDropdown
            activePaths={["/rent"]}
            dropdownItems={dropdowns.rent}
          />
          <NavLink
            href="/about"
            label={tNav("about")}
            hasDropdown={false}
            activePaths={["/about"]}
            dropdownItems={undefined}
          />
          <NavLink
            href="/contact"
            label={tNav("contact")}
            hasDropdown={false}
            activePaths={["/contact"]}
            dropdownItems={undefined}
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <a
            href={tFooter("socialWhatsapp")}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-wa-cta hidden items-center gap-2.5 rounded-full bg-(--brand-primary) px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-(--brand-primary-hover) sm:flex"
            aria-label={tNav("bookWhatsappAria")}
          >
            {tNav("bookWhatsapp")}
            <span className="nav-wa-cta__icon-ring flex size-8 items-center justify-center rounded-full bg-white transition-colors">
              <FaWhatsapp
                className="nav-wa-cta__icon size-4 text-(--brand-primary) transition-colors"
                aria-hidden
              />
            </span>
          </a>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-slate-900 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? tNav("closeMenu") : tNav("openMenu")}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-slate-200/50 bg-(--hero-bg) px-5 py-4 lg:hidden"
        >
          <div className="mb-4">
            <LocaleSwitcher />
          </div>
          <MobileNavMenu items={mobileNavItems} onNavigate={closeMobile} />
          <a
            href={tFooter("socialWhatsapp")}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-wa-cta mt-4 flex items-center justify-center gap-2 rounded-full bg-(--brand-primary) px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-(--brand-primary-hover)"
            aria-label={tNav("bookWhatsappAria")}
            onClick={closeMobile}
          >
            {tNav("bookWhatsapp")}
            <span className="nav-wa-cta__icon-ring flex size-8 items-center justify-center rounded-full bg-white transition-colors">
              <FaWhatsapp
                className="nav-wa-cta__icon size-4 text-(--brand-primary) transition-colors"
                aria-hidden
              />
            </span>
          </a>
        </div>
      ) : null}
    </header>
  );
}
