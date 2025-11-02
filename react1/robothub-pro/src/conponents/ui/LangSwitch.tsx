import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useRTL } from "../../hooks/useRTL";

export default function LangSwitch() {
    const { i18n } = useTranslation();

    // Apply RTL/LTR on language change
    useRTL(i18n.language);

    // Persist language to localStorage and restore on load
    useEffect(() => {
        const saved = localStorage.getItem("lang");
        if (saved && saved !== i18n.language) {
            i18n.changeLanguage(saved);
        }
    }, [i18n]);

    useEffect(() => {
        localStorage.setItem("lang", i18n.language);
    }, [i18n.language]);

    const toggle = () => {
        const next = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(next);
    };

    return (
        <button
            onClick={toggle}
            className="rounded-md px-3 py-1 text-sm font-medium border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200"
            aria-label="Switch language"
            title="Switch language"
        >
            {i18n.language.toUpperCase()}
        </button>
    );
}
