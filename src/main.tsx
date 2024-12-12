import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/book",
        element: <div>book page</div>,
      },
      {
        path: "/about",
        element: <div>about</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <div>login</div>,
  },
  {
    path: "/register",
    element: <div>register</div>,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
