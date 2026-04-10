import LenisProvider from "@/providers/LenisProvider";
import MotionProvider from "@/providers/MotionProvider";
import QueryProviders from "@/providers/QueryProvider";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} h-full scroll-pt-[72px] antialiased`}
    >
      <body
        className={`flex min-h-full flex-col font-sans ${locale === "bn" ? "font-bengali" : ""}`}
      >
        <QueryProviders>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <LenisProvider>
              <MotionProvider>{children}</MotionProvider>
            </LenisProvider>
          </NextIntlClientProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
