import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error/error";
import { ThemeProvider } from "./components/theme-provider";
import App from "./App";
import Login from "./pages/auth/login/Login";
import ReportCrime from "./pages/report/CrimeReport";

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
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "report",
        element: <ReportCrime />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export { router };
