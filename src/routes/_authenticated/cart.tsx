import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { useCart, useCartMutations } from "@/lib/cart";

export const Route = createFileRoute("/_authenticated/cart")({
  head: () => ({
    meta: [
      { title: "سلة المشتريات | iServices" },
      { name: "description", content: "راجع الخدمات التي أضفتها إلى السلة قبل إتمام الطلب." },
      { property: "og:title", content: "سلة المشتريات | iServices" },
      { property: "og:description", content: "راجع خدماتك وأتمم الطلب." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const { data: items = [], isLoading } = useCart();
  const { setQty, remove } = useCartMutations();
  const total = items.reduce((s, i) => s + (i.services?.price ?? 0) * i.quantity, 0);

  return (
    <div dir="rtl" className="min-h-screen bg-background pb-28">
      <div className="hero-surface border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowRight className="size-4" strokeWidth={1.5} />
            متابعة التسوق
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">سلة المشتريات</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-3 px-4 py-6">
        {isLoading ? (
          <p className="py-16 text-center text-sm text-muted-foreground">جاري التحميل...</p>
        ) : items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">سلتك فارغة.</p>
            <Link
              to="/services"
              className="mt-4 inline-block rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
            >
              تصفح الخدمات
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="surface-card flex items-center gap-4 rounded-3xl p-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ServiceIcon name={item.services?.icon ?? "Package"} className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{item.services?.name}</p>
                <p className="text-sm text-primary">${item.services?.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="إنقاص"
                  onClick={() => setQty.mutate({ id: item.id, quantity: item.quantity - 1 })}
                  className="flex size-8 items-center justify-center rounded-xl border border-border text-foreground"
                >
                  <Minus className="size-4" strokeWidth={1.5} />
                </button>
                <span className="w-6 text-center text-sm text-foreground">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="زيادة"
                  onClick={() => setQty.mutate({ id: item.id, quantity: item.quantity + 1 })}
                  className="flex size-8 items-center justify-center rounded-xl border border-border text-foreground"
                >
                  <Plus className="size-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="حذف"
                  onClick={() => remove.mutate(item.id)}
                  className="flex size-8 items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 border-t border-border bg-card/95 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
            <div>
              <p className="text-xs text-muted-foreground">الإجمالي</p>
              <p className="text-xl font-bold text-primary">${total.toFixed(2)}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/checkout" })}
              className="rounded-2xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              إتمام الطلب
            </button>
          </div>
        </div>
      )}
    </div>
  );
}