import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { href: "/catalog", label: "Catalog" },
    { href: "/dashboard", label: "Dashboards" },
    { href: "/product/mcu-esp32-devkit", label: "Developer kits" },
  ],
  company: [
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Careers" },
  ],
  resources: [
    { href: "#", label: "Playbooks" },
    { href: "#", label: "Community" },
    { href: "#", label: "Support" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white/80 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">RobotHub Pro</h2>
            <p className="text-sm leading-relaxed">
              Robotics commerce, deployment dashboards, and community expertise packaged for teams shipping machines to the real world.
            </p>
            <form className="flex max-w-sm gap-2">
              <label htmlFor="newsletter" className="sr-only">
                Join newsletter
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              />
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Product</h3>
              <ul className="mt-3 space-y-2">
                {footerLinks.product.map(link => (
                  <li key={link.href}>
                    <Link className="transition hover:text-blue-600 dark:hover:text-blue-400" to={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Company</h3>
              <ul className="mt-3 space-y-2">
                {footerLinks.company.map(link => (
                  <li key={link.href}>
                    <a className="transition hover:text-blue-600 dark:hover:text-blue-400" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Resources</h3>
              <ul className="mt-3 space-y-2">
                {footerLinks.resources.map(link => (
                  <li key={link.href}>
                    <a className="transition hover:text-blue-600 dark:hover:text-blue-400" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RobotHub Pro. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a className="hover:text-blue-600 dark:hover:text-blue-400" href="#">
              Privacy
            </a>
            <a className="hover:text-blue-600 dark:hover:text-blue-400" href="#">
              Terms
            </a>
            <a className="hover:text-blue-600 dark:hover:text-blue-400" href="#">
              System status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
