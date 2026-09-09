import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";
import { listServices } from "@/lib/services.functions";

export const Route = createFileRoute("/")({
  loader: () => listServices(),
  head: () => ({
    meta: [
      { title: "inservices — متجر الخدمات الرقمية في السودان" },
      {
        name: "description",
        content:
          "تثبيت أنظمة لينكس وويندوز، اشتراكات الذكاء الاصطناعي، دعم فني عن بُعد، ودورات مميزة داخل منصة iLearn.",
      },
      { property: "og:title", content: "inservices — متجر الخدمات الرقمية في السودان" },
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
  return <LandingPage services={services} />;
}
