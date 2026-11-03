// مركز صيانة وتفليش الهواتف — بيانات ثابتة آمنة للمتصفح.
export type Chipset = "mediatek" | "qualcomm" | "unisoc" | "exynos" | "any";

export const CHIP_LABEL: Record<Chipset, string> = {
  any: "كل المعالجات",
  mediatek: "MediaTek",
  qualcomm: "Qualcomm Snapdragon",
  unisoc: "Unisoc / SPD",
  exynos: "Samsung Exynos",
};

export interface Brand {
  name: string;
  country: string;
  founded: string;
  famous: boolean;
  milestone: string;
  series: string[];
  official: string;
  flashTool: string;
}

export const BRANDS: Brand[] = [
  { name: "Samsung", country: "كوريا الجنوبية", founded: "1938 (أول هاتف 1988)", famous: true, milestone: "قفزة كبيرة مع سلسلة Galaxy S عام 2010", series: ["Galaxy S", "Galaxy Note", "Galaxy A", "Galaxy Z Fold/Flip"], official: "https://www.samsung.com", flashTool: "Odin" },
  { name: "Apple", country: "الولايات المتحدة", founded: "1976 (iPhone 2007)", famous: true, milestone: "iPhone الأول 2007 غيّر سوق الهواتف الذكية", series: ["iPhone", "iPhone Pro", "iPhone SE"], official: "https://www.apple.com", flashTool: "Finder / iTunes (وضع الاسترداد)" },
  { name: "Xiaomi / Redmi / POCO", country: "الصين", founded: "2010", famous: true, milestone: "انتشار واسع بعد Redmi Note منذ 2014", series: ["Xiaomi", "Redmi Note", "POCO"], official: "https://www.mi.com", flashTool: "Mi Flash Tool" },
  { name: "Huawei / Honor", country: "الصين", founded: "1987", famous: true, milestone: "سلسلة P وMate بكاميرات Leica منذ 2016", series: ["P", "Mate", "Nova", "Honor X/Magic"], official: "https://consumer.huawei.com", flashTool: "HiSuite" },
  { name: "Oppo / Realme / OnePlus", country: "الصين (مجموعة BBK)", founded: "2004 / 2018 / 2013", famous: true, milestone: "الشحن السريع وOnePlus One عام 2014", series: ["Reno", "Find", "Realme C/Number", "OnePlus"], official: "https://www.oppo.com", flashTool: "MSM Download Tool (مراكز معتمدة)" },
  { name: "Tecno / Infinix / itel", country: "الصين (Transsion)", founded: "2006", famous: true, milestone: "الأكثر مبيعاً في أفريقيا منذ 2017", series: ["Spark", "Camon", "Hot", "Note"], official: "https://www.tecno-mobile.com", flashTool: "SP Flash Tool (أغلبها MediaTek)" },
  { name: "Google Pixel", country: "الولايات المتحدة", founded: "2016", famous: true, milestone: "معالجات Tensor منذ 2021", series: ["Pixel", "Pixel a"], official: "https://store.google.com", flashTool: "Android Flash Tool (رسمي عبر المتصفح)" },
  { name: "Motorola", country: "الولايات المتحدة / Lenovo", founded: "1928", famous: true, milestone: "أول هاتف محمول تجاري 1983", series: ["Moto G", "Edge", "Razr"], official: "https://www.motorola.com", flashTool: "Rescue and Smart Assistant" },
  { name: "Nothing", country: "المملكة المتحدة", founded: "2020", famous: false, milestone: "تصميم Glyph الشفاف", series: ["Phone (1/2/3)", "CMF Phone"], official: "https://nothing.tech", flashTool: "Fastboot" },
  { name: "Fairphone", country: "هولندا", founded: "2013", famous: false, milestone: "هواتف قابلة للإصلاح وقطع غيار رسمية", series: ["Fairphone 4/5"], official: "https://www.fairphone.com", flashTool: "Fastboot / أداة الإنقاذ الرسمية" },
  { name: "Sony Xperia", country: "اليابان", founded: "2001", famous: false, milestone: "شاشات 4K وكاميرات احترافية", series: ["Xperia 1", "Xperia 10"], official: "https://www.sony.com/electronics/smartphones", flashTool: "Xperia Companion" },
  { name: "ZTE / Nubia", country: "الصين", founded: "1985", famous: false, milestone: "هواتف ألعاب Red Magic", series: ["Blade", "Nubia", "Red Magic"], official: "https://www.ztedevices.com", flashTool: "أدوات Qualcomm/Unisoc حسب الموديل" },
];

export interface PhoneTool {
  id: string;
  name: string;
  free: boolean;
  famous: boolean;
  chip: Chipset[];
  brands: string;
  purpose: string;
  works: string;
  success: string;
  official: string;
  alternative?: { label: string; url: string };
  install: string[];
  errors: { problem: string; fix: string }[];
  warning?: string;
}

export const PHONE_TOOLS: PhoneTool[] = [
  {
    id: "adb", name: "Android Platform Tools (ADB & Fastboot)", free: true, famous: true, chip: ["any"],
    brands: "كل هواتف أندرويد", purpose: "الأداة الأساسية: نسخ ملفات، تثبيت تطبيقات، فتح البوتلودر، تفليش الصور الرسمية.",
    works: "أي هاتف أندرويد مع تفعيل «تصحيح USB» من خيارات المطور.", success: "مرتفع جداً للأوامر العادية؛ التفليش يتطلب بوتلودر مفتوحاً.",
    official: "https://developer.android.com/tools/releases/platform-tools",
    install: ["حمّل الملف المضغوط لنظامك وفك ضغطه.", "فعّل خيارات المطور (اضغط على رقم الإصدار 7 مرات) ثم تصحيح USB.", "افتح الطرفية داخل المجلد واكتب: adb devices", "وافق على رسالة التحقق على الهاتف."],
    errors: [{ problem: "unauthorized", fix: "افصل الكابل وأعد توصيله ووافق على الرسالة في الهاتف." }, { problem: "الجهاز لا يظهر", fix: "ثبّت Google USB Driver أو تعريف الشركة، واستخدم كابلاً أصلياً." }],
  },
  {
    id: "odin", name: "Odin + Samsung USB Driver", free: true, famous: true, chip: ["exynos", "qualcomm", "mediatek"],
    brands: "Samsung فقط", purpose: "تفليش السوفتوير الرسمي لسامسونج (حل التعليق على الشعار والبوت لوب).",
    works: "كل هواتف Galaxy في وضع Download Mode.", success: "مرتفع مع سوفتوير رسمي مطابق للموديل والمنطقة وإصدار Binary.",
    official: "https://developer.samsung.com/android-usb-driver",
    alternative: { label: "Samsung Smart Switch (رسمي)", url: "https://www.samsung.com/smart-switch/" },
    install: ["ثبّت Samsung USB Driver.", "حمّل سوفتوير مطابق لرقم الموديل (مثل SM-A525F) عبر أداة Frija أو SamFw.", "ادخل Download Mode (خفض الصوت + رفع الصوت مع توصيل الكابل).", "ضع ملفات BL وAP وCP وCSC في خاناتها واضغط Start."],
    errors: [{ problem: "SW REV CHECK FAIL", fix: "السوفتوير أقدم من إصدار Binary الحالي؛ حمّل إصداراً مساوياً أو أحدث." }, { problem: "Fail عند Setup Connection", fix: "غيّر منفذ USB والكابل وأعد تثبيت التعريف." }],
    warning: "استخدم CSC وليس HOME_CSC فقط إذا أردت فورمات كاملاً؛ البيانات ستُحذف.",
  },
  {
    id: "miflash", name: "Mi Flash Tool / Mi Unlock", free: true, famous: true, chip: ["qualcomm", "mediatek"],
    brands: "Xiaomi وRedmi وPOCO", purpose: "تفليش ROM الرسمي بصيغة Fastboot وفتح البوتلودر رسمياً.",
    works: "الهواتف ذات بوتلودر مفتوح؛ فتح البوتلودر يتطلب حساب Mi وانتظار المدة الرسمية.", success: "مرتفع مع ROM مطابق لاسم الكود (codename).",
    official: "https://en.miui.com/unlock/",
    alternative: { label: "XiaomiFirmwareUpdater (ROMs رسمية)", url: "https://xiaomifirmwareupdater.com/" },
    install: ["اربط حساب Mi من خيارات المطور ← حالة فتح البوتلودر.", "شغّل Mi Unlock وانتظر المدة المطلوبة.", "حمّل Fastboot ROM المطابق وفك ضغطه.", "اختر clean all في Mi Flash ثم Flash."],
    errors: [{ problem: "Anti-rollback error", fix: "لا تفلش إصداراً أقدم من مستوى الحماية الحالي؛ قد يتلف الهاتف." }],
    warning: "خيار clean all and lock يقفل البوتلودر؛ لا تستخدمه مع ROM غير رسمي.",
  },
  {
    id: "spflash", name: "SP Flash Tool + MediaTek VCOM Driver", free: true, famous: true, chip: ["mediatek"],
    brands: "Tecno وInfinix وitel وأغلب Xiaomi/Realme/Oppo الاقتصادية", purpose: "تفليش ملف Scatter وإصلاح الهواتف الميتة أو المعلقة.",
    works: "هواتف MediaTek؛ الحديثة منها تحتاج ملف DA مخصصاً أو أداة الشركة.", success: "متوسط إلى مرتفع حسب الحماية (SLA/DAA) في الموديل.",
    official: "https://spflashtools.com/",
    install: ["ثبّت تعريف MediaTek VCOM.", "افتح SP Flash Tool وحمّل ملف scatter من السوفتوير.", "اختر Download Only (وليس Format All).", "اضغط Download ثم وصّل الهاتف وهو مغلق."],
    errors: [{ problem: "BROM ERROR S_BROM_CMD_STARTCMD_FAIL", fix: "الموديل محمي؛ يحتاج ملف DA مخصص أو مركز صيانة." }, { problem: "فقدان IMEI بعد التفليش", fix: "لا تستخدم Format All + Download؛ استرجع نسخة NVRAM الاحتياطية." }],
    warning: "Format All يمسح IMEI والمعايرة؛ خذ نسخة احتياطية أولاً.",
  },
  {
    id: "qfil", name: "QPST / QFIL", free: true, famous: true, chip: ["qualcomm"],
    brands: "هواتف Snapdragon (Xiaomi، Oppo، Motorola، LG...)", purpose: "تفليش في وضع EDL 9008 لإصلاح الهواتف الميتة.",
    works: "يحتاج ملف Firehose مطابقاً؛ أغلب الهواتف الحديثة تطلب حساباً معتمداً.", success: "متوسط؛ يعتمد على توفر ملف Firehose وتوقيع الشركة.",
    official: "https://qpsttool.com/",
    install: ["ثبّت Qualcomm HS-USB QDLoader 9008 Driver.", "أدخل الهاتف وضع EDL (أوامر fastboot أو نقاط الاختبار).", "في QFIL اختر Flat Build وحمّل ملف prog_*.elf وrawprogram.", "اضغط Download."],
    errors: [{ problem: "Sahara fail", fix: "ملف Firehose غير مطابق أو الهاتف خرج من وضع EDL؛ أعد الدخول وجرب ملفاً مطابقاً." }],
  },
  {
    id: "unisoc", name: "Unisoc (SPD) Research / Upgrade Download", free: true, famous: false, chip: ["unisoc"],
    brands: "هواتف Unisoc الاقتصادية من Tecno وitel وRealme وNokia", purpose: "تفليش ملفات PAC الرسمية.",
    works: "هواتف Unisoc مع تعريف SPD.", success: "مرتفع مع ملف PAC مطابق.",
    official: "https://spdflashtool.com/",
    install: ["ثبّت SPD Driver.", "افتح ResearchDownload وحمّل ملف PAC.", "اضغط Start ثم وصّل الهاتف مغلقاً مع ضغط خفض الصوت."],
    errors: [{ problem: "Incompatible partition", fix: "ملف PAC لا يطابق الموديل؛ تحقق من رقم الإصدار." }],
  },
  {
    id: "android-flash", name: "Android Flash Tool (Google)", free: true, famous: false, chip: ["any"],
    brands: "Google Pixel", purpose: "تفليش رسمي من المتصفح بدون تثبيت برامج.",
    works: "هواتف Pixel عبر متصفح Chrome.", success: "مرتفع جداً لأنه رسمي.",
    official: "https://flash.android.com/",
    install: ["افتح الموقع في Chrome على الحاسوب.", "فعّل OEM unlocking وتصحيح USB.", "اختر الإصدار واتبع الخطوات."],
    errors: [{ problem: "الجهاز غير متصل", fix: "ثبّت Google USB Driver وجرب منفذاً آخر." }],
  },
  {
    id: "chimera", name: "أدوات الصيانة المدفوعة (Chimera / UnlockTool / Z3X / EFT)", free: false, famous: true, chip: ["any"],
    brands: "متعدد العلامات", purpose: "أدوات احترافية لمراكز الصيانة: تفليش، إصلاح IMEI الأصلي، حل مشاكل البوت.",
    works: "تختلف كل أداة في الموديلات المدعومة؛ راجع قائمة الدعم في موقعها قبل الشراء.", success: "مرتفع للموديلات المذكورة في قائمة الدعم فقط.",
    official: "https://chimeratool.com/",
    alternative: { label: "UnlockTool", url: "https://unlocktool.net/" },
    install: ["اشترِ ترخيصاً من الموقع الرسمي أو موزع معتمد.", "ثبّت البرنامج وتعريفاته.", "اختر الشركة والموديل والعملية."],
    errors: [{ problem: "الموديل غير مدعوم", fix: "لا تشترِ قبل التأكد من قائمة الموديلات المدعومة." }],
    warning: "تجنب النسخ المكركة؛ تحتوي غالباً على برمجيات سرقة بيانات.",
  },
];

export const FRP_GUIDE = {
  title: "نسيت حساب Google بعد الفورمات (FRP)",
  steps: [
    "حاول استعادة الحساب رسمياً من صفحة استرداد حساب Google.",
    "إن كنت لا تتذكر الحساب: ابحث عن البريد في فواتير الشراء أو حسابات Play القديمة.",
    "توجه إلى مركز صيانة معتمد للعلامة مع فاتورة الشراء وإثبات الملكية.",
    "انتظر 72 ساعة بعد تغيير كلمة السر قبل إعادة ضبط المصنع لتجنب القفل.",
  ],
  official: "https://accounts.google.com/signin/recovery",
  warning: "تخطي حماية FRP مخصص للمالك الشرعي فقط. لا نقدم طرقاً لتجاوز حماية هاتف لا تملكه أو مسروق.",
};

export function filterTools(chip: Chipset, freeOnly: boolean): PhoneTool[] {
  return PHONE_TOOLS.filter((t) => (chip === "any" || t.chip.includes(chip) || t.chip.includes("any")) && (!freeOnly || t.free));
}
