import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Card, PageShell } from "@/components/layout/PageShell";
import { GAMES, LEGAL_LABEL, filterPlatforms, type Legality, type MediaKind } from "@/data/media-guide";

export const Route = createFileRoute("/media-guide")({
  head: () => ({
    meta: [
      { title: "دليل منصات الأنمي والألعاب الرسمية والقانونية | inservice" },
      { name: "description", content: "قارن منصات الأنمي ومتاجر الألعاب الرسمية والمجانية القانونية، مع تحذيرات المواقع غير الرسمية ومقارنة الألعاب القديمة والجديدة." },
      { property: "og:title", content: "دليل منصات الأنمي والألعاب | inservice" },
      { property: "og:description", content: "أين تشاهد الأنمي وتشتري الألعاب بأمان، وما الفرق بين النسخ القديمة والجديدة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MediaGuidePage,
});

const chip = (on: boolean) =>
  `rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary/50"}`;
const BADGE: Record<Legality, string> = {
  official: "bg-primary/15 text-primary",
  legal_free: "bg-accent/15 text-accent",
  unofficial: "bg-destructive/10 text-destructive",
};

function MediaGuidePage() {
  const [tab, setTab] = useState<MediaKind | "compare">("anime");
  const [legal, setLegal] = useState<Legality | "all">("all");
  const [era, setEra] = useState<"all" | "classic" | "modern">("all");
  const list = tab === "compare" ? [] : filterPlatforms(tab, legal);
  const games = GAMES.filter((g) => era === "all" || g.era === era);

  return (
    <PageShell title="دليل منصات الأنمي والألعاب" subtitle="أين تشاهد وتلعب بأمان: المنصات الرسمية، والبدائل المجانية القانونية، وتحذيرات المواقع غير الرسمية.">
      <div className="flex flex-wrap gap-2">
        <button className={chip(tab === "anime")} onClick={() => setTab("anime")}>منصات الأنمي</button>
        <button className={chip(tab === "games")} onClick={() => setTab("games")}>متاجر الألعاب</button>
        <button className={chip(tab === "compare")} onClick={() => setTab("compare")}>الألعاب المشهورة: القديم والجديد</button>
      </div>

      {tab !== "compare" && (
        <>
          <div className="flex flex-wrap gap-2">
            <button className={chip(legal === "all")} onClick={() => setLegal("all")}>الكل</button>
            {(Object.keys(LEGAL_LABEL) as Legality[]).map((l) => (
              <button key={l} className={chip(legal === l)} onClick={() => setLegal(l)}>{LEGAL_LABEL[l]}</button>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {list.map((p) => (
              <section key={p.id} className="surface-card space-y-2 rounded-3xl p-5 text-sm leading-7">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-card-foreground">{p.name}</h2>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${BADGE[p.legality]}`}>{LEGAL_LABEL[p.legality]}</span>
                </div>
                <p className="text-xs text-muted-foreground">{p.type} · {p.price}</p>
                <p className="text-muted-foreground"><b className="text-foreground">العربية:</b> {p.arabic}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div><b className="text-foreground">المميزات</b><ul className="text-muted-foreground">{p.pros.map((x) => <li key={x}>+ {x}</li>)}</ul></div>
                  <div><b className="text-foreground">العيوب</b><ul className="text-muted-foreground">{p.cons.map((x) => <li key={x}>− {x}</li>)}</ul></div>
                </div>
                <div><b className="text-foreground">كيف تبدأ:</b><ol className="list-decimal pe-5 text-muted-foreground">{p.start.map((s) => <li key={s}>{s}</li>)}</ol></div>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">الموقع الرسمي <ExternalLink className="size-3" /></a>
                ) : (
                  <p className="rounded-2xl bg-destructive/10 p-3 text-xs text-destructive">لا نضع روابط لمواقع غير مرخصة حفاظاً على أمانك.</p>
                )}
              </section>
            ))}
          </div>
        </>
      )}

      {tab === "compare" && (
        <>
          <div className="flex flex-wrap gap-2">
            <button className={chip(era === "all")} onClick={() => setEra("all")}>الكل</button>
            <button className={chip(era === "modern")} onClick={() => setEra("modern")}>الأكثر لعباً حالياً</button>
            <button className={chip(era === "classic")} onClick={() => setEra("classic")}>سلاسل قديمة وجديدة</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {games.map((g) => (
              <section key={g.name} className="surface-card space-y-2 rounded-3xl p-5 text-sm leading-7">
                <h2 className="text-base font-bold text-card-foreground">{g.name}</h2>
                <p className="text-xs text-muted-foreground">{g.developer} · {g.year} · {g.genre} · {g.platforms}</p>
                <p className="text-muted-foreground"><b className="text-foreground">أقل مواصفات:</b> {g.minSpec}</p>
                <p className="text-muted-foreground"><b className="text-foreground">القديم مقابل الجديد:</b> {g.oldVsNew}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div><b className="text-foreground">المميزات</b><ul className="text-muted-foreground">{g.pros.map((x) => <li key={x}>+ {x}</li>)}</ul></div>
                  <div><b className="text-foreground">العيوب</b><ul className="text-muted-foreground">{g.cons.map((x) => <li key={x}>− {x}</li>)}</ul></div>
                </div>
                <a href={g.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">الموقع الرسمي <ExternalLink className="size-3" /></a>
              </section>
            ))}
          </div>
        </>
      )}

      <Card title="تنبيه">
        <p>المواقع غير الرسمية مذكورة للتوعية فقط ولا نشجع استخدامها. الأسعار والتوفر تختلف حسب الدولة وتتغير باستمرار.</p>
      </Card>
    </PageShell>
  );
}
