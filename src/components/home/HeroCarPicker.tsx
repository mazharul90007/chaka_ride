"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useGetCategories } from "@/hooks/useCarCategory";

type Props = {
  fieldClass: string;
};

export function HeroCarPicker({ fieldClass }: Props) {
  const t = useTranslations("Hero");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const rootRef = useRef<HTMLDivElement>(null);

  const { data: categoriesData, isLoading } = useGetCategories();
  const categories = categoriesData?.data || [];

  const selectedOption = categories.find((c) => c.id === selected);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function handleAISelection(e: any) {
      if (e.detail) {
        setSelected(e.detail);
      }
    }
    document.addEventListener("keydown", handleKey);
    window.addEventListener('selectCarCategory', handleAISelection);
    return () => {
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener('selectCarCategory', handleAISelection);
    };
  }, []);

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default bg-slate-900/15"
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div ref={rootRef} className={cn("relative", open && "z-50")}>
        <input type="hidden" name="carCategoryId" value={selected} required />
        <Button
          id="hero-car-trigger"
          type="button"
          variant="outline"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? "hero-car-listbox" : undefined}
          className={cn(
            fieldClass,
            "h-10 w-full justify-between border-slate-200/90 bg-white px-2.5 font-normal text-slate-900 shadow-sm hover:bg-white md:h-11",
          )}
        >
          <span
            className={cn(
              "flex min-w-0 flex-1 flex-col items-start gap-0 text-left sm:flex-row sm:items-center sm:gap-2",
              !selected && "text-muted-foreground",
            )}
          >
            {selected && selectedOption ? (
              <>
                <span className="truncate font-medium">
                  {selectedOption.categoryName}
                </span>
                <span className="truncate text-xs text-slate-500 sm:text-sm">
                  {selectedOption.seat} Seats
                </span>
              </>
            ) : (
              <span className="truncate">{t("chooseCarPlaceholder")}</span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 opacity-70 transition-transform",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </Button>
        {open ? (
          <div
            id="hero-car-listbox"
            role="listbox"
            aria-label={t("chooseCar")}
            className="absolute top-full right-0 left-0 z-50 mt-2 max-h-[min(280px,52vh)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-3 shadow-xl ring-1 ring-black/5 sm:left-auto sm:min-w-[min(100%,22rem)]"
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {isLoading ? (
                <div className="col-span-full py-8 flex justify-center text-slate-400">
                  <Loader2 className="size-6 animate-spin" />
                </div>
              ) : categories.length === 0 ? (
                <div className="col-span-full py-8 text-center text-sm text-slate-400">
                  No cars available
                </div>
              ) : categories.map((car) => (
                <button
                  key={car.id}
                  type="button"
                  role="option"
                  aria-selected={selected === car.id}
                  onClick={() => {
                    setSelected(car.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50/90 p-2 transition-colors hover:border-(--brand-primary)/45 hover:bg-white",
                    selected === car.id &&
                      "border-(--brand-primary) bg-white ring-2 ring-(--brand-primary)/20",
                  )}
                >
                  <div className="relative flex h-12 w-full items-center justify-center sm:h-14">
                    {car.categoryIcon ? (
                      <img
                        src={car.categoryIcon}
                        alt={car.categoryName}
                        className="max-h-full w-auto max-w-full object-contain mix-blend-multiply"
                      />
                    ) : (
                      <div className="size-8 bg-slate-200 rounded-full animate-pulse" />
                    )}
                  </div>
                  <span className="flex w-full flex-col gap-0.5 text-center">
                    <span className="text-[11px] leading-tight font-medium text-slate-800 sm:text-xs">
                      {car.categoryName}
                    </span>
                    <span className="text-[10px] leading-tight font-medium text-(--brand-primary)/90 sm:text-[11px]">
                      {car.seat} Seats
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
