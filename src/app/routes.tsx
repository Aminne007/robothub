import { type RouteObject } from "react-router-dom";

import ProtectedRoute from "../conponents/router/ProtectedRoute";
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminHome from "../pages/admin/AdminHome";
import AdminStats from "../pages/admin/AdminStats";
import AdminInventory from "../pages/admin/AdminInventory";
import AdminUsers from "../pages/admin/AdminUsers";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/catalog", element: <Catalog /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/cart",
    element: (
      <ProtectedRoute allowed={["user", "admin"]}>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowed={["user", "admin"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute allowed={["user", "admin"]}>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowed={["user", "admin"]}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowed={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: "stats", element: <AdminStats /> },
      { path: "inventory", element: <AdminInventory /> },
      { path: "users", element: <AdminUsers /> },
    ],
  },
];
