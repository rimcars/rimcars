import { TestimonialAuthor } from "@/components/ui/testimonial-card";

export interface TestimonialData {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

export const testimonialsSectionData = {
  title: "ما يقوله عملاؤنا",
  description: "آراء أصحاب السيارات والمشترين حول تجربتهم مع منصة سيارات الريم",
  testimonials: [
    {
      author: {
        name: "أحمد المختار",
        title: "مشتري سيارة",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      text: "وجدت سيارتي المثالية على منصة سيارات الريم بسهولة تامة. الواجهة سهلة الاستخدام والتواصل مع البائع كان سلساً. أنصح بشدة بهذه المنصة لكل من يبحث عن سيارة جديدة.",
    },
    {
      author: {
        name: "سارة محمد",
        title: "بائعة سيارات",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      },
      text: "كبائعة، أجد أن منصة سيارات الريم توفر لي كل الأدوات اللازمة لعرض سياراتي بشكل احترافي. قمت ببيع ثلاث سيارات في أقل من شهر واحد!",
    },
    {
      author: {
        name: "عبد الله العربي",
        title: "عميل منتظم",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      text: "استخدمت العديد من منصات بيع السيارات، لكن سيارات الريم تتميز بمصداقيتها وجودة الخدمة. التفاصيل المقدمة عن كل سيارة دقيقة ومفيدة جداً.",
    },
    {
      author: {
        name: "فاطمة الزهراء",
        title: "مشترية جديدة",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      },
      text: "كنت متخوفة من شراء سيارة عبر الإنترنت، لكن تجربتي مع سيارات الريم غيرت نظرتي تماماً. المنصة توفر حماية للمشتري وتضمن جودة السيارات المعروضة.",
    },
    {
      author: {
        name: "محمد الحسن",
        title: "تاجر سيارات",
        avatar:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
      },
      text: "منصة رائعة لعرض مجموعة السيارات الخاصة بمعرضي. السيارات تحصل على مشاهدات أكثر وأتلقى اتصالات من عملاء جادين في الشراء.",
    },
    {
      author: {
        name: "سلمى إبراهيم",
        title: "مشترية سيارة فاخرة",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      },
      text: "نجحت في العثور على سيارة فاخرة بسعر معقول عبر المنصة. الصور كانت واضحة والوصف دقيق، وعندما رأيت السيارة على أرض الواقع كانت مطابقة تماماً للوصف.",
    },
  ],
};
