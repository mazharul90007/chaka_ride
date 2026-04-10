"use client";

import { Armchair, ShieldCheck, CalendarRange, Sofa, MapPinned, CalendarDays, Wallet } from "lucide-react";
import ServicePageContent from "@/components/service/ServicePageContent";

export default function GroupTourMinibusPage() {
  return (
    <ServicePageContent
      slug="group-tour-minibus"
      featureIcons={[Armchair, ShieldCheck, CalendarRange]}
      whyIcons={[Sofa, MapPinned, CalendarDays, Wallet]}
      image="/assets/images/service/group-tour-car.jpg"
    />
  );
}
