import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { findProductById } from "../data/products";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

type CartItem = {
  productId: string;
  quantity: number;
};

const initialCart: CartItem[] = [
  { productId: "mcu-esp32-devkit", quantity: 1 },
  { productId: "sensor-imu-9dof", quantity: 2 },
];

export default function Cart() {
  const { t } = useTranslation();
  const [items, setItems] = useState<CartItem[]>(initialCart);

  const cartWithDetails = useMemo(() => {
    return items
      .map(item => {
        const product = findProductById(item.productId);
        if (!product) return null;
        const lineTotal = product.price * item.quantity;
        return { ...item, product, lineTotal };
      })
      .filter(Boolean) as Array<CartItem & { lineTotal: number; product: NonNullable<ReturnType<typeof findProductById>> }>;
  }, [items]);

  const subtotal = cartWithDetails.reduce((acc, item) => acc + item.lineTotal, 0);
  const shipping = subtotal > 0 ? Math.max(9, subtotal * 0.04) : 0;
  const total = subtotal + shipping;

  const updateQuantity = (productId: string, quantity: number) => {
    const safeQuantity = Number.isFinite(quantity) ? Math.max(0, Math.round(quantity)) : 0;
    setItems(prev =>
      prev
        .map(item => (item.productId === productId ? { ...item, quantity: safeQuantity } : item))
        .filter(item => item.quantity > 0),
    );
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{t("cart.title")}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("cart.subtitle")}</p>
        </header>

        {cartWithDetails.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center text-sm opacity-80">
            <p>{t("cart.empty")}</p>
            <Link to="/catalog" className="mt-4 inline-flex items-center text-blue-600 hover:underline dark:text-blue-400">
              {t("hero.cta")}
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {cartWithDetails.map(({ productId, product, quantity, lineTotal }) => (
              <li
                key={productId}
                className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{product.name}</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{product.shortDescription}</p>
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">SKU {product.sku}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:justify-end">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {t("cart.quantity")}
                    </label>
                    <div className="flex items-center rounded-md border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900">
                      <button
                        type="button"
                        onClick={() => updateQuantity(productId, Math.max(0, quantity - 1))}
                        className="px-2 py-1 text-lg leading-none text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        min={0}
                        value={quantity}
                        onChange={event => updateQuantity(productId, Number(event.target.value))}
                        type="number"
                        className="w-16 appearance-none border-x border-zinc-300 bg-transparent text-center text-sm font-medium focus:outline-none dark:border-zinc-600"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(productId, quantity + 1)}
                        className="px-2 py-1 text-lg leading-none text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{currency.format(product.price)}</p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{currency.format(lineTotal)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(productId)}
                    className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
                  >
                    {t("cart.remove")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <aside className="h-fit space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("cart.summary")}</h2>
        <dl className="space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
          <div className="flex items-center justify-between">
            <dt>{t("cart.subtotal")}</dt>
            <dd className="font-medium">{currency.format(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>{t("cart.shipping")}</dt>
            <dd className="font-medium">{shipping ? currency.format(shipping) : t("cart.free", { defaultValue: "Free" })}</dd>
          </div>
          <div className="flex items-center justify-between text-base font-semibold">
            <dt>{t("cart.total")}</dt>
            <dd>{currency.format(total)}</dd>
          </div>
        </dl>
        <button
          type="button"
          disabled={cartWithDetails.length === 0}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {t("cart.checkout")}
        </button>
      </aside>
    </section>
  );
}
