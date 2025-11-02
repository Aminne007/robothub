import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useRTL } from "../../hooks/useRTL";

const STORAGE_KEY = "lang";

export default function LangSwitch() {
  const { i18n } = useTranslation();

  useRTL(i18n.language);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, [i18n]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, i18n.language);
  }, [i18n.language]);

  const toggle = () => {
    const next = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-md px-3 py-1 text-sm font-medium border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200"
      aria-label="Switch language"
      aria-pressed={i18n.language === "ar"}
      title="Switch language"
    >
      {i18n.language.toUpperCase()}
    </button>
  );
}
