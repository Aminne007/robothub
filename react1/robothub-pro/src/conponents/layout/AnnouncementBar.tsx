import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AnnouncementBar() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative isolate overflow-hidden border-b border-white/20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-sm dark:border-white/10">
      <div className="pointer-events-none absolute inset-y-0 right-[-20%] w-48 rotate-12 bg-white/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 left-[-10%] w-40 -rotate-6 bg-white/10 blur-3xl" aria-hidden />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-2 text-sm sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span aria-hidden className="text-base">
            🚀
          </span>
          <p className="font-medium">
            {t("announcement.title", { defaultValue: "RobotHub Pro just shipped a refreshed control console" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/25"
          >
            {t("announcement.cta", { defaultValue: "Explore upgrades" })}
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="rounded-full border border-white/30 bg-white/10 p-1 text-white transition hover:bg-white/20"
            aria-label={t("announcement.dismiss", { defaultValue: "Dismiss notification" })}
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m5 5 10 10m0-10L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
