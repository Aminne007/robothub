export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 text-sm text-zinc-900 opacity-70 dark:border-zinc-700 dark:text-zinc-100">
      <div className="mx-auto max-w-6xl p-4">
        © {new Date().getFullYear()} RobotHub Pro
      </div>
    </footer>
  );
}
