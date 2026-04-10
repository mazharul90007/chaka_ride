"use client";

import { CalendarClock, PiggyBank, Timer, RefreshCw, BadgeDollarSign, Clock, Snowflake } from "lucide-react";
import ServicePageContent from "@/components/service/ServicePageContent";

export default function OfficePickAndDropPage() {
  return (
    <ServicePageContent
      slug="office-pick-and-drop"
      featureIcons={[CalendarClock, PiggyBank, Timer]}
      whyIcons={[RefreshCw, BadgeDollarSign, Clock, Snowflake]}
      image="/assets/images/service/office-car.jpg"
    />
  );
}
