import { createFileRoute } from "@tanstack/react-router";
import { Card, PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية | inservice" },
      {
        name: "description",
        content: "كيف نجمع بياناتك ونحميها في inservice: الحساب، الطلبات، إثبات الدفع، ومدة الاحتفاظ.",
      },
      { property: "og:title", content: "سياسة الخصوصية | inservice" },
      { property: "og:description", content: "بياناتك وإثبات دفعك محفوظة بشكل خاص وغير معروضة للعامة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell title="سياسة الخصوصية" subtitle="نجمع أقل قدر من البيانات، ونستخدمه فقط لتنفيذ طلبك.">
      <Card title="ما الذي نجمعه">
        <ul className="list-disc space-y-1 pr-5">
          <li>بيانات الحساب: البريد الإلكتروني والاسم عند التسجيل.</li>
          <li>بيانات الطلب: الخدمات المطلوبة، رقم التواصل، والملاحظات.</li>
          <li>إثبات الدفع: الصورة أو الملف الذي ترفعه.</li>
        </ul>
      </Card>
      <Card title="كيف نستخدمه">
        <p>
          لتنفيذ الطلب، التحقق من الدفع، والتواصل معك بخصوص طلبك فقط. لا نبيع بياناتك ولا نشاركها لأغراض
          تسويقية.
        </p>
      </Card>
      <Card title="حماية البيانات">
        <p>
          إثباتات الدفع مخزّنة في مساحة خاصة غير متاحة للعامة، ولا يصل إليها إلا فريق الإدارة. كل جدول في
          قاعدة البيانات محمي بقواعد وصول تمنع أي مستخدم من رؤية بيانات غيره.
        </p>
      </Card>
      <Card title="التقييمات">
        <p>تقييمك ونص تعليقك يظهران للعامة على صفحة الخدمة، دون عرض بريدك أو رقمك.</p>
      </Card>
      <Card title="حقوقك">
        <p>
          يمكنك طلب حذف حسابك وبياناتك في أي وقت عبر صفحة «تواصل معنا»، ونحتفظ بسجلات الطلبات للمدة
          اللازمة للمحاسبة وحل النزاعات فقط.
        </p>
      </Card>
    </PageShell>
  );
}
