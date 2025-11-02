import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation(); // ✅ hook inside component
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ schema created inside so `t` can translate messages
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

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError("");
      await login(data.email, data.password);
      alert(t("login.success"));
    } catch {
      setError(t("login.invalid"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg bg-white dark:bg-zinc-900">
      <h1 className="text-2xl font-bold mb-4">{t("Login.title")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">{t("Login.email")}</label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-zinc-50 dark:bg-zinc-800"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">{t("Login.password")}</label>
          <input
            {...register("password")}
            type="password"
            className="w-full rounded border border-zinc-300 dark:border-zinc-700 px-3 py-2 bg-zinc-50 dark:bg-zinc-800"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white py-2 transition disabled:opacity-60"
        >
          {loading ? t("login.loading", { defaultValue: "..." }) : t("Login.submit")}
        </button>
      </form>
    </div>
  );
}
