import type { ChangeEvent } from "react";

import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { accounts, updateAccountRole, toggleAccountStatus, user } = useAuth();

  const handleRoleChange = (id: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    updateAccountRole(id, event.target.value as "user" | "admin");
  };

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 px-8 py-10 text-white shadow-lg dark:border-blue-900/70">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">User management</p>
          <h2 className="text-3xl font-semibold">Roles & account access</h2>
          <p className="text-sm text-blue-100/90">Promote builders to admins or suspend accounts with a single action.</p>
        </div>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Workspace members</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{accounts.length} total accounts</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {accounts.map(account => {
                const isCurrentUser = account.id === user?.id;
                return (
                  <tr key={account.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{account.name}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{account.email}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      <select
                        onChange={handleRoleChange(account.id)}
                        value={account.role}
                        disabled={isCurrentUser}
                        className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 capitalize text-zinc-600 dark:text-zinc-300">{account.status}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        disabled={isCurrentUser}
                        onClick={() => toggleAccountStatus(account.id)}
                        className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      >
                        {account.status === "active" ? "Disable" : "Reinstate"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
