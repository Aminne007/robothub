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
      className="inline-flex h-10 items-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold uppercase tracking-wide text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      aria-label="Switch language"
      aria-pressed={i18n.language === "ar"}
      title="Switch language"
    >
      {i18n.language.toUpperCase()}
    </button>
  );
}
