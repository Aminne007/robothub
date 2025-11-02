import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { products } from "../data/products";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

const trendingProducts = products.slice(0, 3);

export default function Home() {
  const { t } = useTranslation();
  const highlights = t("home.highlights", { returnObjects: true }) as string[];

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-10 text-zinc-900 shadow-sm dark:border-zinc-700 dark:from-blue-900/20 dark:via-zinc-900 dark:to-purple-900/20 dark:text-zinc-100">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
              {t("brand")}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("hero.title")}</h1>
            <p className="text-lg text-zinc-700 dark:text-zinc-200">{t("hero.subtitle")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/catalog"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {t("hero.cta")}
            </Link>
            <Link
              to="/catalog"
              className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
            >
              {t("nav.catalog")}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {t("home.highlightsTitle")}
          </h2>
          <ul className="space-y-3 text-base text-zinc-700 dark:text-zinc-300">
            {highlights.map(highlight => (
              <li key={highlight} className="flex items-start gap-3">
                <span aria-hidden className="mt-1 text-blue-600 dark:text-blue-400">▹</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {t("home.trendingTitle")}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {t("home.trendingDescription")}
          </p>
          <ul className="mt-4 space-y-4 text-sm">
            {trendingProducts.map(product => (
              <li key={product.id} className="flex items-center justify-between gap-4">
                <div>
                  <Link to={`/product/${product.id}`} className="font-medium text-zinc-900 hover:underline dark:text-zinc-100">
                    {product.name}
                  </Link>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{product.category}</p>
                </div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                  {currency.format(product.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
