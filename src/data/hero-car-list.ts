/** Cars shown in the hero booking form (images under `public/assets/images/hero-car-list/`). */
export const HERO_CAR_OPTIONS = [
  { id: "noah", file: "noah.png", seats: 7 },
  { id: "hiace", file: "hiace.png", seats: 11 },
  { id: "sedan", file: "sedan.png", seats: 4 },
  { id: "chander_gari", file: "chander_gari.png", seats: 8 },
  { id: "sedan-premium", file: "sedan-premium.png", seats: 4 },
  { id: "sedan-economy", file: "sedan-economy.png", seats: 4 },
] as const;

export type HeroCarId = (typeof HERO_CAR_OPTIONS)[number]["id"];
