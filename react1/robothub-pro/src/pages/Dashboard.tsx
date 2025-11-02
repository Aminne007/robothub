import { Link } from "react-router-dom";

import AccountLayout from "../conponents/account/AccountLayout";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/cn";

const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

const statusStyles = {
  Processing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
  Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200",
  Delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  Cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
} as const;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const orders = [...user.orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalSpend = orders.reduce((sum, order) => sum + order.total, 0);
  const openOrders = orders.filter(order => order.status !== "Delivered" && order.status !== "Cancelled");

  const metrics = [
    { id: "orders", label: "Total orders", value: orders.length },
    { id: "open", label: "Open orders", value: openOrders.length },
    { id: "spend", label: "Lifetime spend", value: currency.format(totalSpend) },
    { id: "member", label: "Member since", value: formatDate(user.joinedAt) },
  ];

  const latestOrders = orders.slice(0, 3);

  const loyaltyTier = totalSpend > 20000 ? "Platinum" : totalSpend > 10000 ? "Gold" : "Builder";

  return (
    <AccountLayout
      title="Builder dashboard"
      description="Track orders, monitor fulfillment, and pick up where you left off on your next robotics build."
      actions={
        <Link
          to="/catalog"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
        >
          Browse catalog
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(metric => (
          <article
            key={metric.id}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{metric.label}</p>
            <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{metric.value}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <header className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-700">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent orders</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Updates across the last 90 days</p>
            </div>
            <Link to="/orders" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              View all
            </Link>
          </header>
          {latestOrders.length === 0 ? (
            <p className="p-6 text-sm text-zinc-600 dark:text-zinc-300">No orders yet. Head to the catalog to start your first build.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
                <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  <tr>
                    <th className="px-5 py-3 text-left">Order</th>
                    <th className="px-5 py-3 text-left">Placed</th>
                    <th className="px-5 py-3 text-right">Total</th>
                    <th className="px-5 py-3 text-right">Items</th>
                    <th className="px-5 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {latestOrders.map(order => (
                    <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
                      <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-100">{order.id}</td>
                      <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">{formatDate(order.date)}</td>
                      <td className="px-5 py-3 text-right font-medium text-zinc-900 dark:text-zinc-100">
                        {currency.format(order.total)}
                      </td>
                      <td className="px-5 py-3 text-right text-zinc-600 dark:text-zinc-300">{order.items}</td>
                      <td className="px-5 py-3 text-right">
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[order.status])}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <aside className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Membership</h2>
          <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-5 text-blue-800 dark:border-blue-900/70 dark:bg-blue-900/30 dark:text-blue-200">
            <p className="text-sm font-semibold uppercase tracking-wide">{loyaltyTier} tier</p>
            <p className="mt-2 text-sm text-blue-900/80 dark:text-blue-100/90">
              Spend more than $5k this quarter to unlock concierge sourcing support and extended warranties.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <li>• Track fulfillment progress in <Link to="/orders" className="font-semibold text-blue-600 dark:text-blue-400">Orders</Link>.</li>
            <li>• Update contact details in <Link to="/profile" className="font-semibold text-blue-600 dark:text-blue-400">Profile</Link>.</li>
            <li>• Need enterprise pricing? <a href="mailto:sales@robothub.com" className="font-semibold text-blue-600 dark:text-blue-400">Talk with sales</a>.</li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Next steps</h2>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <li className="rounded-xl border border-dashed border-zinc-300/70 p-4 dark:border-zinc-700/70">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">Finalize parts list</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Review BOM recommendations and reserve inventory ahead of your next sprint.</p>
            </li>
            <li className="rounded-xl border border-dashed border-zinc-300/70 p-4 dark:border-zinc-700/70">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">Schedule deployment assist</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Our field teams can help stage your build and train operators in under a week.</p>
            </li>
          </ul>
        </article>

        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Knowledge base</h2>
          <ul className="space-y-3 text-sm">
            <li className="rounded-xl border border-zinc-200/80 p-4 transition hover:border-blue-300 dark:border-zinc-700 dark:hover:border-blue-500">
              <a href="#" className="flex items-center justify-between text-zinc-700 dark:text-zinc-200">
                <span>
                  <span className="block font-semibold">ROS 2 navigation templates</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Updated for Foxy and Humble distributions</span>
                </span>
                <span aria-hidden>→</span>
              </a>
            </li>
            <li className="rounded-xl border border-zinc-200/80 p-4 transition hover:border-blue-300 dark:border-zinc-700 dark:hover:border-blue-500">
              <a href="#" className="flex items-center justify-between text-zinc-700 dark:text-zinc-200">
                <span>
                  <span className="block font-semibold">Battery maintenance checklist</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Keep field fleets performing at 99% uptime</span>
                </span>
                <span aria-hidden>→</span>
              </a>
            </li>
            <li className="rounded-xl border border-zinc-200/80 p-4 transition hover:border-blue-300 dark:border-zinc-700 dark:hover:border-blue-500">
              <a href="#" className="flex items-center justify-between text-zinc-700 dark:text-zinc-200">
                <span>
                  <span className="block font-semibold">Sourcing subsidies guide</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Unlock academic pricing with a single application</span>
                </span>
                <span aria-hidden>→</span>
              </a>
            </li>
          </ul>
        </article>
      </section>
    </AccountLayout>
  );
}
