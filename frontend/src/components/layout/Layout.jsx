import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
