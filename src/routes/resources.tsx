import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, ChevronDown, ExternalLink, Search, X } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { filterResources, RESOURCE_CATEGORIES, type ResourceCategory } from "@/data/learning-resources";

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [
    { title: "مصادر البرمجة والتصميم والتعلم | inservice" },
    { name: "description", content: "دليل مصادر البرمجة العملية وتصميم UI UX والإلهام البصري وتعلم اللغات، مع الروابط الرسمية وحدود المجانية وخطوات البدء." },
    { property: "og:title", content: "مصادر البرمجة والتصميم والتعلم | inservice" },
    { property: "og:description", content: "اختر مصادر تعلم وتطبيق موثوقة، واعرف فائدة كل مصدر وكيف تبدأ فيه وما المتاح مجاناً." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [category, setCategory] = useState<ResourceCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const resources = filterResources(category, query, freeOnly);

  return (
    <PageShell title="مصادر البرمجة والتصميم والتعلم" subtitle="من أول سطر كود إلى مشروعك القادم — مصادر رسمية للتعلم والتطبيق والتعاون.">
      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <div className="relative">
          <Search aria-hidden="true" className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
          <Input aria-label="البحث في المصادر" placeholder="ابحث باسم الموقع أو المجال..." value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 pr-10 pl-10" />
          {query && <Button variant="ghost" size="icon" aria-label="مسح البحث" title="مسح البحث" onClick={() => setQuery("")} className="absolute left-0.5 top-0.5"><X /></Button>}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="تصنيفات المصادر">
          <Button size="sm" variant={category === "all" ? "default" : "outline"} aria-pressed={category === "all"} onClick={() => setCategory("all")}><BookOpen />الكل</Button>
          {RESOURCE_CATEGORIES.map((c) => <Button key={c.id} size="sm" variant={category === c.id ? "default" : "outline"} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}><ServiceIcon name={c.icon} />{c.label}</Button>)}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-foreground"><input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} className="size-4 accent-primary" />محتوى تعليمي مجاني فقط</label>
          <span aria-live="polite" className="text-muted-foreground">{resources.length} مصدر</span>
        </div>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-2">
        {resources.map((r) => <article key={r.id} className="surface-card min-w-0 rounded-lg p-5">
          <div className="mb-3 flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><ServiceIcon name={RESOURCE_CATEGORIES.find((c) => c.id === r.category)?.icon ?? "BookOpen"} className="size-5" /></span>
            <div className="min-w-0 flex-1"><h2 dir="ltr" className="break-words text-right text-base font-bold text-foreground">{r.name}</h2><p className="mt-1 text-xs text-muted-foreground">{RESOURCE_CATEGORIES.find((c) => c.id === r.category)?.label}</p></div>
          </div>
          <span className={`text-xs font-semibold ${r.access === "free" ? "text-primary" : "text-accent"}`}>{r.access === "free" ? "المحتوى الأساسي مجاني" : "مجاني جزئياً"}</span>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{r.purpose}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">متى تحتاجه؟ </strong>{r.when}</p>
          <details className="group mt-4 border-t border-border pt-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">المزيد من التفاصيل<ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" /></summary>
            <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
              <p><strong className="text-foreground">الفائدة المباشرة: </strong>{r.outcome}</p>
              <div><h3 className="font-semibold text-foreground">كيف تبدأ؟</h3><ol className="list-decimal space-y-1 ps-5">{r.steps.map((s) => <li key={s}>{s}</li>)}</ol></div>
              <p><strong className="text-foreground">التكلفة والحدود: </strong>{r.cost}</p>
              <p><strong className="text-foreground">لغة المحتوى: </strong>{r.language}</p>
              <p className="border-s-2 border-accent ps-3">{r.note}</p>
              <Button asChild variant="outline" size="sm"><a href={r.guide} target="_blank" rel="noopener noreferrer">البدء من المصدر الرسمي<ExternalLink /></a></Button>
            </div>
          </details>
          <Button asChild size="sm" className="mt-4"><a href={r.url} target="_blank" rel="noopener noreferrer">الموقع الرسمي<ExternalLink /></a></Button>
        </article>)}
      </div>
      {resources.length === 0 && <div className="py-12 text-center"><p className="text-muted-foreground">لا توجد مصادر مطابقة لبحثك.</p><Button variant="link" onClick={() => { setQuery(""); setCategory("all"); setFreeOnly(false); }}>إظهار كل المصادر</Button></div>}
      <p className="border-t border-border pt-5 text-xs leading-6 text-muted-foreground">المجانية تخص المحتوى الأساسي المذكور، وليست ضماناً أن كل ميزات المنصة مجانية. قد تتغير الخطط وحدود الوصول حسب البلد. عند تعذر الوصول، اختر مصدراً آخر في نفس المجال؛ لا تدخل بياناتك في مواقع مقلدة، وراجع رخصة الكود والتصاميم قبل استخدامها.</p>
    </PageShell>
  );
}