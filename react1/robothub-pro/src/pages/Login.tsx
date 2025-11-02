import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import RoleRedirect from "../conponents/router/RoleRedirect";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { t } = useTranslation();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const schema = z.object({
    email: z.string().email(t("login.invalid")),
    password: z.string().min(6, t("login.invalid")),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (user) {
    return <RoleRedirect />;
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      const session = await login(data.email, data.password);
      const redirectFromState = (location.state as { from?: { pathname: string } } | undefined)?.from?.pathname;
      const fallback = session.role === "admin" ? "/admin" : "/dashboard";
      navigate(redirectFromState ?? fallback, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("login.invalid"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-md space-y-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <header className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("login.title")}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Sign in to manage dashboards, orders, and admin analytics.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="email">
            {t("login.email")}
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="password">
            {t("login.password")}
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t("login.loading", { defaultValue: "..." }) : t("login.submit")}
        </button>
      </form>

      <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        <p className="font-semibold">Demo credentials</p>
        <p className="mt-1">Admin → admin@robothub.com / admin123</p>
        <p>User → amelia@builders.dev / user123</p>
      </div>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        New to RobotHub? <a href="/register" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">Create an account</a>.
      </p>
    </div>
  );
}
