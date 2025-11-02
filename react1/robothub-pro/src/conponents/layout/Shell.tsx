import { Outlet } from "react-router-dom";

import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Shell() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50 text-zinc-900 transition-colors dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="pointer-events-none absolute inset-x-0 top-[-15rem] z-0 flex justify-center">
        <div className="h-64 w-[40rem] rounded-full bg-blue-200/60 blur-3xl dark:bg-blue-900/40" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <AnnouncementBar />
        <Navbar />
        <main id="main-content" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-10 sm:px-6">
          <div className="relative isolate overflow-hidden rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-zinc-100 backdrop-blur dark:bg-zinc-900/80 dark:ring-white/10 sm:p-8">
            <div className="pointer-events-none absolute inset-x-4 -top-20 h-40 rounded-full bg-gradient-to-b from-blue-100/60 to-transparent blur-2xl dark:from-blue-900/30" aria-hidden />
            <div className="relative z-10">
              <Outlet />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
