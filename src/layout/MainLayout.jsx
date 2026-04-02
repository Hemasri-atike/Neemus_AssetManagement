import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import SupportChat from "../support/SupportChat";

const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar onMenuClick={() => setMobileSidebarOpen(true)} />

      <div className="flex min-h-[calc(100vh-4rem)] pt-16">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-5 md:p-6">
          <Outlet />
        </main>
      </div>
      <SupportChat />
    </div>
  );
};

export default MainLayout;