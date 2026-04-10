"use client";

import { Wallet, CarFront, Settings2, BadgeDollarSign, UserCheck, FileText, Briefcase } from "lucide-react";
import ServicePageContent from "@/components/service/ServicePageContent";

export default function MonthlyCarRentalPage() {
  return (
    <ServicePageContent
      slug="monthly-car-rental"
      featureIcons={[Wallet, CarFront, Settings2]}
      whyIcons={[BadgeDollarSign, UserCheck, FileText, Briefcase]}
    />
  );
}
