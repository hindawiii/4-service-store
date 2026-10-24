export type ToolGroup = "runtimes" | "drivers" | "boot" | "archive" | "virtualization";

export interface SystemTool {
  id: string;
  name: string;
  group: ToolGroup;
  developer: string;
  free: boolean;
  platforms: string;
  purpose: string;
  neededFor: string;
  official: string;
  alternative?: { label: string; url: string };
  install: string[];
  errors: { problem: string; fix: string }[];
  warning?: string;
}

export const GROUP_LABEL: Record<ToolGroup, string> = {
  runtimes: "حزم التشغيل الأساسية",
  drivers: "تعريفات العتاد",
  boot: "أدوات حرق وتفليش الفلاشات",
  archive: "برامج الضغط وفك الضغط",
  virtualization: "المحاكاة الافتراضية",
};

export const SYSTEM_TOOLS: SystemTool[] = [
  {
    id: "vcredist", name: "Microsoft Visual C++ Redistributable", group: "runtimes", developer: "Microsoft", free: true,
    platforms: "Windows 7 / 10 / 11 (x86 و x64)",
    purpose: "مكتبات تشغيل تحتاجها أغلب الألعاب والبرامج المكتوبة بلغة C++.",
    neededFor: "الألعاب، المحاكيات (PCSX2، RPCS3)، برامج التصميم والمونتاج.",
    official: "https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist",
    alternative: { label: "حزمة All-in-One (TechPowerUp)", url: "https://www.techpowerup.com/download/visual-c-redistributable-runtime-package-all-in-one/" },
    install: ["حمّل نسختي x64 و x86 معاً حتى لو كان نظامك 64-بت.", "شغّل كل ملف واضغط Install.", "أعد تشغيل الجهاز."],
    errors: [
      { problem: "رسالة MSVCP140.dll أو VCRUNTIME140.dll مفقود", fix: "ثبّت أحدث نسخة 2015-2022 بنسختيها x86 و x64." },
      { problem: "فشل التثبيت برمز 0x80070666", fix: "توجد نسخة أحدث مثبتة؛ اختر Repair من لوحة التحكم بدلاً من التثبيت." },
    ],
  },
  {
    id: "directx", name: "DirectX End-User Runtime", group: "runtimes", developer: "Microsoft", free: true,
    platforms: "Windows 7 / 10 / 11",
    purpose: "ملفات DirectX القديمة (9/10/11) التي لا تأتي افتراضياً مع ويندوز الحديث.",
    neededFor: "الألعاب القديمة وبعض المحاكيات.",
    official: "https://www.microsoft.com/download/details.aspx?id=35",
    install: ["حمّل Web Installer من موقع مايكروسوفت.", "ألغِ تحديد شريط Bing إن ظهر.", "اضغط Next حتى ينتهي التثبيت."],
    errors: [{ problem: "d3dx9_43.dll مفقود", fix: "ثبّت DirectX End-User Runtime فهو يضيف هذه الملفات." }],
  },
  {
    id: "dotnet", name: ".NET Framework و .NET Desktop Runtime", group: "runtimes", developer: "Microsoft", free: true,
    platforms: "Windows",
    purpose: "منصة تشغيل لبرامج كثيرة مكتوبة بلغة C#.",
    neededFor: "أدوات التفليش، برامج الإدارة، بعض المشغلات والمحاكيات (Ryujinx).",
    official: "https://dotnet.microsoft.com/download",
    install: ["لـ.NET 3.5: لوحة التحكم ← البرامج ← تشغيل ميزات Windows ← فعّل .NET 3.5.", "للإصدارات الحديثة: حمّل Desktop Runtime المطلوب (8 مثلاً) وثبّته."],
    errors: [{ problem: "البرنامج يطلب إصداراً محدداً من .NET", fix: "ثبّت الإصدار الذي تذكره الرسالة نفسه؛ الإصدارات تُثبَّت جنباً إلى جنب." }],
  },
  {
    id: "nvidia", name: "تعريفات NVIDIA (NVIDIA App)", group: "drivers", developer: "NVIDIA", free: true,
    platforms: "Windows / Linux",
    purpose: "تعريف كرت الشاشة لتحسين الأداء وتشغيل Vulkan و OpenGL.",
    neededFor: "الألعاب، المحاكيات، الذكاء الاصطناعي المحلي (CUDA).",
    official: "https://www.nvidia.com/drivers",
    install: ["اعرف موديل كرتك من dxdiag ← تبويب العرض.", "اختر الموديل والنظام في صفحة التحميل.", "اختر التثبيت المخصص ← تثبيت نظيف عند وجود مشاكل."],
    errors: [{ problem: "شاشة سوداء أو تعريف لا يثبت", fix: "استخدم DDU في الوضع الآمن لإزالة التعريف القديم ثم ثبّت من جديد." }],
  },
  {
    id: "amd", name: "تعريفات AMD Adrenalin", group: "drivers", developer: "AMD", free: true,
    platforms: "Windows / Linux",
    purpose: "تعريف كروت ومعالجات AMD Radeon.",
    neededFor: "الألعاب والمحاكيات على أجهزة AMD.",
    official: "https://www.amd.com/support/download/drivers.html",
    install: ["استخدم أداة Auto-Detect من الموقع أو اختر الموديل يدوياً.", "ثبّت وأعد تشغيل الجهاز."],
    errors: [{ problem: "خطأ 182 أثناء التثبيت", fix: "الكرت غير مدعوم بالنسخة؛ حمّل التعريف من صانع اللابتوب نفسه." }],
  },
  {
    id: "intel", name: "Intel Driver & Support Assistant", group: "drivers", developer: "Intel", free: true,
    platforms: "Windows",
    purpose: "يكتشف ويحدّث تعريفات الشاشة والواي فاي والبلوتوث لأجهزة Intel.",
    neededFor: "أجهزة اللابتوب ذات الرسوميات المدمجة.",
    official: "https://www.intel.com/content/www/us/en/support/detect.html",
    install: ["حمّل الأداة وثبّتها.", "افتح الأداة لتعرض التحديثات المتاحة واضغط Download & Install."],
    errors: [{ problem: "رسالة أن التعريف مخصص من الشركة المصنعة", fix: "حمّل التعريف من موقع صانع اللابتوب (Dell/HP/Lenovo)." }],
  },
  {
    id: "ddu", name: "Display Driver Uninstaller (DDU)", group: "drivers", developer: "Wagnardsoft", free: true,
    platforms: "Windows",
    purpose: "إزالة كاملة لبقايا تعريفات كرت الشاشة.",
    neededFor: "حل الشاشة السوداء والتعارض بين التعريفات.",
    official: "https://www.wagnardsoft.com/display-driver-uninstaller-ddu-",
    install: ["افصل الإنترنت.", "أعد التشغيل في الوضع الآمن.", "شغّل DDU واختر Clean and restart.", "ثبّت التعريف الجديد."],
    errors: [{ problem: "ويندوز يعيد تثبيت تعريف قديم تلقائياً", fix: "أبقِ الإنترنت مفصولاً حتى تثبّت التعريف الذي حمّلته." }],
    warning: "يُستخدم فقط عند وجود مشكلة، وليس للتحديث العادي.",
  },
  {
    id: "ventoy", name: "Ventoy", group: "boot", developer: "longpanda (مفتوح المصدر)", free: true,
    platforms: "Windows / Linux",
    purpose: "اجعل الفلاشة قابلة للإقلاع بعدة أنظمة: انسخ ملفات ISO فقط ثم اختر منها عند الإقلاع.",
    neededFor: "تثبيت ويندوز ولينكس وأدوات الصيانة من فلاشة واحدة.",
    official: "https://www.ventoy.net",
    alternative: { label: "صفحة الإصدارات على GitHub", url: "https://github.com/ventoy/Ventoy/releases" },
    install: ["فك ضغط الملف وشغّل Ventoy2Disk.exe.", "اختر الفلاشة واضغط Install (سيمسح محتواها).", "انسخ ملفات ISO إلى الفلاشة مباشرة.", "أقلع من الفلاشة واختر النظام."],
    errors: [{ problem: "Verification failed مع Secure Boot", fix: "فعّل خيار Secure Boot Support في Ventoy أو اختر Enroll Key عند أول إقلاع." }],
  },
  {
    id: "rufus", name: "Rufus", group: "boot", developer: "Pete Batard (مفتوح المصدر)", free: true,
    platforms: "Windows",
    purpose: "حرق ملف ISO واحد على فلاشة بدقة عالية، ويتيح تخطي متطلبات TPM في ويندوز 11.",
    neededFor: "تثبيت ويندوز 10/11 على أجهزة قديمة.",
    official: "https://rufus.ie",
    alternative: { label: "GitHub", url: "https://github.com/pbatard/rufus/releases" },
    install: ["شغّل Rufus (لا يحتاج تثبيت).", "اختر الفلاشة وملف ISO.", "GPT للأجهزة الحديثة UEFI، و MBR للقديمة BIOS.", "اضغط START."],
    errors: [{ problem: "الجهاز لا يرى الفلاشة عند الإقلاع", fix: "غيّر نظام التقسيم بين GPT و MBR ليطابق إعداد BIOS/UEFI." }],
  },
  {
    id: "etcher", name: "balenaEtcher", group: "boot", developer: "Balena", free: true,
    platforms: "Windows / macOS / Linux",
    purpose: "حرق بسيط بثلاث خطوات لملفات ISO و IMG.",
    neededFor: "أنظمة لينكس و Raspberry Pi، ومستخدمي ماك.",
    official: "https://etcher.balena.io",
    install: ["Flash from file ← اختر الملف.", "Select target ← اختر الفلاشة.", "Flash!"],
    errors: [{ problem: "لا يصلح لملفات ويندوز", fix: "استخدم Rufus أو Ventoy لملفات ويندوز." }],
  },
  {
    id: "7zip", name: "7-Zip", group: "archive", developer: "Igor Pavlov (مفتوح المصدر)", free: true,
    platforms: "Windows (وبديل p7zip على لينكس)",
    purpose: "ضغط وفك ضغط ZIP و RAR و 7z و ISO بنسبة ضغط ممتازة.",
    neededFor: "فك ملفات الألعاب والمحاكيات والتعريفات.",
    official: "https://www.7-zip.org",
    install: ["حمّل نسخة 64-bit x64.", "ثبّت، ثم اضغط بالزر الأيمن على أي ملف ← 7-Zip ← Extract Here."],
    errors: [{ problem: "Data error / CRC failed", fix: "الملف تالف أثناء التحميل؛ أعد تحميله من المصدر." }],
  },
  {
    id: "peazip", name: "PeaZip", group: "archive", developer: "Giorgio Tani (مفتوح المصدر)", free: true,
    platforms: "Windows / macOS / Linux",
    purpose: "واجهة حديثة تدعم أكثر من 200 صيغة مع تشفير قوي.",
    neededFor: "من يريد واجهة أسهل من 7-Zip أو يعمل على لينكس وماك.",
    official: "https://peazip.github.io",
    install: ["حمّل النسخة المناسبة لنظامك.", "ثبّت واستخدمه من القائمة اليمنى."],
    errors: [{ problem: "بطء مع الملفات الكبيرة", fix: "اختر مستوى ضغط Normal بدلاً من Ultra." }],
  },
  {
    id: "winrar", name: "WinRAR", group: "archive", developer: "RARLAB", free: false,
    platforms: "Windows",
    purpose: "الأشهر لإنشاء ملفات RAR وإصلاح الأرشيفات التالفة.",
    neededFor: "إنشاء ملفات RAR (يمكن فكها مجاناً بـ7-Zip).",
    official: "https://www.win-rar.com",
    install: ["حمّل النسخة 64-bit وثبّت.", "نسخة تجريبية 40 يوماً، ثم ترخيص مدفوع."],
    errors: [{ problem: "الأرشيف تالف", fix: "استخدم Tools ← Repair archive." }],
  },
  {
    id: "vtx", name: "تفعيل المحاكاة الافتراضية VT-x / AMD-V", group: "virtualization", developer: "إعداد في BIOS", free: true,
    platforms: "Windows / Linux",
    purpose: "ميزة في المعالج تضاعف أداء محاكيات أندرويد والأجهزة الافتراضية.",
    neededFor: "BlueStacks، LDPlayer، VirtualBox، WSL2.",
    official: "https://support.microsoft.com/windows/enable-virtualization-on-windows-c5578302-6e43-4b4b-a449-8ced115f58e1",
    install: ["تحقق: مدير المهام ← الأداء ← المعالج ← المحاكاة الافتراضية: ممكّن؟", "إن كانت معطلة: أعد التشغيل واضغط F2 أو Del أو F10 لدخول BIOS.", "فعّل Intel VT-x أو SVM Mode لمعالجات AMD، ثم احفظ F10."],
    errors: [{ problem: "المحاكي يقول إن VT غير مفعل رغم تفعيله", fix: "عطّل Hyper-V وميزة Memory Integrity أو استخدم نسخة المحاكي المتوافقة مع Hyper-V." }],
  },
  {
    id: "virtualbox", name: "VirtualBox", group: "virtualization", developer: "Oracle (مفتوح المصدر)", free: true,
    platforms: "Windows / macOS (Intel) / Linux",
    purpose: "تشغيل نظام كامل داخل نظامك لتجربة لينكس أو ويندوز آخر بأمان.",
    neededFor: "تجربة الأنظمة قبل تثبيتها فعلياً.",
    official: "https://www.virtualbox.org",
    install: ["ثبّت Visual C++ أولاً.", "ثبّت VirtualBox ثم Extension Pack بنفس الإصدار.", "New ← اختر ملف ISO ← خصص رام 4GB على الأقل."],
    errors: [{ problem: "خطأ VERR_VMX_NO_VMX", fix: "فعّل VT-x من BIOS." }],
  },
];
