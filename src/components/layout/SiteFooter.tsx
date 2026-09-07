import { Link } from "@tanstack/react-router";
import { SITE } from "@/config/site";

const LINKS = [
  { to: "/services", label: "المتجر" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
  { to: "/terms", label: "الشروط والأحكام" },
  { to: "/privacy", label: "سياسة الخصوصية" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-xs text-muted-foreground">
        <span className="text-sm font-bold text-foreground">{SITE.name}</span>
        <p>{SITE.tagline}</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="transition-colors hover:text-primary">
              {l.label}
            </Link>
          ))}
        </nav>
        <p>
          © {new Date().getFullYear()} {SITE.name}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
