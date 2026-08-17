import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart";
import { useQueryClient } from "@tanstack/react-query";

type PaymentMethod = "bankak" | "bank_transfer" | "usdt" | "other";

const METHODS: { id: PaymentMethod; label: string; hint: string }[] = [
  { id: "bankak", label: "بنكك (Bankak)", hint: "تحويل عبر تطبيق بنكك — حساب: 1234567890" },
  { id: "bank_transfer", label: "تحويل بنكي", hint: "حوالة بنكية داخل السودان" },
  { id: "usdt", label: "USDT (TRC20)", hint: "محفظة: TXXXXXXXXXXXXXXXXXXXXXXX" },
  { id: "other", label: "طريقة أخرى", hint: "سنتواصل معك للاتفاق على طريقة الدفع" },
];

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | iServices" },
      { name: "description", content: "اختر طريقة الدفع (بنكك، تحويل بنكي، USDT) وارفع إثبات الدفع لإتمام طلبك." },
      { property: "og:title", content: "إتمام الطلب | iServices" },
      { property: "og:description", content: "ادفع عبر بنكك أو USDT وارفع إثبات الدفع." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: items = [] } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("bankak");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const total = items.reduce((s, i) => s + (i.services?.price ?? 0) * i.quantity, 0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("سلتك فارغة");
      return;
    }
    setBusy(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) throw new Error("انتهت الجلسة، سجّل الدخول مجدداً");

      let proofPath: string | null = null;
      if (file) {
        const path = `${uid}/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("payment-proofs").upload(path, file);
        if (upErr) throw upErr;
        proofPath = path;
      }

      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id: uid,
          total,
          payment_method: method,
          contact_phone: phone || null,
          notes: notes || null,
          payment_proof_url: proofPath,
        })
        .select("id")
        .single();
      if (orderErr) throw orderErr;

      const { error: itemsErr } = await supabase.from("order_items").insert(
        items.map((i) => ({
          order_id: order.id,
          service_id: i.service_id,
          service_name: i.services?.name ?? i.service_id,
          unit_price: i.services?.price ?? 0,
          quantity: i.quantity,
        })),
      );
      if (itemsErr) throw itemsErr;

      await supabase.from("cart_items").delete().eq("user_id", uid);
      qc.invalidateQueries({ queryKey: ["cart"] });
      toast.success("تم إرسال طلبك! سنراجع الدفع ونتواصل معك.");
      navigate({ to: "/orders" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّر إتمام الطلب");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background pb-16">
      <div className="hero-surface border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowRight className="size-4" strokeWidth={1.5} />
            رجوع للسلة
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-foreground">إتمام الطلب</h1>
        </div>
      </div>

      <form onSubmit={submit} className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <div className="surface-card rounded-3xl p-5">
          <h2 className="text-sm font-bold text-foreground">ملخص الطلب</h2>
          <ul className="mt-3 space-y-2">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {i.services?.name} × {i.quantity}
                </span>
                <span>${((i.services?.price ?? 0) * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm font-bold text-foreground">
            <span>الإجمالي</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="surface-card space-y-3 rounded-3xl p-5">
          <h2 className="text-sm font-bold text-foreground">طريقة الدفع</h2>
          {METHODS.map((m) => (
            <label
              key={m.id}
              className={
                "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors " +
                (method === m.id ? "border-primary/50 bg-primary/10" : "border-border bg-card/50")
              }
            >
              <input
                type="radio"
                name="method"
                checked={method === m.id}
                onChange={() => setMethod(m.id)}
                className="mt-1 accent-current"
              />
              <span>
                <span className="block text-sm font-bold text-foreground">{m.label}</span>
                <span className="block text-xs text-muted-foreground">{m.hint}</span>
              </span>
            </label>
          ))}
        </div>

        <div className="surface-card space-y-3 rounded-3xl p-5">
          <h2 className="text-sm font-bold text-foreground">بيانات التواصل</h2>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="رقم الهاتف / واتساب"
            className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="ملاحظات إضافية (اختياري)"
            rows={3}
            className="w-full rounded-2xl border border-border bg-card p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
          />
          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            <Upload className="size-5" strokeWidth={1.5} />
            {file ? file.name : "رفع إثبات الدفع (صورة الإيصال)"}
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={busy || items.length === 0}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {busy && <Loader2 className="size-4 animate-spin" />}
          تأكيد الطلب
        </button>
      </form>
    </div>
  );
}