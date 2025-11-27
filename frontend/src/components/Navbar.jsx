import React from "react";
import { Menu } from "lucide-react";

export default function Navbar({ setSidebarOpen }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-sm h-14 flex items-center px-4 md:px-6 justify-between">
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={22} />
      </button>

      <h1 className="text-xl font-semibold text-primary">Expense Tracker</h1>

      <button
        onClick={handleLogout}
        className="bg-primary text-white px-3 py-1.5 rounded-md shadow hover:bg-primaryDark"
      >
        Logout
      </button>
    </header>
  );
}
