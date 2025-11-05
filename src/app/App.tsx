import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shell from "../conponents/layout/Shell";
import { routes } from "./routes";

const router = createBrowserRouter([{ element: <Shell />, children: routes }]);

export default function App() {
  return <RouterProvider router={router} />;
}
