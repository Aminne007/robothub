import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/cn";

const accountLinks = [
  { to: "/dashboard", label: "Overview" },
  { to: "/orders", label: "Orders" },
  { to: "/profile", label: "Profile" },
];

type AccountLayoutProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function AccountLayout({ title, description, actions, children }: AccountLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-500 px-8 py-10 text-white shadow-lg dark:border-blue-900/70">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
              {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Account"}
            </p>
            <h1 className="text-3xl font-semibold">{title}</h1>
            <p className="max-w-2xl text-sm text-blue-100/90">{description}</p>
          </div>
          {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
        </div>
      </section>

      <nav className="flex flex-wrap items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {accountLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <section className="space-y-6">{children}</section>
    </div>
  );
}
