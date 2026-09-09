import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, Send, Clock, MapPin } from "lucide-react";
import { Card, PageShell } from "@/components/layout/PageShell";
import { SITE, hasAnyContact, whatsappLink } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | inservices" },
      {
        name: "description",
        content: "طرق التواصل مع فريق inservices للاستفسار عن الخدمات الرقمية والدفع والتنفيذ.",
      },
      { property: "og:title", content: "تواصل معنا | inservices" },
      { property: "og:description", content: "واتساب، بريد إلكتروني، وقنوات التواصل الرسمية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const wa = whatsappLink("مرحباً، أرغب في الاستفسار عن خدماتكم");
  const rows = [
    wa ? { icon: MessageCircle, label: "واتساب", value: `+${SITE.whatsapp}`, href: wa } : null,
    SITE.phone ? { icon: Phone, label: "هاتف", value: SITE.phone, href: `tel:${SITE.phone}` } : null,
    SITE.email ? { icon: Mail, label: "البريد الإلكتروني", value: SITE.email, href: `mailto:${SITE.email}` } : null,
    SITE.telegram
      ? { icon: Send, label: "تيليجرام", value: `@${SITE.telegram}`, href: `https://t.me/${SITE.telegram}` }
      : null,
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string }[];

  return (
    <PageShell
      title="تواصل معنا"
      subtitle="نجيب على استفساراتك قبل الطلب وبعده، ونساعدك في اختيار الخدمة المناسبة."
    >
      {hasAnyContact() ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map((r) => (
            <a
              key={r.label}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-card flex items-center gap-3 rounded-3xl p-5 transition-colors hover:border-primary/50"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <r.icon className="size-5" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block text-sm font-bold text-card-foreground">{r.label}</span>
                <span className="block text-xs text-muted-foreground" dir="ltr">
                  {r.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      ) : (
        <Card title="قنوات التواصل">
          <p>
            لم تُضف بيانات التواصل الرسمية بعد. حتى ذلك الحين يمكنك إرسال طلبك من المتجر مباشرة، وسنتواصل
            معك على الرقم الذي تكتبه في صفحة إتمام الطلب.
          </p>
        </Card>
      )}

      <Card title="ساعات العمل">
        <p className="flex items-center gap-2">
          <Clock className="size-4 text-primary" strokeWidth={1.5} />
          {SITE.workingHours}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="size-4 text-primary" strokeWidth={1.5} />
          {SITE.city}
        </p>
      </Card>

      <Card title="كيف نرد؟">
        <p>
          نراجع كل طلب يدوياً: بعد رفع إثبات الدفع نتحقق منه ثم نبدأ التنفيذ ونحدّث حالة الطلب في صفحة
          «طلباتي». إن تأخر الرد لأي سبب، أعد المحاولة عبر نفس القناة.
        </p>
      </Card>
    </PageShell>
  );
}
