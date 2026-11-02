// دليل أنظمة التشغيل (ويندوز ولينكس) — بيانات ثابتة آمنة للمتصفح.
export type OsFamily = "windows" | "linux";
export type CpuTier = "old" | "mid" | "modern";
export type UseCase = "general" | "gaming" | "programming" | "weak" | "security" | "office";

export interface OsEntry {
  id: string;
  name: string;
  family: OsFamily;
  developer: string;
  released: string;
  status: string;
  minRamGb: number;
  recRamGb: number;
  storageGb: number;
  minCpu: CpuTier;
  needsTpm?: boolean;
  bestFor: UseCase[];
  summary: string;
  pros: string[];
  cons: string[];
  official: string;
  alternative?: { label: string; url: string };
  mustHave: string[];
  install: string[];
  errors: { problem: string; fix: string }[];
  workaround?: string;
  course?: { label: string; url: string };
  warning?: string;
}

export const USE_LABEL: Record<UseCase, string> = {
  general: "استخدام يومي",
  gaming: "ألعاب",
  programming: "برمجة",
  weak: "أجهزة ضعيفة",
  security: "أمن معلومات",
  office: "دراسة ومكتب",
};

export const CPU_LABEL: Record<CpuTier, string> = {
  old: "قديم (قبل 2012 / Core 2 / الجيل 1-2)",
  mid: "متوسط (الجيل 3-7 من Intel / Ryzen 1000)",
  modern: "حديث (Intel الجيل 8+ / Ryzen 2000+)",
};

const TIER: Record<CpuTier, number> = { old: 0, mid: 1, modern: 2 };

export const OPERATING_SYSTEMS: OsEntry[] = [
  {
    id: "win11", name: "Windows 11", family: "windows", developer: "Microsoft", released: "2021",
    status: "مدعوم ويتلقى تحديثات", minRamGb: 4, recRamGb: 8, storageGb: 64, minCpu: "modern", needsTpm: true,
    bestFor: ["general", "gaming", "office"],
    summary: "أحدث ويندوز، أفضل دعم للألعاب الحديثة وDirectX 12 وتطبيقات Android عبر المتجر في بعض الإصدارات.",
    pros: ["دعم أمني طويل", "أفضل أداء مع المعالجات الهجينة الحديثة", "DirectStorage وAuto HDR للألعاب"],
    cons: ["يتطلب TPM 2.0 وSecure Boot ومعالجاً حديثاً", "استهلاك أعلى للرام", "إعلانات وخدمات مدمجة كثيرة"],
    official: "https://www.microsoft.com/software-download/windows11",
    alternative: { label: "Media Creation Tool من نفس الصفحة", url: "https://www.microsoft.com/software-download/windows11" },
    mustHave: ["TPM 2.0", "Secure Boot و UEFI", "معالج من القائمة المدعومة", "4GB رام و64GB تخزين"],
    install: [
      "افحص جهازك بأداة PC Health Check من مايكروسوفت.",
      "حمّل ملف ISO أو Media Creation Tool من الموقع الرسمي.",
      "احرق الملف على فلاشة 8GB+ باستخدام Rufus أو Ventoy (موجودة في صفحة أدوات الأنظمة).",
      "أعد التشغيل واختر الإقلاع من الفلاشة (F12 أو F11 أو Esc حسب الجهاز).",
      "اختر Custom Install، احذف/حدد القسم، ثم أكمل الإعداد.",
      "بعد التثبيت شغّل Windows Update وثبّت تعريف كرت الشاشة.",
    ],
    errors: [
      { problem: "This PC can't run Windows 11", fix: "فعّل TPM (PTT/fTPM) وSecure Boot من BIOS." },
      { problem: "لا تظهر الأقراص أثناء التثبيت", fix: "حمّل تعريف Intel RST/VMD من موقع الشركة المصنعة، أو غيّر وضع SATA إلى AHCI." },
      { problem: "يطلب حساب Microsoft إجبارياً", fix: "افصل الإنترنت أثناء الإعداد، أو استخدم خيار حساب العمل/المدرسة ثم «تسجيل دخول بدلاً من ذلك»." },
    ],
    workaround: "إن لم يدعم جهازك TPM أو المعالج: ابقَ على Windows 10 (أو 10 LTSC) أو انتقل إلى Linux Mint. يمكن تجاوز الفحص بخيار في Rufus لكن مايكروسوفت لا تضمن التحديثات لهذه الأجهزة.",
    course: { label: "دعم مايكروسوفت الرسمي", url: "https://support.microsoft.com/windows" },
  },
  {
    id: "win10", name: "Windows 10", family: "windows", developer: "Microsoft", released: "2015",
    status: "انتهى الدعم العام في أكتوبر 2025 (متاح دعم ESU المدفوع)", minRamGb: 2, recRamGb: 4, storageGb: 32, minCpu: "old",
    bestFor: ["general", "gaming", "office"],
    summary: "أكثر نسخة توافقاً مع البرامج والألعاب والأجهزة المتوسطة والقديمة.",
    pros: ["يعمل على أجهزة أقدم", "توافق ممتاز مع البرامج", "أخف من 11"],
    cons: ["لا تحديثات أمنية مجانية بعد أكتوبر 2025", "بعض الألعاب الحديثة ستتوقف عن دعمه تدريجياً"],
    official: "https://www.microsoft.com/software-download/windows10",
    mustHave: ["معالج 1GHz", "2GB رام للنسخة 64-بت (4GB موصى)", "32GB تخزين"],
    install: [
      "حمّل Media Creation Tool من الموقع الرسمي.",
      "اختر «إنشاء وسائط تثبيت» على فلاشة 8GB.",
      "أقلع من الفلاشة واختر Custom Install.",
      "ثبّت التعريفات من Windows Update أو موقع الشركة.",
    ],
    errors: [
      { problem: "خطأ 0x80070070 أثناء التحديث", fix: "مساحة غير كافية؛ حرّر 20GB على C:." },
      { problem: "شاشة زرقاء بعد التثبيت", fix: "حدّث BIOS وتعريف الشاشة، وشغّل sfc /scannow." },
    ],
    warning: "النظام لم يعد يتلقى تحديثات أمان مجانية؛ استخدمه بحذر مع برنامج حماية محدث.",
  },
  {
    id: "win10ltsc", name: "Windows 10 / 11 IoT Enterprise LTSC", family: "windows", developer: "Microsoft", released: "2021 / 2024",
    status: "دعم طويل حتى 2032 تقريباً (للمؤسسات)", minRamGb: 2, recRamGb: 4, storageGb: 32, minCpu: "old",
    bestFor: ["weak", "office", "gaming"],
    summary: "نسخة رسمية خفيفة بدون متجر وتطبيقات إضافية، مع دعم أمني طويل.",
    pros: ["خفيفة ومستقرة", "تحديثات أمان لسنوات طويلة", "بدون برامج مدمجة غير ضرورية"],
    cons: ["ترخيص مؤسسات (غير مباع للأفراد مباشرة)", "بدون Microsoft Store افتراضياً"],
    official: "https://www.microsoft.com/evalcenter",
    mustHave: ["نفس متطلبات Windows 10"],
    install: ["حمّل النسخة التجريبية من Evaluation Center.", "احرقها بـRufus وثبّتها كأي ويندوز.", "فعّلها بترخيص مؤسسي قانوني."],
    errors: [{ problem: "انتهاء فترة التقييم", fix: "النسخة التجريبية 90 يوماً؛ تحتاج ترخيصاً مؤسسياً." }],
    warning: "تجنّب النسخ «المعدّلة» أو المفعّلة من مواقع مجهولة؛ كثير منها يحتوي برمجيات خبيثة.",
  },
  {
    id: "win7", name: "Windows 7 / 8.1", family: "windows", developer: "Microsoft", released: "2009 / 2013",
    status: "منتهي الدعم", minRamGb: 1, recRamGb: 2, storageGb: 20, minCpu: "old",
    bestFor: ["weak"],
    summary: "للأجهزة القديمة جداً أو البرامج القديمة فقط، ولا يُنصح به للإنترنت.",
    pros: ["خفيف جداً", "يعمل مع برامج وأجهزة قديمة"],
    cons: ["لا تحديثات أمان", "المتصفحات الحديثة لم تعد تدعمه", "تعريفات محدودة للأجهزة الحديثة"],
    official: "https://support.microsoft.com/windows/windows-7-support-ended-on-january-14-2020-b75d4580-2cc7-895a-2c9c-1466d9a53962",
    mustHave: ["1GB رام", "معالج 1GHz"],
    install: ["استخدم وسائط التثبيت الأصلية لديك.", "ثبّت التعريفات من موقع الشركة المصنعة."],
    errors: [{ problem: "المتصفح لا يفتح المواقع", fix: "انتقل إلى Linux Mint XFCE كبديل آمن وخفيف." }],
    warning: "غير آمن على الإنترنت؛ البديل الأفضل للأجهزة القديمة هو Linux Mint XFCE أو Lubuntu.",
  },
  {
    id: "mint", name: "Linux Mint", family: "linux", developer: "Linux Mint Team", released: "2006 (إصدار 22 في 2024)",
    status: "مدعوم (LTS)", minRamGb: 2, recRamGb: 4, storageGb: 20, minCpu: "old",
    bestFor: ["general", "office", "weak"],
    summary: "أفضل توزيعة للمنتقلين من ويندوز: واجهة مألوفة وتعمل مباشرة.",
    pros: ["واجهة تشبه ويندوز", "مجاني بالكامل وخفيف", "مدير تعريفات سهل"],
    cons: ["بعض برامج ويندوز (Photoshop، Office) لا تعمل مباشرة", "ألعاب مضادات الغش لا تعمل"],
    official: "https://linuxmint.com/download.php",
    alternative: { label: "مرايا التحميل الرسمية (Mirrors)", url: "https://linuxmint.com/mirrors.php" },
    mustHave: ["2GB رام (4GB موصى)", "20GB تخزين", "معالج 64-بت"],
    install: [
      "اختر نسخة Cinnamon للأجهزة المتوسطة أو XFCE للضعيفة.",
      "احرق ISO على فلاشة بـVentoy أو balenaEtcher.",
      "أقلع من الفلاشة وجرب النظام مباشرة دون تثبيت.",
      "اضغط Install Linux Mint واختر بجانب ويندوز أو مسح القرص.",
      "بعد التثبيت افتح Driver Manager لتثبيت تعريف NVIDIA.",
    ],
    errors: [
      { problem: "شاشة سوداء عند الإقلاع (NVIDIA)", fix: "اختر Compatibility Mode من قائمة الإقلاع ثم ثبّت التعريف." },
      { problem: "الفلاشة لا تظهر في الإقلاع", fix: "عطّل Secure Boot أو Fast Boot من BIOS." },
    ],
    course: { label: "دليل Mint الرسمي", url: "https://linuxmint-installation-guide.readthedocs.io/" },
  },
  {
    id: "ubuntu", name: "Ubuntu", family: "linux", developer: "Canonical", released: "2004 (24.04 LTS في 2024)",
    status: "LTS مدعوم 5 سنوات", minRamGb: 4, recRamGb: 8, storageGb: 25, minCpu: "mid",
    bestFor: ["programming", "general"],
    summary: "الأكثر انتشاراً ودعماً من المجتمع والشركات، ممتاز للمطورين والخوادم.",
    pros: ["أكبر مجتمع ودروس", "دعم رسمي للبرامج والحاويات", "تحديثات LTS طويلة"],
    cons: ["أثقل من Mint", "حزم Snap قد تكون أبطأ"],
    official: "https://ubuntu.com/download/desktop",
    mustHave: ["4GB رام", "25GB تخزين", "معالج 2GHz ثنائي النواة"],
    install: ["حمّل نسخة LTS.", "احرقها على فلاشة.", "أقلع واختر Install Ubuntu.", "فعّل خيار تثبيت برامج الطرف الثالث للتعريفات."],
    errors: [{ problem: "الواي فاي لا يعمل", fix: "وصّل الإنترنت بكابل أو مشاركة من الهاتف ثم Additional Drivers." }],
    course: { label: "دروس Ubuntu الرسمية", url: "https://ubuntu.com/tutorials" },
  },
  {
    id: "fedora", name: "Fedora Workstation", family: "linux", developer: "Fedora Project (Red Hat)", released: "2003",
    status: "إصدار كل 6 أشهر", minRamGb: 4, recRamGb: 8, storageGb: 20, minCpu: "mid",
    bestFor: ["programming"],
    summary: "حديث ونظيف، يقدّم أحدث التقنيات بسرعة مع استقرار جيد.",
    pros: ["برامج حديثة", "أمان قوي (SELinux)", "قريب من بيئة الشركات Red Hat"],
    cons: ["دورة دعم قصيرة (13 شهراً تقريباً)", "تعريفات NVIDIA تحتاج مستودع RPM Fusion"],
    official: "https://fedoraproject.org/workstation/download",
    mustHave: ["4GB رام", "20GB تخزين"],
    install: ["حمّل Fedora Media Writer.", "أنشئ الفلاشة.", "أقلع وثبّت عبر Install to Hard Drive."],
    errors: [{ problem: "لا يوجد تعريف NVIDIA", fix: "فعّل مستودع RPM Fusion ثم ثبّت akmod-nvidia." }],
  },
  {
    id: "lubuntu", name: "Lubuntu / Linux Lite", family: "linux", developer: "Lubuntu Team / Linux Lite", released: "—",
    status: "مدعوم", minRamGb: 1, recRamGb: 2, storageGb: 10, minCpu: "old",
    bestFor: ["weak", "office"],
    summary: "توزيعات خفيفة جداً لإحياء الأجهزة القديمة.",
    pros: ["تعمل بـ1-2GB رام", "سريعة على الأقراص القديمة"],
    cons: ["واجهة بسيطة", "لا تناسب الألعاب الحديثة"],
    official: "https://lubuntu.me/downloads/",
    alternative: { label: "Linux Lite", url: "https://www.linuxliteos.com/download.php" },
    mustHave: ["1GB رام", "معالج 64-بت"],
    install: ["حمّل ISO.", "احرقه على فلاشة.", "أقلع وثبّت."],
    errors: [{ problem: "الجهاز 32-بت لا يقلع", fix: "أغلب التوزيعات أسقطت 32-بت؛ جرّب antiX أو Debian 32-بت." }],
  },
  {
    id: "pop", name: "Pop!_OS / Bazzite", family: "linux", developer: "System76 / Universal Blue", released: "—",
    status: "مدعوم", minRamGb: 4, recRamGb: 8, storageGb: 30, minCpu: "mid",
    bestFor: ["gaming", "programming"],
    summary: "توزيعات مهيأة للألعاب عبر Steam وProton، وتعريفات NVIDIA جاهزة.",
    pros: ["تعريفات الشاشة جاهزة", "Steam وProton يشغّلان كثيراً من ألعاب ويندوز"],
    cons: ["ألعاب مضادات الغش (Valorant مثلاً) لا تعمل"],
    official: "https://system76.com/pop/",
    alternative: { label: "Bazzite", url: "https://bazzite.gg/" },
    mustHave: ["4GB رام", "كرت شاشة يدعم Vulkan"],
    install: ["اختر نسخة NVIDIA إن كان كرتك NVIDIA.", "احرق ISO وأقلع منه.", "ثبّت Steam وفعّل Proton من الإعدادات."],
    errors: [{ problem: "لعبة لا تعمل على Proton", fix: "راجع موقع ProtonDB لمعرفة الإعدادات المناسبة." }],
  },
  {
    id: "kali", name: "Kali Linux", family: "linux", developer: "OffSec", released: "2013",
    status: "تحديث مستمر (Rolling)", minRamGb: 2, recRamGb: 8, storageGb: 20, minCpu: "mid",
    bestFor: ["security"],
    summary: "توزيعة متخصصة لاختبار الاختراق وأمن المعلومات، وليست للاستخدام اليومي.",
    pros: ["مئات أدوات الأمن جاهزة", "توثيق رسمي ممتاز"],
    cons: ["غير مناسبة للمبتدئين كنظام أساسي", "الأدوات تُستخدم قانونياً فقط"],
    official: "https://www.kali.org/get-kali/",
    mustHave: ["2GB رام (8GB موصى)", "20GB تخزين"],
    install: ["يُفضّل تشغيلها داخل VirtualBox أو VMware أولاً.", "حمّل صورة الجهاز الافتراضي الجاهزة من الموقع الرسمي."],
    errors: [{ problem: "بطء داخل VirtualBox", fix: "فعّل VT-x/AMD-V من BIOS وخصص 4GB رام ونواتين." }],
    course: { label: "Kali Linux Revealed (مجاني)", url: "https://kali.training/" },
    warning: "استخدم أدوات الاختبار على أجهزتك أو بإذن مكتوب فقط؛ غير ذلك مخالف للقانون.",
  },
];

export interface MySpecs {
  ramGb: number;
  storageGb: number;
  cpu: CpuTier;
  tpm: boolean;
  use: UseCase;
}

export type Fit = "great" | "ok" | "no";

export function rateOs(os: OsEntry, s: MySpecs): { fit: Fit; missing: string[] } {
  const missing: string[] = [];
  if (s.ramGb < os.minRamGb) missing.push(`رام ${os.minRamGb}GB على الأقل (لديك ${s.ramGb}GB)`);
  if (s.storageGb < os.storageGb) missing.push(`مساحة ${os.storageGb}GB على الأقل`);
  if (TIER[s.cpu] < TIER[os.minCpu]) missing.push(`معالج ${CPU_LABEL[os.minCpu]}`);
  if (os.needsTpm && !s.tpm) missing.push("TPM 2.0 مع Secure Boot");
  if (missing.length) return { fit: "no", missing };
  return { fit: s.ramGb >= os.recRamGb ? "great" : "ok", missing };
}

export function recommendOs(s: MySpecs): OsEntry[] {
  const score = (os: OsEntry) => {
    const r = rateOs(os, s);
    if (r.fit === "no") return -1;
    let v = r.fit === "great" ? 2 : 1;
    if (os.bestFor.includes(s.use)) v += 3;
    if (os.warning && os.id === "win7") v -= 2;
    if (os.id === "win10" ) v -= 0.5; // انتهاء الدعم
    return v;
  };
  return OPERATING_SYSTEMS.filter((o) => score(o) > 0).sort((a, b) => score(b) - score(a)).slice(0, 3);
}
