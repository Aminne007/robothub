const revenue = [
  { month: "Oct", revenue: 82000, forecast: 76000 },
  { month: "Nov", revenue: 87500, forecast: 83000 },
  { month: "Dec", revenue: 94000, forecast: 91000 },
  { month: "Jan", revenue: 101200, forecast: 97000 },
  { month: "Feb", revenue: 108400, forecast: 105000 },
  { month: "Mar", revenue: 113600, forecast: 111000 },
];

const fulfillment = [
  { week: "W1", shipped: 142, delayed: 6 },
  { week: "W2", shipped: 156, delayed: 4 },
  { week: "W3", shipped: 168, delayed: 3 },
  { week: "W4", shipped: 171, delayed: 5 },
];

const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

const maxRevenue = Math.max(...revenue.map(point => Math.max(point.revenue, point.forecast)));
const maxShipments = Math.max(...fulfillment.map(point => point.shipped));

export default function AdminStats() {
  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 px-8 py-10 text-white shadow-lg dark:border-blue-900/70">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Analytics</p>
          <h2 className="text-3xl font-semibold">Revenue & fulfillment insights</h2>
          <p className="text-sm text-blue-100/90">Compare actual revenue to forecast and keep an eye on delayed shipments.</p>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Monthly revenue</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Actuals vs forecast</p>
            </div>
            <span className="rounded-full border border-white/40 bg-blue-600/80 px-3 py-1 text-xs font-semibold text-white">+18% YoY</span>
          </header>
          <RevenueChart />
        </article>

        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <header>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Weekly fulfillment</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Shipped vs delayed</p>
          </header>
          <FulfillmentChart />
        </article>
      </section>
    </div>
  );
}

function RevenueChart() {
  const height = 220;
  const width = 540;
  const padding = 30;
  const step = (width - padding * 2) / (revenue.length - 1);

  const forecastPoints = revenue
    .map((point, index) => {
      const x = padding + index * step;
      const y = padding + (1 - point.forecast / maxRevenue) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const revenuePoints = revenue
    .map((point, index) => {
      const x = padding + index * step;
      const y = padding + (1 - point.revenue / maxRevenue) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#e4e4e7">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = padding + ratio * (height - padding * 2);
            return <line key={index} x1={padding} y1={y} x2={width - padding} y2={y} strokeDasharray="4 6" strokeWidth={0.8} />;
          })}
        </g>
        <polyline points={forecastPoints} fill="none" stroke="#a855f7" strokeWidth={2} />
        <polyline points={revenuePoints} fill="none" stroke="#2563eb" strokeWidth={3} />
        <polygon
          points={`${forecastPoints} ${width - padding},${height - padding} ${padding},${height - padding}`}
          fill="url(#forecastGradient)"
        />
        <polygon
          points={`${revenuePoints} ${width - padding},${height - padding} ${padding},${height - padding}`}
          fill="url(#revenueGradient)"
        />
        {revenue.map((point, index) => {
          const x = padding + index * step;
          const y = padding + (1 - point.revenue / maxRevenue) * (height - padding * 2);
          return (
            <g key={point.month}>
              <circle cx={x} cy={y} r={4} fill="#2563eb" />
              <text x={x} y={height - 6} textAnchor="middle" className="fill-zinc-500 text-[10px]">
                {point.month}
              </text>
            </g>
          );
        })}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding + ratio * (height - padding * 2);
          const value = maxRevenue - ratio * maxRevenue;
          return (
            <text key={index} x={8} y={y + 4} className="fill-zinc-400 text-[10px]">
              {formatCurrency(value)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function FulfillmentChart() {
  const barWidth = 40;
  const gap = 30;
  const height = 220;
  const padding = 32;
  const width = fulfillment.length * (barWidth * 2 + gap) + padding * 2;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <g stroke="#e4e4e7">
          {[0, 0.5, 1].map((ratio, index) => {
            const y = padding + ratio * (height - padding * 2);
            return <line key={index} x1={padding} y1={y} x2={width - padding} y2={y} strokeDasharray="4 6" strokeWidth={0.8} />;
          })}
        </g>
        {fulfillment.map((point, index) => {
          const xBase = padding + index * (barWidth * 2 + gap);
          const shippedHeight = (point.shipped / maxShipments) * (height - padding * 2);
          const delayedHeight = (point.delayed / maxShipments) * (height - padding * 2);
          return (
            <g key={point.week}>
              <rect
                x={xBase}
                y={height - padding - shippedHeight}
                width={barWidth}
                height={shippedHeight}
                fill="#22c55e"
                rx={6}
              />
              <rect
                x={xBase + barWidth + 8}
                y={height - padding - delayedHeight}
                width={barWidth - 8}
                height={Math.max(delayedHeight, 4)}
                fill="#f97316"
                rx={6}
              />
              <text x={xBase + barWidth / 2} y={height - 6} textAnchor="middle" className="fill-zinc-500 text-[10px]">
                {point.week}
              </text>
            </g>
          );
        })}
        {[0, 0.5, 1].map((ratio, index) => {
          const y = padding + ratio * (height - padding * 2);
          const value = Math.round(maxShipments - ratio * maxShipments);
          return (
            <text key={index} x={8} y={y + 4} className="fill-zinc-400 text-[10px]">
              {value}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
