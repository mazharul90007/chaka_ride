"use client";

import { Clock, Car, UserRound, BadgeDollarSign, UserCheck, Timer, Headset } from "lucide-react";
import ServicePageContent from "@/components/service/ServicePageContent";

export default function HourlyCarRentalPage() {
  return (
    <ServicePageContent
      slug="hourly-car-rental"
      featureIcons={[Clock, Car, UserRound]}
      whyIcons={[BadgeDollarSign, UserCheck, Timer, Headset]}
    />
  );
}
