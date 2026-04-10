"use client";

import { Plane, UserCheck, BadgeDollarSign, Radar, UserRound, CarFront, Headset } from "lucide-react";
import ServicePageContent from "@/components/service/ServicePageContent";

export default function AirportPickupDropPage() {
  return (
    <ServicePageContent
      slug="airport-pickup-drop"
      featureIcons={[Plane, UserCheck, BadgeDollarSign]}
      whyIcons={[Radar, UserRound, CarFront, Headset]}
      image="/assets/images/service/airport-car.jpg"
    />
  );
}
