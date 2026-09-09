import { createFileRoute } from "@tanstack/react-router";
import { Card, PageShell } from "@/components/layout/PageShell";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | inservices" },
      {
        name: "description",
        content: "تعرّف على inservices: متجر خدمات رقمية من الخرطوم يقدّم البرامج والاشتراكات والدعم الفني والدورات.",
      },
      { property: "og:title", content: "من نحن | inservices" },
      { property: "og:description", content: "قصتنا، هدفنا، رسالتنا وقيمنا في خدمة المستخدم السوداني." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      title="من نحن"
      subtitle={`${SITE.name} متجر خدمات رقمية انطلق من ${SITE.city} ليقرّب الأدوات العالمية من المستخدم المحلي بطرق دفع يستطيع استخدامها فعلاً.`}
    >
      <Card title="قصتنا">
        <p>
          بدأت الفكرة من مشكلة يعرفها الجميع هنا: أدوات وبرامج واشتراكات ممتازة، لكن الوصول إليها متعذّر
          بسبب طرق الدفع والحظر الجغرافي. أنشأنا هذا المتجر ليكون الوسيط الموثوق الذي ينفّذ الطلب بدلاً
          عنك ويشرح لك كل خطوة بالعربية.
        </p>
      </Card>
      <Card title="هدفنا">
        <p>
          أن يحصل أي شخص في السودان على البرنامج أو الاشتراك أو الدعم الفني الذي يحتاجه خلال ساعات، وبسعر
          واضح دون مفاجآت.
        </p>
      </Card>
      <Card title="رسالتنا">
        <p>
          تبسيط التقنية: معلومات صادقة عن كل خدمة (المطوّر، المتطلبات، البدائل، المصادر الرسمية) قبل الشراء،
          وتنفيذ أمين بعده.
        </p>
      </Card>
      <Card title="قيمنا">
        <ul className="list-disc space-y-1 pr-5">
          <li>الشفافية: نعرض المصادر الرسمية ونحذّر من غير القانونية.</li>
          <li>الأمانة: لا نبيع ما لا نستطيع تسليمه.</li>
          <li>السرعة: متابعة الطلب حتى اكتماله.</li>
          <li>الخصوصية: بياناتك وإثبات دفعك محفوظان بشكل خاص.</li>
        </ul>
      </Card>
    </PageShell>
  );
}
