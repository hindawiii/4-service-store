import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SITE } from "@/config/site";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-base font-extrabold text-foreground">
            <img src={logoIcon} alt="شعار inservice" width={36} height={36} className="size-9" />
            {SITE.name}
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            المتجر
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 text-sm leading-7 text-muted-foreground">{subtitle}</p>}
        <div className="mt-8 space-y-4">{children}</div>
      </main>

      <SiteFooter />
    </div>
  );
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="surface-card rounded-3xl p-6">
      {title && <h2 className="text-base font-bold text-card-foreground">{title}</h2>}
      <div className="mt-2 space-y-2 text-sm leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}
