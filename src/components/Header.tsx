import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Button className="text-2xl font-bold">Crime Report</Button>
        <div className="space-x-4">
          <Button className="hover:underline">Login</Button>
          <Button className="hover:underline">Register</Button>
          <Button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
            Report Crime
          </Button>
        </div>
      </nav>
    </header>
  );
}
