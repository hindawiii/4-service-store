export interface LocalModel {
  id: string;
  name: string;
  company: string;
  sizes: { label: string; minRamGb: number; vramGb: number }[];
  released: string;
  bestFor: string;
  pros: string;
  cons: string;
  license: string;
  official: string;
  mirror: string;
}

export const COMPANIES = ["Meta", "Alibaba", "Google", "Mistral AI", "Microsoft", "DeepSeek"] as const;

// minRamGb/vramGb approximate for 4-bit (Q4) quantized versions
export const MODELS: LocalModel[] = [
  { id: "llama32", name: "Llama 3.2", company: "Meta", released: "2024",
    sizes: [{ label: "1B", minRamGb: 4, vramGb: 1 }, { label: "3B", minRamGb: 6, vramGb: 3 }],
    bestFor: "الأجهزة الضعيفة والهواتف، المحادثة البسيطة والتلخيص.", pros: "خفيف جداً وسريع.", cons: "ضعيف في البرمجة والعربية المعقدة.",
    license: "Llama Community License", official: "https://www.llama.com", mirror: "https://ollama.com/library/llama3.2" },
  { id: "llama31", name: "Llama 3.1", company: "Meta", released: "2024",
    sizes: [{ label: "8B", minRamGb: 10, vramGb: 6 }, { label: "70B", minRamGb: 48, vramGb: 40 }],
    bestFor: "مساعد عام متوازن.", pros: "مجتمع ضخم ودعم واسع.", cons: "أقدم من Llama 3.2/3.3 في بعض المهام.",
    license: "Llama Community License", official: "https://www.llama.com", mirror: "https://ollama.com/library/llama3.1" },
  { id: "qwen25", name: "Qwen 2.5 / Qwen 3", company: "Alibaba", released: "2024–2025",
    sizes: [{ label: "1.5B", minRamGb: 4, vramGb: 2 }, { label: "7B", minRamGb: 10, vramGb: 6 }, { label: "14B", minRamGb: 16, vramGb: 10 }, { label: "32B", minRamGb: 32, vramGb: 22 }],
    bestFor: "أفضل خيار للعربية، والبرمجة (نسخة Coder).", pros: "عربية ممتازة، أحجام متنوعة، رخصة Apache.", cons: "النسخ الكبيرة تحتاج كرت قوي.",
    license: "Apache 2.0 (أغلب الأحجام)", official: "https://qwenlm.github.io", mirror: "https://ollama.com/library/qwen2.5" },
  { id: "gemma", name: "Gemma 2 / Gemma 3", company: "Google", released: "2024–2025",
    sizes: [{ label: "2B", minRamGb: 4, vramGb: 2 }, { label: "9B", minRamGb: 12, vramGb: 7 }, { label: "27B", minRamGb: 28, vramGb: 18 }],
    bestFor: "الكتابة والمحادثة، Gemma 3 يفهم الصور.", pros: "جودة عالية مقارنة بالحجم.", cons: "رخصة خاصة بقيود استخدام.",
    license: "Gemma Terms of Use", official: "https://ai.google.dev/gemma", mirror: "https://ollama.com/library/gemma3" },
  { id: "mistral", name: "Mistral 7B / Mistral Nemo", company: "Mistral AI", released: "2023–2024",
    sizes: [{ label: "7B", minRamGb: 10, vramGb: 6 }, { label: "12B", minRamGb: 14, vramGb: 9 }],
    bestFor: "المحادثة السريعة باللغات الأوروبية.", pros: "سريع ومفتوح بالكامل.", cons: "العربية متوسطة.",
    license: "Apache 2.0", official: "https://mistral.ai", mirror: "https://ollama.com/library/mistral" },
  { id: "phi", name: "Phi-3 / Phi-4", company: "Microsoft", released: "2024",
    sizes: [{ label: "3.8B mini", minRamGb: 6, vramGb: 3 }, { label: "14B", minRamGb: 16, vramGb: 10 }],
    bestFor: "الرياضيات والمنطق على أجهزة متوسطة.", pros: "ذكي جداً لحجمه.", cons: "معلومات عامة أقل، عربية ضعيفة.",
    license: "MIT", official: "https://azure.microsoft.com/products/phi", mirror: "https://ollama.com/library/phi4" },
  { id: "deepseek", name: "DeepSeek-R1 (المقطّرة)", company: "DeepSeek", released: "2025",
    sizes: [{ label: "1.5B", minRamGb: 4, vramGb: 2 }, { label: "7B", minRamGb: 10, vramGb: 6 }, { label: "14B", minRamGb: 16, vramGb: 10 }, { label: "32B", minRamGb: 32, vramGb: 22 }],
    bestFor: "التفكير خطوة بخطوة، الرياضيات والبرمجة.", pros: "قدرات تفكير قوية مجاناً.", cons: "بطيء لأنه يكتب تفكيره قبل الإجابة.",
    license: "MIT", official: "https://www.deepseek.com", mirror: "https://ollama.com/library/deepseek-r1" },
];

export const RUNNERS = [
  { name: "Ollama", desc: "الأسهل: أمر واحد لتحميل وتشغيل أي نموذج. ويندوز وماك ولينكس.", url: "https://ollama.com/download",
    steps: ["حمّل Ollama وثبّته.", "افتح الطرفية (CMD) واكتب: ollama run qwen2.5:7b", "انتظر التحميل ثم اكتب سؤالك مباشرة."] },
  { name: "LM Studio", desc: "واجهة رسومية كاملة بدون أوامر، مع بحث وتحميل النماذج من داخلها.", url: "https://lmstudio.ai",
    steps: ["حمّل LM Studio وثبّته.", "من تبويب Discover ابحث عن النموذج واختر نسخة Q4_K_M.", "من تبويب Chat اختر النموذج وابدأ المحادثة."] },
  { name: "Jan", desc: "بديل مفتوح المصدر لـ LM Studio يعمل بدون إنترنت.", url: "https://jan.ai",
    steps: ["حمّل Jan وثبّته.", "Hub ← اختر نموذجاً ← Download.", "ابدأ محادثة جديدة."] },
];

export type Fit = "great" | "ok" | "no";

export function checkSize(s: { minRamGb: number; vramGb: number }, ramGb: number, vramGb: number): Fit {
  if (vramGb >= s.vramGb) return "great"; // fully on GPU
  if (ramGb >= s.minRamGb) return "ok"; // runs on CPU/RAM, slower
  return "no";
}
