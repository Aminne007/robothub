import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="rounded border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-sm transition-colors bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700"
    >
      {dark ? "🌙 " : "☀️ "}
    </button>
  );
}
