import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import {
  Assessment,
  AssignmentTurnedIn,
  Close,
  Dashboard,
  ExpandMore,
  FactCheck,
  Inventory2,
  KeyboardReturn,
  LocationOn,
  PeopleAlt,
  Settings,
  ShoppingCart,
} from "@mui/icons-material";

/** Brand sidebar surface — semi-transparent deep blue */
const SIDEBAR_BG = "#004b80b8";

const roleMenus = {
  Admin: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard fontSize="small" className="text-white/90" />,
    },
    {
      name: "Asset Register",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "View Assets", path: "/assets/list" },
        { name: "Add Asset", path: "/assets/add-asset" },
      ],
    },
    {
      name: "Masters",
      icon: <Settings fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "Roles", path: "/roles/view" },
        { name: "Create Role", path: "/roles/create" },
        { name: "Custodians", path: "/custodian/view" },
      ],
    },
  ],

  "IT Admin": [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard fontSize="small" className="text-white/90" />,
    },
    {
      name: "Asset Request",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
      subMenu: [{ name: "Request Asset", path: "/assets/request-access" }],
    },
    {
      name: "Asset Register",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "View Assets", path: "/assets/list" },
        { name: "Add Asset", path: "/assets/add-asset" },
      ],
    },
    {
      name: "Print QR Codes",
      icon: <FactCheck fontSize="small" className="text-white/90" />,
      path: "/assets/print-qr",
    },
    {
      name: "Asset Auditing",
      icon: <Assessment fontSize="small" className="text-white/90" />,
      path: "/assets/auditing",
    },
    {
      name: "Audit Reports",
      icon: <Assessment fontSize="small" className="text-white/90" />,
      path: "/assets/audit-reports",
    },
    {
      name: "View Reports",
      icon: <Assessment fontSize="small" className="text-white/90" />,
      path: "/reports",
    },
  ],

  "HR Admin": [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard fontSize="small" className="text-white/90" />,
    },
    {
      name: "Asset Request",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
      subMenu: [{ name: "Request Asset", path: "/assets/request-access" }],
    },
    {
      name: "Asset Register",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "View Assets", path: "/assets/list" },
        { name: "Add Asset", path: "/assets/add-asset" },
      ],
    },
    {
      name: "Print QR Codes",
      icon: <FactCheck fontSize="small" className="text-white/90" />,
      path: "/assets/print-qr",
    },
    {
      name: "Asset Auditing",
      icon: <Assessment fontSize="small" className="text-white/90" />,
      path: "/assets/auditing",
    },
    {
      name: "Audit Reports",
      icon: <Assessment fontSize="small" className="text-white/90" />,
      path: "/assets/audit-reports",
    },
    {
      name: "View Reports",
      icon: <Assessment fontSize="small" className="text-white/90" />,
      path: "/reports",
    },
  ],

  Requester: [
    {
      name: "Dashboard",
      path: "/requestor-dashboard",
      icon: <Dashboard fontSize="small" className="text-white/90" />,
    },
    {
      name: "View Allocated Assets",
      path: "/allocatedassets",
      icon: <AssignmentTurnedIn fontSize="small" className="text-white/90" />,
    },
    {
      name: "Request Asset",
      path: "/assets/request-access",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
    },
    {
      name: "Buyback",
      path: "/assets/buyback",
      icon: <ShoppingCart fontSize="small" className="text-white/90" />,
    },
    {
      name: "Location Transfer",
      path: "/assets/location-transfer",
      icon: <LocationOn fontSize="small" className="text-white/90" />,
    },
    {
      name: "Custodian Transfer",
      path: "/assets/custodian-transfer",
      icon: <PeopleAlt fontSize="small" className="text-white/90" />,
    },
    {
      name: "Asset Return",
      path: "/assets/asset-return",
      icon: <KeyboardReturn fontSize="small" className="text-white/90" />,
    },
  ],

  Auditor: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Dashboard fontSize="small" className="text-white/90" />,
    },
    {
      name: "Audits",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "View Audits", path: "/audits/view" },
        { name: "Asset Audits", path: "/assets/request-access" },
        { name: "Edit Audit Assets", path: "/assets/edit-audit-assets" },
        { name: "Audit wise status", path: "/assets/audit-wise-status" },
        { name: "Assets by Audits", path: "/assets/by-audits" },
      ],
    },
  ],

  Approver: [
    {
      name: "Dashboard",
      path: "/approver-dashboard",
      icon: <Dashboard fontSize="small" className="text-white/90" />,
    },
    {
      name: "Asset Requests",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
      path: "/assets/reqassettable",
    },
    {
      name: "Location Transfer Requests",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
    path: "/assets/reqloctable",
    },
    {
      name: "Custodian Transfer Requests",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
   path: "/assets/custodian-transfer-requests",
    },
  ],
};

const labelVisibility = (alwaysShow) =>
  alwaysShow ? "inline" : "hidden md:group-hover:inline";

const Sidebar = ({ mobileOpen = false, onMobileClose }) => {
  const role = localStorage.getItem("role") || "";
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState("Asset Request");

  const menuItems = roleMenus[role] || roleMenus["Requester"] || [];

  const finalMenuItems = [
    ...menuItems,
    {
      name: "Chatbot",
      path: "/chatbot",
      icon: <Assessment fontSize="small" className="text-white/90" />,
    },
  ];

  const toggleSubmenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const afterNavigate = () => {
    onMobileClose?.();
  };

  const NavList = ({ alwaysShowLabels }) => {
    const lbl = labelVisibility(alwaysShowLabels);
    const expandVisible = alwaysShowLabels ? "block" : "hidden md:group-hover:block";

    return (
      <div className="space-y-1">
        {finalMenuItems.map((item) =>
          item.subMenu ? (
            <div key={item.name}>
              <button
                type="button"
                onClick={() => toggleSubmenu(item.name)}
                className="flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-left text-sm text-white/95 transition md:px-2 md:group-hover:px-4 hover:bg-white/10 active:bg-white/15"
              >
                <div className="flex w-full items-center justify-center gap-3 md:justify-center md:group-hover:justify-start">
                  {item.icon}
                  <span className={`${lbl} truncate transition-opacity duration-200`}>{item.name}</span>
                </div>
                <ExpandMore
                  className={`shrink-0 transition-transform ${expandVisible} ${
                    openMenu === item.name ? "rotate-180 text-sky-200" : "text-white/70"
                  }`}
                  fontSize="small"
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openMenu === item.name ? "mt-1 max-h-[min(60vh,500px)] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-2 space-y-0.5 border-l border-white/20 pl-3 sm:ml-4 sm:pl-3">
                  {item.subMenu.map((sub) => {
                    const active = location.pathname === sub.path;
                    return (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={afterNavigate}
                        className={`block rounded-lg px-3 py-2.5 text-sm transition sm:py-2 ${
                          active
                            ? "bg-white/15 font-semibold text-white shadow-inner ring-1 ring-white/20"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className={`${lbl} whitespace-normal break-words`}>{sub.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              onClick={afterNavigate}
              className={`flex items-center justify-center gap-3 rounded-xl px-2 py-2.5 text-sm transition md:group-hover:justify-start md:group-hover:px-4 ${
                location.pathname === item.path
                  ? "bg-white/15 font-semibold text-white ring-1 ring-white/25 shadow-md"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              <span className={`${lbl} whitespace-nowrap`}>{item.name}</span>
            </Link>
          )
        )}
      </div>
    );
  };

  const surfaceClass =
    "border-r border-white/15 shadow-[0_8px_32px_rgba(0,30,60,0.25)] backdrop-blur-md";

  return (
    <>
      {/* Mobile: MUI Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => onMobileClose?.()}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 20, 40, 0.45)",
            backdropFilter: "blur(4px)",
          },
          "& .MuiDrawer-paper": {
            width: "min(18rem, 88vw)",
            maxWidth: "100%",
            backgroundColor: SIDEBAR_BG,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRight: "1px solid rgba(255,255,255,0.12)",
            boxSizing: "border-box",
          },
        }}
      >
        <div
          className={`flex h-full flex-col ${surfaceClass}`}
          style={{ backgroundColor: SIDEBAR_BG }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-3 sm:px-4">
            <span className="text-sm font-semibold tracking-wide text-white sm:text-base">Navigation</span>
            <IconButton
              onClick={() => onMobileClose?.()}
              aria-label="Close menu"
              size="small"
              sx={{ color: "rgba(255,255,255,0.9)" }}
            >
              <Close />
            </IconButton>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
            <NavList alwaysShowLabels />
          </nav>
        </div>
      </Drawer>

      {/* md+: rail sidebar — width animates on hover, pushes main content */}
      <aside
        className={`group relative z-40 hidden h-[calc(100vh-4rem)] w-14 shrink-0 overflow-hidden transition-all duration-300 ease-out sm:w-16 md:flex md:hover:w-64 md:hover:shadow-xl ${surfaceClass}`}
        style={{ backgroundColor: SIDEBAR_BG }}
      >
        <nav className="h-full w-full space-y-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3 scrollbar-hide md:space-y-2">
          <NavList alwaysShowLabels={false} />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
