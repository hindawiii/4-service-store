import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, PageShell } from "@/components/layout/PageShell";
import {
  CPU_EXAMPLES, EMULATORS, GPU_EXAMPLES, PLATFORM_LABEL, TIER_LABEL, VERDICT_LABEL,
  checkEmulator, type DeviceSpecs, type Platform, type Tier, type Verdict,
} from "@/data/emulators";

export const Route = createFileRoute("/emulators")({
  head: () => ({
    meta: [
      { title: "ركن المحاكيات وفحص توافق جهازك | inservice" },
      { name: "description", content: "اعرف أي محاكي ألعاب يناسب جهازك: PS1، PS2، PS3، PSP، ومحاكيات أندرويد، مع دليل معرفة مواصفات جهازك." },
      { property: "og:title", content: "ركن المحاكيات وفحص التوافق | inservice" },
      { property: "og:description", content: "أدخل مواصفات جهازك واعرف المحاكيات المناسبة له والمتطلبات اللازمة لتشغيلها." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmulatorsPage,
});

const KEY = "inservice:device-specs";
const DEFAULT: DeviceSpecs = { platform: "windows", ramGb: 8, cpu: 2, gpu: 2 };

const GUIDES: { title: string; ways: string[] }[] = [
  { title: "ويندوز", ways: [
    "الطريقة الأسهل: اضغط زر ويندوز + R، اكتب dxdiag ثم Enter. تبويب «النظام» يعرض المعالج والرام، وتبويب «العرض» يعرض كرت الشاشة.",
    "من الإعدادات: الإعدادات ← النظام ← حول (About) لمعرفة المعالج والرام.",
    "مدير المهام: اضغط Ctrl + Shift + Esc ← تبويب الأداء (Performance) لترى المعالج والذاكرة وكرت الشاشة.",
  ]},
  { title: "أندرويد", ways: [
    "الإعدادات ← حول الهاتف ← المواصفات (أو معلومات البرنامج) لمعرفة الرام والمعالج.",
    "ثبّت تطبيق CPU-Z أو DevCheck المجاني من متجر Play لمعرفة اسم المعالج وكرت الشاشة (GPU) بدقة.",
    "ابحث في جوجل عن اسم موديل هاتفك + كلمة specs مثل «Galaxy A54 specs».",
  ]},
  { title: "آيفون / آيباد", ways: [
    "الإعدادات ← عام ← حول لمعرفة اسم الموديل.",
    "ابحث عن اسم الموديل في موقع Apple الرسمي أو GSMArena لمعرفة المعالج والرام.",
  ]},
  { title: "ماك", ways: [
    "قائمة التفاحة  ← حول هذا الماك: يظهر المعالج (مثل M1) والذاكرة.",
  ]},
  { title: "لينكس", ways: [
    "في الطرفية: lscpu للمعالج، free -h للرام، lspci | grep -i vga لكرت الشاشة.",
  ]},
];

const VERDICT_STYLE: Record<Verdict, string> = {
  great: "bg-primary/15 text-primary",
  ok: "bg-accent/15 text-accent",
  no: "bg-destructive/15 text-destructive",
  unsupported: "bg-muted text-muted-foreground",
};

function EmulatorsPage() {
  const [specs, setSpecs] = useState<DeviceSpecs>(DEFAULT);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSpecs({ ...DEFAULT, ...JSON.parse(raw) });
    } catch { /* ignore */ }
  }, []);
  const update = (patch: Partial<DeviceSpecs>) => {
    const next = { ...specs, ...patch };
    setSpecs(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const results = useMemo(() => {
    const order: Verdict[] = ["great", "ok", "no", "unsupported"];
    return EMULATORS.map((e) => ({ e, v: checkEmulator(e, specs) })).sort(
      (a, b) => order.indexOf(a.v) - order.indexOf(b.v),
    );
  }, [specs]);

  const sel = "h-11 w-full rounded-2xl border border-border bg-card px-3 text-sm text-foreground";
  const tiers: Tier[] = [1, 2, 3, 4];

  return (
    <PageShell title="ركن المحاكيات وفحص التوافق" subtitle="أدخل مواصفات جهازك التقريبية وسنخبرك أي المحاكيات تناسبه. تُحفظ مواصفاتك على جهازك فقط.">
      <Card title="1. مواصفات جهازك">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-xs">نوع الجهاز</span>
            <select className={sel} value={specs.platform} onChange={(e) => update({ platform: e.target.value as Platform })}>
              {(Object.keys(PLATFORM_LABEL) as Platform[]).map((p) => <option key={p} value={p}>{PLATFORM_LABEL[p]}</option>)}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs">الذاكرة العشوائية (الرام)</span>
            <select className={sel} value={specs.ramGb} onChange={(e) => update({ ramGb: Number(e.target.value) })}>
              {[1, 2, 3, 4, 6, 8, 12, 16, 32].map((r) => <option key={r} value={r}>{r} جيجا</option>)}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs">المعالج</span>
            <select className={sel} value={specs.cpu} onChange={(e) => update({ cpu: Number(e.target.value) as Tier })}>
              {tiers.map((t) => <option key={t} value={t}>{TIER_LABEL[t]}</option>)}
            </select>
            <span className="block text-xs">أمثلة: {CPU_EXAMPLES[specs.cpu]}</span>
          </label>
          <label className="space-y-1">
            <span className="text-xs">كرت الشاشة</span>
            <select className={sel} value={specs.gpu} onChange={(e) => update({ gpu: Number(e.target.value) as Tier })}>
              {tiers.map((t) => <option key={t} value={t}>{TIER_LABEL[t]}</option>)}
            </select>
            <span className="block text-xs">أمثلة: {GPU_EXAMPLES[specs.gpu]}</span>
          </label>
        </div>
      </Card>

      <Card title="لا تعرف مواصفات جهازك؟ هكذا تعرفها">
        <div className="space-y-2">
          {GUIDES.map((g) => (
            <details key={g.title} className="rounded-2xl border border-border p-3">
              <summary className="cursor-pointer font-medium text-foreground">{g.title}</summary>
              <ol className="mt-2 list-decimal space-y-1 pr-5">
                {g.ways.map((w) => <li key={w}>{w}</li>)}
              </ol>
            </details>
          ))}
        </div>
      </Card>

      <Card title="2. النتيجة">
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map(({ e, v }) => (
            <div key={e.id} className="rounded-2xl border border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-foreground">{e.name}</p>
                  <p className="text-xs">{e.console}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${VERDICT_STYLE[v]}`}>{VERDICT_LABEL[v]}</span>
              </div>
              <p className="mt-2 text-xs">الأدنى: رام {e.minRamGb} جيجا · معالج {TIER_LABEL[e.minCpu]} · كرت {TIER_LABEL[e.minGpu]}</p>
              <p className="mt-2 text-xs font-medium text-foreground">ما يحتاجه للتشغيل:</p>
              <ul className="list-disc pr-5 text-xs">{e.needs.map((n) => <li key={n}>{n}</li>)}</ul>
              {e.note && <p className="mt-2 text-xs text-destructive">{e.note}</p>}
              <a href={e.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                الموقع الرسمي <ExternalLink className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-xs">النتيجة تقريبية. ملفات BIOS والألعاب يجب استخراجها من أجهزتك وأقراصك الأصلية؛ لا نوفّر ملفات محمية بحقوق النشر.</p>
      </Card>
    </PageShell>
  );
}
