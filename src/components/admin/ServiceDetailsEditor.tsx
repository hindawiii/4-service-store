import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { ServiceDetails } from "@/data/service-details";

const input =
  "h-10 w-full rounded-xl border border-border bg-card/70 px-3 text-sm text-foreground outline-none focus:border-primary/60";
const area =
  "min-h-20 w-full rounded-xl border border-border bg-card/70 p-3 text-sm leading-6 text-foreground outline-none focus:border-primary/60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function lines(v?: string[]) {
  return (v ?? []).join("\n");
}
function toLines(v: string) {
  return v
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function ListEditor<T extends object>({
  title,
  items,
  empty,
  onChange,
  render,
}: {
  title: string;
  items: T[];
  empty: T;
  onChange: (items: T[]) => void;
  render: (item: T, set: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-foreground">{title}</p>
        <button
          type="button"
          onClick={() => onChange([...items, { ...empty }])}
          className="flex items-center gap-1 rounded-xl bg-primary/15 px-2.5 py-1 text-xs text-primary"
        >
          <Plus className="size-3.5" strokeWidth={1.5} />
          إضافة
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="space-y-2 rounded-2xl border border-border bg-card/50 p-3">
          {render(item, (patch) => {
            const next = [...items];
            next[i] = { ...items[i], ...patch } as T;
            onChange(next);
          })}
          <button
            type="button"
            onClick={() => onChange(items.filter((_, x) => x !== i))}
            className="flex items-center gap-1 text-xs text-destructive"
          >
            <Trash2 className="size-3.5" strokeWidth={1.5} />
            حذف
          </button>
        </div>
      ))}
    </div>
  );
}

export function ServiceDetailsEditor({
  value,
  saving,
  onSave,
}: {
  value: ServiceDetails;
  saving?: boolean;
  onSave: (d: ServiceDetails) => void;
}) {
  const [d, setD] = useState<ServiceDetails>(value);
  const patch = (p: Partial<ServiceDetails>) => setD({ ...d, ...p });

  return (
    <div className="mt-4 space-y-5 rounded-2xl border border-border bg-background/40 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="الصانع / المطوّر">
          <input
            className={input}
            defaultValue={d.origin?.manufacturer ?? ""}
            onBlur={(e) => patch({ origin: { ...d.origin, manufacturer: e.target.value } })}
          />
        </Field>
        <Field label="بلد المنشأ">
          <input
            className={input}
            defaultValue={d.origin?.country ?? ""}
            onBlur={(e) => patch({ origin: { ...d.origin, country: e.target.value } })}
          />
        </Field>
        <Field label="النوع">
          <input
            className={input}
            defaultValue={d.origin?.type ?? ""}
            onBlur={(e) => patch({ origin: { ...d.origin, type: e.target.value } })}
          />
        </Field>
        <Field label="التصنيف">
          <input
            className={input}
            defaultValue={d.origin?.classification ?? ""}
            onBlur={(e) => patch({ origin: { ...d.origin, classification: e.target.value } })}
          />
        </Field>
        <Field label="سنة الإصدار">
          <input
            className={input}
            defaultValue={d.origin?.released ?? ""}
            onBlur={(e) => patch({ origin: { ...d.origin, released: e.target.value } })}
          />
        </Field>
        <Field label="الترخيص">
          <input
            className={input}
            defaultValue={d.origin?.license ?? ""}
            onBlur={(e) => patch({ origin: { ...d.origin, license: e.target.value } })}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="متداول في الدول العربية">
          <select
            className={input}
            defaultValue={d.availability?.arabWorld ?? ""}
            onChange={(e) => {
              const { arabWorld: _drop, ...rest } = d.availability ?? {};
              patch({
                availability: e.target.value
                  ? { ...rest, arabWorld: e.target.value as "yes" | "no" | "partial" }
                  : rest,
              });
            }}
          >
            <option value="">—</option>
            <option value="yes">متوفر</option>
            <option value="partial">جزئياً</option>
            <option value="no">غير متوفر</option>
          </select>
        </Field>
        <Field label="متوفر في السودان">
          <select
            className={input}
            defaultValue={d.availability?.sudan ?? ""}
            onChange={(e) => {
              const { sudan: _drop, ...rest } = d.availability ?? {};
              patch({
                availability: e.target.value
                  ? { ...rest, sudan: e.target.value as "yes" | "no" | "partial" }
                  : rest,
              });
            }}
          >
            <option value="">—</option>
            <option value="yes">متوفر</option>
            <option value="partial">جزئياً</option>
            <option value="no">غير متوفر</option>
          </select>
        </Field>
      </div>
      <Field label="ملاحظة عن التوفّر">
        <textarea
          className={area}
          defaultValue={d.availability?.note ?? ""}
          onBlur={(e) => patch({ availability: { ...d.availability, note: e.target.value } })}
        />
      </Field>

      <ListEditor
        title="فروق الأسعار حسب المنطقة"
        items={d.availability?.prices ?? []}
        empty={{ region: "", price: "", note: "" }}
        onChange={(prices) => patch({ availability: { ...d.availability, prices } })}
        render={(p, set) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <input className={input} placeholder="المنطقة" defaultValue={p.region} onBlur={(e) => set({ region: e.target.value })} />
            <input className={input} placeholder="السعر" defaultValue={p.price} onBlur={(e) => set({ price: e.target.value })} />
            <input className={input} placeholder="ملاحظة" defaultValue={p.note} onBlur={(e) => set({ note: e.target.value })} />
          </div>
        )}
      />

      <ListEditor
        title="الحد الأدنى للمتطلبات"
        items={d.requirements?.minimum ?? []}
        empty={{ label: "", value: "" }}
        onChange={(minimum) => patch({ requirements: { ...d.requirements, minimum } })}
        render={(r, set) => (
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={input} placeholder="المعيار" defaultValue={r.label} onBlur={(e) => set({ label: e.target.value })} />
            <input className={input} placeholder="القيمة" defaultValue={r.value} onBlur={(e) => set({ value: e.target.value })} />
          </div>
        )}
      />
      <ListEditor
        title="المتطلبات الموصى بها"
        items={d.requirements?.recommended ?? []}
        empty={{ label: "", value: "" }}
        onChange={(recommended) => patch({ requirements: { ...d.requirements, recommended } })}
        render={(r, set) => (
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={input} placeholder="المعيار" defaultValue={r.label} onBlur={(e) => set({ label: e.target.value })} />
            <input className={input} placeholder="القيمة" defaultValue={r.value} onBlur={(e) => set({ value: e.target.value })} />
          </div>
        )}
      />
      <Field label="متطلبات حرجة (سطر لكل عنصر)">
        <textarea
          className={area}
          defaultValue={lines(d.requirements?.critical)}
          onBlur={(e) => patch({ requirements: { ...d.requirements, critical: toLines(e.target.value) } })}
        />
      </Field>
      <Field label="بدائل التشغيل إذا كان الجهاز ضعيفاً (سطر لكل عنصر)">
        <textarea
          className={area}
          defaultValue={lines(d.requirements?.alternatives)}
          onBlur={(e) => patch({ requirements: { ...d.requirements, alternatives: toLines(e.target.value) } })}
        />
      </Field>

      <Field label="خطوات التثبيت (سطر لكل خطوة)">
        <textarea
          className={area}
          defaultValue={lines(d.install?.steps)}
          onBlur={(e) => patch({ install: { ...d.install, steps: toLines(e.target.value) } })}
        />
      </Field>
      <ListEditor
        title="روابط التحميل المباشر"
        items={d.install?.downloads ?? []}
        empty={{ label: "", url: "", kind: "download" as const }}
        onChange={(downloads) => patch({ install: { ...d.install, downloads } })}
        render={(l, set) => (
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={input} placeholder="الاسم" defaultValue={l.label} onBlur={(e) => set({ label: e.target.value })} />
            <input className={input} placeholder="الرابط" defaultValue={l.url} onBlur={(e) => set({ url: e.target.value })} />
          </div>
        )}
      />

      <ListEditor
        title="الأخطاء الشائعة"
        items={d.issues ?? []}
        empty={{ problem: "", solution: "" }}
        onChange={(issues) => patch({ issues })}
        render={(it, set) => (
          <div className="grid gap-2">
            <input className={input} placeholder="المشكلة" defaultValue={it.problem} onBlur={(e) => set({ problem: e.target.value })} />
            <textarea className={area} placeholder="الحل" defaultValue={it.solution} onBlur={(e) => set({ solution: e.target.value })} />
          </div>
        )}
      />

      <ListEditor
        title="الإصدارات"
        items={d.versions ?? []}
        empty={{ name: "", year: "", url: "", note: "", pros: [], cons: [] }}
        onChange={(versions) => patch({ versions })}
        render={(v, set) => (
          <div className="grid gap-2">
            <div className="grid gap-2 sm:grid-cols-3">
              <input className={input} placeholder="الاسم" defaultValue={v.name} onBlur={(e) => set({ name: e.target.value })} />
              <input className={input} placeholder="السنة" defaultValue={v.year} onBlur={(e) => set({ year: e.target.value })} />
              <input className={input} placeholder="رابط التحميل" defaultValue={v.url} onBlur={(e) => set({ url: e.target.value })} />
            </div>
            <textarea className={area} placeholder="ملاحظة / الفرق عن غيره" defaultValue={v.note} onBlur={(e) => set({ note: e.target.value })} />
            <textarea className={area} placeholder="المميزات (سطر لكل ميزة)" defaultValue={lines(v.pros)} onBlur={(e) => set({ pros: toLines(e.target.value) })} />
            <textarea className={area} placeholder="العيوب (سطر لكل عيب)" defaultValue={lines(v.cons)} onBlur={(e) => set({ cons: toLines(e.target.value) })} />
          </div>
        )}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="استخدامات مناسبة (سطر لكل عنصر)">
          <textarea className={area} defaultValue={lines(d.useCases?.good)} onBlur={(e) => patch({ useCases: { ...d.useCases, good: toLines(e.target.value) } })} />
        </Field>
        <Field label="استخدامات غير مناسبة (سطر لكل عنصر)">
          <textarea className={area} defaultValue={lines(d.useCases?.bad)} onBlur={(e) => patch({ useCases: { ...d.useCases, bad: toLines(e.target.value) } })} />
        </Field>
      </div>

      <ListEditor
        title="المنصات / المواقع / التطبيقات"
        items={d.platforms ?? []}
        empty={{ name: "", url: "", status: "official" as const, regions: "", note: "" }}
        onChange={(platforms) => patch({ platforms })}
        render={(p, set) => (
          <div className="grid gap-2">
            <div className="grid gap-2 sm:grid-cols-3">
              <input className={input} placeholder="الاسم" defaultValue={p.name} onBlur={(e) => set({ name: e.target.value })} />
              <input className={input} placeholder="الرابط" defaultValue={p.url} onBlur={(e) => set({ url: e.target.value })} />
              <select
                className={input}
                defaultValue={p.status}
                onChange={(e) => set({ status: e.target.value as "official" | "legal_free" | "unofficial" })}
              >
                <option value="official">رسمية</option>
                <option value="legal_free">قانونية مجانية</option>
                <option value="unofficial">غير رسمية (تحذير)</option>
              </select>
            </div>
            <input className={input} placeholder="التوفّر / الدول" defaultValue={p.regions} onBlur={(e) => set({ regions: e.target.value })} />
            <textarea className={area} placeholder="ملاحظة / الفروق" defaultValue={p.note} onBlur={(e) => set({ note: e.target.value })} />
          </div>
        )}
      />

      <ListEditor
        title="روابط ومصادر"
        items={d.links ?? []}
        empty={{ label: "", url: "", kind: "official" as const }}
        onChange={(links) => patch({ links })}
        render={(l, set) => (
          <div className="grid gap-2 sm:grid-cols-3">
            <input className={input} placeholder="الاسم" defaultValue={l.label} onBlur={(e) => set({ label: e.target.value })} />
            <input className={input} placeholder="الرابط" defaultValue={l.url} onBlur={(e) => set({ url: e.target.value })} />
            <select className={input} defaultValue={l.kind ?? "official"} onChange={(e) => set({ kind: e.target.value as never })}>
              <option value="official">الموقع الرسمي</option>
              <option value="trusted">مصدر موثوق</option>
              <option value="social">قناة تواصل</option>
              <option value="download">تحميل مباشر</option>
              <option value="unofficial">غير رسمي</option>
            </select>
          </div>
        )}
      />

      <ListEditor
        title="كورسات مجانية"
        items={d.courses ?? []}
        empty={{ label: "", url: "", kind: "course" as const }}
        onChange={(courses) => patch({ courses })}
        render={(l, set) => (
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={input} placeholder="الاسم" defaultValue={l.label} onBlur={(e) => set({ label: e.target.value })} />
            <input className={input} placeholder="الرابط" defaultValue={l.url} onBlur={(e) => set({ url: e.target.value })} />
          </div>
        )}
      />

      <ListEditor
        title="أسئلة شائعة"
        items={d.faq ?? []}
        empty={{ q: "", a: "" }}
        onChange={(faq) => patch({ faq })}
        render={(f, set) => (
          <div className="grid gap-2">
            <input className={input} placeholder="السؤال" defaultValue={f.q} onBlur={(e) => set({ q: e.target.value })} />
            <textarea className={area} placeholder="الإجابة" defaultValue={f.a} onBlur={(e) => set({ a: e.target.value })} />
          </div>
        )}
      />

      <button
        type="button"
        disabled={saving}
        onClick={() => onSave(d)}
        className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60"
      >
        حفظ التفاصيل
      </button>
    </div>
  );
}
