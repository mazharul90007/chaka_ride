"use client";

import { Sun, LayoutGrid, Receipt, Clock, CarFront, ShieldCheck, CalendarCheck } from "lucide-react";
import ServicePageContent from "@/components/service/ServicePageContent";

export default function DailyCarRentalPage() {
  return (
    <ServicePageContent
      slug="daily-car-rental"
      featureIcons={[Sun, LayoutGrid, Receipt]}
      whyIcons={[Clock, CarFront, ShieldCheck, CalendarCheck]}
    />
  );
}
