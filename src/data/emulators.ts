export type Platform = "windows" | "android" | "mac" | "linux" | "ios";
export type Tier = 1 | 2 | 3 | 4; // 1 ضعيف · 2 متوسط · 3 قوي · 4 قوي جداً

export interface DeviceSpecs {
  platform: Platform;
  ramGb: number;
  cpu: Tier;
  gpu: Tier;
}

export interface Emulator {
  id: string;
  name: string;
  console: string;
  platforms: Platform[];
  minRamGb: number;
  minCpu: Tier;
  minGpu: Tier;
  recRamGb: number;
  recCpu: Tier;
  recGpu: Tier;
  url: string;
  needs: string[];
  note?: string;
}

export const TIER_LABEL: Record<Tier, string> = {
  1: "ضعيف / قديم",
  2: "متوسط",
  3: "قوي",
  4: "قوي جداً / حديث",
};

export const CPU_EXAMPLES: Record<Tier, string> = {
  1: "Intel Celeron / Pentium، Core i3 قديم، Snapdragon 4xx، Helio A/P",
  2: "Core i3/i5 (جيل 6–9)، Ryzen 3، Snapdragon 6xx/7xx، Helio G85–G99",
  3: "Core i5/i7 (جيل 10+)، Ryzen 5، Snapdragon 8 Gen 1، Dimensity 8000",
  4: "Core i7/i9 (جيل 12+)، Ryzen 7/9، Snapdragon 8 Gen 2+، Apple M1 فأحدث",
};

export const GPU_EXAMPLES: Record<Tier, string> = {
  1: "Intel HD Graphics، Mali-G52 أو أقل",
  2: "Intel UHD/Iris Xe، Vega 8، GTX 750، Adreno 6xx، Mali-G57/G68",
  3: "GTX 1060/1650، RX 570، Adreno 7xx",
  4: "RTX 2060 فأعلى، RX 6600 فأعلى، Adreno 740+، Apple M-series",
};

export const PLATFORM_LABEL: Record<Platform, string> = {
  windows: "ويندوز",
  android: "أندرويد",
  mac: "ماك",
  linux: "لينكس",
  ios: "آيفون / آيباد",
};

const PC: Platform[] = ["windows", "mac", "linux"];

export const EMULATORS: Emulator[] = [
  { id: "retroarch", name: "RetroArch", console: "أجهزة قديمة متعددة (NES، SNES، Sega، GBA…)", platforms: [...PC, "android", "ios"], minRamGb: 1, minCpu: 1, minGpu: 1, recRamGb: 2, recCpu: 1, recGpu: 1, url: "https://www.retroarch.com/", needs: ["ملفات BIOS لبعض الأنظمة", "Visual C++ Redistributable على ويندوز"] },
  { id: "duckstation", name: "DuckStation", console: "PlayStation 1", platforms: [...PC, "android"], minRamGb: 2, minCpu: 1, minGpu: 1, recRamGb: 4, recCpu: 2, recGpu: 1, url: "https://www.duckstation.org/", needs: ["ملف BIOS لجهاز PS1 (من جهازك الأصلي)", "Visual C++ Redistributable"] },
  { id: "ppsspp", name: "PPSSPP", console: "PSP", platforms: [...PC, "android", "ios"], minRamGb: 2, minCpu: 1, minGpu: 1, recRamGb: 4, recCpu: 2, recGpu: 2, url: "https://www.ppsspp.org/", needs: ["لا يحتاج BIOS", "تعريف كرت شاشة محدث (OpenGL / Vulkan)"] },
  { id: "dolphin", name: "Dolphin", console: "GameCube و Wii", platforms: [...PC, "android"], minRamGb: 4, minCpu: 2, minGpu: 2, recRamGb: 8, recCpu: 3, recGpu: 2, url: "https://dolphin-emu.org/", needs: ["Visual C++ 2022 (x64)", "دعم Vulkan أو DirectX 11/12"] },
  { id: "pcsx2", name: "PCSX2", console: "PlayStation 2", platforms: PC, minRamGb: 4, minCpu: 2, minGpu: 2, recRamGb: 8, recCpu: 3, recGpu: 3, url: "https://pcsx2.net/", needs: ["ملف BIOS لجهاز PS2 (من جهازك الأصلي)", "معالج يدعم AVX2", "Visual C++ 2022 و DirectX 11/12"] },
  { id: "aethersx2", name: "NetherSX2 (AetherSX2)", console: "PlayStation 2 على أندرويد", platforms: ["android"], minRamGb: 4, minCpu: 3, minGpu: 3, recRamGb: 6, recCpu: 4, recGpu: 4, url: "https://github.com/Trixarian/NetherSX2-patch", needs: ["ملف BIOS لجهاز PS2", "معالج Snapdragon 845 فأعلى يفضّل"], note: "المشروع الأصلي متوقف؛ النسخة المعدّلة غير رسمية، افحص الملف قبل التثبيت." },
  { id: "rpcs3", name: "RPCS3", console: "PlayStation 3", platforms: PC, minRamGb: 8, minCpu: 3, minGpu: 3, recRamGb: 16, recCpu: 4, recGpu: 3, url: "https://rpcs3.net/", needs: ["ملف تحديث نظام PS3 الرسمي (PUP) من موقع سوني", "معالج 64-bit يدعم AVX2", "Vulkan", "Visual C++ 2022"] },
  { id: "vita3k", name: "Vita3K", console: "PS Vita", platforms: [...PC, "android"], minRamGb: 4, minCpu: 3, minGpu: 2, recRamGb: 8, recCpu: 3, recGpu: 3, url: "https://vita3k.org/", needs: ["ملف نظام Vita الرسمي (PUP)", "Vulkan"] },
  { id: "melonds", name: "melonDS", console: "Nintendo DS", platforms: [...PC, "android"], minRamGb: 2, minCpu: 1, minGpu: 1, recRamGb: 4, recCpu: 2, recGpu: 1, url: "https://melonds.kuribo64.net/", needs: ["BIOS و Firmware اختيارية"] },
  { id: "azahar", name: "Azahar (Citra)", console: "Nintendo 3DS", platforms: [...PC, "android"], minRamGb: 4, minCpu: 2, minGpu: 2, recRamGb: 8, recCpu: 3, recGpu: 2, url: "https://azahar-emu.org/", needs: ["OpenGL 4.3 أو Vulkan"] },
  { id: "bluestacks", name: "BlueStacks", console: "محاكي أندرويد على الكمبيوتر", platforms: ["windows", "mac"], minRamGb: 4, minCpu: 2, minGpu: 1, recRamGb: 8, recCpu: 3, recGpu: 2, url: "https://www.bluestacks.com/", needs: ["تفعيل المحاكاة الافتراضية VT-x / AMD-V من البيوس", "تعريف كرت شاشة محدث"] },
  { id: "ldplayer", name: "LDPlayer", console: "محاكي أندرويد للألعاب", platforms: ["windows"], minRamGb: 4, minCpu: 2, minGpu: 1, recRamGb: 8, recCpu: 3, recGpu: 2, url: "https://www.ldplayer.net/", needs: ["تفعيل VT-x / AMD-V من البيوس"] },
  { id: "android-studio", name: "Android Studio Emulator", console: "محاكي أندرويد الرسمي للمطورين", platforms: PC, minRamGb: 8, minCpu: 3, minGpu: 2, recRamGb: 16, recCpu: 3, recGpu: 2, url: "https://developer.android.com/studio", needs: ["تفعيل VT-x / AMD-V", "مساحة 16 جيجا فأكثر"] },
];

export type Verdict = "great" | "ok" | "no" | "unsupported";

export function checkEmulator(e: Emulator, d: DeviceSpecs): Verdict {
  if (!e.platforms.includes(d.platform)) return "unsupported";
  if (d.ramGb < e.minRamGb || d.cpu < e.minCpu || d.gpu < e.minGpu) return "no";
  if (d.ramGb >= e.recRamGb && d.cpu >= e.recCpu && d.gpu >= e.recGpu) return "great";
  return "ok";
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  great: "يعمل بسلاسة",
  ok: "يعمل بإعدادات منخفضة",
  no: "جهازك أضعف من المطلوب",
  unsupported: "غير متاح لنظامك",
};
