import { useTranslation } from "react-i18next";
export default function Home() {
  const { t } = useTranslation();
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-bold">{t("hero.title")}</h1>
      <p className="opacity-80">{t("hero.subtitle")}</p>
    </section>
  
);

}
