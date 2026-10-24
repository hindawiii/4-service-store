import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, PageShell } from "@/components/layout/PageShell";
import { GROUP_LABEL, SYSTEM_TOOLS, type ToolGroup } from "@/data/system-tools";

export const Route = createFileRoute("/system-tools")({
  head: () => ({
    meta: [
      { title: "حزم التشغيل والتعريفات وأدوات الحرق والضغط | inservice" },
      { name: "description", content: "كل ما يحتاجه جهازك لتشغيل الألعاب والبرامج: Visual C++، DirectX، .NET، تعريفات الشاشة، Ventoy، Rufus، 7-Zip مع روابط رسمية وخطوات التثبيت." },
      { property: "og:title", content: "حزم التشغيل وأدوات الأنظمة | inservice" },
      { property: "og:description", content: "روابط رسمية وبديلة وخطوات تثبيت وحلول الأخطاء الشائعة لأهم أدوات ويندوز ولينكس." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SystemToolsPage,
});

const GROUPS = Object.keys(GROUP_LABEL) as ToolGroup[];

function SystemToolsPage() {
  const [group, setGroup] = useState<ToolGroup | "all">("all");
  const list = SYSTEM_TOOLS.filter((t) => group === "all" || t.group === group);

  return (
    <PageShell title="حزم التشغيل والتعريفات وأدوات الأنظمة" subtitle="ما الذي يحتاجه جهازك ليعمل البرنامج أو اللعبة أو المحاكي؟ روابط رسمية وخطوات واضحة.">
      <Card title="ابدأ من هنا">
        <p>إذا ظهرت لك رسالة «ملف dll مفقود» أو لم تعمل لعبة أو محاكي، ثبّت بالترتيب: Visual C++ (x86 و x64) ← DirectX ← .NET ← أحدث تعريف لكرت الشاشة. هذا يحل أغلب المشاكل.</p>
      </Card>

      <div className="flex flex-wrap gap-2">
        {(["all", ...GROUPS] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${group === g ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`}
          >
            {g === "all" ? "الكل" : GROUP_LABEL[g]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((t) => (
          <section key={t.id} className="surface-card space-y-3 rounded-3xl p-5 text-sm leading-7">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold text-card-foreground">{t.name}</h2>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${t.free ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>{t.free ? "مجاني" : "مدفوع"}</span>
            </div>
            <p className="text-xs text-muted-foreground">{GROUP_LABEL[t.group]} · {t.developer} · {t.platforms}</p>
            <p className="text-muted-foreground"><b className="text-foreground">الفائدة:</b> {t.purpose}</p>
            <p className="text-muted-foreground"><b className="text-foreground">تحتاجه لـ:</b> {t.neededFor}</p>
            <div>
              <b className="text-foreground">طريقة التنزيل والتثبيت:</b>
              <ol className="mt-1 list-decimal space-y-1 pe-5 text-muted-foreground">
                {t.install.map((s) => <li key={s}>{s}</li>)}
              </ol>
            </div>
            <div>
              <b className="text-foreground">أخطاء شائعة وحلها:</b>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                {t.errors.map((e) => <li key={e.problem}>• <span className="text-foreground">{e.problem}:</span> {e.fix}</li>)}
              </ul>
            </div>
            {t.warning && <p className="rounded-2xl bg-destructive/10 p-3 text-xs text-destructive">{t.warning}</p>}
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={t.official} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                الموقع الرسمي <ExternalLink className="size-3" />
              </a>
              {t.alternative && (
                <a href={t.alternative.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground">
                  مصدر بديل: {t.alternative.label} <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          </section>
        ))}
      </div>

      <Card title="تنبيه أمان">
        <p>حمّل دائماً من الموقع الرسمي أو المصدر البديل الموثّق المذكور هنا. تجنّب المواقع التي تطلب «مفعّلات» أو نسخاً معدّلة، فهي المصدر الأول للفيروسات.</p>
      </Card>
    </PageShell>
  );
}
