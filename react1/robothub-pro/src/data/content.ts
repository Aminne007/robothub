export type LocalizedCopy = {
  en: string;
  ar: string;
};

const fallback = <T extends LocalizedCopy>(copy: T, lang: string) => copy[(lang as keyof T) ?? "en"] ?? copy.en;

export const getCopy = (copy: LocalizedCopy, lang: string) => fallback(copy, lang);

export type FeatureCard = {
  id: string;
  icon: string;
  title: LocalizedCopy;
  description: LocalizedCopy;
};

export const featureCards: FeatureCard[] = [
  {
    id: "catalog",
    icon: "🤖",
    title: {
      en: "Curated robotics marketplace",
      ar: "سوق روبوتات مختار بعناية",
    },
    description: {
      en: "Source controllers, sensing, motion, and power components with vetted supplier SLAs.",
      ar: "احصل على وحدات التحكم وأجهزة الاستشعار والحركة والطاقة من موردين موثوقين.",
    },
  },
  {
    id: "playbooks",
    icon: "🧭",
    title: {
      en: "Deployment playbooks",
      ar: "خطط جاهزة للنشر",
    },
    description: {
      en: "Accelerate pilots with proven launch workflows, risk templates, and success metrics.",
      ar: "سرّع المشاريع التجريبية بخطط إطلاق مجربة وقوالب إدارة المخاطر ومؤشرات النجاح.",
    },
  },
  {
    id: "community",
    icon: "🌐",
    title: {
      en: "Global builder community",
      ar: "مجتمع عالمي لصناع الروبوتات",
    },
    description: {
      en: "Join labs and makerspaces sharing BOMs, maintenance logs, and field learnings.",
      ar: "انضم إلى المختبرات ومساحات العمل التي تشارك قوائم المكونات وسجلات الصيانة والخبرات الميدانية.",
    },
  },
];

export type MetricHighlight = {
  id: string;
  label: LocalizedCopy;
  value: string;
};

export const metricHighlights: MetricHighlight[] = [
  { id: "labs", value: "120+", label: { en: "Research labs onboarded", ar: "مختبرات بحثية معتمدة" } },
  { id: "parts", value: "4.8K", label: { en: "Parts in smart catalog", ar: "قطع في الكتالوج الذكي" } },
  { id: "uptime", value: "99.2%", label: { en: "Fleet uptime delivered", ar: "جاهزية الأساطيل المحققة" } },
];

export type WorkflowStep = {
  id: string;
  title: LocalizedCopy;
  description: LocalizedCopy;
};

export const workflowSteps: WorkflowStep[] = [
  {
    id: "design",
    title: { en: "Design", ar: "التصميم" },
    description: {
      en: "Start with blueprints and BOM suggestions tuned for your industry use case.",
      ar: "ابدأ بمخططات واقتراحات قوائم المكونات الملائمة لحالتك الصناعية.",
    },
  },
  {
    id: "build",
    title: { en: "Build", ar: "البناء" },
    description: {
      en: "Collaborate with your team in real time to assemble, test, and iterate.",
      ar: "تعاون مع فريقك في الوقت الفعلي للتجميع والاختبار والتطوير.",
    },
  },
  {
    id: "deploy",
    title: { en: "Deploy", ar: "النشر" },
    description: {
      en: "Roll out confidently with maintenance tracking, alerts, and analytics dashboards.",
      ar: "انطلق بثقة مع تتبع الصيانة والتنبيهات ولوحات التحليل.",
    },
  },
];

export type Testimonial = {
  id: string;
  quote: LocalizedCopy;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "forge",
    quote: {
      en: "RobotHub Pro helped our makerspace spin up three new robotics programs in a single quarter.",
      ar: "ساعدنا روبوتهاب برو على إطلاق ثلاثة برامج روبوتات جديدة خلال ربع واحد فقط.",
    },
    author: "Lina Duarte",
    role: "Director, Forge Makerspace",
  },
  {
    id: "atlas",
    quote: {
      en: "The deployment dashboards highlight issues before they hit production—game changing for our field teams.",
      ar: "تساعدنا لوحات المتابعة على اكتشاف المشكلات قبل وصولها للميدان، وهو ما غيّر طريقة عمل فرقنا.",
    },
    author: "Dr. Omar Haddad",
    role: "Lead Roboticist, Atlas Labs",
  },
];

export const partnerLogos = [
  "Axiom Robotics",
  "Nexus Automation",
  "Forge Makerspace",
  "Lumen Logistics",
  "Atlas Labs",
];
