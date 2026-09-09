import { createFileRoute } from "@tanstack/react-router";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { listServices } from "@/lib/services.functions";

export const Route = createFileRoute("/services/")({
  loader: () => listServices(),
  head: () => ({
    meta: [
      { title: "الخدمات | inservice" },
      {
        name: "description",
        content: "تصفح جميع الخدمات الرقمية: برامج وأنظمة، ذكاء اصطناعي، دعم فني، ودورات مميزة.",
      },
      { property: "og:title", content: "الخدمات | inservice" },
      {
        property: "og:description",
        content: "تصفح جميع الخدمات الرقمية وابحث عن ما يناسبك بسعر مناسب.",
      },
    ],
  }),
  errorComponent: () => (
    <p className="p-10 text-center text-sm text-muted-foreground">تعذّر تحميل الخدمات.</p>
  ),
  component: ServicesPage,
});

function ServicesPage() {
  const services = Route.useLoaderData();
  return <ServicesExplorer services={services} />;
}