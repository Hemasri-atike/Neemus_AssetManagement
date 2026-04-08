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
  Assignment,
  BarChart,
  QrCode
} from "@mui/icons-material";

/** Brand sidebar surface — semi-transparent deep blue */
const SIDEBAR_BG = "#004b80b8";

const roleMenus = {
  "Admin": [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
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
        { name: "Assign Admin&Approver", path: "/assign-role" },
        { name: "Assign Non NRL User", path: "/add-employee" },
        { name: "Assign Asset Class to Department", path: "/add-asset-class" },
        { name: "Assign Dept wise Admin,Auditor", path: "/add/edit" },
        { name: "Hr Finance Master", path: "/assign-buyback-mail" },
        { name: "Dept Master", path: "/view-departments" },
        { name: "Employee Details", path: "/view-employees" },
        { name: "Dept wise Employees", path: "/dept-custodian-list" },
      ],
    },
    {
      name: "Location Master",
      icon: <LocationOn fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "View Location", path: "/assets/location" },
      ],
    },
  ],

  "IT-Admin": [
    {
      name: "Dashboard",
      path: "/it-dashboard",
      icon: <Dashboard fontSize="small" className="text-white/90" />,
    },
    {
      name: "Asset Register",
      icon: <Inventory2 fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "View Assets List", path: "/ViewImportedAssets" },
        { name: "Asset Status Change", path: "/AssetChangeUpdate" },
        { name: "Add Asset Documents", path: "/add-documents" },
        { name: "View Asset Export History", path: "/ExportHistory" },
        { name: "View Asset Location on map", path: "/assets/location" },
      ],
    },
    {
      name: "Asset Requests",
      icon: <Assignment fontSize="small" className="text-white/90" />,
      subMenu: [
        {
          name: "Asset Allocation",
          subMenu: [
            { name: "Approve Allocation of Assets", path: "/AdminViewAssetRequest" },
            { name: "View Allocation of Assets", path: "/ViewAssetRequest" },
          ],
        },
        { name: "Asset Parking", path: "/assets/add-asset" },
        { name: "Custodian Transfer", path: "/ViewAllRequests" },
        { name: "Asset Return", path: "/ViewAllRequests" },
        { name: "Asset Buyback", path: "/ViewAllRequests" },
        { name: "View All Requests", path: "/ViewAllRequests" },
      ],
    },
    {
      name: "Print QR Codes",
      icon: <QrCode fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "QRCodes for Double Sticker", path: "/chatbot" },
        { name: "QRCodes for Single Sticker", path: "/chatbot" },
        { name: "QRCodes for Single Asset", path: "/chatbot" },
        { name: "QRCodes for Asset type", path: "/chatbot" },
        { name: "QRCodes for Asset Create Date", path: "/chatbot" },
      ],
    },
    {
      name: "Asset Auditing",
      icon: <FactCheck fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "Create Audit", path: "/CreateAudit" },
        { name: "Approve Audits Assets", path: "/ApproveAuditedAssets" },
        { name: "Completed Audits", path: "/AuditCompletion" },
        { name: "Edit Audit Assets", path: "/EditAuditedAsset" },
      ],
    },
    {
      name: "View Reports",
      icon: <BarChart fontSize="small" className="text-white/90" />,
      subMenu: [
        { name: "Dashboard", path: "/it-dashboard" },
        { name: "Asset Available", path: "/reports" },
        { name: "Asset Damaged but Repaired", path: "/reports" },
        { name: "Asset Deactivated", path: "/reports" },
        { name: "Asset Available but Damaged", path: "/reports" },
        { name: "Asset Location Transferred", path: "/reports" },
        { name: "Asset by Asset Type", path: "/reports" },
        { name: "Asset by Location", path: "/reports" },
        { name: "Asset by Custodian", path: "/reports" },
        { name: "Asset Documents", path: "/reports" },
      ],
    },
  ],

  "Requester": [
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

  "Approver": [
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
      icon: <LocationOn fontSize="small" className="text-white/90" />,
      path: "/assets/reqloctable",
    },
     {
      name: "Custodian Transfer Requests",
      icon: <LocationOn fontSize="small" className="text-white/90" />,
      path: "/assets/reqcustable",
    },
  ],
};

const labelVisibility = (alwaysShow) =>
  alwaysShow ? "inline" : "hidden md:group-hover:inline";

const Sidebar = ({ mobileOpen = false, onMobileClose }) => {
  const role = localStorage.getItem("role") || "";
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({ "Asset Requests": true, "Asset Allocation": true });

  const menuItems = roleMenus[role] || roleMenus["Requester"] || [];

  const finalMenuItems = [
    ...menuItems,
    {
      name: "Profile",
      path: "/profile",
      icon: <PeopleAlt fontSize="small" className="text-white/90" />,
    },
    {
      name: "Chatbot",
      path: "/chatbot",
      icon: <Assessment fontSize="small" className="text-white/90" />,
    },
  ];

  const toggleSubmenu = (menuName) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const afterNavigate = () => {
    onMobileClose?.();
  };

  const NavItem = ({ item, level = 0, lbl, expandVisible }) => {
    const isOpen = !!openMenus[item.name];
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;
    const indentation = level * 12;

    if (hasSubMenu) {
      return (
        <div key={item.name}>
          <button
            type="button"
            onClick={() => toggleSubmenu(item.name)}
            className="flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-left text-sm text-white/95 transition md:px-2 md:group-hover:px-4 hover:bg-white/10 active:bg-white/15"
            style={{ paddingLeft: level > 0 ? `${indentation + 8}px` : undefined }}
          >
            <div className="flex w-full items-center justify-center gap-3 md:justify-center md:group-hover:justify-start">
              {item.icon || (level > 0 && <div className="w-5" />)}
              <span className={`${lbl} truncate transition-opacity duration-200`}>{item.name}</span>
            </div>
            <ExpandMore
              className={`shrink-0 transition-transform ${expandVisible} ${isOpen ? "rotate-180 text-sky-200" : "text-white/70"}`}
              fontSize="small"
            />
          </button>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "mt-1 max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className={`space-y-0.5 ${level === 0 ? "ml-2 border-l border-white/20 pl-1" : "pl-0"}`}>
              {item.subMenu.map((sub) => (
                <NavItem key={sub.name} item={sub} level={level + 1} lbl={lbl} expandVisible={expandVisible} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    const active = location.pathname === item.path;
    return (
      <Link
        key={item.name}
        to={item.path}
        onClick={afterNavigate}
        className={`flex items-center justify-center gap-3 rounded-xl px-2 py-2.5 text-sm transition md:group-hover:justify-start md:group-hover:px-4 ${active
            ? "bg-white/15 font-semibold text-white ring-1 ring-white/25 shadow-md"
            : "text-white/90 hover:bg-white/10 hover:text-white"
          }`}
        style={{ paddingLeft: level > 0 ? `${indentation + 12}px` : undefined }}
      >
        {item.icon || (level > 0 && <div className="w-5" />)}
        <span className={`${lbl} ${level > 0 ? "whitespace-normal break-words" : "whitespace-nowrap"}`}>{item.name}</span>
      </Link>
    );
  };

  const NavList = ({ alwaysShowLabels }) => {
    const lbl = labelVisibility(alwaysShowLabels);
    const expandVisible = alwaysShowLabels ? "block" : "hidden md:group-hover:block";
    return (
      <div className="space-y-1">
        {finalMenuItems.map((item) => (
          <NavItem key={item.name} item={item} lbl={lbl} expandVisible={expandVisible} />
        ))}
      </div>
    );
  };

  const surfaceClass = "border-r border-white/15 shadow-[0_8px_32px_rgba(0,30,60,0.25)] backdrop-blur-md";

  return (
    <>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => onMobileClose?.()}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 20, 40, 0.45)", backdropFilter: "blur(4px)" },
          "& .MuiDrawer-paper": {
            width: "min(18rem, 88vw)",
            backgroundColor: SIDEBAR_BG,
            backdropFilter: "blur(14px)",
            borderRight: "1px solid rgba(255,255,255,0.12)",
          },
        }}
      >
        <div className={`flex h-full flex-col ${surfaceClass}`} style={{ backgroundColor: SIDEBAR_BG }}>
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-3 sm:px-4">
            <span className="text-sm font-semibold tracking-wide text-white sm:text-base">Navigation</span>
            <IconButton onClick={() => onMobileClose?.()} size="small" sx={{ color: "rgba(255,255,255,0.9)" }}><Close /></IconButton>
          </div>
          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4"><NavList alwaysShowLabels /></nav>
        </div>
      </Drawer>
      <aside className={`group relative z-40 hidden h-[calc(100vh-4rem)] w-14 shrink-0 overflow-hidden transition-all duration-300 ease-out sm:w-16 md:flex md:hover:w-64 md:hover:shadow-xl ${surfaceClass}`} style={{ backgroundColor: SIDEBAR_BG }}>
        <nav className="h-full w-full space-y-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3 md:space-y-2"><NavList alwaysShowLabels={false} /></nav>
      </aside>
    </>
  );
};

export default Sidebar;
