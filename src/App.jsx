import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import RequestAccess from "./components/dashboard/RequestAsset";
import AddDocuments from "./components/dashboard/AddDocuments";
import Reports from "./components/dashboard/Reports";
import Assets from "./components/assetmanagement/Assets";
import AddAsset from "./components/assetmanagement/AddAsset";
import MainLayout from "./layout/Mainlayout";

import ViewRoles from "./components/roles/ViewRoles";
import CreateRole from "./components/roles/CreateRole";

import AddStatus from "./components/assetmanagement/AddStatus";
import AssetStatusChange from "./components/assetmanagement/AssetStatusChange";

import Location from "./components/dashboard/Location";
import Chatbot from "./chatbot/Chatbot";
import Custodian from "./components/custodian/Custodian";
import AddCustodian from "./components/custodian/AddCustodian";
import EditCustodian from "./components/custodian/EditCustodian";
import ApproverDashboard from "./pages/ApproverDashboard";
import AuditorDashboard from "./pages/AuditorDashboard";
import CustodianDashboard from "./pages/CustodianDashboard";
import RequestorDashboard from "./pages/RequestorDashboard";
import ItDashboard from "./pages/ItDashboard";
import HrDashboard from "./pages/HrDashboard";
import AllocatedAssets from "./components/Requestor/AllocatedAssets";
import ReqAssetTable from "./components/tables/ReqAssetTable"; 

import "../src/leafletconfig";
import "leaflet/dist/leaflet.css";
import ReqBuyback from "./components/Requestor/ReqBuyback";
import LocationTransfer from "./components/Requestor/LocationTransfer";
import CustodianTranfer from "./components/Requestor/CustodianTranfer";
import AssetReturn from "./components/Requestor/AssetReturn";
import ReqBuyBackTable from "./components/tables/ReqBuyBackTable";
import ReqLocTable from "./components/tables/ReqLocTable";
import ReqCustodianTable from "./components/tables/ReqCustodianTable";
import ApproverAsset from "./components/Approver/ApproverAsset";
import ApprovedAssetList from "./components/tables/ApprovedAssetList";
import ApproverLocTransfer from "./components/Approver/ApproverLocTransfer";
import AssignRole from "./components/admin/AssignRole";
import AddEmployee from "./components/admin/AddEmployee";
import AssetClassMapping from "./components/admin/AssetClassMapping";
import BuyBackMailAssign from "./components/admin/BuyBackMailAssign";
import DeptCustodianlist from "./components/admin/DeptCustodianlist";
import ViewDept from "./components/admin/ViewDept";
import ViewEmpDetails from "./components/admin/ViewEmpDetails";
import AddAssetClass from "./components/admin/AddAssetClass";
import AssignEmproletable from "./components/tables/AssignEmproletable";




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

    return allowedRoles.includes(role)
      ? children
      : <Navigate to="/dashboard" />;
  };

  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* ✅ Protected Layout (Common for all roles) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* 🔥 DASHBOARDS BY ROLE */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Default Dashboard */}
          
          <Route
            path="/admin-dashboard"
            element={
              <RoleRoute allowedRoles={["Admin"]}>
                <Dashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/it-dashboard"
            element={
              <RoleRoute allowedRoles={["IT- Admin"]}>
                <ItDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/hr-dashboard"
            element={
              <RoleRoute allowedRoles={["HR Admin"]}>
                <HrDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/approver-dashboard"
            element={
              <RoleRoute allowedRoles={["Approver"]}>
                <ApproverDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/auditor-dashboard"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <AuditorDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/requestor-dashboard"
            element={
              <RoleRoute allowedRoles={["Requester"]}>
                <RequestorDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/custodian-dashboard"
            element={
              <RoleRoute allowedRoles={["Custodian"]}>
                <CustodianDashboard />
              </RoleRoute>
            }
          />

          {/* 🛠️ ADMIN ROUTES */}
          <Route path="/admin">
            <Route
              path="assign-role"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <AssignRole />
                </RoleRoute>
              }
            />
            <Route
              path="add-employee"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <AddEmployee />
                </RoleRoute>
              }
            />
            <Route
              path="asset-class-mapping"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <AssetClassMapping />
                </RoleRoute>
              }
            />
            <Route
              path="add-asset-class"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <AddAssetClass />
                </RoleRoute>
              }
            />
            <Route
              path="assign-buyback-mail"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <BuyBackMailAssign />
                </RoleRoute>
              }
            />
            <Route
              path="dept-custodian-list"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <DeptCustodianlist />
                </RoleRoute>
              }
            />
            <Route
              path="assign-role-table"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <AssignEmproletable />
                </RoleRoute>
              }
            />
            <Route
              path="view-departments"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <ViewDept />
                </RoleRoute>
              }
            />
            <Route
              path="view-employees"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <ViewEmpDetails />
                </RoleRoute>
              }
            />
          </Route>

          {/* 👥 ROLES MANAGEMENT (Admin) */}
          <Route path="/roles">
            <Route
              path="view"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <ViewRoles />
                </RoleRoute>
              }
            />
            <Route
              path="create"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <CreateRole />
                </RoleRoute>
              }
            />
          </Route>

          {/* 🏗️ ASSET MANAGEMENT (Admin / IT-Admin) */}
          <Route path="/assets">
            <Route
              path="list"
              element={
                <RoleRoute allowedRoles={["Admin", "IT- Admin"]}>
                  <Assets />
                </RoleRoute>
              }
            />
            <Route
              path="add-asset"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <AddAsset />
                </RoleRoute>
              }
            />
            <Route path="request-access" element={<RequestAccess />} />
            <Route path="add-documents" element={<AddDocuments />} />
            <Route path="status-change" element={<AssetStatusChange />} />
            <Route path="status" element={<AssetStatusChange />} />
            <Route path="location" element={<Location />} />
            <Route path="add-status" element={<AddStatus />} />
          </Route>

          {/* ✅ APPROVER ROUTES */}
          <Route path="/approver">
            <Route
              path="asset-requests"
              element={
                <RoleRoute allowedRoles={["Approver"]}>
                  <ApproverAsset />
                </RoleRoute>
              }
            />
            <Route
              path="approved-list"
              element={
                <RoleRoute allowedRoles={["Approver"]}>
                  <ApprovedAssetList />
                </RoleRoute>
              }
            />
            <Route
              path="location-transfers"
              element={
                <RoleRoute allowedRoles={["Approver"]}>
                  <ApproverLocTransfer />
                </RoleRoute>
              }
            />
          </Route>

          {/* ✅ REQUESTER ROUTES */}
          <Route path="/requester">
            <Route
              path="allocated-assets"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <AllocatedAssets />
                </RoleRoute>
              }
            />
            <Route
              path="location-transfer"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <LocationTransfer />
                </RoleRoute>
              }
            />
            <Route
              path="custodian-transfer"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <CustodianTranfer />
                </RoleRoute>
              }
            />
            <Route
              path="asset-return"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <AssetReturn />
                </RoleRoute>
              }
            />
            <Route
              path="buyback"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <ReqBuyback />
                </RoleRoute>
              }
            />
            <Route
              path="request-table"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <ReqAssetTable />
                </RoleRoute>
              }
            />
            <Route
              path="buyback-table"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <ReqBuyBackTable />
                </RoleRoute>
              }
            />
            <Route
              path="location-table"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <ReqLocTable />
                </RoleRoute>
              }
            />
            <Route
              path="custodian-table"
              element={
                <RoleRoute allowedRoles={["Requester"]}>
                  <ReqCustodianTable />
                </RoleRoute>
              }
            />
          </Route>

          {/* 👥 CUSTODIAN MANAGEMENT (Admin / HR Admin) */}
          <Route path="/custodian">
            <Route
              path="view"
              element={
                <RoleRoute allowedRoles={["Admin", "HR Admin"]}>
                  <Custodian />
                </RoleRoute>
              }
            />
            <Route
              path="add"
              element={
                <RoleRoute allowedRoles={["HR Admin"]}>
                  <AddCustodian />
                </RoleRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <RoleRoute allowedRoles={["HR Admin"]}>
                  <EditCustodian />
                </RoleRoute>
              }
            />
          </Route>

          {/* 📊 MISC / SHARED */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;