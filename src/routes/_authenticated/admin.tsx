import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { ServiceDetailsEditor } from "@/components/admin/ServiceDetailsEditor";
import type { ServiceDetails } from "@/data/service-details";
import type { Database } from "@/integrations/supabase/types";

type OrderStatus = Database["public"]["Enums"]["order_status"];

const STATUSES: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "بانتظار التأكيد" },
  { value: "paid", label: "تم الدفع" },
  { value: "processing", label: "قيد التنفيذ" },
  { value: "completed", label: "مكتمل" },
  { value: "cancelled", label: "ملغي" },
];

const TABS = [
  { id: "orders", label: "الطلبات" },
  { id: "services", label: "الخدمات" },
  { id: "reviews", label: "التقييمات" },
] as const;

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | iServices" },
      { name: "description", content: "إدارة الطلبات والخدمات والتقييمات في متجر iServices." },
      { property: "og:title", content: "لوحة التحكم | iServices" },
      { property: "og:description", content: "إدارة الطلبات والخدمات والتقييمات." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("orders");

  if (isLoading) {
    return <p className="py-24 text-center text-sm text-muted-foreground">جاري التحميل...</p>;
  }

  if (!isAdmin) {
    return (
      <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <ShieldAlert className="size-10 text-destructive" strokeWidth={1.5} />
        <h1 className="text-xl font-bold text-foreground">هذه الصفحة للمشرفين فقط</h1>
        <Link to="/" className="text-sm text-primary">العودة للرئيسية</Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background pb-16">
      <div className="hero-surface border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowRight className="size-4" strokeWidth={1.5} />
            الرئيسية
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">لوحة التحكم</h1>
          <div className="mt-5 flex gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={
                  "rounded-2xl px-4 py-2 text-sm font-medium transition-colors " +
                  (tab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card/70 text-muted-foreground hover:text-foreground")
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6">
        {tab === "orders" && <OrdersAdmin />}
        {tab === "services" && <ServicesAdmin />}
        {tab === "reviews" && <ReviewsAdmin />}
      </div>
    </div>
  );
}

function OrdersAdmin() {
  const qc = useQueryClient();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "id, status, total, payment_method, contact_phone, notes, payment_proof_url, created_at, order_items(id, service_name, quantity, unit_price)",
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("تم تحديث حالة الطلب");
      qc.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function openProof(path: string) {
    const { data, error } = await supabase.storage.from("payment-proofs").createSignedUrl(path, 300);
    if (error || !data) {
      toast.error("تعذر فتح إثبات الدفع");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  }

  if (isLoading) return <p className="py-16 text-center text-sm text-muted-foreground">جاري التحميل...</p>;
  if (orders.length === 0) return <p className="py-16 text-center text-sm text-muted-foreground">لا توجد طلبات.</p>;

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="surface-card rounded-3xl p-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>#{o.id.slice(0, 8)}</span>
            <span>{new Date(o.created_at).toLocaleString("ar-EG")}</span>
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
          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            {o.payment_method && <p>طريقة الدفع: {o.payment_method}</p>}
            {o.contact_phone && <p>رقم التواصل: {o.contact_phone}</p>}
            {o.notes && <p>ملاحظات: {o.notes}</p>}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <select
              value={o.status}
              onChange={(e) => setStatus.mutate({ id: o.id, status: e.target.value as OrderStatus })}
              className="h-10 rounded-2xl border border-border bg-card/70 px-3 text-sm text-foreground outline-none focus:border-primary/60"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            {o.payment_proof_url && (
              <button
                onClick={() => openProof(o.payment_proof_url!)}
                className="h-10 rounded-2xl border border-border bg-card/70 px-4 text-sm text-foreground hover:text-primary"
              >
                عرض إثبات الدفع
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ServicesAdmin() {
  const qc = useQueryClient();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, price, category, active, featured, sort_order")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const update = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: { price?: number; active?: boolean; featured?: boolean } }) => {
      const { error } = await supabase.from("services").update(patch).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("تم التحديث");
      qc.invalidateQueries({ queryKey: ["admin", "services"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="py-16 text-center text-sm text-muted-foreground">جاري التحميل...</p>;

  return (
    <div className="space-y-3">
      {services.map((s) => (
        <div key={s.id} className="surface-card rounded-3xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-foreground">{s.name}</h2>
              <p className="text-xs text-muted-foreground">{s.category}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">$</span>
              <input
                type="number"
                defaultValue={Number(s.price)}
                onBlur={(e) => {
                  const price = Number(e.target.value);
                  if (!Number.isNaN(price) && price !== Number(s.price)) update.mutate({ id: s.id, patch: { price } });
                }}
                className="h-9 w-24 rounded-xl border border-border bg-card/70 px-2 text-sm text-foreground outline-none focus:border-primary/60"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => update.mutate({ id: s.id, patch: { active: !s.active } })}
              className={
                "rounded-2xl px-3 py-1.5 text-xs font-medium " +
                (s.active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")
              }
            >
              {s.active ? "مفعّلة" : "مخفية"}
            </button>
            <button
              onClick={() => update.mutate({ id: s.id, patch: { featured: !s.featured } })}
              className={
                "rounded-2xl px-3 py-1.5 text-xs font-medium " +
                (s.featured ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground")
              }
            >
              {s.featured ? "مميزة" : "غير مميزة"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewsAdmin() {
  const qc = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["admin", "reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, service_id, rating, comment, approved, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const mutate = useMutation({
    mutationFn: async ({ id, approved, remove }: { id: string; approved?: boolean; remove?: boolean }) => {
      const q = remove
        ? supabase.from("reviews").delete().eq("id", id)
        : supabase.from("reviews").update({ approved: !!approved }).eq("id", id);
      const { error } = await q;
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("تم التحديث");
      qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p className="py-16 text-center text-sm text-muted-foreground">جاري التحميل...</p>;
  if (reviews.length === 0) return <p className="py-16 text-center text-sm text-muted-foreground">لا توجد تقييمات.</p>;

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="surface-card rounded-3xl p-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{r.service_id}</span>
            <span>{"★".repeat(r.rating)}</span>
          </div>
          {r.comment && <p className="mt-2 text-sm text-foreground">{r.comment}</p>}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => mutate.mutate({ id: r.id, approved: !r.approved })}
              className={
                "rounded-2xl px-3 py-1.5 text-xs font-medium " +
                (r.approved ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")
              }
            >
              {r.approved ? "معتمد" : "غير معتمد"}
            </button>
            <button
              onClick={() => mutate.mutate({ id: r.id, remove: true })}
              className="rounded-2xl bg-destructive/15 px-3 py-1.5 text-xs font-medium text-destructive"
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}