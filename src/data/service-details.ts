export type LinkKind = "official" | "trusted" | "download" | "social" | "course" | "unofficial";

export interface LinkItem {
  label: string;
  url: string;
  kind?: LinkKind;
  note?: string;
}

export interface KV {
  label: string;
  value: string;
}

export interface RegionPrice {
  region: string;
  price: string;
  note?: string;
}

export interface VersionItem {
  name: string;
  year?: string;
  url?: string;
  pros?: string[];
  cons?: string[];
  note?: string;
}

export interface IssueItem {
  problem: string;
  solution: string;
}

export type PlatformStatus = "official" | "legal_free" | "unofficial";

export interface PlatformItem {
  name: string;
  url?: string;
  status: PlatformStatus;
  regions?: string;
  note?: string;
}

export interface ServiceDetails {
  origin?: {
    manufacturer?: string;
    country?: string;
    type?: string;
    classification?: string;
    released?: string;
    license?: string;
  };
  availability?: {
    arabWorld?: "yes" | "no" | "partial";
    sudan?: "yes" | "no" | "partial";
    note?: string;
    prices?: RegionPrice[];
  };
  requirements?: {
    minimum?: KV[];
    recommended?: KV[];
    critical?: string[];
    alternatives?: string[];
  };
  install?: {
    steps?: string[];
    downloads?: LinkItem[];
  };
  issues?: IssueItem[];
  versions?: VersionItem[];
  useCases?: {
    good?: string[];
    bad?: string[];
  };
  platforms?: PlatformItem[];
  courses?: LinkItem[];
  links?: LinkItem[];
  faq?: { q: string; a: string }[];
}

export const AVAILABILITY_LABEL: Record<"yes" | "no" | "partial", string> = {
  yes: "متوفر ومتداول",
  no: "غير متوفر رسمياً",
  partial: "متوفر جزئياً / بقيود",
};

export const PLATFORM_LABEL: Record<PlatformStatus, string> = {
  official: "رسمية",
  legal_free: "قانونية مجانية",
  unofficial: "غير رسمية — تحذير",
};

export const LINK_LABEL: Record<LinkKind, string> = {
  official: "الموقع الرسمي",
  trusted: "مصدر موثوق",
  download: "تحميل مباشر",
  social: "قناة تواصل",
  course: "كورس مجاني",
  unofficial: "غير رسمي",
};

export function hasDetails(d?: ServiceDetails | null): boolean {
  if (!d) return false;
  return Object.values(d).some((v) =>
    Array.isArray(v) ? v.length > 0 : v && typeof v === "object" ? Object.keys(v).length > 0 : Boolean(v),
  );
}
