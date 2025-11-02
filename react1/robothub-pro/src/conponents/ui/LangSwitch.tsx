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
      className="inline-flex h-10 items-center justify-center gap-1 rounded-full border border-zinc-300 bg-white/90 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-800 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:bg-zinc-900"
      aria-label="Switch language"
      aria-pressed={i18n.language === "ar"}
      title="Switch language"
    >
      <span className="text-[0.65rem]">{i18n.language.toUpperCase()}</span>
      <span aria-hidden className="text-zinc-400">|</span>
      <span className="text-[0.65rem]">{i18n.language === "en" ? "AR" : "EN"}</span>
    </button>
  );
}
