import { useState } from "react";
import { useForm } from "react-hook-form";

import AccountLayout from "../conponents/account/AccountLayout";
import { useAuth } from "../context/AuthContext";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

type ProfileForm = {
  name: string;
  company?: string;
  phone?: string;
  location?: string;
  bio?: string;
};

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, reset } = useForm<ProfileForm>({
    values: {
      name: user?.name ?? "",
      company: user?.profile.company ?? "",
      phone: user?.profile.phone ?? "",
      location: user?.profile.location ?? "",
      bio: user?.profile.bio ?? "",
    },
  });

  if (!user) return null;

  const onSubmit = (data: ProfileForm) => {
    updateProfile(data);
    setSaved(true);
    reset(data);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AccountLayout
      title="Profile & preferences"
      description="Keep your workspace details current so we can coordinate deliveries, invoicing, and support."
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Contact details</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Update how we reference you across orders and support tickets.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Full name</span>
              <input
                {...register("name")}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Company</span>
              <input
                {...register("company")}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Phone</span>
              <input
                {...register("phone")}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Location</span>
              <input
                {...register("location")}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Bio</span>
            <textarea
              {...register("bio")}
              rows={4}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </label>

          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Save changes
          </button>
          {saved && <p className="text-sm text-emerald-600 dark:text-emerald-400">Profile updated.</p>}
        </form>

        <aside className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Account</h2>
          <dl className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center justify-between">
              <dt className="font-medium text-zinc-700 dark:text-zinc-200">Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-zinc-700 dark:text-zinc-200">Role</dt>
              <dd className="capitalize">{user.role}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-zinc-700 dark:text-zinc-200">Joined</dt>
              <dd>{formatDate(user.joinedAt)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium text-zinc-700 dark:text-zinc-200">Orders</dt>
              <dd>{user.orders.length}</dd>
            </div>
          </dl>
          <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
            Manage two-factor auth and password rotation from the security center (coming soon).
          </div>
        </aside>
      </section>
    </AccountLayout>
  );
}
