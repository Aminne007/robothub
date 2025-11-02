import { useTheme } from "../../context/ThemeContext";

const SunIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <circle cx="10" cy="10" r="3.5" />
    <path d="M10 1.5v2.5M10 16v2.5M3.5 10H1M19 10h-2.5M4.65 4.65 3 3m14 14-1.65-1.65M4.65 15.35 3 17m14-14-1.65 1.65" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path
      d="M16.5 12.25A6.75 6.75 0 0 1 7.75 3.5 6.5 6.5 0 1 0 16.5 12.25Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      onClick={toggle}
      className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-300 bg-white/90 text-zinc-700 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/10 dark:bg-zinc-900/70 dark:text-zinc-200 dark:hover:bg-zinc-900"
      type="button"
      aria-label={label}
      aria-pressed={dark}
      title={label}
    >
      <span
        className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 data-[active=true]:opacity-100"
        data-active={dark}
        aria-hidden
      />
      <span className="grid h-full w-full place-items-center text-base text-blue-600 dark:text-blue-300">
        {dark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
