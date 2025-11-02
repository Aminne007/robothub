import {
  activityLog,
  alerts,
  overviewMetrics,
  recentOrders,
  salesPipeline,
  team,
} from "../../data/dashboard";
import { cn } from "../../lib/cn";

const trendStyles = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-rose-600 dark:text-rose-400",
  steady: "text-amber-600 dark:text-amber-400",
} as const;

const severityStyles = {
  low: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/60 dark:bg-blue-900/30 dark:text-blue-200",
  medium: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-900/20 dark:text-amber-200",
  high: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-900/20 dark:text-rose-200",
} as const;

export default function AdminHome() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-500 px-8 py-10 text-white shadow-lg dark:border-blue-900/70">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Operations control</p>
          <h2 className="text-3xl font-semibold">Marketplace health overview</h2>
          <p className="text-sm text-blue-100/90">Track revenue, fulfillment, and support signals from a single cockpit.</p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map(metric => (
          <article
            key={metric.id}
            className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{metric.label}</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{metric.value}</p>
            <p className={cn("text-sm font-medium", trendStyles[metric.trend])}>{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <article className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Sales pipeline</h3>
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Quarter to date</span>
          </header>
          <ul className="space-y-4">
            {salesPipeline.map(stage => {
              const progress = Math.min(100, Math.round((stage.value / stage.quota) * 100));
              return (
                <li key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{stage.stage}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {stage.value} leads · {progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-purple-400"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>

        <aside className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Live alerts</h3>
          <ul className="space-y-3 text-sm">
            {alerts.map(alert => (
              <li key={alert.id} className={cn("space-y-1 rounded-xl border px-4 py-3", severityStyles[alert.severity])}>
                <p className="font-semibold">{alert.title}</p>
                <p className="text-xs opacity-90">{alert.description}</p>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Enterprise orders</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Largest contracts by value</p>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Export CSV</button>
          </header>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
              <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                <tr>
                  <th className="px-6 py-3 text-left">Invoice</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Value</th>
                  <th className="px-6 py-3 text-right">Items</th>
                  <th className="px-6 py-3 text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
                    <td className="px-6 py-3 font-medium text-zinc-900 dark:text-zinc-100">{order.id}</td>
                    <td className="px-6 py-3 text-zinc-700 dark:text-zinc-300">{order.company}</td>
                    <td className="px-6 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                          order.status === "Paid" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
                          order.status === "Pending" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
                          order.status === "Delayed" && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-zinc-900 dark:text-zinc-100">{order.value}</td>
                    <td className="px-6 py-3 text-right text-zinc-600 dark:text-zinc-300">{order.items}</td>
                    <td className="px-6 py-3 text-right text-zinc-500 dark:text-zinc-400">{order.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Team focus</h3>
          <ul className="space-y-3 text-sm">
            {team.map(member => (
              <li key={member.id} className="flex items-start justify-between gap-3 rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-700">
                <div className="space-y-1">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{member.name}</p>
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{member.role}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">{member.focus}</p>
                </div>
                <span
                  className={cn(
                    "mt-1 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                    member.status === "Available" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
                    member.status === "In build" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200",
                    member.status === "Offline" && "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
                  )}
                >
                  {member.status}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Activity feed</h3>
          <button className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Download log</button>
        </div>
        <ul className="mt-4 space-y-3 text-sm">
          {activityLog.map(item => (
            <li key={item.id} className="flex items-start gap-3 rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-700">
              <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" aria-hidden />
              <div className="flex-1">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {item.actor} · {item.timestamp}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
