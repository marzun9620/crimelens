import "./App.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

export default function App() {
  // const navigate = useNavigate();

  useEffect(() => {
    // navigate("/home");
  }, []);

  return (
    <main className="bg-background flex flex-col min-h-screen">
      <Outlet />
      <Toaster />
    </main>
  );
}
