import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-(--brand-primary) shadow-sm">
        <span className="text-3xl font-black">404</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto max-w-md text-base text-slate-600 dark:text-slate-400">
          {t("description")}
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-(--brand-primary) px-8 py-3 text-base font-bold text-white shadow-md transition-all hover:bg-(--brand-primary-hover) active:scale-95"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
