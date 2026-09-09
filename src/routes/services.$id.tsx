import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Star } from "lucide-react";
import { ServiceIcon } from "@/components/services/ServiceIcon";
import { ServiceDetailsView } from "@/components/services/ServiceDetailsView";
import { hasDetails, type ServiceDetails } from "@/data/service-details";
import { getService, listServiceReviews } from "@/lib/services.functions";
import { useCartMutations } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/services/$id")({
  loader: async ({ params }) => {
    const service = await getService({ data: { id: params.id } });
    if (!service) throw notFound();
    const reviews = await listServiceReviews({ data: { id: params.id } });
    return { service, reviews };
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
  const { service, reviews } = Route.useLoaderData();
  const details = (service.details ?? undefined) as ServiceDetails | undefined;
  const navigate = useNavigate();
  const { add } = useCartMutations();
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  async function order() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      navigate({ to: "/auth" });
      return;
    }
    try {
      await add.mutateAsync(service.id);
      toast.success("تمت الإضافة إلى السلة");
      navigate({ to: "/cart" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذّرت الإضافة");
    }
  }

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
              {(service.developer || service.official_url) && (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {service.developer && (
                    <span className="rounded-full bg-muted px-2.5 py-1">المطوّر: {service.developer}</span>
                  )}
                  {service.official_url && (
                    <a
                      href={service.official_url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="rounded-full bg-primary/15 px-2.5 py-1 text-primary"
                    >
                      الموقع الرسمي
                    </a>
                  )}
                </div>
              )}
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
            onClick={order}
            disabled={add.isPending}
            className="rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            اطلب الآن
          </button>
        </div>

        {hasDetails(details) ? <ServiceDetailsView details={details!} /> : null}

        <div className="surface-card rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">تقييمات العملاء</h2>
            {reviews.length > 0 && (
              <span className="flex items-center gap-1 text-sm text-accent">
                <Star className="size-4 fill-current" strokeWidth={1.5} />
                {average.toFixed(1)} ({reviews.length})
              </span>
            )}
          </div>
          {reviews.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">لا توجد تقييمات بعد لهذه الخدمة.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {reviews.map((r) => (
                <li key={r.id} className="rounded-2xl border border-border bg-card/50 p-4">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={"size-3.5 " + (i < r.rating ? "fill-current" : "opacity-30")}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  {r.comment && (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{r.comment}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}