import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      brand: "RobotHub Pro",
      common: {
        clear: "Clear",
      },
      nav: {
        home: "Home",
        catalog: "Catalog",
        dashboard: "Dashboards",
        cart: "Cart",
        admin: "Admin",
        login: "Login",
      },
      hero: {
        title: "Robotics parts & knowledge",
        subtitle: "Find, learn, build.",
        cta: "Explore catalog",
      },
      home: {
        highlightsTitle: "Why makers love RobotHub Pro",
        highlights: [
          "Curated catalog of robotics components and kits",
          "Step-by-step build guides written by experts",
          "Community-tested projects with BOM ready to order",
        ],
        trendingTitle: "Trending components",
        trendingDescription:
          "These parts are popular with the community this week. Filter the catalog for hundreds more.",
      },
      catalog: {
        title: "Catalog",
        description: "Browse robotics-ready hardware curated for builders and researchers.",
        searchPlaceholder: "Search parts, brands, or SKU",
        filterLabel: "Filter by category",
        all: "All categories",
        resultsCount: "{{count}} products",
        noResults: "No products match your filters yet.",
        resultsCount_one: "{{count}} product",
        resultsCount_other: "{{count}} products",
      },
      product: {
        specsTitle: "Technical specifications",
        featuresTitle: "Included in the box",
        notFound: "We couldn't find that product.",
        goBack: "Back to catalog",
        inStock: "{{count}} units in stock",
        inStock_one: "{{count}} unit in stock",
        inStock_other: "{{count}} units in stock",
        outOfStock: "Out of stock",
      },
      cart: {
        title: "Shopping cart",
        subtitle: "Review your items before checkout.",
        empty: "Your cart is empty for now.",
        quantity: "Qty",
        remove: "Remove",
        summary: "Order summary",
        subtotal: "Subtotal",
        shipping: "Estimated shipping",
        free: "Free",
        total: "Total",
        checkout: "Proceed to checkout",
      },
      login: {
        title: "Login",
        email: "Email",
        password: "Password",
        submit: "Sign in",
        invalid: "Invalid email or password",
        success: "Logged in successfully",
        loading: "Signing in...",
      },
    },
  },
  ar: {
    translation: {
      brand: "روبوتهاب برو",
      common: {
        clear: "إعادة تعيين",
      },
      nav: {
        home: "الرئيسية",
        catalog: "المتجر",
        dashboard: "لوحات التحكم",
        cart: "السلة",
        admin: "لوحة التحكم",
        login: "تسجيل الدخول",
      },
      hero: {
        title: "قطع ومعرفة للروبوتات",
        subtitle: "ابحث وتعلّم وابنِ.",
        cta: "استكشف المتجر",
      },
      home: {
        highlightsTitle: "لماذا يثق صانعو الروبوتات بـ روبوتهاب برو",
        highlights: [
          "تشكيلة مختارة من مكونات ومجموعات الروبوتات",
          "أدلة بناء خطوة بخطوة من خبراء المجال",
          "مشاريع مجتمعية مع قوائم شراء جاهزة",
        ],
        trendingTitle: "منتجات شائعة",
        trendingDescription:
          "هذه القطع تحظى باهتمام مجتمعنا هذا الأسبوع. استخدم الفلاتر لاكتشاف المزيد.",
      },
      catalog: {
        title: "المتجر",
        description: "تصفح مكونات الروبوتات المختارة للمطورين والباحثين.",
        searchPlaceholder: "ابحث عن قطع أو علامات تجارية أو رمز SKU",
        filterLabel: "تصفية حسب الفئة",
        all: "كل الفئات",
        resultsCount: "{{count}} منتج",
        noResults: "لا توجد منتجات مطابقة للمعايير المحددة.",
        resultsCount_one: "منتج واحد",
        resultsCount_two: "منتجان",
        resultsCount_few: "{{count}} منتجات",
        resultsCount_many: "{{count}} منتجًا",
        resultsCount_other: "{{count}} منتج",
      },
      product: {
        specsTitle: "المواصفات التقنية",
        featuresTitle: "محتويات العلبة",
        notFound: "لم نعثر على هذا المنتج.",
        goBack: "العودة إلى المتجر",
        inStock: "{{count}} قطعة متوفرة",
        inStock_one: "قطعة واحدة متوفرة",
        inStock_two: "قطعتان متوفرتان",
        inStock_few: "{{count}} قطع متوفرة",
        inStock_many: "{{count}} قطعة متوفرة",
        inStock_other: "{{count}} قطعة متوفرة",
        outOfStock: "غير متوفر حالياً",
      },
      cart: {
        title: "سلة المشتريات",
        subtitle: "راجع العناصر قبل إتمام الطلب.",
        empty: "سلتك فارغة حالياً.",
        quantity: "الكمية",
        remove: "إزالة",
        summary: "ملخص الطلب",
        subtotal: "المجموع الفرعي",
        shipping: "تكلفة الشحن التقديرية",
        free: "مجاناً",
        total: "الإجمالي",
        checkout: "إتمام الشراء",
      },
      login: {
        title: "تسجيل الدخول",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        submit: "دخول",
        invalid: "بيانات الدخول غير صحيحة",
        success: "تم تسجيل الدخول بنجاح",
        loading: "جاري تسجيل الدخول...",
      },
    },
  },
} satisfies Parameters<typeof i18n.init>[0]["resources"];

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;