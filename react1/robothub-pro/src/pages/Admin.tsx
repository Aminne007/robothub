import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const { user, logout } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded bg-white dark:bg-zinc-900">
      <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <button
        onClick={logout}
        className="mt-4 rounded-md bg-red-600 hover:bg-red-700 text-white px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}
