export type ResourceCategory = "code" | "practice" | "repositories" | "design" | "inspiration" | "languages";

export const RESOURCE_CATEGORIES: { id: ResourceCategory; label: string; icon: string }[] = [
  { id: "code", label: "تعلم البرمجة", icon: "BookOpen" },
  { id: "practice", label: "تطبيق عملي", icon: "Code2" },
  { id: "repositories", label: "الكود والتعاون", icon: "Terminal" },
  { id: "design", label: "تصميم UI / UX", icon: "Palette" },
  { id: "inspiration", label: "إلهام بصري", icon: "Sparkles" },
  { id: "languages", label: "لغات أجنبية", icon: "MessagesSquare" },
];

export interface LearningResource {
  id: string;
  name: string;
  category: ResourceCategory;
  url: string;
  guide: string;
  access: "free" | "freemium";
  cost: string;
  language: string;
  purpose: string;
  when: string;
  outcome: string;
  steps: string[];
  note: string;
}

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: "freecodecamp", name: "freeCodeCamp", category: "code", url: "https://www.freecodecamp.org/", guide: "https://www.freecodecamp.org/learn/", access: "free", cost: "المناهج والتمارين مجانية.", language: "إنجليزية؛ تتوفر ترجمات لبعض المحتوى",
    purpose: "مناهج برمجة متدرجة وتمارين ومشاريع، من تطوير الويب إلى مجالات أخرى.", when: "عندما تحتاج مساراً منظماً من الصفر بدلاً من فيديوهات متفرقة.", outcome: "مشاريع عملية تستطيع تحسينها وإضافتها إلى ملف أعمالك.",
    steps: ["افتح صفحة Learn وأنشئ حساباً لحفظ التقدم.", "اختر مساراً يناسب مستواك، وابدأ بتمارين الأساسيات.", "أكمل المشاريع بنفسك وراجع الحل عند التعثر."], note: "الشهادة لا تغني عن بناء مشاريع وفهم الكود الذي تكتبه.",
  },
  {
    id: "odin", name: "The Odin Project", category: "code", url: "https://www.theodinproject.com/", guide: "https://www.theodinproject.com/paths", access: "free", cost: "المناهج مفتوحة ومجانية.", language: "إنجليزية",
    purpose: "مسار تطوير ويب يعتمد على القراءة والمشاريع وGit والعمل على جهازك.", when: "عندما تريد تعلم أدوات المطور الحقيقية وليس التمارين داخل المتصفح فقط.", outcome: "مواقع ومشاريع كاملة ومستودعات كود يمكنك مشاركتها.",
    steps: ["ابدأ بمسار Foundations.", "اتبع دليل إعداد بيئة التطوير الموافق لنظامك.", "بعد الأساسيات اختر مسار JavaScript أو Ruby on Rails."], note: "يحتاج حاسوباً ووقتاً للتطبيق؛ الهاتف وحده ليس بيئة مناسبة لمعظم المشاريع.",
  },
  {
    id: "mdn", name: "MDN Web Docs", category: "code", url: "https://developer.mozilla.org/", guide: "https://developer.mozilla.org/en-US/docs/Learn_web_development", access: "free", cost: "التوثيق ومحتوى التعلم مجانيان؛ خدمات MDN Plus اختيارية ومدفوعة.", language: "إنجليزية ومحتوى مترجم",
    purpose: "مرجع HTML وCSS وJavaScript وتقنيات الويب مع أمثلة ومناهج تعلم.", when: "عندما تريد تفسيراً دقيقاً لخاصية أو مشكلة في المتصفح.", outcome: "فهم سلوك الكود وتوافقه مع المتصفحات بدلاً من نسخ حلول عشوائية.",
    steps: ["افتح Learn web development للمسار التعليمي.", "ابحث باسم الخاصية أو الدالة التي تستخدمها.", "جرّب المثال وراجع جدول دعم المتصفحات."], note: "مرجع تقني وليس منصة شهادات أو استضافة مشاريع.",
  },
  {
    id: "cs50", name: "Harvard CS50", category: "code", url: "https://cs50.harvard.edu/x/", guide: "https://cs50.harvard.edu/x/", access: "free", cost: "محتوى الدورة متاح مجاناً؛ الشهادة الموثقة عبر edX قد تكون مدفوعة.", language: "إنجليزية؛ توفر الترجمة يختلف حسب الفيديو",
    purpose: "مقدمة علوم الحاسوب والخوارزميات والبرمجة مع مسائل ومشروع نهائي.", when: "عندما تريد تأسيس التفكير المنطقي وحل المشكلات.", outcome: "أساس مفاهيمي يساعدك على الانتقال بين اللغات بثقة.",
    steps: ["اقرأ تعليمات الدورة ومتطلبات تسليم التمارين.", "شاهد المحاضرة ثم القسم العملي لكل أسبوع.", "حل مجموعات المسائل ثم أنجز المشروع النهائي."], note: "المسائل تتطلب جهداً؛ اتبع سياسة النزاهة الأكاديمية ولا تسلّم حلاً منسوخاً.",
  },
  {
    id: "exercism", name: "Exercism", category: "practice", url: "https://exercism.org/", guide: "https://exercism.org/tracks", access: "free", cost: "مسارات وتمارين وإرشاد مجاني.", language: "إنجليزية",
    purpose: "تمارين في لغات برمجة متعددة مع اختبارات وتعليقات تعليمية.", when: "عندما تعرف الأساسيات وتريد تحسين أسلوبك بلغة معينة.", outcome: "حلول أصح وكود أوضح عبر التدريب والمراجعة.",
    steps: ["أنشئ حساباً واختر لغة من Tracks.", "ابدأ بتمارين المفاهيم داخل محرر الويب أو على جهازك.", "شغّل الاختبارات وراجع التغذية الراجعة واطلب إرشاداً عند توفره."], note: "توفر المرشدين وسرعة الرد يختلفان حسب المسار.",
  },
  {
    id: "frontendmentor", name: "Frontend Mentor", category: "practice", url: "https://www.frontendmentor.io/", guide: "https://www.frontendmentor.io/challenges", access: "freemium", cost: "تحديات مجانية؛ تحديات وأصول وميزات إضافية ضمن Pro.", language: "إنجليزية",
    purpose: "تحويل تصاميم جاهزة إلى واجهات حقيقية باستخدام HTML وCSS وJavaScript.", when: "عندما تحتاج مشروعاً واضحاً لتدريب الواجهات.", outcome: "نماذج أعمال قابلة للعرض وتحسين الدقة في تنفيذ التصاميم.",
    steps: ["رشّح التحديات المجانية وحدد مستوى مناسباً.", "نزّل الملفات واقرأ متطلبات التحدي.", "ابنِ الواجهة وارفع حلك للحصول على ملاحظات المجتمع."], note: "ملفات Figma وبعض التحديات ليست مجانية؛ راجع شارة كل تحدٍ.",
  },
  {
    id: "codepen", name: "CodePen", category: "practice", url: "https://codepen.io/", guide: "https://codepen.io/pen/", access: "freemium", cost: "استخدام أساسي مجاني؛ الخصوصية وبعض الميزات المتقدمة مدفوعة.", language: "إنجليزية",
    purpose: "تجربة HTML وCSS وJavaScript في المتصفح مع مشاهدة النتيجة مباشرة.", when: "عندما تريد اختبار فكرة صغيرة أو مشاركة مثال لمشكلة.", outcome: "رابط سريع لنموذج واجهة يمكن عرضه أو مناقشته.",
    steps: ["افتح محرر Pen جديداً.", "اكتب الكود في أقسام HTML وCSS وJavaScript.", "احفظ المثال بحسابك وشارك رابطه بعد التأكد من النتيجة."], note: "أمثلة الحساب المجاني تكون عامة عادةً؛ لا تضع مفاتيح سرية أو بيانات عملاء.",
  },
  {
    id: "kaggle", name: "Kaggle Learn", category: "practice", url: "https://www.kaggle.com/learn", guide: "https://www.kaggle.com/learn", access: "free", cost: "الدورات القصيرة مجانية؛ موارد التشغيل تخضع لحصص وشروط المنصة.", language: "إنجليزية",
    purpose: "دورات قصيرة عملية في Python وتحليل البيانات وتعلم الآلة.", when: "عندما تريد دخول مجال البيانات بتطبيقات داخل المتصفح.", outcome: "دفاتر تحليل وتمارين عملية يمكنك تطويرها باستخدام بيانات عامة.",
    steps: ["أنشئ حساباً وافتح Learn.", "ابدأ بـPython ثم Pandas إذا كان هدفك تحليل البيانات.", "أكمل التمارين وأنشئ Notebook خاصاً بمشروعك."], note: "لا ترفع بيانات خاصة أو بيانات لا تملك حق استخدامها.",
  },
  {
    id: "github", name: "GitHub", category: "repositories", url: "https://github.com/", guide: "https://skills.github.com/", access: "freemium", cost: "خطة مجانية؛ التشغيل والتخزين وميزات الفرق لها حدود وخطط مدفوعة.", language: "إنجليزية وتوثيق مترجم جزئياً",
    purpose: "استضافة مستودعات Git والمراجعة والتعاون وإدارة المشكلات والأتمتة.", when: "عندما تريد حفظ تاريخ مشروعك أو المساهمة في مشروع مفتوح المصدر.", outcome: "نسخ منظمة للكود وملف أعمال وتعاون أوضح مع الفريق.",
    steps: ["أنشئ حساباً وابدأ بدورة Introduction to GitHub في Skills.", "أنشئ مستودعاً واختر عاماً أو خاصاً وفق طبيعة المشروع.", "أضف README وتدرّب على الفروع وطلبات الدمج."], note: "لا ترفع كلمات المرور؛ راجع رخصة أي مشروع قبل إعادة استخدامه.",
  },
  {
    id: "gitlab", name: "GitLab", category: "repositories", url: "https://about.gitlab.com/", guide: "https://docs.gitlab.com/tutorials/", access: "freemium", cost: "خطة Free؛ حدود للموارد والمستخدمين وبعض ميزات الشركات مدفوعة.", language: "إنجليزية",
    purpose: "بديل لاستضافة Git يجمع مراجعة الكود والتخطيط وCI/CD، مع خيار استضافة ذاتية.", when: "عندما تريد مسار تطوير متكاملاً أو تحكماً أكبر في مكان الاستضافة.", outcome: "مراجعة وتحقق آلي من التغييرات ضمن منصة واحدة.",
    steps: ["اختر الخدمة المستضافة أو قيّم متطلبات الاستضافة الذاتية.", "أنشئ مشروعاً أو استورد مستودعاً موجوداً.", "ابدأ بالفروع وMerge Requests ثم دليل CI/CD."], note: "الاستضافة الذاتية تتطلب صيانة وتحديثات وموارد؛ ليست بلا تكلفة تشغيل.",
  },
  {
    id: "codeberg", name: "Codeberg", category: "repositories", url: "https://codeberg.org/", guide: "https://docs.codeberg.org/getting-started/", access: "free", cost: "خدمة مجتمعية مجانية للمشاريع المتوافقة مع شروطها، تدعمها التبرعات.", language: "إنجليزية",
    purpose: "استضافة Git وتعاون للمشاريع الحرة ومفتوحة المصدر، مبنية على Forgejo.", when: "عندما تريد بديلاً مجتمعياً لمشروع مفتوح المصدر.", outcome: "مستودع ومشكلات وطلبات دمج بعيداً عن المنصات التجارية الكبرى.",
    steps: ["اقرأ شروط الاستخدام للتأكد أن مشروعك مناسب.", "أنشئ حساباً ومستودعاً وأضف رخصة مشروعك.", "ارفع الكود عبر Git واستخدم Issues وPull Requests."], note: "ليست بديلاً غير محدود لتخزين الملفات أو للمشاريع الخاصة التجارية؛ راجع سياسة الاستخدام.",
  },
  {
    id: "figma", name: "Figma", category: "design", url: "https://www.figma.com/", guide: "https://help.figma.com/", access: "freemium", cost: "خطة Starter مجانية بحدود؛ التعاون وميزات متقدمة ضمن خطط مدفوعة.", language: "إنجليزية أساساً",
    purpose: "تصميم واجهات ونماذج تفاعلية والتعاون على ملفات التصميم.", when: "قبل برمجة واجهة أو عند مشاركة تصور مع عميل وفريق.", outcome: "نموذج قابل للنقر وملف تصميم يوضّح المقاسات والحالات.",
    steps: ["أنشئ حساباً وملف Design جديداً.", "أنشئ Frame ثم أضف النصوص والعناصر وAuto Layout.", "اربط الشاشات في Prototype وجرّب العرض قبل المشاركة."], note: "تحقق من حدود الخطة ومن رخصة أي قالب أو عنصر من Community.",
  },
  {
    id: "penpot", name: "Penpot", category: "design", url: "https://penpot.app/", guide: "https://help.penpot.app/", access: "freemium", cost: "مفتوح المصدر مع خيار مجاني؛ خدمات وخطط تجارية متاحة.", language: "واجهة متعددة اللغات؛ التوثيق إنجليزي",
    purpose: "تصميم واجهات ونماذج تفاعلية بأدوات مبنية على معايير الويب.", when: "عندما تريد بديلاً مفتوح المصدر لأدوات تصميم الواجهات.", outcome: "ملف تصميم مشترك وتسليم أوضح للمطورين.",
    steps: ["افتح حساباً في الخدمة أو راجع دليل الاستضافة الذاتية.", "أنشئ ملفاً وألواحاً للشاشات.", "استخدم Flex Layout واربط الشاشات في وضع النموذج الأولي."], note: "الاستضافة الذاتية تحتاج إدارة تقنية؛ راجع الشروط الحالية للخدمة المستضافة.",
  },
  {
    id: "nngroup", name: "Nielsen Norman Group", category: "design", url: "https://www.nngroup.com/", guide: "https://www.nngroup.com/articles/", access: "freemium", cost: "مقالات وفيديوهات مجانية؛ الدورات والشهادات والتقارير المحددة مدفوعة.", language: "إنجليزية",
    purpose: "أبحاث ومقالات عن تجربة المستخدم وقابلية الاستخدام واختبار الواجهات.", when: "عندما تريد سبباً بحثياً لقرار تصميم بدلاً من الذوق فقط.", outcome: "تحسين نماذجك وأسئلتك لاختبارات المستخدمين.",
    steps: ["ابدأ بمقالات Usability وUser Research.", "اختر موضوعاً مرتبطاً بمشكلة في مشروعك.", "حوّل الإرشادات إلى تجربة واختبرها مع مستخدمين حقيقيين."], note: "ليس محرر تصميم؛ لا تفترض أن كل الدورات مجانية أو أن النتيجة تنطبق على كل جمهور.",
  },
  {
    id: "behance", name: "Behance", category: "inspiration", url: "https://www.behance.net/", guide: "https://www.behance.net/search/projects", access: "freemium", cost: "تصفح ونشر أساسي مجاني؛ اشتراكات ومحتوى وخدمات مدفوعة موجودة.", language: "محتوى بلغات متعددة",
    purpose: "ملفات أعمال ودراسات مشاريع في الهوية والواجهات والتصوير وغيرها.", when: "عندما تبحث عن اتجاه بصري أو طريقة عرض مشروعك.", outcome: "لوحة مراجع وفهم أفضل لكيفية تقديم دراسة حالة.",
    steps: ["ابحث بالمجال مثل UI UX أو Branding.", "حلّل التسلسل والألوان والتكوين في عدة مشاريع.", "كوّن مرجعك الخاص ثم صمم عملاً أصلياً مع توثيق المصادر."], note: "الإعجاب بالعمل لا يمنحك حق نسخه؛ احصل على إذن لاستخدام الأصول.",
  },
  {
    id: "dribbble", name: "Dribbble", category: "inspiration", url: "https://dribbble.com/", guide: "https://dribbble.com/shots", access: "freemium", cost: "تصفح متاح مجاناً؛ بعض ميزات العرض والتوظيف والخدمات مدفوعة.", language: "إنجليزية أساساً",
    purpose: "أفكار واجهات وأيقونات وهوية بصرية من مجتمع المصممين.", when: "عندما تريد مقارنة طرق معالجة عنصر بصري معين.", outcome: "تنويع أفكار التصميم قبل اختيار حل مناسب لمشروعك.",
    steps: ["ابحث عن نوع الشاشة أو العنصر المطلوب.", "قارن عدة أعمال ولا تعتمد على لقطة واحدة.", "اختبر قابلية الاستخدام والتباين في تصميمك المستقل."], note: "اللقطات قد تكون تصورات غير قابلة للتطبيق؛ الجمال لا يعني سهولة الاستخدام.",
  },
  {
    id: "awwwards", name: "Awwwards", category: "inspiration", url: "https://www.awwwards.com/", guide: "https://www.awwwards.com/websites/", access: "freemium", cost: "معرض المواقع متاح للتصفح؛ الدورات والتقديم وبعض الخدمات مدفوعة.", language: "إنجليزية",
    purpose: "معرض مواقع مميزة في التصميم والتفاعل مع روابط للمواقع الأصلية.", when: "عندما تبحث عن حلول تفاعل أو اتجاهات تصميم ويب متقدمة.", outcome: "مراجع حية لتجربة الحركة والتنقل، لا مجرد صور.",
    steps: ["افتح معرض Websites ورشّح حسب المجال.", "زر الموقع الأصلي وجرّبه على شاشة صغيرة أيضاً.", "قيّم سرعة التحميل ووضوح التنقل قبل استلهام الفكرة."], note: "بعض المواقع ثقيلة؛ لا تنقل المؤثرات دون مراعاة الأداء وإمكانية الوصول.",
  },
  {
    id: "duolingo", name: "Duolingo", category: "languages", url: "https://www.duolingo.com/", guide: "https://www.duolingo.com/courses", access: "freemium", cost: "تعلم أساسي مجاني مع إعلانات وحدود؛ اشتراكات اختيارية مدفوعة.", language: "لغات متعددة؛ المسارات تختلف حسب لغة البداية",
    purpose: "تمارين قصيرة للمفردات والاستماع والقراءة لبناء عادة يومية.", when: "عندما تبدأ لغة جديدة وتحتاج تدريباً منتظماً ومختصراً.", outcome: "توسيع المفردات وبناء الاستمرارية في التعلم.",
    steps: ["حدد لغة البداية واللغة التي تريد تعلمها.", "ابدأ من الأساسيات أو اختبار تحديد المستوى إن توفر.", "خصص وقتاً يومياً وأضف محادثة وقراءة خارج التطبيق."], note: "لا يكفي وحده للطلاقة المهنية؛ الميزات والمسارات تختلف حسب البلد والحساب.",
  },
  {
    id: "bbc", name: "BBC Learning English", category: "languages", url: "https://www.bbc.co.uk/learningenglish", guide: "https://www.bbc.co.uk/learningenglish", access: "free", cost: "مواد تعلم الإنجليزية متاحة مجاناً.", language: "إنجليزية",
    purpose: "دروس وصوتيات وفيديوهات في النطق والمفردات والقواعد والأخبار.", when: "عندما تريد تحسين الاستماع وفهم الإنجليزية اليومية.", outcome: "مفردات ضمن سياق وتدريب على النطق والاستماع.",
    steps: ["اختر محتوى مناسباً لمستواك مثل 6 Minute English.", "استمع أولاً ثم راجع النص والمفردات المتاحة.", "أعد الاستماع وسجل تلخيصاً بصوتك."], note: "قد يختلف الوصول للمحتوى حسب المنطقة؛ الموقع ليس اختباراً رسمياً لإثبات المستوى.",
  },
  {
    id: "britishcouncil", name: "British Council LearnEnglish", category: "languages", url: "https://learnenglish.britishcouncil.org/", guide: "https://learnenglish.britishcouncil.org/skills", access: "freemium", cost: "مواد تدريب مجانية؛ الدروس المباشرة والدورات المحددة مدفوعة.", language: "إنجليزية",
    purpose: "تدريب مصنف حسب المستوى في القراءة والكتابة والاستماع والمحادثة.", when: "عندما تريد تقوية مهارة محددة بخطوات وتمارين.", outcome: "خطة تدريب أدق وفق مستواك والمهارة التي تحتاجها.",
    steps: ["استخدم اختبار المستوى الإرشادي إن توفر.", "اختر المستوى والمهارة من قسم Skills.", "نفذ التمرين وقارن الإجابات وكرر الأجزاء الصعبة."], note: "اختبار المستوى الإرشادي ليس شهادة IELTS؛ راجع تكلفة أي دورة قبل الاشتراك.",
  },
];

export function filterResources(category: ResourceCategory | "all", query: string, freeOnly: boolean) {
  const q = query.trim().toLocaleLowerCase();
  return LEARNING_RESOURCES.filter((r) =>
    (category === "all" || r.category === category) &&
    (!freeOnly || r.access === "free") &&
    (!q || [r.name, r.purpose, r.when, r.outcome, r.language].join(" ").toLocaleLowerCase().includes(q)),
  );
}