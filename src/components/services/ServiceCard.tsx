import { Link } from "@tanstack/react-router";
import { ArrowUpLeft } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$id"
      params={{ id: service.id }}
      className="surface-card group relative flex flex-col gap-4 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:glow-ring"
    >
      {service.featured ? (
        <span className="absolute left-4 top-4 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-accent">
          الأكثر طلباً
        </span>
      ) : null}
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <ServiceIcon name={service.icon} className="size-6" />
      </span>
      <div className="space-y-1">
        <h3 className="text-base font-bold leading-snug text-card-foreground">{service.name}</h3>
        <p className="text-sm text-muted-foreground">{service.short}</p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
        <span className="text-lg font-bold text-primary">${service.price}</span>
        <span className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
          التفاصيل
          <ArrowUpLeft className="size-4" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}