import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ui/ThemeToggle";
import LangSwitch from "../ui/LangSwitch";
import { cn } from "../../lib/cn";

export default function Navbar() {
  const { dark } = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "block rounded-md px-3 py-2 text-sm font-medium transition",
      isActive
        ? "bg-blue-600/10 text-blue-700 dark:text-blue-300"
        : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-white/5",
    );

  const navigation = [
    { href: "/", label: t("nav.home") },
    { href: "/catalog", label: t("nav.catalog") },
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/cart", label: t("nav.cart") },
    { href: "/admin", label: t("nav.admin") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/80 backdrop-blur transition-colors dark:bg-zinc-900/80",
        dark ? "border-zinc-800" : "border-zinc-200",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {t("brand")}
        </Link>

        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="sr-only">Toggle menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-2">
            {navigation.map(item => (
              <li key={item.href}>
                <NavLink to={item.href} className={linkCls} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              cn(
                "rounded-full border border-blue-600 px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-300 dark:hover:bg-blue-600",
              )
            }
          >
            {t("nav.login")}
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </nav>

      {open && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
          <ul className="space-y-2">
            {navigation.map(item => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={linkCls}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-2 text-sm font-semibold",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/30",
                  )
                }
                onClick={() => setOpen(false)}
              >
                {t("nav.login")}
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
