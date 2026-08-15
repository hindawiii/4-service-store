import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { SERVICES } from "@/data/services";

export const Route = createFileRoute("/services/$id")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.id === params.id);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "الخدمة غير متاحة" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.name} | iServices` },
        { name: "description", content: service.description },
        { property: "og:title", content: `${service.name} | iServices` },
        { property: "og:description", content: service.description },
      ],
    };
  },
  errorComponent: () => (
    <p className="p-10 text-center text-sm text-muted-foreground">تعذّر تحميل الخدمة.</p>
  ),
  notFoundComponent: () => (
    <p className="p-10 text-center text-sm text-muted-foreground">هذه الخدمة غير موجودة.</p>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();

  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <div className="hero-surface border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowRight className="size-4" strokeWidth={1.5} />
            رجوع للخدمات
          </Link>
          <div className="mt-6 flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ServiceIcon name={service.icon} className="size-7" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-foreground sm:text-2xl">{service.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{service.short}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        <div className="surface-card rounded-3xl p-5">
          <h2 className="text-sm font-bold text-foreground">وصف الخدمة</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{service.description}</p>
        </div>
        <div className="surface-card flex items-center justify-between rounded-3xl p-5">
          <div>
            <p className="text-xs text-muted-foreground">السعر</p>
            <p className="text-2xl font-bold text-primary">${service.price}</p>
          </div>
          <button
            type="button"
            className="rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            اطلب الآن
          </button>
        </div>
      </div>
    </div>
  );
}