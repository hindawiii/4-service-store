import { createFileRoute } from "@tanstack/react-router";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { listServices } from "@/lib/services.functions";

export const Route = createFileRoute("/")({
  loader: () => listServices(),
  head: () => ({
    meta: [
      { title: "iServices — خدمات رقمية بأسعار مناسبة" },
      {
        name: "description",
        content:
          "تثبيت أنظمة لينكس وويندوز، اشتراكات الذكاء الاصطناعي، دعم فني عن بُعد، ودورات مميزة داخل منصة iLearn.",
      },
      { property: "og:title", content: "iServices — خدمات رقمية بأسعار مناسبة" },
      {
        property: "og:description",
        content: "خدمات تقنية سريعة: تثبيت أنظمة، اشتراكات AI، دعم فني، ودورات مميزة.",
      },
    ],
  }),
  errorComponent: () => (
    <p className="p-10 text-center text-sm text-muted-foreground">تعذّر تحميل الخدمات.</p>
  ),
  component: HomePage,
});

function HomePage() {
  const services = Route.useLoaderData();
  return <ServicesExplorer services={services} />;
}
