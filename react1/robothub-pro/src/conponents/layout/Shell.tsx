import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Shell() {
    return (
      <div className="w-full min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
        <Navbar />
        <main className="flex-1 mx-auto max-w-6xl p-4 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }
  
