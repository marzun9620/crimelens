import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error/error";
import { ThemeProvider } from "./components/theme-provider";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    ),
    children: [
      {
        path: "home",
        element: <div>Hello</div>,
        children: [],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export { router };
