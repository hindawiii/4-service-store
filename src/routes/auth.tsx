import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | inservice" },
      { name: "description", content: "سجّل دخولك أو أنشئ حساباً جديداً لطلب الخدمات الرقمية ومتابعة طلباتك." },
      { property: "og:title", content: "تسجيل الدخول | inservice" },
      { property: "og:description", content: "أنشئ حسابك لطلب الخدمات ومتابعة الطلبات." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/cart" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("تم إنشاء الحساب! تحقق من بريدك لتأكيد الحساب.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("مرحباً بعودتك!");
        navigate({ to: "/cart" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (res.error) toast.error("تعذّر تسجيل الدخول عبر Google");
  }

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-background">
      <div className="hero-surface border-b border-border">
        <div className="mx-auto w-full max-w-md px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowRight className="size-4" strokeWidth={1.5} />
            الرئيسية
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md px-4 py-10">
        <img src={logoIcon} alt="شعار inservice" width={56} height={56} className="mb-4 size-14" />
        <h1 className="text-2xl font-bold text-foreground">
          {mode === "signin" ? "تسجيل الدخول" : "إنشاء حساب"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          للوصول إلى السلة ومتابعة طلباتك.
        </p>

        <button
          type="button"
          onClick={google}
          className="mt-6 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/50"
        >
          المتابعة باستخدام Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> أو <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="الاسم الكامل"
              className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
            />
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60"
          />
          <button
            type="submit"
            disabled={busy}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy && <Loader2 className="size-4 animate-spin" />}
            {mode === "signin" ? "دخول" : "إنشاء حساب"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 w-full text-center text-sm text-muted-foreground hover:text-primary"
        >
          {mode === "signin" ? "ليس لديك حساب؟ أنشئ حساباً" : "لديك حساب؟ سجّل الدخول"}
        </button>
      </div>
    </div>
  );
}