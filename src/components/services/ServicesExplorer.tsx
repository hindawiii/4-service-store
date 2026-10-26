import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ShieldCheck, ShoppingCart, User } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { ServiceIcon } from "./ServiceIcon";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { CATEGORIES, type Service, type ServiceCategory } from "@/data/services";
import logoIcon from "@/assets/logo-icon.png";

export function ServicesExplorer({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "all">("all");
  const { data: isAdmin } = useIsAdmin();

  const results = useMemo(() => {
    const q = query.trim();
    return services.filter(
      (s) =>
        (category === "all" || s.category === category) &&
        (q === "" || s.name.includes(q) || s.short.includes(q) || s.description.includes(q)),
    );
  }, [query, category, services]);

  return (
    <div dir="rtl" className="min-h-screen bg-background pb-16">
      <header className="hero-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-6">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="inservice — الرئيسية" className="shrink-0">
              <img src={logoIcon} alt="شعار inservice" width={48} height={48} className="size-12" />
            </Link>
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
            <Link
              to="/cart"
              aria-label="سلة المشتريات"
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/70 text-foreground backdrop-blur transition-colors hover:text-primary"
            >
              <ShoppingCart className="size-5" strokeWidth={1.5} />
            </Link>
            <Link
              to="/orders"
              aria-label="طلباتي"
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/70 text-foreground backdrop-blur transition-colors hover:text-primary"
            >
              <User className="size-5" strokeWidth={1.5} />
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                aria-label="لوحة التحكم"
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-card/70 text-primary backdrop-blur transition-colors hover:text-primary"
              >
                <ShieldCheck className="size-5" strokeWidth={1.5} />
              </Link>
            )}
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

        {(category === "games" || category === "all") && (
          <Link
            to="/emulators"
            className="surface-card mb-4 flex items-center gap-3 rounded-3xl p-4 transition-colors hover:border-primary/50"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ServiceIcon name="Gamepad2" className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-foreground">ركن المحاكيات وفحص توافق جهازك</span>
              <span className="block text-xs text-muted-foreground">اعرف أي محاكي (PS1، PS2، PS3، PSP، أندرويد) يناسب جهازك</span>
            </span>
          </Link>
        )}
        {(category === "ai" || category === "all") && (
          <Link
            to="/local-ai"
            className="surface-card mb-4 flex items-center gap-3 rounded-3xl p-4 transition-colors hover:border-primary/50"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ServiceIcon name="Bot" className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-foreground">مركز الذكاء الاصطناعي المحلي</span>
              <span className="block text-xs text-muted-foreground">Llama و Qwen و Gemma و DeepSeek — وهل يشغّلها جهازك؟</span>
            </span>
          </Link>
        )}
        {(category === "software" || category === "all") && (
          <Link
            to="/system-tools"
            className="surface-card mb-4 flex items-center gap-3 rounded-3xl p-4 transition-colors hover:border-primary/50"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ServiceIcon name="Laptop" className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-foreground">حزم التشغيل والتعريفات وأدوات الحرق والضغط</span>
              <span className="block text-xs text-muted-foreground">Visual C++، DirectX، تعريفات الشاشة، Ventoy، Rufus، 7-Zip</span>
            </span>
          </Link>
        )}
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