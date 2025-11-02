import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import ThemeToggle from "../ui/ThemeToggle";
import LangSwitch from "../ui/LangSwitch";

export default function Navbar() {
  const { dark } = useTheme();
  const { t } = useTranslation();

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "text-blue-600 dark:text-blue-400" 
      : "text-zinc-900 dark:text-zinc-100 opacity-80 hover:opacity-100";

  return (
    <header className={`border-b ${dark ? "border-zinc-700" : "border-zinc-200"} bg-white/70 dark:bg-zinc-900/70 backdrop-blur`}>
      <nav className="mx-auto max-w-6xl flex items-center justify-between p-4">
        <div className="font-bold text-xl text-zinc-900 dark:text-zinc-100">{t("brand")}</div>

        <ul className="flex items-center gap-4">
          <li><NavLink to="/" className={linkCls}>{t("nav.home")}</NavLink></li>
          <li><NavLink to="/catalog" className={linkCls}>{t("nav.catalog")}</NavLink></li>
          <li><NavLink to="/cart" className={linkCls}>{t("nav.cart")}</NavLink></li>
          <li><NavLink to="/admin" className={linkCls}>{t("nav.admin")}</NavLink></li>
          <li><NavLink to="/login" className={linkCls}>{t("nav.login")}</NavLink></li>
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
