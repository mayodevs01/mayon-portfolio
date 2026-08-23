import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { getRouter } from "./router";

const router = getRouter();

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
