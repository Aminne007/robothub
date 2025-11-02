import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { featureCards, metricHighlights, partnerLogos, testimonials, workflowSteps, getCopy } from "../data/content";
import { products } from "../data/products";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

const trendingProducts = products.slice(0, 3);

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 px-8 py-12 text-zinc-900 shadow-lg dark:border-blue-900/40 dark:from-blue-950/40 dark:via-zinc-900 dark:to-purple-950/30 dark:text-zinc-100 sm:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              {t("brand")}
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-zinc-700 dark:text-zinc-200">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {t("hero.cta")}
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-900/5 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-white/10"
              >
                {lang === "ar" ? "استعرض اللوحات" : "View dashboards"}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-inner backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/70">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {lang === "ar" ? "أرقام موثوقة" : "Trusted by teams"}
            </p>
            <dl className="grid gap-4 sm:grid-cols-3">
              {metricHighlights.map(metric => (
                <div key={metric.id} className="space-y-1 rounded-xl border border-zinc-200/80 bg-white/80 p-4 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {getCopy(metric.label, lang)}
                  </dt>
                  <dd className="text-2xl font-bold text-blue-600 dark:text-blue-300">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {featureCards.map(feature => (
          <article
            key={feature.id}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="space-y-4">
              <div className="text-3xl" aria-hidden>
                {feature.icon}
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {getCopy(feature.title, lang)}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {getCopy(feature.description, lang)}
              </p>
            </div>
            <Link
              to="/catalog"
              className="mt-6 inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-300"
            >
              {lang === "ar" ? "ابدأ الآن" : "Start exploring"} →
            </Link>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-inner dark:border-zinc-700 dark:bg-zinc-900/70">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {lang === "ar" ? "شركاؤنا" : "Ecosystem partners"}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {partnerLogos.map(partner => (
            <div
              key={partner}
              className="flex items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white p-4 text-center text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {partner}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
        <article className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <header className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {lang === "ar" ? "رحلة بناء كاملة" : "End-to-end workflow"}
            </p>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {lang === "ar" ? "حوّل الأفكار إلى روبوتات" : "Turn ideas into robots"}
            </h2>
          </header>
          <ol className="space-y-4">
            {workflowSteps.map((step, index) => (
              <li key={step.id} className="flex gap-4 rounded-xl border border-zinc-200/70 bg-white/70 p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-base font-semibold text-white dark:bg-blue-500">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {getCopy(step.title, lang)}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">
                    {getCopy(step.description, lang)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <aside className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {t("home.trendingTitle")}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("home.trendingDescription")}
          </p>
          <ul className="space-y-4 text-sm">
            {trendingProducts.map(product => (
              <li key={product.id} className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-white/70 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60">
                <div className="space-y-1">
                  <Link to={`/product/${product.id}`} className="font-medium text-zinc-900 hover:underline dark:text-zinc-100">
                    {product.name}
                  </Link>
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{product.category}</p>
                </div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                  {currency.format(product.price)}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {testimonials.map(testimonial => (
          <figure
            key={testimonial.id}
            className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-white to-blue-50 p-6 shadow-sm dark:border-zinc-700 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/40"
          >
            <blockquote className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-200">
              “{getCopy(testimonial.quote, lang)}”
            </blockquote>
            <figcaption className="mt-6 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {testimonial.author}
              <span className="block text-xs font-normal text-zinc-500 dark:text-zinc-400">{testimonial.role}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-500 px-8 py-10 text-white shadow-xl dark:border-blue-900/60">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              {lang === "ar" ? "ابدأ ببناء لوحة القيادة الخاصة بك اليوم" : "Launch your robotics control tower"}
            </h2>
            <p className="text-sm text-blue-100">
              {lang === "ar"
                ? "قم بتوحيد المشتريات، وقم بمراقبة الأسطول، وادعم الفرق الميدانية من منصة واحدة."
                : "Unify procurement, monitor fleets, and support field teams from a single platform."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              {lang === "ar" ? "استعرض اللوحات" : "Explore dashboards"}
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t("nav.login")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
