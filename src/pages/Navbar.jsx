import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Menu } from "lucide-react";
import theme from "../theme";

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
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 w-full h-16 z-50 backdrop-blur-xl shadow-sm"
        style={{
          backgroundColor: theme.colors.secondary,
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="h-full flex items-center justify-between px-4 md:px-6 lg:px-10">
          
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setIsOpen(true)}>
              <Menu size={22} />
            </button>

            {/* LOGO */}
            <div
              className="text-xl md:text-2xl font-bold"
              style={{
                color: theme.colors.primary,
              }}
            >
              AssetPro
            </div>
          </div>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <li key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className="text-sm font-medium transition"
                    style={{
                      color: isActive
                        ? theme.colors.primary
                        : theme.colors.border,
                    }}
                  >
                    {link.name}
                  </Link>

                  <span
                    className="absolute left-0 -bottom-1 h-0.5 transition-all duration-300"
                    style={{
                      backgroundColor: theme.colors.accent,
                      width: isActive ? "100%" : "0%",
                    }}
                  />
                </li>
              );
            })}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-4 md:gap-5 relative">
            
            {/* NOTIFICATION */}
            <div className="relative hidden sm:block">
              <Bell
                size={20}
                style={{ color: theme.colors.border }}
                className="cursor-pointer transition"
              />
              <span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.colors.error }}
              ></span>
            </div>

            {/* PROFILE */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-semibold shadow-md"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.secondary,
                }}
              >
                H
              </div>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* DROPDOWN */}
            {profileOpen && (
              <div
                className="absolute right-0 top-14 w-48 py-3 shadow-xl"
                style={{
                  backgroundColor: theme.colors.secondary,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.large,
                }}
              >
                <p className="px-4 py-2 cursor-pointer">
                  My Profile
                </p>

                <p className="px-4 py-2 cursor-pointer">
                  Settings
                </p>

                <hr className="my-2" />

                <p
                  onClick={handleLogout}
                  className="px-4 py-2 cursor-pointer"
                  style={{ color: theme.colors.error }}
                >
                  Logout
                </p>
              </div>
            )}

            {/* MOBILE MENU BTN */}
            <button
              className="md:hidden text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-16 right-0 w-64 h-[calc(100vh-4rem)] transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: theme.colors.secondary,
          borderLeft: `1px solid ${theme.colors.border}`,
        }}
      >
        <ul className="flex flex-col py-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-3 text-sm"
                  style={{
                    backgroundColor: isActive
                      ? theme.colors.accent + "20"
                      : "transparent",
                    color: isActive
                      ? theme.colors.accent
                      : theme.colors.primary,
                    borderLeft: isActive
                      ? `4px solid ${theme.colors.accent}`
                      : "none",
                  }}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;