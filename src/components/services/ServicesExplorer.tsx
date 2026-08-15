import { useMemo, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { ServiceIcon } from "./ServiceIcon";
import { CATEGORIES, SERVICES, type ServiceCategory } from "@/data/services";

export function ServicesExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "all">("all");

  const results = useMemo(() => {
    const q = query.trim();
    return SERVICES.filter(
      (s) =>
        (category === "all" || s.category === category) &&
        (q === "" || s.name.includes(q) || s.short.includes(q) || s.description.includes(q)),
    );
  }, [query, category]);

  return (
    <div dir="rtl" className="min-h-screen bg-background pb-16">
      <header className="hero-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                strokeWidth={1.5}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="البحث في الخدمات..."
                className="h-12 w-full rounded-2xl border border-border bg-card/70 pr-12 pl-4 text-sm text-foreground outline-none backdrop-blur placeholder:text-muted-foreground focus:border-primary/60"
              />
            </div>
            <button
              type="button"
              aria-label="سلة المشتريات"
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/70 text-foreground backdrop-blur transition-colors hover:text-primary"
            >
              <ShoppingCart className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mt-8 space-y-2">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              مرحباً! اكتشف خدماتنا الرقمية
            </h1>
            <p className="text-sm text-muted-foreground">
              تثبيت أنظمة، اشتراكات ذكاء اصطناعي، دعم فني، ودورات مميزة — بأسعار مناسبة وتنفيذ سريع.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4">
        <div className="-mx-4 overflow-x-auto px-4 py-5">
          <div className="flex w-max gap-2">
            {CATEGORIES.map((c) => {
              const active = c.id === category;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={
                    "flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm transition-colors " +
                    (active
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-border bg-card text-muted-foreground hover:text-foreground")
                  }
                >
                  <ServiceIcon name={c.icon} className="size-4" />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {results.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            لا توجد خدمات مطابقة لبحثك.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-6 sm:gap-4 lg:grid-cols-3">
            {results.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}