import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, PageShell } from "@/components/layout/PageShell";
import { BRANDS, CHIP_LABEL, FRP_GUIDE, filterTools, type Chipset } from "@/data/phones";

export const Route = createFileRoute("/phones")({
  head: () => ({
    meta: [
      { title: "مركز صيانة وتفليش الهواتف وشركات الهواتف | inservice" },
      { name: "description", content: "دليل شركات الهواتف وموديلاتها، وأدوات التفليش المجانية والمدفوعة حسب المعالج: Odin وMi Flash وSP Flash Tool وQFIL مع الخطوات والأخطاء." },
      { property: "og:title", content: "مركز صيانة وتفليش الهواتف | inservice" },
      { property: "og:description", content: "اعرف الأداة المناسبة لهاتفك حسب الشركة والمعالج مع روابط رسمية وخطوات واضحة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PhonesPage,
});

const chip = (on: boolean) =>
  `rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`;

function PhonesPage() {
  const [tab, setTab] = useState<"brands" | "tools" | "frp">("brands");
  const [cpu, setCpu] = useState<Chipset>("any");
  const [freeOnly, setFreeOnly] = useState(false);
  const [famous, setFamous] = useState<"all" | "famous" | "hidden">("all");
  const tools = filterTools(cpu, freeOnly);
  const brands = BRANDS.filter((b) => famous === "all" || (famous === "famous") === b.famous);

  return (
    <PageShell title="مركز صيانة وتفليش الهواتف" subtitle="الشركات وموديلاتها، وأداة التفليش المناسبة لهاتفك حسب المعالج، مع روابط رسمية وخطوات واضحة.">
      <Card title="قبل أي تفليش">
        <ul className="space-y-1">
          <li>• خذ نسخة احتياطية: التفليش والفورمات يمسحان البيانات.</li>
          <li>• اشحن البطارية فوق 50% واستخدم كابلاً أصلياً.</li>
          <li>• اعرف موديلك ومعالجه: الإعدادات ← حول الهاتف، أو تطبيق CPU-Z أو اكتب <code>*#06#</code> لمعرفة IMEI.</li>
        </ul>
      </Card>

      <div className="flex flex-wrap gap-2">
        <button className={chip(tab === "brands")} onClick={() => setTab("brands")}>الشركات والموديلات</button>
        <button className={chip(tab === "tools")} onClick={() => setTab("tools")}>أدوات التفليش والفورمات</button>
        <button className={chip(tab === "frp")} onClick={() => setTab("frp")}>حساب Google (FRP)</button>
      </div>

      {tab === "brands" && (
        <>
          <div className="flex flex-wrap gap-2">
            <button className={chip(famous === "all")} onClick={() => setFamous("all")}>الكل</button>
            <button className={chip(famous === "famous")} onClick={() => setFamous("famous")}>المشهورة</button>
            <button className={chip(famous === "hidden")} onClick={() => setFamous("hidden")}>قوية وغير منتشرة</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {brands.map((b) => (
              <section key={b.name} className="surface-card space-y-2 rounded-3xl p-5 text-sm leading-7">
                <h2 className="text-base font-bold text-card-foreground">{b.name}</h2>
                <p className="text-xs text-muted-foreground">{b.country} · التأسيس: {b.founded}</p>
                <p className="text-muted-foreground"><b className="text-foreground">تطور ملحوظ:</b> {b.milestone}</p>
                <p className="text-muted-foreground"><b className="text-foreground">أشهر السلاسل:</b> {b.series.join("، ")}</p>
                <p className="text-muted-foreground"><b className="text-foreground">أداة التفليش الرسمية:</b> {b.flashTool}</p>
                <a href={b.official} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">الموقع الرسمي <ExternalLink className="size-3" /></a>
              </section>
            ))}
          </div>
        </>
      )}

      {tab === "tools" && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(CHIP_LABEL) as Chipset[]).map((c) => (
              <button key={c} className={chip(cpu === c)} onClick={() => setCpu(c)}>{CHIP_LABEL[c]}</button>
            ))}
            <label className="flex items-center gap-1 text-xs font-semibold">
              <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} /> المجانية فقط
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((t) => (
              <section key={t.id} className="surface-card space-y-3 rounded-3xl p-5 text-sm leading-7">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-card-foreground">{t.name}</h2>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${t.free ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>{t.free ? "مجاني" : "مدفوع"}</span>
                  {!t.famous && <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">غير مشهور لكنه فعّال</span>}
                </div>
                <p className="text-xs text-muted-foreground">{t.brands}</p>
                <p className="text-muted-foreground"><b className="text-foreground">الفائدة:</b> {t.purpose}</p>
                <p className="text-muted-foreground"><b className="text-foreground">يعمل مع:</b> {t.works}</p>
                <p className="text-muted-foreground"><b className="text-foreground">نسبة النجاح:</b> {t.success}</p>
                <details>
                  <summary className="cursor-pointer font-bold text-foreground">طريقة التنزيل والتثبيت والأخطاء الشائعة</summary>
                  <ol className="mt-2 list-decimal space-y-1 pe-5 text-muted-foreground">{t.install.map((s) => <li key={s}>{s}</li>)}</ol>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    {t.errors.map((e) => <li key={e.problem}>• <span className="text-foreground">{e.problem}:</span> {e.fix}</li>)}
                  </ul>
                </details>
                {t.warning && <p className="rounded-2xl bg-destructive/10 p-3 text-xs text-destructive">{t.warning}</p>}
                <div className="flex flex-wrap gap-2">
                  <a href={t.official} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">الموقع الرسمي <ExternalLink className="size-3" /></a>
                  {t.alternative && <a href={t.alternative.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground">مصدر بديل: {t.alternative.label} <ExternalLink className="size-3" /></a>}
                </div>
              </section>
            ))}
          </div>
        </>
      )}

      {tab === "frp" && (
        <Card title={FRP_GUIDE.title}>
          <ol className="list-decimal space-y-1 pe-5">{FRP_GUIDE.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          <p className="mt-3 rounded-2xl bg-destructive/10 p-3 text-xs text-destructive">{FRP_GUIDE.warning}</p>
          <a href={FRP_GUIDE.official} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">استرداد حساب Google <ExternalLink className="size-3" /></a>
        </Card>
      )}

      <Card title="تنبيه">
        <p>لا توجد أداة بنجاح مضمون 100%؛ النتيجة تختلف حسب الموديل والإصدار والرقعة الأمنية. إن لم تكن متأكداً، اطلب خدمة الصيانة من متجرنا.</p>
      </Card>
    </PageShell>
  );
}
