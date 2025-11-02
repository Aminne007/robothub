import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/cn";
import LangSwitch from "../ui/LangSwitch";
import ThemeToggle from "../ui/ThemeToggle";

type NavItem = {
  href: string;
  label: string;
};

export default function Navbar() {
  const { dark } = useTheme();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigation = useMemo<NavItem[]>(() => {
    if (!user) {
      return [
        { href: "/", label: t("nav.home") },
        { href: "/catalog", label: t("nav.catalog") },
        { href: "/dashboard", label: t("nav.dashboard") },
      ];
    }

    if (user.role === "admin") {
      return [
        { href: "/", label: t("nav.home") },
        { href: "/catalog", label: t("nav.catalog") },
        { href: "/admin", label: t("nav.admin") },
        { href: "/admin/stats", label: "Stats" },
        { href: "/admin/inventory", label: "Inventory" },
        { href: "/admin/users", label: "Users" },
      ];
    }

    return [
      { href: "/", label: t("nav.home") },
      { href: "/catalog", label: t("nav.catalog") },
      { href: "/dashboard", label: t("nav.dashboard") },
      { href: "/orders", label: t("orders.title", { defaultValue: "Orders" }) },
      { href: "/cart", label: t("nav.cart") },
    ];
  }, [t, user]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition",
      isActive
        ? "bg-blue-600/15 text-blue-700 shadow-sm ring-1 ring-blue-500/10 dark:bg-blue-500/20 dark:text-blue-200"
        : "text-zinc-700 hover:bg-white hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-white/10",
    );

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const renderNavLink = (item: NavItem) => (
    <NavLink key={item.href} to={item.href} className={navLinkClass} onClick={() => setOpen(false)}>
      {item.label}
    </NavLink>
  );

  const userInitial = user?.name?.charAt(0)?.toUpperCase();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 backdrop-blur transition-all",
        scrolled
          ? cn(
              "bg-white/90 shadow-lg dark:bg-zinc-950/80",
              dark ? "border-b border-white/10" : "border-b border-zinc-200",
            )
          : "border-b border-transparent bg-white/70 dark:bg-zinc-950/70",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 transition hover:text-blue-700 dark:text-zinc-100"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-semibold text-white shadow-sm">
              RH
            </span>
            {t("brand")}
          </Link>
          <span className="hidden rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-200 md:inline-flex">
            {t("nav.beta", { defaultValue: "Early access" })}
          </span>
        </div>

        <div className="hidden items-center gap-1 rounded-full border border-zinc-200/70 bg-white/70 p-1 shadow-sm ring-1 ring-white/60 dark:border-white/10 dark:bg-zinc-900/60 dark:ring-white/5 md:flex">
          {navigation.map(renderNavLink)}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <LangSwitch />
            <ThemeToggle />
          </div>

          {user ? (
            <div className="hidden items-center gap-3 md:flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {userInitial}
                </span>
                {user.role === "admin" ? "Admin" : t("nav.dashboard")}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/10"
              >
                {t("nav.logout", { defaultValue: "Logout" })}
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <NavLink to="/login" className={navLinkClass}>
                {t("nav.login")}
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110",
                    isActive && "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900",
                  )
                }
              >
                {t("nav.register", { defaultValue: "Register" })}
              </NavLink>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen(prev => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-zinc-200 bg-white/95 px-4 py-4 shadow-lg dark:border-white/10 dark:bg-zinc-900/95 md:hidden">
          <div className="flex flex-col gap-3">
            {navigation.map(renderNavLink)}
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/10"
              >
                {t("nav.logout", { defaultValue: "Logout" })}
              </button>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass} onClick={() => setOpen(false)}>
                  {t("nav.login")}
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110",
                      isActive && "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900",
                    )
                  }
                  onClick={() => setOpen(false)}
                >
                  {t("nav.register", { defaultValue: "Register" })}
                </NavLink>
              </>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
