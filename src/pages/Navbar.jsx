import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Menu } from "lucide-react";

const Navbar = ({ setIsOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Assets", path: "/assets" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200 shadow-sm">
        <div className="h-full flex items-center justify-between px-4 md:px-6 lg:px-10">
          
          {/* 🔥 Left Section */}
          <div className="flex items-center gap-3">
            
            {/* Sidebar Toggle (Mobile) */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AssetPro
            </div>
          </div>

          {/* 🔥 Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition ${
                    location.pathname === link.path
                      ? "text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>

                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            ))}
          </ul>

          {/* 🔥 Right Section */}
          <div className="flex items-center gap-4 md:gap-5 relative">
            
            {/* Notification */}
            <div className="relative hidden sm:block">
              <Bell className="text-slate-500 hover:text-slate-800 cursor-pointer transition" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>

            {/* Profile */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-md">
                H
              </div>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-14 bg-white rounded-2xl shadow-xl w-48 py-3 border border-slate-200">
                <p className="px-4 py-2 hover:bg-slate-100 cursor-pointer rounded-lg">
                  My Profile
                </p>

                <p className="px-4 py-2 hover:bg-slate-100 cursor-pointer rounded-lg">
                  Settings
                </p>

                <hr className="my-2" />

                <p
                  onClick={handleLogout}
                  className="px-4 py-2 text-red-500 hover:bg-red-50 cursor-pointer rounded-lg"
                >
                  Logout
                </p>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* 🔥 Mobile Menu (Right Slide) */}
      <div
        className={`fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-xl border-l border-slate-200 transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col py-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-6 py-3 text-sm ${
                  location.pathname === link.path
                    ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/*  Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;