import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  Settings,
  Assessment,
  FactCheck,
  Inventory2,
  ExpandMore,
 
} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";


const Sidebar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState("Asset Request");

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard fontSize="small" />,
    },
    {
      name: "Asset Request",
      icon: <Inventory2 fontSize="small" />,
      subMenu: [
        { name: "Request Asset", path: "/assets/requestasset" },
        { name: "View Asset List", path: "/assets/list" },
        // { name: "Status Change", path: "/assets/status-change" },
        { name: "Add Documents", path: "/assets/add-documents" },
        { name: "View Export History", path: "/assets/export" },
        { name: "View Location", path: "/assets/location" },
        { name: "Add Status", path: "/assets/add-status" }
      ],
    },

    {
     name: "Role Management",
     icon: <AdminPanelSettingsIcon fontSize="small" />,
     subMenu: [
      { name: "View Roles", path: "/roles/view" },
      { name: "Create Role", path: "/roles/create" },
    ],
    },
    
    {
      name: "Reports",
      path: "/reports",
      icon: <Assessment fontSize="small" />,
    },
    {
      name: "Auditing",
      path: "/auditing",
      icon: <FactCheck fontSize="small" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings fontSize="small" />,
    },
  ];

  const toggleSubmenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <aside
      className="
        fixed top-16 left-0 z-40
        h-[calc(100vh-4rem)]
        w-20 hover:w-64
        bg-gradient-to-b from-slate-900 to-slate-800
        text-slate-200 border-r border-slate-700 shadow-xl
        transition-all duration-300
        group
        overflow-hidden
      "
    >
      {/* Branding */}
      <div className="px-4 py-5 border-b border-slate-700">
        <h2 className="text-lg font-bold text-white hidden group-hover:block">
          MyCompany
        </h2>
        <p className="text-xs text-slate-400 hidden group-hover:block">
          Asset Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-2 overflow-y-auto h-[calc(100%-80px)]">
        {menuItems.map((item) =>
          item.subMenu ? (
            <div key={item.name}>
              {/* Main Menu */}
              <button
                onClick={() => toggleSubmenu(item.name)}
                className="
                  w-full flex items-center justify-between
                  px-2 group-hover:px-4 py-2.5 rounded-xl
                  hover:bg-slate-700/50 transition
                "
              >
                <div className="flex items-center justify-center group-hover:justify-start gap-3 w-full">
                  {item.icon}
                  <span className="hidden group-hover:inline">
                    {item.name}
                  </span>
                </div>

                {/* Arrow */}
                <ExpandMore
                  className={`hidden group-hover:block transition-transform ${
                    openMenu === item.name
                      ? "rotate-180 text-blue-400"
                      : ""
                  }`}
                />
              </button>

              

              {/* Submenu */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openMenu === item.name
                    ? "max-h-[500px] mt-2"
                    : "max-h-0"
                }`}
              >
                <div className="ml-6 pl-3 border-l border-slate-600 space-y-1">
                  {item.subMenu.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      className={`
                        block px-3 py-2 rounded-lg text-sm transition
                        ${
                          location.pathname === sub.path
                            ? "bg-blue-500/20 text-blue-400 font-semibold"
                            : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                        }
                      `}
                    >
                      <span className="hidden group-hover:inline">
                        {sub.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center justify-center group-hover:justify-start gap-3
                px-2 group-hover:px-4 py-2.5 rounded-xl transition
                ${
                  location.pathname === item.path
                    ? "bg-blue-500/20 text-blue-400 font-semibold"
                    : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
                }
              `}
            >
              {item.icon}
              <span className="hidden group-hover:inline">
                {item.name}
              </span>
            </Link>
          )
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;