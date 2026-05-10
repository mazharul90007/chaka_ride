"use client";

import { useGetCategories } from "@/hooks/useCarCategory";

interface CategorySelectProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const CategorySelect = ({ value, onChange, disabled }: CategorySelectProps) => {
  const { data: categoriesData, isLoading } = useGetCategories();
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium outline-none focus:border-(--brand-primary) transition-all appearance-none cursor-pointer"
      disabled={disabled || isLoading}
    >
      <option value="">Select Category</option>
      {categoriesData?.data?.map((cat: any) => (
        <option key={cat.id} value={cat.id}>
          {cat.categoryName}
        </option>
      ))}
    </select>
  );
};
