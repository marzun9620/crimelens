import { createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import App from "./App";
import ErrorPage from "./pages/error/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    ),
    errorElement: <ErrorPage />,
  },
]);

export { router };
