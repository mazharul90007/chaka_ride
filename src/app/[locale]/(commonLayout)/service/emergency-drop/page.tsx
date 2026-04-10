"use client";

import { Zap, PhoneCall, Route, Timer, Shield, UserCheck, MessageCircle } from "lucide-react";
import ServicePageContent from "@/components/service/ServicePageContent";

export default function EmergencyDropPage() {
  return (
    <ServicePageContent
      slug="emergency-drop"
      featureIcons={[Zap, PhoneCall, Route]}
      whyIcons={[Timer, Shield, UserCheck, MessageCircle]}
      image="/assets/images/service/emergency-drop-car.jpg"
    />
  );
}
