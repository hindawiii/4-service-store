import { createFileRoute } from "@tanstack/react-router";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";

export const Route = createFileRoute("/")({
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
  component: ServicesExplorer,
});
