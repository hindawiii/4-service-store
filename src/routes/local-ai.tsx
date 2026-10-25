import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, PageShell } from "@/components/layout/PageShell";
import { COMPANIES, MODELS, RUNNERS, checkSize, type Fit } from "@/data/local-ai";

export const Route = createFileRoute("/local-ai")({
  head: () => ({
    meta: [
      { title: "مركز الذكاء الاصطناعي المحلي وفحص توافق جهازك | inservice" },
      { name: "description", content: "نماذج الذكاء الاصطناعي المحلية حسب الشركة: Llama و Qwen و Gemma و DeepSeek، مع المتطلبات وروابط التحميل وفحص قدرة جهازك على تشغيلها." },
      { property: "og:title", content: "مركز الذكاء الاصطناعي المحلي | inservice" },
      { property: "og:description", content: "اعرف أي نموذج ذكاء اصطناعي يعمل على جهازك وكيف تثبته خطوة بخطوة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LocalAiPage,
});

const FIT: Record<Fit, { label: string; cls: string }> = {
  great: { label: "يعمل بسرعة", cls: "bg-primary/15 text-primary" },
  ok: { label: "يعمل ببطء", cls: "bg-accent/15 text-accent" },
  no: { label: "لا يكفي", cls: "bg-destructive/15 text-destructive" },
};

function LocalAiPage() {
  const [ram, setRam] = useState(8);
  const [vram, setVram] = useState(0);
  const [company, setCompany] = useState<string>("all");
  const list = MODELS.filter((m) => company === "all" || m.company === company);

  const best = MODELS.flatMap((m) => m.sizes.map((s) => ({ m, s })))
    .filter(({ s }) => checkSize(s, ram, vram) !== "no")
    .sort((a, b) => b.s.minRamGb - a.s.minRamGb)[0];

  return (
    <PageShell title="مركز الذكاء الاصطناعي المحلي" subtitle="شغّل نماذج الذكاء الاصطناعي على جهازك بدون إنترنت ومجاناً. اعرف ما يناسب جهازك.">
      <Card title="افحص جهازك">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">الرام (GB)
            <select value={ram} onChange={(e) => setRam(+e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background p-2 text-foreground">
              {[4, 8, 12, 16, 24, 32, 48, 64].map((v) => <option key={v} value={v}>{v} GB</option>)}
            </select>
          </label>
          <label className="block">ذاكرة كرت الشاشة VRAM
            <select value={vram} onChange={(e) => setVram(+e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-background p-2 text-foreground">
              {[0, 2, 4, 6, 8, 12, 16, 24, 48].map((v) => <option key={v} value={v}>{v === 0 ? "لا يوجد / مدمج" : `${v} GB`}</option>)}
            </select>
          </label>
        </div>
        <p className="text-xs">لمعرفة الرام وذاكرة كرت الشاشة في ويندوز: اضغط Ctrl + Shift + Esc ← الأداء. ذاكرة الكرت تظهر باسم «ذاكرة GPU المخصصة». في ماك M1/M2 اعتبر الرام نفسها ذاكرة الكرت.</p>
        <p className="rounded-2xl bg-primary/10 p-3 text-foreground">
          {best ? <>الموصى به لجهازك: <b>{best.m.name} {best.s.label}</b>. إن أردت نموذجاً أكبر تحتاج رام أو كرت شاشة بذاكرة أعلى (انظر المتطلبات في الجدول).</>
            : <>جهازك أقل من الحد الأدنى. تحتاج 4GB رام على الأقل لتشغيل أصغر النماذج (Llama 3.2 1B).</>}
        </p>
      </Card>

      <div className="flex flex-wrap gap-2">
        {["all", ...COMPANIES].map((c) => (
          <button key={c} onClick={() => setCompany(c)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${company === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
            {c === "all" ? "كل الشركات" : c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((m) => (
          <section key={m.id} className="surface-card space-y-2 rounded-3xl p-5 text-sm leading-7 text-muted-foreground">
            <h2 className="text-base font-bold text-card-foreground">{m.name}</h2>
            <p className="text-xs">{m.company} · {m.released} · {m.license}</p>
            <p><b className="text-foreground">مناسب لـ:</b> {m.bestFor}</p>
            <p><b className="text-foreground">المميزات:</b> {m.pros} <b className="text-foreground">العيوب:</b> {m.cons}</p>
            <div className="space-y-1">
              {m.sizes.map((s) => {
                const f = FIT[checkSize(s, ram, vram)];
                return (
                  <div key={s.label} className="flex items-center justify-between gap-2 rounded-xl border border-border px-3 py-1.5 text-xs">
                    <span className="text-foreground">{s.label} — رام {s.minRamGb}GB أو كرت {s.vramGb}GB</span>
                    <span className={`rounded-full px-2 py-0.5 font-bold ${f.cls}`}>{f.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={m.official} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">الموقع الرسمي <ExternalLink className="size-3" /></a>
              <a href={m.mirror} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground">التحميل عبر Ollama <ExternalLink className="size-3" /></a>
            </div>
          </section>
        ))}
      </div>

      <Card title="طريقة التنزيل والتثبيت خطوة بخطوة">
        <div className="grid gap-3 md:grid-cols-3">
          {RUNNERS.map((r) => (
            <div key={r.name} className="rounded-2xl border border-border p-4">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary">{r.name} ↗</a>
              <p className="text-xs">{r.desc}</p>
              <ol className="mt-2 list-decimal space-y-1 pe-5 text-xs">{r.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            </div>
          ))}
        </div>
      </Card>

      <Card title="إذا كان الموقع الرسمي محظوراً في بلدك">
        <p>النماذج نفسها متاحة على Hugging Face (huggingface.co) وعلى مكتبة Ollama، وبرنامج LM Studio يحمّلها من داخله. اختر دائماً نسخ GGUF بصيغة Q4_K_M فهي أفضل توازن بين الجودة والحجم.</p>
      </Card>
      <Card title="نصائح الاستخدام الصحيح">
        <p>• أغلق المتصفح والبرامج الثقيلة قبل التشغيل. • النموذج الأكبر أذكى لكنه أبطأ. • للعربية ابدأ بـ Qwen. • للبرمجة جرّب Qwen Coder أو DeepSeek. • الأرقام هنا تقريبية لنسخ Q4.</p>
      </Card>
    </PageShell>
  );
}
