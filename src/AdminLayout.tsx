import { Outlet } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
import Navbar from "./admin/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
