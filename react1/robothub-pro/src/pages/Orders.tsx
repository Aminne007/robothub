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

export default function Orders() {
  const { user, appendOrder } = useAuth();
  if (!user) return null;

  const orders = [...user.orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const createSimulatedOrder = () => {
    const timestamp = Date.now();
    const newOrder = {
      id: `ORD-${timestamp.toString().slice(-4)}`,
      date: new Date().toISOString(),
      items: Math.max(1, Math.floor(Math.random() * 5) + 1),
      total: Number((Math.random() * 3000 + 900).toFixed(2)),
      status: "Processing" as const,
    };
    appendOrder(newOrder);
  };

  return (
    <AccountLayout
      title="Orders & fulfillment"
      description="Monitor shipments, download invoices, and follow fulfillment statuses across every order."
      actions={
        <button
          type="button"
          onClick={createSimulatedOrder}
          className="rounded-full border border-white/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Simulate reorder
        </button>
      }
    >
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            <tr>
              <th className="px-5 py-3 text-left">Order</th>
              <th className="px-5 py-3 text-left">Placed</th>
              <th className="px-5 py-3 text-left">Items</th>
              <th className="px-5 py-3 text-right">Total</th>
              <th className="px-5 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-zinc-600 dark:text-zinc-300">
                  No orders found yet. Head to the catalog to begin assembling your robotics kit.
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
                  <td className="px-5 py-4 font-medium text-zinc-900 dark:text-zinc-100">{order.id}</td>
                  <td className="px-5 py-4 text-zinc-600 dark:text-zinc-300">{formatDate(order.date)}</td>
                  <td className="px-5 py-4 text-zinc-600 dark:text-zinc-300">{order.items}</td>
                  <td className="px-5 py-4 text-right font-medium text-zinc-900 dark:text-zinc-100">
                    {currency.format(order.total)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[order.status])}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AccountLayout>
  );
}
