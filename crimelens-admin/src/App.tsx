import "./App.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <main className="bg-background flex flex-col min-h-screen">
        <Outlet />
        <Toaster />
      </main>
    </main>
  );
}
