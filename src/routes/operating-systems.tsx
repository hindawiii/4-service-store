import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, PageShell } from "@/components/layout/PageShell";
import {
  CPU_LABEL, OPERATING_SYSTEMS, USE_LABEL, rateOs, recommendOs,
  type CpuTier, type MySpecs, type OsFamily, type UseCase,
} from "@/data/operating-systems";

export const Route = createFileRoute("/operating-systems")({
  head: () => ({
    meta: [
      { title: "مقارنة أنظمة ويندوز ولينكس والنظام المناسب لجهازك | inservice" },
      { name: "description", content: "قارن Windows 11 و10 وLTSC وتوزيعات Linux Mint وUbuntu وFedora وKali، واعرف النظام المناسب لجهازك مع روابط رسمية وخطوات التثبيت." },
      { property: "og:title", content: "أي نظام تشغيل يناسب جهازك؟ | inservice" },
      { property: "og:description", content: "أداة ترشيح ومقارنة لأنظمة ويندوز ولينكس مع المتطلبات وحلول الأخطاء." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OsPage,
});

const KEY = "inservice-os-specs";
const DEFAULT: MySpecs = { ramGb: 8, storageGb: 128, cpu: "mid", tpm: false, use: "general" };
const FIT_LABEL = { great: "مناسب جداً", ok: "يعمل بشكل مقبول", no: "غير مناسب" } as const;
const FIT_CLS = { great: "bg-primary/15 text-primary", ok: "bg-accent/15 text-accent", no: "bg-destructive/10 text-destructive" } as const;

const sel = "w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm text-foreground";

function OsPage() {
  const [specs, setSpecs] = useState<MySpecs>(DEFAULT);
  const [family, setFamily] = useState<OsFamily | "all">("all");

  useEffect(() => {
    try { const v = localStorage.getItem(KEY); if (v) setSpecs({ ...DEFAULT, ...JSON.parse(v) }); } catch { /* ignore */ }
  }, []);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(specs)); }, [specs]);

  const set = <K extends keyof MySpecs>(k: K, v: MySpecs[K]) => setSpecs((s) => ({ ...s, [k]: v }));
  const top = recommendOs(specs);
  const list = OPERATING_SYSTEMS.filter((o) => family === "all" || o.family === family);

  return (
    <PageShell title="أنظمة ويندوز ولينكس: مقارنة والنظام المناسب لك" subtitle="أدخل مواصفات جهازك واستخدامك، ونرشّح لك النظام الأنسب مع ما ينقص جهازك.">
      <Card title="مواصفات جهازك">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-xs font-semibold">الرام
            <select className={sel} value={specs.ramGb} onChange={(e) => set("ramGb", Number(e.target.value))}>
              {[1, 2, 4, 6, 8, 12, 16, 32].map((n) => <option key={n} value={n}>{n} GB</option>)}
            </select>
          </label>
          <label className="space-y-1 text-xs font-semibold">مساحة التخزين المتاحة
            <select className={sel} value={specs.storageGb} onChange={(e) => set("storageGb", Number(e.target.value))}>
              {[16, 32, 64, 128, 256, 512].map((n) => <option key={n} value={n}>{n} GB</option>)}
            </select>
          </label>
          <label className="space-y-1 text-xs font-semibold">المعالج
            <select className={sel} value={specs.cpu} onChange={(e) => set("cpu", e.target.value as CpuTier)}>
              {(Object.keys(CPU_LABEL) as CpuTier[]).map((c) => <option key={c} value={c}>{CPU_LABEL[c]}</option>)}
            </select>
          </label>
          <label className="space-y-1 text-xs font-semibold">الاستخدام الأساسي
            <select className={sel} value={specs.use} onChange={(e) => set("use", e.target.value as UseCase)}>
              {(Object.keys(USE_LABEL) as UseCase[]).map((u) => <option key={u} value={u}>{USE_LABEL[u]}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold sm:col-span-2">
            <input type="checkbox" checked={specs.tpm} onChange={(e) => set("tpm", e.target.checked)} />
            جهازي يدعم TPM 2.0 (لمعرفته: اضغط Win+R واكتب tpm.msc)
          </label>
        </div>
      </Card>

      <Card title="كيف أعرف مواصفات جهازي؟">
        <ul className="space-y-1">
          <li>• <b>ويندوز:</b> Win+R ثم اكتب <code>dxdiag</code>، أو الإعدادات ← النظام ← حول، أو Ctrl+Shift+Esc ← الأداء.</li>
          <li>• <b>المساحة:</b> افتح «هذا الكمبيوتر» وانظر للمساحة الفارغة على القرص.</li>
          <li>• <b>المعالج:</b> اسم المعالج في «حول»؛ مثلاً i5-8250U يعني الجيل الثامن = حديث.</li>
          <li>• <b>لينكس:</b> اكتب في الطرفية <code>lscpu</code> و <code>free -h</code>.</li>
        </ul>
      </Card>

      <Card title="الأنظمة الموصى بها لك">
        {top.length === 0 ? (
          <p>لا يوجد نظام مناسب لهذه المواصفات؛ جرّب Lubuntu أو antiX، أو زِد الرام إلى 2GB على الأقل.</p>
        ) : (
          <ol className="space-y-2">
            {top.map((o, i) => (
              <li key={o.id} className="rounded-2xl border border-border p-3">
                <b className="text-foreground">{i + 1}. {o.name}</b> — {o.summary}
              </li>
            ))}
          </ol>
        )}
      </Card>

      <div className="flex flex-wrap gap-2">
        {([["all", "الكل"], ["windows", "ويندوز"], ["linux", "لينكس"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setFamily(k)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${family === k ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((o) => {
          const r = rateOs(o, specs);
          return (
            <section key={o.id} className="surface-card space-y-3 rounded-3xl p-5 text-sm leading-7">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-card-foreground">{o.name}</h2>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${FIT_CLS[r.fit]}`}>{FIT_LABEL[r.fit]}</span>
              </div>
              <p className="text-xs text-muted-foreground">{o.developer} · {o.released} · {o.status}</p>
              <p className="text-muted-foreground">{o.summary}</p>
              <p className="text-xs text-muted-foreground">يناسب: {o.bestFor.map((u) => USE_LABEL[u]).join("، ")}</p>
              {r.missing.length > 0 && (
                <p className="rounded-2xl bg-destructive/10 p-3 text-xs text-destructive">ينقص جهازك: {r.missing.join("، ")}</p>
              )}
              <div className="grid gap-2 sm:grid-cols-2">
                <div><b className="text-foreground">المميزات</b><ul className="text-muted-foreground">{o.pros.map((p) => <li key={p}>+ {p}</li>)}</ul></div>
                <div><b className="text-foreground">العيوب</b><ul className="text-muted-foreground">{o.cons.map((p) => <li key={p}>− {p}</li>)}</ul></div>
              </div>
              <p className="text-muted-foreground"><b className="text-foreground">متطلبات لا يعمل بدونها:</b> {o.mustHave.join("، ")}</p>
              <details>
                <summary className="cursor-pointer font-bold text-foreground">طريقة التنزيل والتثبيت والأخطاء الشائعة</summary>
                <ol className="mt-2 list-decimal space-y-1 pe-5 text-muted-foreground">{o.install.map((s) => <li key={s}>{s}</li>)}</ol>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {o.errors.map((e) => <li key={e.problem}>• <span className="text-foreground">{e.problem}:</span> {e.fix}</li>)}
                </ul>
                {o.workaround && <p className="mt-2 text-muted-foreground"><b className="text-foreground">إن لم يطابق جهازك:</b> {o.workaround}</p>}
              </details>
              {o.warning && <p className="rounded-2xl bg-destructive/10 p-3 text-xs text-destructive">{o.warning}</p>}
              <div className="flex flex-wrap gap-2 pt-1">
                <a href={o.official} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">الموقع الرسمي <ExternalLink className="size-3" /></a>
                {o.alternative && <a href={o.alternative.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground">{o.alternative.label} <ExternalLink className="size-3" /></a>}
                {o.course && <a href={o.course.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground">تعلّم: {o.course.label} <ExternalLink className="size-3" /></a>}
              </div>
            </section>
          );
        })}
      </div>

      <Card title="تنبيه">
        <p>النتائج تقريبية. احفظ نسخة احتياطية من ملفاتك قبل أي تثبيت، وحمّل الأنظمة من المواقع الرسمية فقط.</p>
      </Card>
    </PageShell>
  );
}
