import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { categories, products } from "../data/products";
import { cn } from "../lib/cn";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

export default function Catalog() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter(product => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesSearch = normalizedSearch
        ? [product.name, product.sku, product.shortDescription]
            .join(" ")
            .toLowerCase()
            .includes(normalizedSearch)
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("catalog.title")}
        </h1>
        <p className="text-base opacity-80">{t("catalog.description")}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {t("catalog.searchPlaceholder")}
          </span>
          <input
            type="search"
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder={t("catalog.searchPlaceholder")}
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {t("catalog.filterLabel")}
          </span>
          <select
            value={category}
            onChange={event => setCategory(event.target.value as (typeof categories)[number])}
            className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2"
          >
            {categories.map(current => (
              <option key={current} value={current}>
                {current === "All" ? t("catalog.all") : current}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>
          {t("catalog.resultsCount", {
            count: filteredProducts.length,
          })}
        </span>
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("common.clear", { defaultValue: "Clear" })}
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center text-sm opacity-80">
          {t("catalog.noResults")}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map(product => (
            <article
              key={product.id}
              className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    <Link to={`/product/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {product.shortDescription}
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {product.category}
                </span>
              </div>

              <dl className="mt-4 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-200">
                <div>
                  <dt className="opacity-70">SKU</dt>
                  <dd className="font-mono">{product.sku}</dd>
                </div>
                <div className="text-right">
                  <dt className="opacity-70">{t("cart.quantity", { defaultValue: "Qty" })}</dt>
                  <dd>{product.stock}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                  {currency.format(product.price)}
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className={cn(
                    "rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white transition",
                    "hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  )}
                >
                  {t("hero.cta")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
