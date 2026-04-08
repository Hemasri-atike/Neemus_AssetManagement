import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ✅ Layout & Auth
import MainLayout from "./layout/Mainlayout";
import Login from "./pages/login/Login";
import Profile from "./pages/login/Profile";
import Password from "./pages/login/Password";
import Chatbot from "./chatbot/Chatbot";

// ✅ Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import ItDashboard from "./pages/ItDashboard";
import HrDashboard from "./pages/HrDashboard";
import ApproverDashboard from "./pages/ApproverDashboard";
import AuditorDashboard from "./pages/AuditorDashboard";
import CustodianDashboard from "./pages/CustodianDashboard";
import RequestorDashboard from "./pages/RequestorDashboard";
import Dashboard from "./components/dashboard/Dashboard"; // Fallback

// ✅ IT Admin Components
import AssetList from "./components/itadmin/AssetList";
import AssetChangeUpdate from "./components/itadmin/AssetChangeUpdate";
import AddDocuments from "./components/dashboard/AddDocuments";
import ApprovedAllocation from "./components/itadmin/ApprovedAllocation";// This might be redundant now with Req/ApprovedAllocation
import ReqAllocation from "./components/itadmin/ReqAllocation";

import CreateAudit from "./components/itadmin/CreateAudit";
import ApproveAuditedAssets from "./components/itadmin/ApproveAuditedAssets";
import EditAuditedAsset from "./components/itadmin/EditAuditedAsset";
import AuditCompletion from "./components/itadmin/AuditCompletion";

// ✅ IT Admin Tables
import ItReqAssetTable from "./components/tables/itadmin/itReqAssetTable";
import ApprovedRequestedAssets from "./components/tables/itadmin/ApprovedRequestedAssets";
import RejectedRequestedAssets from "./components/tables/itadmin/RejectedRequestedAssets";
import ApprovedAssetTable from "./components/tables/itadmin/ApprovedAssetTable";
import ViewAllRequests from "./components/tables/itadmin/ViewAllRequests";
import AssetExportHistory from "./components/tables/AssetExportHistory";
import StatusChange from "./components/tables/StatusChange";
import ITCreateAudit from "./components/tables/ITCreateAudit";
import ITApproveAuditedAssets from "./components/tables/ITApproveAuditedAssets";
import ITAddApproveAuditedAssets from "./components/tables/ITAddApproveAuditedAssets";
import ITEditAuditedAsset from "./components/tables/ITEditAuditedAsset";
import ITAuditCompletion from "./components/tables/ITAuditCompletion";

// ✅ Admin Components
import AssignRole from "./components/admin/AssignRole";
import AddEmployee from "./components/admin/AddEmployee";
import AssetClassMapping from "./components/admin/AssetClassMapping";
import BuyBackMailAssign from "./components/admin/BuyBackMailAssign";
import DeptCustodianlist from "./components/admin/DeptCustodianlist";
import ViewDept from "./components/admin/ViewDept";
import ViewEmpDetails from "./components/admin/ViewEmpDetails";
import AddAssetClass from "./components/admin/AddAssetClass";
import Assets from "./components/assetmanagement/Assets";
import AddAsset from "./components/assetmanagement/AddAsset";
import Location from "./components/dashboard/Location";
import RequestAccess from "./components/dashboard/RequestAsset";
import Reports from "./components/dashboard/Reports";

// ✅ Admin Tables
import AssignEmproletable from "./components/tables/AssignEmproletable";
import AddnonNrluser from "./components/tables/AddnonNrluser";
import AdAssetClass from "./components/tables/AdAssetClass";
import AssetClassmaptable from "./components/tables/AssetClassmaptable";
import Hrassigntable from "./components/tables/Hrassigntable";

// ✅ Approver Components
import ApproverAsset from "./components/Approver/ApproverAsset";
import ApproverLocTransfer from "./components/Approver/ApproverLocTransfer";
import ApproverCustTransfer from "./components/Approver/ApproverCustTransfer";
import LoctransferReq from "./components/Approver/views/LoctransferReq";
import CustTransferDetails from "./components/Approver/views/CustTransferDetails";
import ApprovedAssetList from "./components/tables/ApprovedAssetList";

// ✅ Auditor Components
import ViewAudits from "./components/auditor/ViewAudits";
import AssetAudit from "./components/auditor/AssetAudit";
import EditAuditAsset from "./components/auditor/EditAuditAsset";
import AuditWiseStatus from "./components/auditor/AuditWiseStatus";
import AssetByAudit from "./components/auditor/AssetByAudit";
import AudAssetAudit from "./components/tables/AudAssetAudit";
import AudByAsset from "./components/tables/AudByAsset";
import AudEditAsset from "./components/tables/AudEditAsset";
import AudWiseStatus from "./components/tables/AudWiseStatus";

// ✅ Requester & Custodian
import AllocatedAssets from "./components/Requestor/AllocatedAssets";
import ReqAssetTable from "./components/tables/ReqAssetTable";
import ReqBuyback from "./components/Requestor/ReqBuyback";
import LocationTransfer from "./components/Requestor/LocationTransfer";
import CustodianTranfer from "./components/Requestor/CustodianTranfer";
import AssetReturn from "./components/Requestor/AssetReturn";
import ReqBuyBackTable from "./components/tables/ReqBuyBackTable";
import ReqLocTable from "./components/tables/ReqLocTable";
import ReqCustodianTable from "./components/tables/ReqCustodianTable";
import Custodian from "./components/custodian/Custodian";
import AddCustodian from "./components/custodian/AddCustodian";
import EditCustodian from "./components/custodian/EditCustodian";


import AssetStatusChange from "./components/assetmanagement/AssetStatusChange";
import AddStatus from "./components/assetmanagement/AddStatus";

// ✅ Leaflet CSS
import "../src/leafletconfig";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Protected Route (Login check)
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  // ✅ Role-Based Route
  const RoleRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem("role");
    if (!isLoggedIn) return <Navigate to="/" />;
    return allowedRoles.includes(role) ? children : <Navigate to="/dashboard" />;
  };

  return (
    <Router>
      <Routes>
        {/* ✅ Login */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* ✅ Protected Layout Wrapper */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          
          {/* 👑 ADMIN Routes */}
          <Route path="/admin-dashboard" element={<RoleRoute allowedRoles={["Admin"]}><AdminDashboard /></RoleRoute>} />
          <Route path="/assign-role" element={<RoleRoute allowedRoles={["Admin"]}><AssignRole /></RoleRoute>} />
          <Route path="/add-employee" element={<RoleRoute allowedRoles={["Admin"]}><AddEmployee /></RoleRoute>} />
          <Route path="/add-asset-class" element={<RoleRoute allowedRoles={["Admin"]}><AddAssetClass /></RoleRoute>} />
          <Route path="/add/edit" element={<RoleRoute allowedRoles={["Admin"]}><AssetClassMapping /></RoleRoute>} />
          <Route path="/assign-buyback-mail" element={<RoleRoute allowedRoles={["Admin"]}><BuyBackMailAssign /></RoleRoute>} />
          <Route path="/view-departments" element={<RoleRoute allowedRoles={["Admin"]}><ViewDept /></RoleRoute>} />
          <Route path="/view-employees" element={<RoleRoute allowedRoles={["Admin"]}><ViewEmpDetails /></RoleRoute>} />
          <Route path="/dept-custodian-list" element={<RoleRoute allowedRoles={["Admin"]}><DeptCustodianlist /></RoleRoute>} />
          <Route path="/assign-role-table" element={<RoleRoute allowedRoles={["Admin"]}><AssignEmproletable /></RoleRoute>} />
          <Route path="/add-non-nrl-user" element={<RoleRoute allowedRoles={["Admin"]}><AddnonNrluser /></RoleRoute>} />
          <Route path="/add-asset-class-table" element={<RoleRoute allowedRoles={["Admin"]}><AdAssetClass /></RoleRoute>} />
          <Route path="/assetclass-mapping-table" element={<RoleRoute allowedRoles={["Admin"]}><AssetClassmaptable /></RoleRoute>} />
          <Route path="/hr-assign-table" element={<RoleRoute allowedRoles={["Admin"]}><Hrassigntable /></RoleRoute>} />

          {/* 💻 IT-ADMIN Routes */}
          <Route path="/it-dashboard" element={<RoleRoute allowedRoles={["IT-Admin"]}><ItDashboard /></RoleRoute>} />
          <Route path="/ViewImportedAssets" element={<RoleRoute allowedRoles={["IT-Admin"]}><AssetList /></RoleRoute>} />
          <Route path="/AssetChangeUpdate" element={<RoleRoute allowedRoles={["IT-Admin"]}><AssetChangeUpdate /></RoleRoute>} />
          <Route path="/add-documents" element={<RoleRoute allowedRoles={["IT-Admin"]}><AddDocuments /></RoleRoute>} />
          <Route path="/ExportHistory" element={<RoleRoute allowedRoles={["IT-Admin"]}><AssetExportHistory /></RoleRoute>} />
          <Route path="/StatusChange" element={<RoleRoute allowedRoles={["IT-Admin"]}><StatusChange /></RoleRoute>} />
          <Route path="/ViewAllRequests" element={<RoleRoute allowedRoles={["IT-Admin"]}><ViewAllRequests /></RoleRoute>} />
          <Route path="/AdminViewAssetRequest" element={<RoleRoute allowedRoles={["IT-Admin"]}><ApprovedAllocation /></RoleRoute>} />
          <Route path="/ViewAssetRequest" element={<RoleRoute allowedRoles={["IT-Admin"]}><ReqAllocation /></RoleRoute>} />
          <Route path="/approved-requests" element={<RoleRoute allowedRoles={["IT-Admin"]}><ApprovedRequestedAssets /></RoleRoute>} />
          <Route path="/RejectedRequestedAssets" element={<RoleRoute allowedRoles={["IT-Admin"]}><RejectedRequestedAssets /></RoleRoute>} />
          
          {/* Auditing (IT-Admin) */}
          <Route path="/CreateAudit" element={<RoleRoute allowedRoles={["IT-Admin"]}><CreateAudit /></RoleRoute>} />
          <Route path="/ITCreateAudit" element={<RoleRoute allowedRoles={["IT-Admin"]}><ITCreateAudit /></RoleRoute>} />
          <Route path="/ApproveAuditedAssets" element={<RoleRoute allowedRoles={["IT-Admin"]}><ApproveAuditedAssets /></RoleRoute>} />
          <Route path="/ITApproveAuditedAssets" element={<RoleRoute allowedRoles={["IT-Admin"]}><ITApproveAuditedAssets /></RoleRoute>} />
          <Route path="/ITAddApproveAuditedAssets" element={<RoleRoute allowedRoles={["IT-Admin"]}><ITAddApproveAuditedAssets /></RoleRoute>} />
          <Route path="/EditAuditedAsset" element={<RoleRoute allowedRoles={["IT-Admin"]}><EditAuditedAsset /></RoleRoute>} />
          <Route path="/ITEditAuditedAsset" element={<RoleRoute allowedRoles={["IT-Admin"]}><ITEditAuditedAsset /></RoleRoute>} />
          <Route path="/AuditCompletion" element={<RoleRoute allowedRoles={["IT-Admin"]}><AuditCompletion /></RoleRoute>} />
          <Route path="/ITAuditCompletion" element={<RoleRoute allowedRoles={["IT-Admin"]}><ITAuditCompletion /></RoleRoute>} />

          {/* 🤝 APPROVER Routes */}
          <Route path="/approver-dashboard" element={<RoleRoute allowedRoles={["Approver"]}><ApproverDashboard /></RoleRoute>} />
          <Route path="/assets/reqassettable" element={<RoleRoute allowedRoles={["Approver"]}><ApproverAsset /></RoleRoute>} />
          <Route path="/viewlocationtransfer-requests" element={<RoleRoute allowedRoles={["Approver"]}><LoctransferReq /></RoleRoute>} />
          <Route path="/view-location-details" element={<RoleRoute allowedRoles={["Approver"]}><LoctransferReq /></RoleRoute>} />
          <Route path="/view-custodian-transfer-details" element={<RoleRoute allowedRoles={["Approver"]}><CustTransferDetails /></RoleRoute>} />
          <Route path="/assets/reqloctable" element={<RoleRoute allowedRoles={["Approver"]}><ApproverLocTransfer /></RoleRoute>} />
          <Route path="/assets/reqcustable" element={<RoleRoute allowedRoles={["Approver"]}><ApproverCustTransfer /></RoleRoute>} />

          {/* 🔍 AUDITOR Routes */}
          <Route path="/auditor-dashboard" element={<RoleRoute allowedRoles={["Auditor"]}><AuditorDashboard /></RoleRoute>} />
          <Route path="/ViewAudits" element={<RoleRoute allowedRoles={["Auditor"]}><ViewAudits /></RoleRoute>} />
          <Route path="/AssetAudit" element={<RoleRoute allowedRoles={["Auditor"]}><AssetAudit /></RoleRoute>} />
          <Route path="/EditAuditAsset" element={<RoleRoute allowedRoles={["Auditor"]}><EditAuditAsset /></RoleRoute>} />
          <Route path="/AuditWiseStatus" element={<RoleRoute allowedRoles={["Auditor"]}><AuditWiseStatus /></RoleRoute>} />
          <Route path="/AssetByAudit" element={<RoleRoute allowedRoles={["Auditor"]}><AssetByAudit /></RoleRoute>} />
          <Route path="/AudAssetAudit" element={<RoleRoute allowedRoles={["Auditor"]}><AudAssetAudit /></RoleRoute>} />
          <Route path="/AudByAsset" element={<RoleRoute allowedRoles={["Auditor"]}><AudByAsset /></RoleRoute>} />
          <Route path="/AudEditAsset" element={<RoleRoute allowedRoles={["Auditor"]}><AudEditAsset /></RoleRoute>} />
          <Route path="/AudWiseStatus" element={<RoleRoute allowedRoles={["Auditor"]}><AudWiseStatus /></RoleRoute>} />

          {/* 📝 REQUESTER Routes */}
          <Route path="/requestor-dashboard" element={<RoleRoute allowedRoles={["Requester"]}><RequestorDashboard /></RoleRoute>} />
          <Route path="/allocatedassets" element={<RoleRoute allowedRoles={["Requester"]}><AllocatedAssets /></RoleRoute>} />
          <Route path="/assets/request-access" element={<RoleRoute allowedRoles={["Requester"]}><RequestAccess /></RoleRoute>} />
          <Route path="/assets/location-transfer" element={<RoleRoute allowedRoles={["Requester"]}><LocationTransfer /></RoleRoute>} />
          <Route path="/assets/custodian-transfer" element={<RoleRoute allowedRoles={["Requester"]}><CustodianTranfer /></RoleRoute>} />
          <Route path="/assets/asset-return" element={<RoleRoute allowedRoles={["Requester"]}><AssetReturn /></RoleRoute>} />
          <Route path="/assets/buyback" element={<RoleRoute allowedRoles={["Requester"]}><ReqBuyback /></RoleRoute>} />
          <Route path="/assets/reqbuybacktable" element={<RoleRoute allowedRoles={["Requester"]}><ReqBuyBackTable /></RoleRoute>} />
          <Route path="/assets/reqloctable" element={<RoleRoute allowedRoles={["Requester"]}><ReqLocTable /></RoleRoute>} />
          <Route path="/assets/reqcustodiantable" element={<RoleRoute allowedRoles={["Requester"]}><ReqCustodianTable /></RoleRoute>} />

          {/* 📦 CUSTODIAN Routes */}
          <Route path="/custodian-dashboard" element={<RoleRoute allowedRoles={["Custodian"]}><CustodianDashboard /></RoleRoute>} />
          <Route path="/custodian/view" element={<RoleRoute allowedRoles={["Admin", "HR Admin"]}><Custodian /></RoleRoute>} />
          <Route path="/custodian/add" element={<RoleRoute allowedRoles={["HR Admin"]}><AddCustodian /></RoleRoute>} />
          <Route path="/custodian/edit/:id" element={<RoleRoute allowedRoles={["HR Admin"]}><EditCustodian /></RoleRoute>} />

          {/* 🏢 HR ADMIN Routes */}
          <Route path="/hr-dashboard" element={<RoleRoute allowedRoles={["HR Admin"]}><HrDashboard /></RoleRoute>} />

          {/* 📁 SHARED & Assets */}
          <Route path="/assets/list" element={<RoleRoute allowedRoles={["Admin", "IT-Admin"]}><Assets /></RoleRoute>} />
          <Route path="/assets/add-asset" element={<RoleRoute allowedRoles={["Admin", "IT-Admin"]}><AddAsset /></RoleRoute>} />
          <Route path="/assets/location" element={<Location />} />
          <Route path="/assets/status-change" element={<AssetStatusChange />} />
          {/* <Route path="/assets/status" element={<AssetStatusChange />} /> */}
          <Route path="/assets/add-status" element={<AddStatus />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<Password />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
