import type { ServiceDetails } from "./service-details";

export type ServiceCategory =
  | "software"
  | "ai"
  | "support"
  | "course"
  | "bundle"
  | "anime"
  | "games"
  | "phones";

export interface Service {
  id: string;
  name: string;
  short: string;
  description: string;
  price: number;
  category: ServiceCategory;
  icon: string;
  featured?: boolean;
  developer?: string | null;
  official_url?: string | null;
  details?: ServiceDetails | null;
}

export const CATEGORIES: { id: ServiceCategory | "all"; label: string; icon: string }[] = [
  { id: "all", label: "الكل", icon: "Sparkles" },
  { id: "software", label: "برامج وأنظمة", icon: "Laptop" },
  { id: "phones", label: "هواتف", icon: "Smartphone" },
  { id: "ai", label: "ذكاء اصطناعي", icon: "Bot" },
  { id: "support", label: "دعم فني", icon: "Wrench" },
  { id: "course", label: "دورات مميزة", icon: "GraduationCap" },
  { id: "bundle", label: "حزم", icon: "Package" },
  { id: "anime", label: "أنمي", icon: "Tv" },
  { id: "games", label: "ألعاب", icon: "Gamepad2" },
];
