import Header from "@/components/header";
import Footer from "@/components/footer-section";
import { getUser } from "@/app/actions";

export default async function TermsPage() {
  const user = await getUser();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      <main className="flex-1 container mx-auto px-4 py-10 text-right">
        <h1 className="text-3xl font-bold mb-6 text-primary">شروط الاستخدام</h1>
        <ol className="list-decimal list-inside space-y-4 text-lg">
          <li>
            باستخدامك لمنصتنا، فإنك توافق على الالتزام بجميع الشروط والأحكام المذكورة هنا.
          </li>
          <li>
            نحن نعمل كوسيط فقط بين البائعين والمشترين ولا نتحمل مسؤولية أي اتفاقيات أو معاملات تتم خارج المنصة.
          </li>
          <li>
            يجب على المستخدمين تقديم معلومات صحيحة ودقيقة عند التسجيل أو عرض السيارات للبيع.
          </li>
          <li>
            نحتفظ بحق تعديل أو تحديث الشروط في أي وقت دون إشعار مسبق.
          </li>
          <li>
            يمنع استخدام المنصة لأي أغراض غير قانونية أو احتيالية.
          </li>
        </ol>
      </main>
      
    </div>
  );
}
