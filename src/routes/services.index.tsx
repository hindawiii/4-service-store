import { createFileRoute } from "@tanstack/react-router";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "الخدمات | iServices" },
      {
        name: "description",
        content: "تصفح جميع الخدمات الرقمية: برامج وأنظمة، ذكاء اصطناعي، دعم فني، ودورات مميزة.",
      },
      { property: "og:title", content: "الخدمات | iServices" },
      {
        property: "og:description",
        content: "تصفح جميع الخدمات الرقمية وابحث عن ما يناسبك بسعر مناسب.",
      },
    ],
  }),
  component: ServicesExplorer,
});