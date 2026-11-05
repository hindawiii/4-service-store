// دليل منصات الأنمي والألعاب — بيانات ثابتة آمنة للمتصفح.
export type MediaKind = "anime" | "games";
export type Legality = "official" | "legal_free" | "unofficial";

export const LEGAL_LABEL: Record<Legality, string> = {
  official: "رسمية مدفوعة",
  legal_free: "قانونية مجانية",
  unofficial: "غير رسمية — تحذير",
};

export interface Platform {
  id: string;
  name: string;
  kind: MediaKind;
  legality: Legality;
  type: string;
  arabic: string;
  price: string;
  pros: string[];
  cons: string[];
  start: string[];
  url?: string;
}

export const PLATFORMS: Platform[] = [
  { id: "crunchyroll", name: "Crunchyroll", kind: "anime", legality: "official", type: "موقع وتطبيق بث", arabic: "ترجمة عربية لكثير من الأعمال", price: "اشتراك شهري (نسخة مجانية محدودة ببعض الدول)", pros: ["أكبر مكتبة أنمي رسمية", "حلقات بعد ساعات من عرضها في اليابان", "جودة 1080p"], cons: ["بعض الأعمال غير متاحة في كل الدول", "يحتاج دفعاً إلكترونياً"], start: ["حمّل التطبيق أو افتح الموقع", "أنشئ حساباً", "اختر الاشتراك المناسب أو المحتوى المجاني"], url: "https://www.crunchyroll.com" },
  { id: "netflix", name: "Netflix", kind: "anime", legality: "official", type: "خدمة بث عامة", arabic: "ترجمة ودبلجة عربية واسعة", price: "اشتراك شهري", pros: ["أعمال أصلية حصرية", "دبلجة عربية", "تحميل للمشاهدة بدون إنترنت"], cons: ["مكتبة أنمي أصغر من Crunchyroll"], start: ["اشترك من الموقع", "ابحث عن قسم الأنمي"], url: "https://www.netflix.com" },
  { id: "anime-ar", name: "Shahid / OSN+ ", kind: "anime", legality: "official", type: "منصات عربية", arabic: "دبلجة عربية رسمية", price: "اشتراك شهري", pros: ["دفع أسهل في الدول العربية", "دبلجات كلاسيكية"], cons: ["أعمال أنمي حديثة قليلة"], start: ["اشترك من الموقع أو التطبيق"], url: "https://shahid.mbc.net" },
  { id: "muse", name: "Muse Asia / Ani-One (YouTube)", kind: "anime", legality: "legal_free", type: "قنوات YouTube رسمية", arabic: "بعضها بترجمة عربية", price: "مجاني بالإعلانات", pros: ["قانوني ومجاني", "لا يحتاج اشتراكاً"], cons: ["متاح لمناطق آسيا والشرق الأوسط فقط لبعض الأعمال", "مكتبة محدودة"], start: ["ابحث عن Muse Asia أو Ani-One Asia في YouTube", "اشترك في القناة"], url: "https://www.youtube.com/@MuseAsia" },
  { id: "spacetoon", name: "Spacetoon Go", kind: "anime", legality: "official", type: "تطبيق عربي", arabic: "دبلجة عربية كاملة", price: "مجاني جزئياً + اشتراك", pros: ["مناسب للأطفال والعائلة", "كلاسيكيات مدبلجة"], cons: ["تحديثات أبطأ"], start: ["حمّل التطبيق من المتجر"], url: "https://spacetoongo.com" },
  { id: "pirate-anime", name: "مواقع البث والتحميل غير المرخصة", kind: "anime", legality: "unofficial", type: "مواقع مجهولة", arabic: "ترجمة معجبين", price: "مجانية", pros: ["مكتبة كبيرة", "ترجمات سريعة"], cons: ["مخالفة لحقوق النشر", "إعلانات خبيثة ونوافذ احتيال", "خطر فيروسات وسرقة بيانات", "تُحجب وتتغير روابطها باستمرار"], start: ["لا ننصح بها ولا نضع روابطها. إن اضطررت: استخدم مانع إعلانات، ولا تحمّل ملفات تنفيذية، ولا تُدخل بياناتك."] },
  { id: "steam", name: "Steam", kind: "games", legality: "official", type: "متجر ألعاب حاسوب", arabic: "أسعار إقليمية وألعاب معربة", price: "حسب اللعبة + تخفيضات موسمية", pros: ["أكبر مكتبة ألعاب", "تخفيضات كبيرة", "استرداد خلال ساعتين لعب و14 يوماً"], cons: ["يحتاج طريقة دفع دولية أو بطاقات هدايا"], start: ["حمّل Steam من الموقع الرسمي", "أنشئ حساباً وفعّل Steam Guard", "اشترِ أو حمّل الألعاب المجانية"], url: "https://store.steampowered.com" },
  { id: "epic", name: "Epic Games Store", kind: "games", legality: "legal_free", type: "متجر + ألعاب مجانية أسبوعياً", arabic: "بعض الألعاب معربة", price: "لعبة مجانية كل أسبوع", pros: ["ألعاب مجانية قانونية أسبوعية تبقى لك للأبد"], cons: ["مزايا مجتمعية أقل من Steam"], start: ["حمّل Epic Launcher", "احصل على اللعبة المجانية كل خميس"], url: "https://store.epicgames.com" },
  { id: "gog", name: "GOG", kind: "games", legality: "official", type: "متجر ألعاب بدون حماية DRM", arabic: "محدود", price: "حسب اللعبة", pros: ["ألعاب قديمة معدّلة لتعمل على ويندوز الحديث", "ملفات تثبيت تحتفظ بها"], cons: ["مكتبة حديثة أصغر"], start: ["أنشئ حساباً وحمّل GOG Galaxy (اختياري)"], url: "https://www.gog.com" },
  { id: "psn", name: "PlayStation Store / Xbox Store", kind: "games", legality: "official", type: "متاجر أجهزة الكونسول", arabic: "ألعاب معربة كثيرة", price: "حسب اللعبة + اشتراكات Plus / Game Pass", pros: ["Game Pass يتيح مئات الألعاب باشتراك واحد"], cons: ["أسعار أعلى من الحاسوب أحياناً", "تحتاج حساب منطقة مدعومة"], start: ["أنشئ حساباً على الجهاز", "اشحن المحفظة ببطاقة هدايا"], url: "https://store.playstation.com" },
  { id: "itch", name: "itch.io", kind: "games", legality: "legal_free", type: "ألعاب مستقلة", arabic: "محدود", price: "كثير منها مجاني", pros: ["آلاف الألعاب المستقلة المجانية", "مناسبة للأجهزة الضعيفة"], cons: ["جودة متفاوتة"], start: ["افتح الموقع وابحث بفلتر Free"], url: "https://itch.io" },
  { id: "pirate-games", name: "النسخ المكركة ومواقع «الريباك»", kind: "games", legality: "unofficial", type: "مواقع مجهولة", arabic: "—", price: "مجانية", pros: ["تتيح ألعاباً مدفوعة بلا مقابل"], cons: ["مخالفة لحقوق النشر", "أكثر مصدر لبرمجيات التعدين وسرقة الحسابات", "لا تحديثات ولا لعب أونلاين", "قد يُحظر حسابك"], start: ["لا ننصح بها ولا نضع روابطها. البديل: الألعاب المجانية الأسبوعية في Epic وتخفيضات Steam."] },
];

export interface GameEntry {
  name: string;
  era: "classic" | "modern";
  year: string;
  developer: string;
  genre: string;
  platforms: string;
  minSpec: string;
  oldVsNew: string;
  pros: string[];
  cons: string[];
  url: string;
}

export const GAMES: GameEntry[] = [
  { name: "EA Sports FC 25 (FIFA سابقاً)", era: "modern", year: "2024", developer: "EA", genre: "كرة قدم", platforms: "PC، PS4/5، Xbox، Switch", minSpec: "8GB رام، GTX 1050 Ti", oldVsNew: "تغير الاسم من FIFA عام 2023 بعد انتهاء الشراكة مع الاتحاد الدولي؛ نفس الأسلوب مع تحسينات في الحركة وأوضاع Ultimate Team.", pros: ["تراخيص الدوريات والأندية", "لعب جماعي أونلاين"], cons: ["مشتريات داخل اللعبة كثيرة"], url: "https://www.ea.com/games/ea-sports-fc" },
  { name: "eFootball (PES سابقاً)", era: "modern", year: "2021+", developer: "Konami", genre: "كرة قدم", platforms: "PC، كونسول، جوال", minSpec: "8GB رام، GTX 1050", oldVsNew: "PES 2021 كانت لعبة كاملة مدفوعة؛ eFootball أصبحت مجانية بتحديثات مستمرة، لكن محتوى الأوضاع الفردية أقل.", pros: ["مجانية", "تعمل على الجوال"], cons: ["أوضاع أقل من PES القديمة"], url: "https://www.konami.com/efootball" },
  { name: "PUBG Mobile / Free Fire", era: "modern", year: "2018 / 2017", developer: "Krafton-Tencent / Garena", genre: "باتل رويال", platforms: "أندرويد، iOS", minSpec: "3GB رام (Free Fire تعمل بـ2GB)", oldVsNew: "Free Fire أخف وتناسب الهواتف الضعيفة؛ PUBG أكثر واقعية وتحتاج هاتفاً أقوى.", pros: ["مجانية", "منتشرة جداً عربياً"], cons: ["استهلاك بطارية وإنترنت"], url: "https://www.pubgmobile.com" },
  { name: "GTA V", era: "modern", year: "2013 (نسخة محسنة 2025)", developer: "Rockstar", genre: "عالم مفتوح", platforms: "PC، PS، Xbox", minSpec: "4GB رام (8GB موصى)، GTX 660", oldVsNew: "مقارنة بـGTA San Andreas (2004): عالم أكبر بكثير ورسوميات حديثة ووضع أونلاين، لكن San Andreas تعمل على أي جهاز تقريباً.", pros: ["قصة قوية", "GTA Online"], cons: ["حجم كبير ~100GB"], url: "https://www.rockstargames.com/gta-v" },
  { name: "Minecraft", era: "modern", year: "2011", developer: "Mojang (Microsoft)", genre: "بناء ومغامرة", platforms: "كل المنصات", minSpec: "4GB رام، أي كرت حديث", oldVsNew: "نسخة Java للحاسوب تدعم التعديلات؛ Bedrock تتيح اللعب المشترك بين الجوال والكونسول.", pros: ["مناسبة لكل الأعمار", "تعمل على أجهزة ضعيفة"], cons: ["مدفوعة"], url: "https://www.minecraft.net" },
  { name: "God of War (2005 ← 2018 ← Ragnarök)", era: "classic", year: "2005 / 2018 / 2022", developer: "Santa Monica Studio", genre: "أكشن ومغامرة", platforms: "PS2، PS4/5، PC", minSpec: "نسخة PC 2018: 8GB رام، GTX 960", oldVsNew: "الأجزاء القديمة قتال سريع بكاميرا ثابتة؛ الأجزاء الجديدة بكاميرا قريبة وقصة أعمق وعالم شبه مفتوح. القديمة تُلعب على محاكي PCSX2.", pros: ["قصة ممتازة"], cons: ["الأجزاء الجديدة ثقيلة على الأجهزة الضعيفة"], url: "https://www.playstation.com/games/god-of-war/" },
  { name: "Resident Evil 4 (2005 ← Remake 2023)", era: "classic", year: "2005 / 2023", developer: "Capcom", genre: "رعب وأكشن", platforms: "كل المنصات", minSpec: "Remake: 8GB رام، GTX 1050 Ti", oldVsNew: "الريميك أعاد بناء اللعبة برسوميات حديثة وتحكم أسلس وقصة موسعة؛ الأصلية خفيفة وتعمل على أي جهاز.", pros: ["من أفضل الريميكات"], cons: ["الريميك يحتاج جهازاً متوسطاً"], url: "https://www.residentevil.com/re4/" },
  { name: "Counter-Strike (1.6 ← CS2)", era: "classic", year: "2000 / 2023", developer: "Valve", genre: "تصويب جماعي", platforms: "PC", minSpec: "CS2: 8GB رام، كرت يدعم DirectX 11", oldVsNew: "CS2 مجانية برسوميات Source 2 وخوادم حديثة؛ 1.6 خفيفة جداً لكنها قديمة ومليئة بالخوادم غير الرسمية.", pros: ["CS2 مجانية", "منافسة احترافية"], cons: ["الغشاشون في المستويات المنخفضة"], url: "https://www.counter-strike.net" },
];

export function filterPlatforms(kind: MediaKind, legality: Legality | "all"): Platform[] {
  return PLATFORMS.filter((p) => p.kind === kind && (legality === "all" || p.legality === legality));
}
