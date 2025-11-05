import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/cn";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/stats", label: "Stats" },
  { to: "/admin/inventory", label: "Inventory" },
  { to: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="h-fit space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">Admin control</p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Command center</h1>
        {user && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
        )}
      </div>

      <nav className="space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
              )
            }
          >
            <span>{link.label}</span>
            <span aria-hidden>→</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Sign out
      </button>
    </aside>
  );
}
