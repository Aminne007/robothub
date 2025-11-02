import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <AdminSidebar />
      <section className="space-y-6">
        <Outlet />
      </section>
    </div>
  );
}
