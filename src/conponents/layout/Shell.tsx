import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Shell() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 transition-colors dark:bg-zinc-900 dark:text-zinc-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
