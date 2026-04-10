"use client";

import { Sparkles, Crown, Clock, Flower2, CarFront, Timer, Package } from "lucide-react";
import ServicePageContent from "@/components/service/ServicePageContent";

export default function WeddingCarRentalPage() {
  return (
    <ServicePageContent
      slug="wedding-car-rental"
      featureIcons={[Sparkles, Crown, Clock]}
      whyIcons={[Flower2, CarFront, Timer, Package]}
      image="/assets/images/service/weeding-car.jpg"
    />
  );
}
