import { useMemo, useState } from "react";

import { products } from "../../data/products";
import { cn } from "../../lib/cn";

const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" });

const stockBadge = (stock: number) => {
  if (stock < 5) return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200";
  if (stock < 15) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200";
  return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
};

type InventoryRow = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
};

export default function AdminInventory() {
  const [inventory, setInventory] = useState<InventoryRow[]>(() =>
    products.map(product => ({
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category,
      stock: product.stock,
      price: product.price,
    })),
  );

  const lowStockCount = useMemo(() => inventory.filter(item => item.stock < 10).length, [inventory]);

  const restock = (id: string) => {
    setInventory(prev =>
      prev.map(item => (item.id === id ? { ...item, stock: item.stock + 15 } : item)),
    );
  };

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 px-8 py-10 text-white shadow-lg dark:border-blue-900/70">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Inventory</p>
          <h2 className="text-3xl font-semibold">Catalog stock levels</h2>
          <p className="text-sm text-blue-100/90">Review parts availability and trigger restock workflows.</p>
        </div>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Inventory snapshot</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{lowStockCount} SKUs below safety stock</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-right">Stock</th>
                <th className="px-4 py-3 text-right">Unit price</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {inventory.map(item => (
                <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{item.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">{item.sku}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{item.category}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", stockBadge(item.stock))}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-300">{currency.format(item.price)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => restock(item.id)}
                      className="rounded-full border border-blue-600 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:text-blue-300"
                    >
                      Restock +15
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
