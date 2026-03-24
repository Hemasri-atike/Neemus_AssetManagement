import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      
      {/* Navbar */}
      <Navbar />

      {/* Layout */}
      <div className="flex">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          className="
            flex-1
            mt-16
            ml-24
            p-6
            min-h-screen
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;