import {
  AlertTriangle,
  BadgeCheck,
  ChevronDown,
  Download,
  ExternalLink,
  GraduationCap,
  Info,
  Link2,
  ShieldCheck,
} from "lucide-react";
import {
  AVAILABILITY_LABEL,
  LINK_LABEL,
  PLATFORM_LABEL,
  type LinkItem,
  type PlatformStatus,
  type ServiceDetails,
} from "@/data/service-details";

function Section({
  title,
  icon,
  children,
  open = false,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
}) {
  return (
    <details open={open} className="surface-card group overflow-hidden rounded-3xl">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5">
        <span className="flex items-center gap-2 text-sm font-bold text-foreground">
          {icon}
          {title}
        </span>
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          strokeWidth={1.5}
        />
      </summary>
      <div className="border-t border-border px-5 py-4 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </details>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function LinkRow({ link }: { link: LinkItem }) {
  const danger = link.kind === "unofficial";
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={
        "flex flex-wrap items-center justify-between gap-2 rounded-2xl border p-3 transition-colors " +
        (danger
          ? "border-destructive/40 bg-destructive/5 hover:border-destructive"
          : "border-border bg-card/50 hover:border-primary/50")
      }
    >
      <span className="flex min-w-0 items-center gap-2 text-foreground">
        {danger ? (
          <AlertTriangle className="size-4 shrink-0 text-destructive" strokeWidth={1.5} />
        ) : link.kind === "download" ? (
          <Download className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
        ) : link.kind === "course" ? (
          <GraduationCap className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
        ) : (
          <Link2 className="size-4 shrink-0 text-primary" strokeWidth={1.5} />
        )}
        <span className="truncate">{link.label}</span>
      </span>
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        {link.kind ? <span className="rounded-full bg-muted px-2 py-0.5">{LINK_LABEL[link.kind]}</span> : null}
        <ExternalLink className="size-3.5" strokeWidth={1.5} />
      </span>
    </a>
  );
}

const PLATFORM_STYLE: Record<PlatformStatus, string> = {
  official: "border-primary/40 bg-primary/5",
  legal_free: "border-accent/40 bg-accent/5",
  unofficial: "border-destructive/40 bg-destructive/5",
};

const PLATFORM_BADGE: Record<PlatformStatus, string> = {
  official: "bg-primary/15 text-primary",
  legal_free: "bg-accent/20 text-accent",
  unofficial: "bg-destructive/15 text-destructive",
};

export function ServiceDetailsView({ details }: { details: ServiceDetails }) {
  const { origin, availability, requirements, install, issues, versions, useCases, platforms, courses, links, faq } =
    details;

  const hasUnofficial = platforms?.some((p) => p.status === "unofficial");

  return (
    <div className="space-y-3">
      {origin && Object.keys(origin).length > 0 && (
        <Section title="معلومات المنتج" icon={<Info className="size-4 text-primary" strokeWidth={1.5} />} open>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              ["الصانع / المطوّر", origin.manufacturer],
              ["بلد المنشأ", origin.country],
              ["النوع", origin.type],
              ["التصنيف", origin.classification],
              ["سنة الإصدار", origin.released],
              ["الترخيص", origin.license],
            ]
              .filter(([, v]) => Boolean(v))
              .map(([k, v]) => (
                <div key={k as string} className="rounded-2xl border border-border bg-card/50 p-3">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{v}</dd>
                </div>
              ))}
          </dl>
        </Section>
      )}

      {availability && (
        <Section title="التوفّر والأسعار حسب الدولة" icon={<BadgeCheck className="size-4 text-primary" strokeWidth={1.5} />}>
          <div className="flex flex-wrap gap-2">
            {availability.arabWorld && (
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-foreground">
                الدول العربية: {AVAILABILITY_LABEL[availability.arabWorld]}
              </span>
            )}
            {availability.sudan && (
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-foreground">
                السودان: {AVAILABILITY_LABEL[availability.sudan]}
              </span>
            )}
          </div>
          {availability.note && <p className="mt-3">{availability.note}</p>}
          {availability.prices && availability.prices.length > 0 && (
            <div className="-mx-1 mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-right text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground">
                    <th className="p-2 font-medium">المنطقة</th>
                    <th className="p-2 font-medium">السعر التقريبي</th>
                    <th className="p-2 font-medium">ملاحظة</th>
                  </tr>
                </thead>
                <tbody>
                  {availability.prices.map((p, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-2 text-foreground">{p.region}</td>
                      <td className="p-2 text-primary">{p.price}</td>
                      <td className="p-2 text-xs">{p.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      )}

      {requirements && (
        <Section title="متطلبات الجهاز والبدائل" icon={<Info className="size-4 text-primary" strokeWidth={1.5} />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["minimum", "recommended"] as const).map((k) =>
              requirements[k]?.length ? (
                <div key={k} className="rounded-2xl border border-border bg-card/50 p-3">
                  <p className="text-xs font-bold text-foreground">
                    {k === "minimum" ? "الحد الأدنى" : "الموصى به"}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {requirements[k]!.map((r, i) => (
                      <li key={i} className="flex justify-between gap-3">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className="text-foreground">{r.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </div>
          {requirements.critical?.length ? (
            <div className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/5 p-3">
              <p className="flex items-center gap-2 text-xs font-bold text-destructive">
                <AlertTriangle className="size-4" strokeWidth={1.5} />
                لن يعمل بدون هذه المتطلبات
              </p>
              <div className="mt-2">
                <Bullets items={requirements.critical} />
              </div>
            </div>
          ) : null}
          {requirements.alternatives?.length ? (
            <div className="mt-4">
              <p className="text-xs font-bold text-foreground">جهازك لا يطابق المتطلبات؟ بدائل التشغيل:</p>
              <div className="mt-2">
                <Bullets items={requirements.alternatives} />
              </div>
            </div>
          ) : null}
        </Section>
      )}

      {install && (install.steps?.length || install.downloads?.length) ? (
        <Section title="التحميل والتثبيت" icon={<Download className="size-4 text-primary" strokeWidth={1.5} />}>
          {install.downloads?.length ? (
            <div className="space-y-2">
              {install.downloads.map((l, i) => (
                <LinkRow key={i} link={l} />
              ))}
            </div>
          ) : null}
          {install.steps?.length ? (
            <ol className="mt-4 space-y-2">
              {install.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          ) : null}
        </Section>
      ) : null}

      {issues?.length ? (
        <Section title="الأخطاء الشائعة وحلولها" icon={<AlertTriangle className="size-4 text-accent" strokeWidth={1.5} />}>
          <div className="space-y-3">
            {issues.map((it, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card/50 p-3">
                <p className="text-sm font-bold text-foreground">{it.problem}</p>
                <p className="mt-1 text-sm">{it.solution}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {versions?.length ? (
        <Section title="الإصدارات والفروق بينها" icon={<Info className="size-4 text-primary" strokeWidth={1.5} />}>
          <div className="space-y-3">
            {versions.map((v, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-foreground">
                    {v.name} {v.year ? <span className="text-xs text-muted-foreground">({v.year})</span> : null}
                  </p>
                  {v.url && (
                    <a
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-center gap-1 text-xs text-primary"
                    >
                      تحميل مباشر
                      <ExternalLink className="size-3.5" strokeWidth={1.5} />
                    </a>
                  )}
                </div>
                {v.note && <p className="mt-2 text-sm">{v.note}</p>}
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {v.pros?.length ? (
                    <div>
                      <p className="text-xs font-bold text-primary">المميزات</p>
                      <div className="mt-1">
                        <Bullets items={v.pros} />
                      </div>
                    </div>
                  ) : null}
                  {v.cons?.length ? (
                    <div>
                      <p className="text-xs font-bold text-destructive">العيوب</p>
                      <div className="mt-1">
                        <Bullets items={v.cons} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {useCases && (useCases.good?.length || useCases.bad?.length) ? (
        <Section title="الاستخدامات المناسبة وغير المناسبة" icon={<Info className="size-4 text-primary" strokeWidth={1.5} />}>
          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.good?.length ? (
              <div>
                <p className="text-xs font-bold text-primary">مناسب لـ</p>
                <div className="mt-2">
                  <Bullets items={useCases.good} />
                </div>
              </div>
            ) : null}
            {useCases.bad?.length ? (
              <div>
                <p className="text-xs font-bold text-destructive">لا يناسب</p>
                <div className="mt-2">
                  <Bullets items={useCases.bad} />
                </div>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {platforms?.length ? (
        <Section title="المنصات والمواقع والتطبيقات" icon={<ShieldCheck className="size-4 text-primary" strokeWidth={1.5} />}>
          {hasUnofficial && (
            <div className="mb-3 flex gap-2 rounded-2xl border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">
              <AlertTriangle className="size-4 shrink-0" strokeWidth={1.5} />
              <span>
                المنصات المصنّفة «غير رسمية» مذكورة للتوعية فقط — قد تحمل إعلانات خبيثة أو مخاطر قانونية وأمنية، ولا
                ننصح باستخدامها.
              </span>
            </div>
          )}
          <div className="space-y-2">
            {platforms.map((p, i) => (
              <div key={i} className={"rounded-2xl border p-3 " + PLATFORM_STYLE[p.status]}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-foreground">{p.name}</span>
                  <span className={"rounded-full px-2 py-0.5 text-[11px] " + PLATFORM_BADGE[p.status]}>
                    {PLATFORM_LABEL[p.status]}
                  </span>
                </div>
                {p.regions && <p className="mt-1 text-xs">التوفّر: {p.regions}</p>}
                {p.note && <p className="mt-1 text-sm">{p.note}</p>}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-primary"
                  >
                    زيارة الموقع
                    <ExternalLink className="size-3.5" strokeWidth={1.5} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {links?.length ? (
        <Section title="مصادر وروابط رسمية" icon={<Link2 className="size-4 text-primary" strokeWidth={1.5} />}>
          <div className="space-y-2">
            {links.map((l, i) => (
              <LinkRow key={i} link={l} />
            ))}
          </div>
        </Section>
      ) : null}

      {courses?.length ? (
        <Section title="كورسات ومصادر تعلّم مجانية" icon={<GraduationCap className="size-4 text-primary" strokeWidth={1.5} />}>
          <div className="space-y-2">
            {courses.map((l, i) => (
              <LinkRow key={i} link={{ ...l, kind: l.kind ?? "course" }} />
            ))}
          </div>
        </Section>
      ) : null}

      {faq?.length ? (
        <Section title="أسئلة شائعة" icon={<Info className="size-4 text-primary" strokeWidth={1.5} />}>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card/50 p-3">
                <p className="text-sm font-bold text-foreground">{f.q}</p>
                <p className="mt-1 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}
    </div>
  );
}
