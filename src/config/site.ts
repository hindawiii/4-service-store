// بيانات التواصل والدفع — عدّل القيم هنا فقط عند توفر الأرقام الحقيقية.
// اتركها فارغة ("") ليخفيها الموقع تلقائياً بدل عرض رقم وهمي.

export const SITE = {
  name: "inservices",
  tagline: "خدمات رقمية سريعة وموثوقة — الخرطوم، السودان.",
  city: "الخرطوم، السودان",
  email: "",
  whatsapp: "", // مثال: 249900000000 (بدون + أو مسافات)
  phone: "",
  telegram: "", // اسم المستخدم بدون @
  facebook: "",
  workingHours: "يومياً من 9 صباحاً حتى 9 مساءً بتوقيت الخرطوم",
} as const;

export type PayAccount = {
  id: "bankak" | "bank_transfer" | "usdt" | "other";
  label: string;
  hint: string;
  account: string; // فارغ = لم يُضف بعد
  holder: string;
};

export const PAY_ACCOUNTS: PayAccount[] = [
  {
    id: "bankak",
    label: "بنكك (Bankak)",
    hint: "تحويل فوري عبر تطبيق بنكك داخل السودان",
    account: "",
    holder: "",
  },
  {
    id: "bank_transfer",
    label: "تحويل بنكي",
    hint: "حوالة من أي بنك محلي",
    account: "",
    holder: "",
  },
  {
    id: "usdt",
    label: "USDT (TRC20)",
    hint: "للعملاء خارج السودان",
    account: "",
    holder: "",
  },
  {
    id: "other",
    label: "طريقة أخرى",
    hint: "سنتواصل معك للاتفاق على طريقة الدفع المناسبة",
    account: "",
    holder: "",
  },
];

export const PENDING_ACCOUNT_NOTE =
  "بيانات هذا الحساب لم تُضف بعد — أرسل طلبك وسنرسل لك بيانات الدفع عند التواصل.";

export const whatsappLink = (message?: string) =>
  SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`
    : null;

export const hasAnyContact = () =>
  Boolean(SITE.email || SITE.whatsapp || SITE.phone || SITE.telegram || SITE.facebook);
