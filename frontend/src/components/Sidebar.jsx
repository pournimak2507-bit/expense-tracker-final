import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg font-medium ${
    isActive
      ? "bg-indigo-600 text-white shadow"
      : "text-gray-900 hover:bg-white/40"
  }`;

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white/20 backdrop-blur-xl p-4 shadow-xl">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Menu</h2>

      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/set-income" className={linkClass}>
          Set Income
        </NavLink>
        <NavLink to="/categories" className={linkClass}>
          Categories
        </NavLink>
        <NavLink to="/budget" className={linkClass}>
          Budget
        </NavLink>
        <NavLink to="/saving-goals" className={linkClass}>
          Saving Goals
        </NavLink>
        <NavLink to="/expenses" className={linkClass}>
          Expenses
        </NavLink>
      </nav>
    </aside>
  );
}
