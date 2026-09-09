import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: "بانتظار التأكيد", cls: "bg-accent/15 text-accent" },
  paid: { label: "تم الدفع", cls: "bg-primary/15 text-primary" },
  processing: { label: "قيد التنفيذ", cls: "bg-primary/15 text-primary" },
  completed: { label: "مكتمل", cls: "bg-primary/20 text-primary" },
  cancelled: { label: "ملغي", cls: "bg-destructive/15 text-destructive" },
};

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({
    meta: [
      { title: "طلباتي | iServices" },
      { name: "description", content: "تابع حالة طلباتك من الخدمات الرقمية وتفاصيل الدفع." },
      { property: "og:title", content: "طلباتي | iServices" },
      { property: "og:description", content: "تابع حالة طلباتك وتفاصيلها." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, status, total, payment_method, created_at, order_items(id, service_name, quantity, unit_price)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <div dir="rtl" className="min-h-screen bg-background pb-16">
      <div className="hero-surface border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowRight className="size-4" strokeWidth={1.5} />
            الرئيسية
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">طلباتي</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-3 px-4 py-6">
        {isLoading ? (
          <p className="py-16 text-center text-sm text-muted-foreground">جاري التحميل...</p>
        ) : orders.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">لا توجد طلبات بعد.</p>
        ) : (
          orders.map((o) => {
            const s = STATUS[o.status] ?? { label: o.status, cls: "bg-muted text-muted-foreground" };
            return (
              <div key={o.id} className="surface-card rounded-3xl p-5">
                <div className="flex items-center justify-between">
                  <span className={"rounded-full px-3 py-1 text-xs font-medium " + s.cls}>{s.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString("ar-EG")}
                  </span>
                </div>
                <ul className="mt-3 space-y-1">
                  {o.order_items.map((it) => (
                    <li key={it.id} className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        {it.service_name} × {it.quantity}
                      </span>
                      <span>${(Number(it.unit_price) * it.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm font-bold text-foreground">
                  <span>الإجمالي</span>
                  <span className="text-primary">${Number(o.total).toFixed(2)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}