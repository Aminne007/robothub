import { Link } from "react-router-dom";
import {
  alerts,
  builderProjects,
  overviewMetrics,
  quickActions,
  learningTracks,
  resourceLibrary,
} from "../data/dashboard";
import { cn } from "../lib/cn";

const healthStyles = {
  "on-track": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "at-risk": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
  blocked: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
} as const;

export default function Dashboard() {
  const projectMetrics = overviewMetrics.slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-500 px-8 py-10 text-white shadow-xl dark:border-blue-900/60">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Builder workspace</p>
            <h1 className="text-3xl font-semibold">Deployment command center</h1>
            <p className="max-w-2xl text-sm text-blue-100/90">
              Track projects, coordinate teams, and launch field-ready robotics systems with live telemetry and curated knowledge.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
          >
            Explore catalog
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {projectMetrics.map(metric => (
          <article
            key={metric.id}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{metric.value}</p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{metric.delta}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Active build programs</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Cross-functional collaboration</p>
            </div>
            <Link to="/admin" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              Admin view
            </Link>
          </header>
          <ul className="space-y-3 text-sm">
            {builderProjects.map(project => (
              <li
                key={project.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700"
              >
                <div className="space-y-1">
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</p>
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{project.stage}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300">{project.eta}</p>
                </div>
                <div className="text-right">
                  <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", healthStyles[project.health])}>
                    {project.health.replace("-", " ")}
                  </span>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{project.collaborators} collaborators</p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        <aside className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Quick actions</h2>
          <ul className="space-y-3 text-sm">
            {quickActions.map(action => {
              const isInternal = action.href.startsWith("/");
              const content = (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{action.label}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{action.description}</p>
                  </div>
                  <span aria-hidden className="text-lg">→</span>
                </div>
              );

              return (
                <li key={action.id} className="rounded-xl border border-zinc-200/70 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-zinc-700">
                  {isInternal ? (
                    <Link to={action.href}>{content}</Link>
                  ) : (
                    <a href={action.href}>{content}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Learning tracks</h2>
          <ul className="space-y-3 text-sm">
            {learningTracks.map(track => (
              <li key={track.id} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-700">
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{track.title}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{track.duration}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">{track.level}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Resource library</h2>
          <ul className="space-y-3 text-sm">
            {resourceLibrary.map(resource => (
              <li key={resource.id} className="rounded-xl border border-zinc-200/70 p-4 dark:border-zinc-700">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{resource.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{resource.description}</p>
                <span className="mt-2 inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {resource.type}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Field alerts</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {alerts.map(alert => (
            <li key={alert.id} className="rounded-xl border border-zinc-200/70 p-4 text-sm dark:border-zinc-700">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">{alert.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{alert.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
