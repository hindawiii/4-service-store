import { createFileRoute } from "@tanstack/react-router";
import { Card, PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط والأحكام | inservice" },
      {
        name: "description",
        content: "شروط استخدام متجر inservice: الطلبات، الدفع، التسليم، الاسترجاع، والاستخدام القانوني.",
      },
      { property: "og:title", content: "الشروط والأحكام | inservice" },
      { property: "og:description", content: "قواعد الطلب والدفع والتسليم والاسترجاع في inservice." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell title="الشروط والأحكام" subtitle="باستخدامك للموقع وإرسال أي طلب فإنك توافق على ما يلي.">
      <Card title="1. طبيعة الخدمة">
        <p>
          نحن وسيط تنفيذ خدمات رقمية: تفعيل اشتراكات، تركيب أنظمة، دعم فني عن بُعد، ودورات. لسنا الجهة
          المالكة للبرامج أو المنصات المذكورة، وأسماؤها وعلاماتها تعود لأصحابها.
        </p>
      </Card>
      <Card title="2. الطلب والدفع">
        <ul className="list-disc space-y-1 pr-5">
          <li>يبدأ التنفيذ بعد تأكيد استلام المبلغ ومراجعة إثبات الدفع.</li>
          <li>الأسعار معروضة بالدولار وقد تتغير حسب سعر الصرف وأسعار مزوّدي الخدمة.</li>
          <li>رسوم التحويل البنكي أو الشبكة (USDT) على العميل.</li>
        </ul>
      </Card>
      <Card title="3. التسليم">
        <p>
          مدة التنفيذ التقديرية من ساعات إلى 72 ساعة حسب نوع الخدمة وتوفر مزوّدها. نُعلمك بأي تأخير عبر
          قناة التواصل التي زوّدتنا بها.
        </p>
      </Card>
      <Card title="4. الاسترجاع">
        <ul className="list-disc space-y-1 pr-5">
          <li>يُسترد المبلغ كاملاً إذا تعذّر تنفيذ الخدمة من طرفنا.</li>
          <li>لا استرجاع بعد تسليم اشتراك أو مفتاح تفعيل يعمل، أو بعد اكتمال جلسة دعم فني.</li>
          <li>في حال خلل خلال 48 ساعة من التسليم نصلحه أو نستبدله دون رسوم.</li>
        </ul>
      </Card>
      <Card title="5. مسؤولية العميل">
        <p>
          تتحمل مسؤولية صحة البيانات التي تقدّمها (الحسابات، الأرقام، الملفات) وسلامة نسخك الاحتياطية قبل
          أي عملية تركيب أو صيانة. لا نقدّم أي دعم لاستخدام غير قانوني أو لمحتوى مقرصن.
        </p>
      </Card>
      <Card title="6. تعديل الشروط">
        <p>قد نحدّث هذه الشروط، ويسري التحديث من تاريخ نشره على هذه الصفحة.</p>
      </Card>
    </PageShell>
  );
}
