import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">{t("title")}</h1>
      <p className="max-w-md text-slate-600">{t("description")}</p>
      <Link
        href="/"
        className="rounded-full bg-(--brand-primary) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--brand-primary-hover)"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
