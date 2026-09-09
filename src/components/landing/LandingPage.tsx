import { Link } from "@tanstack/react-router";
import {
  ArrowUpLeft,
  BadgeCheck,
  Banknote,
  Bitcoin,
  Clock,
  Compass,
  Headset,
  Heart,
  Landmark,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CATEGORIES, type Service } from "@/data/services";


const FEATURES = [
  {
    icon: "Rocket",
    title: "تنفيذ سريع",
    text: "معظم الطلبات تُنفَّذ خلال ساعات قليلة من تأكيد الدفع، وبعضها فوري.",
  },
  {
    icon: "ShieldCheck",
    title: "دفع آمن ومحلي",
    text: "بنكك، تحويل بنكي، أو USDT — مع رفع إثبات الدفع ومراجعته يدوياً.",
  },
  {
    icon: "Headset",
    title: "دعم فني عن بُعد",
    text: "نصلح مشاكل جهازك عبر AnyDesk دون الحاجة لمغادرة منزلك.",
  },
  {
    icon: "Bot",
    title: "اشتراكات ذكاء اصطناعي",
    text: "وصول لأقوى أدوات الذكاء الاصطناعي بأسعار مناسبة للسوق السوداني.",
  },
  {
    icon: "GraduationCap",
    title: "دورات مميزة",
    text: "محتوى تعليمي عملي بالعربية يبدأ معك من الصفر حتى الاحتراف.",
  },
  {
    icon: "Package",
    title: "حزم موفرة",
    text: "اجمع أكثر من خدمة في حزمة واحدة ووفّر في السعر والوقت.",
  },
];

const STEPS = [
  { n: "1", title: "اختر خدمتك", text: "تصفح المتجر وأضف ما تحتاجه إلى السلة." },
  { n: "2", title: "ادفع بطريقتك", text: "بنكك أو تحويل بنكي أو USDT، ثم ارفع إثبات الدفع." },
  { n: "3", title: "نؤكد الطلب", text: "نراجع الدفع ونبدأ التنفيذ ونحدّث حالة الطلب لحظياً." },
  { n: "4", title: "استلم وقيّم", text: "تستلم الخدمة كاملة، ويسعدنا تقييمك لتحسين جودتنا." },
];

const PAYMENTS = [
  { icon: Wallet, label: "بنكك", note: "تحويل فوري داخل السودان" },
  { icon: Landmark, label: "تحويل بنكي", note: "من أي بنك محلي" },
  { icon: Bitcoin, label: "USDT (TRC20)", note: "للعملاء خارج السودان" },
  { icon: Banknote, label: "طرق أخرى", note: "تواصل معنا للاتفاق" },
];

export function LandingPage({ services }: { services: Service[] }) {
  const featured = services.filter((s) => s.featured).slice(0, 6);
  const showcase = (featured.length ? featured : services.slice(0, 6)).slice(0, 6);
  const minPrice = services.length ? Math.min(...services.map((s) => s.price)) : 5;

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <span className="flex items-center gap-2 text-base font-extrabold text-foreground">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Sparkles className="size-5" strokeWidth={1.5} />
            </span>
            iServices
          </span>
          <nav className="flex items-center gap-2 text-sm">
            <a href="#about" className="hidden rounded-xl px-3 py-2 text-muted-foreground transition-colors hover:text-foreground sm:block">
              من نحن
            </a>
            <a href="#features" className="hidden rounded-xl px-3 py-2 text-muted-foreground transition-colors hover:text-foreground sm:block">
              المميزات
            </a>
            <Link
              to="/services"
              className="rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              تصفح المتجر
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <BadgeCheck className="size-4" strokeWidth={1.5} />
              خدمات رقمية موثوقة من الخرطوم إلى العالم
            </span>
            <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
              كل خدماتك التقنية في مكان واحد
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              تثبيت أنظمة، اشتراكات ذكاء اصطناعي، دعم فني عن بُعد، ودورات مميزة — بأسعار تبدأ من{" "}
              <span className="font-bold text-accent">${minPrice}</span> وتنفيذ سريع ودفع محلي مريح.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                ابدأ الآن
                <ArrowUpLeft className="size-4" strokeWidth={2} />
              </Link>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:text-primary"
              >
                تعرّف علينا
              </a>
            </div>
            <dl className="grid max-w-lg grid-cols-3 gap-3 pt-4">
              {[
                { k: `${services.length}+`, v: "خدمة متاحة" },
                { k: "24/7", v: "استقبال الطلبات" },
                { k: "100%", v: "دفع محلي آمن" },
              ].map((s) => (
                <div key={s.v} className="surface-card rounded-2xl px-3 py-4 text-center">
                  <dt className="text-xl font-extrabold text-primary">{s.k}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle overline="لماذا iServices" title="مميزات تجعل تجربتك أسهل" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="surface-card rounded-3xl p-6">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ServiceIcon name={f.icon} className="size-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-card-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle overline="أقسام المتجر" title="ماذا نقدّم لك؟" />
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
              <Link
                key={c.id}
                to="/services"
                className="surface-card flex items-center gap-3 rounded-2xl px-5 py-4 transition-all hover:-translate-y-1 hover:glow-ring"
              >
                <ServiceIcon name={c.icon} className="size-5 text-primary" />
                <span className="text-sm font-semibold text-card-foreground">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {showcase.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle overline="الأكثر طلباً" title="خدمات مختارة لك" />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {showcase.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              عرض كل الخدمات
              <ArrowUpLeft className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </section>
      )}

      <section id="about" className="border-y border-border bg-card/30 py-16">
        <div className="mx-auto max-w-6xl space-y-8 px-4">
          <SectionTitle overline="من نحن" title="فريق تقني سوداني يؤمن بأن التقنية حق للجميع" />
          <p className="max-w-3xl text-sm leading-loose text-muted-foreground sm:text-base">
            بدأت iServices من حاجة بسيطة: كثير من المستخدمين في السودان يواجهون صعوبة في الوصول إلى
            الخدمات الرقمية العالمية — سواء بسبب وسائل الدفع أو الأسعار أو غياب الدعم بالعربية. جمعنا
            خبرتنا في الأنظمة والبرمجة والدعم الفني في متجر واحد يقدّم الخدمة بلغتك، بسعر تقدر عليه،
            وبطريقة دفع تستخدمها كل يوم.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={Target}
              title="هدفنا"
              text="أن نجعل كل خدمة رقمية يحتاجها المستخدم السوداني متاحة خلال دقائق، بلا تعقيد وبلا حواجز دفع."
            />
            <InfoCard
              icon={MessageCircle}
              title="رسالتنا"
              text="نقدّم خدمات تقنية موثوقة وبأسعار عادلة، مع دعم إنساني بالعربية يشرح ويطمئن قبل وبعد التنفيذ."
            />
            <InfoCard
              icon={Compass}
              title="رؤيتنا"
              text="أن نصبح الوجهة الأولى للخدمات الرقمية في السودان، ومنصة تعليمية ترفع مهارات جيل كامل."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Heart, t: "الصدق", d: "لا وعود مبالغ فيها — نقول ما ننفّذه بالضبط." },
              { icon: ShieldCheck, t: "الأمان", d: "بياناتك وإثبات دفعك محفوظة بشكل خاص ومشفّر." },
              { icon: Clock, t: "الالتزام", d: "نحترم وقتك ونلتزم بالمدة المتفق عليها." },
            ].map((v) => (
              <div key={v.t} className="flex items-start gap-3 rounded-2xl border border-border p-4">
                <v.icon className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.5} />
                <div>
                  <h4 className="text-sm font-bold text-foreground">{v.t}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle overline="كيف نعمل" title="أربع خطوات فقط" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="surface-card relative rounded-3xl p-6">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-accent/15 text-sm font-extrabold text-accent">
                {s.n}
              </span>
              <h3 className="mt-4 text-base font-bold text-card-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/30 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle overline="طرق الدفع" title="ادفع بالطريقة التي تناسبك" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PAYMENTS.map((p) => (
              <div key={p.label} className="surface-card flex items-center gap-3 rounded-2xl p-5">
                <p.icon className="size-6 shrink-0 text-primary" strokeWidth={1.5} />
                <div>
                  <div className="text-sm font-bold text-card-foreground">{p.label}</div>
                  <div className="text-xs text-muted-foreground">{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="hero-surface glow-ring flex flex-col items-center gap-5 rounded-4xl border border-border px-6 py-14 text-center">
          <Headset className="size-10 text-primary" strokeWidth={1.5} />
          <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            جاهز تبدأ خدمتك الأولى؟
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            أنشئ حسابك خلال ثوانٍ، اختر خدمتك، وادفع بالطريقة المناسبة لك. نحن معك خطوة بخطوة.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/services"
              className="rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              تصفح الخدمات
            </Link>
            <Link
              to="/auth"
              className="rounded-2xl border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

    </div>
  );
}

function SectionTitle({ overline, title }: { overline: string; title: string }) {
  return (
    <div className="mb-8 space-y-2">
      <span className="text-xs font-semibold tracking-wide text-primary">{overline}</span>
      <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">{title}</h2>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Target;
  title: string;
  text: string;
}) {
  return (
    <div className="surface-card rounded-3xl p-6">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
        <Icon className="size-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 text-lg font-bold text-card-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}