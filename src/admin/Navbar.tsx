import { Bell, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-900 text-white flex justify-between p-4">
      <h2 className="text-lg font-bold">Admin Dashboard</h2>
      <div className="flex gap-4">
        <Link to="/admin/alerts">
          <Bell size={24} className="text-gray-400 hover:text-white" />
        </Link>
        <button className="text-red-400 hover:text-white">
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
