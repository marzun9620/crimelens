import "./App.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  // const navigate = useNavigate();

  useEffect(() => {
    // navigate("/home");
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </main>
  );
}
