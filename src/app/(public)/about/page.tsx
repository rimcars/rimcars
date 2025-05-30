import { getUser } from "@/app/actions";

export default async function AboutPage() {
  const user = await getUser();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 container mx-auto px-4 py-10 text-right">
        <h1 className="text-3xl font-bold mb-6 text-primary">من نحن</h1>
        <p className="text-lg leading-relaxed mb-4">
          نحن شركة موريتانية تربط بين بائعي السيارات والمشترين بطريقة سهلة وآمنة وموثوقة. هدفنا هو تسهيل عملية بيع وشراء السيارات من خلال منصة إلكترونية حديثة تضمن الشفافية والراحة لجميع الأطراف.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          فريقنا يضم خبراء في مجال السيارات والتقنية، ونعمل باستمرار على تطوير خدماتنا لتلبية احتياجات السوق الموريتاني وتقديم أفضل تجربة للمستخدمين.
        </p>
        <p className="text-lg leading-relaxed">
          شكراً لثقتكم بنا!
        </p>
      </main>
    </div>
  );
}
