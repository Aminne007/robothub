import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { findProductById } from "../data/products";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export default function Product() {
  const { id } = useParams();
  const { t } = useTranslation();

  const product = useMemo(() => (id ? findProductById(id) : undefined), [id]);

  if (!product) {
    return (
      <div className="space-y-4 rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm opacity-80 dark:border-zinc-700">
        <p>{t("product.notFound")}</p>
        <Link to="/catalog" className="inline-flex items-center text-blue-600 hover:underline dark:text-blue-400">
          {t("product.goBack")}
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400">{product.category}</p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{product.name}</h1>
        <p className="text-base text-zinc-600 dark:text-zinc-300">{product.description}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {t("product.specsTitle")}
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(product.specs).map(([label, value]) => (
                <div key={label} className="rounded-lg border border-zinc-200 p-3 text-sm dark:border-zinc-700">
                  <dt className="font-medium text-zinc-700 dark:text-zinc-300">{label}</dt>
                  <dd className="text-zinc-900 dark:text-zinc-100">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {t("product.featuresTitle")}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
              {product.features.map(feature => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 text-blue-600 dark:text-blue-400">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">SKU {product.sku}</p>
            <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-300">
              {currency.format(product.price)}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {product.stock > 0
                ? t("product.inStock", { count: product.stock })
                : t("product.outOfStock")}
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            {t("cart.checkout")}
          </button>

          <Link
            to="/cart"
            className="block text-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("nav.cart")}
          </Link>
        </aside>
      </section>
    </article>
  );
}
