import { NavLink } from "react-router-dom";
import { Home, Users, Bell, ShieldAlert, Settings } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { title: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { title: "Users", icon: Users, path: "/admin/users" },
    { title: "Alerts", icon: Bell, path: "/admin/alerts" },
    { title: "Security", icon: ShieldAlert, path: "/admin/security" },
    { title: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 fixed">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <nav className="space-y-4">
        {navItems.map(({ title, icon: Icon, path }) => (
          <NavLink
            key={title}
            to={path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md ${
                isActive ? "bg-blue-500" : "hover:bg-gray-800"
              }`
            }
          >
            <Icon className="w-5 h-5 mr-2" />
            {title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
