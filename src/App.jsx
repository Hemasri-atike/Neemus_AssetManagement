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
import AddnonNrluser from "./components/tables/AddnonNrluser";
import AdAssetClass from "./components/tables/AdAssetClass";
import AssetClassmaptable from "./components/tables/AssetClassmaptable";
import Hrassigntable from "./components/tables/Hrassigntable";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/login/Profile";
import Password from "./pages/login/Password";

import ViewAudits from "./components/auditor/ViewAudits";
import AssetAudit from "./components/auditor/AssetAudit";
import EditAuditAsset from "./components/auditor/EditAuditAsset";
import AuditWiseStatus from "./components/auditor/AuditWiseStatus";
import AssetByAudit from "./components/auditor/AssetByAudit";
import AudAssetAudit from "./components/tables/AudAssetAudit";
import AudByAsset from "./components/tables/AudByAsset";
import AudEditAsset from "./components/tables/AudEditAsset";
import AudWiseStatus from "./components/tables/AudWiseStatus";
import AssetList from "./components/itadmin/AssetList";

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

        {/* ✅ Login */}
        <Route
          path="/"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* ✅ Protected Layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* 🔥 Role-based Dashboards */}
          <Route
            path="/admin-dashboard"
            element={
              <RoleRoute allowedRoles={["Admin"]}>
                <AdminDashboard />
              </RoleRoute>
            }
          />

          <Route
            path="/it-dashboard"
            element={
              <RoleRoute allowedRoles={["IT-Admin"]}>
                <ItDashboard />
              </RoleRoute>
            }
          />
           <Route
            path="/ViewImportedAssets"
            element={
              <RoleRoute allowedRoles={["IT-Admin"]}>
                <AssetList />
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
            path="/assets/reqassettable"
            element={
              <RoleRoute allowedRoles={["Approver"]}>
                <ApproverAsset />
              </RoleRoute>
            }
          />
          <Route
            path="/assets/reqassettable"
            element={
              <RoleRoute allowedRoles={["Approver"]}>
                <ApprovedAssetList />
              </RoleRoute>
            }
          />
           <Route
            path="/assets/reqloctable"
            element={
              <RoleRoute allowedRoles={["Approver"]}>
                <ApproverLocTransfer />
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
            path="/ViewAudits"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <ViewAudits />
              </RoleRoute>
            }
          />
          <Route
            path="/AssetAudit"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <AssetAudit />
              </RoleRoute>
            }
          />
          <Route
            path="/EditAuditAsset"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <EditAuditAsset />
              </RoleRoute>
            }
          />
          <Route
            path="/AuditWiseStatus"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <AuditWiseStatus />
              </RoleRoute>
            }
          />
          <Route
            path="/AssetByAudit"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <AssetByAudit />
              </RoleRoute>
            }
          />
          <Route
            path="/AudAssetAudit"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <AudAssetAudit />
              </RoleRoute>
            }
          />
          <Route
            path="/AudByAsset"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <AudByAsset />
              </RoleRoute>
            }
          />
          <Route
            path="/AudEditAsset"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <AudEditAsset />
              </RoleRoute>
            }
          />
          <Route
            path="/AudWiseStatus"
            element={
              <RoleRoute allowedRoles={["Auditor"]}>
                <AudWiseStatus />
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

          {/* 🔥 Common Dashboard (fallback) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Assets */}
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
              {/* <Route
              path="/admin-dashboard"
              element={
                <RoleRoute allowedRoles={["Admin"]}>
                  <AdminDashboard />
                </RoleRoute>
              }
            /> */}
            <Route path="request-access" element={<RequestAccess />} />
            {/* <Route path="reqassettable" element={<ReqAssetTable />} /> */}
            <Route path="add-documents" element={<AddDocuments />} />
          </Route>

          {/* Roles */}
          <Route path="/roles">
            <Route path="view" element={
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

          {/* Asset Status */}
          <Route
            path="/assets/status-change"
            element={<AssetStatusChange />}
          />
          <Route
            path="/assets/status"
            element={<AssetStatusChange />}
          />
          <Route
            path="/assets/location"
            element={<Location />}
          />
          <Route
            path="/assets/add-status"
            element={<AddStatus />}
          />
         


          <Route
  path="/allocatedassets"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <AllocatedAssets />
    </RoleRoute>
  }
/>
      <Route
  path="/assets/location-transfer"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <LocationTransfer/>
    </RoleRoute>
  }
/>
    <Route
  path="/assign-role"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AssignRole/>
    </RoleRoute>
  }
/>
   <Route
  path="/add-employee"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AddEmployee/>
    </RoleRoute>
  }
/>
 <Route
  path="/add-non-nrl-user"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AddnonNrluser/>
    </RoleRoute>
  }
/>
 <Route
  path="/add-asset-class-table"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AdAssetClass/>
    </RoleRoute>
  }
/>
<Route
  path="/assetclass-mapping-table"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AssetClassmaptable/>
    </RoleRoute>
  }
/>
<Route
  path="/assetclass-mapping-table"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AssetClassmaptable/>
    </RoleRoute>
  }
/>
  <Route
  path="/hr-assign-table"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <Hrassigntable/>
    </RoleRoute>
  }
/>
 <Route
  path="/add/edit"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AssetClassMapping/>
    </RoleRoute>
  }
/>
 <Route
  path="/add-asset-class"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AddAssetClass/>
    </RoleRoute>
  }
/>
 <Route
  path="/assign-buyback-mail"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <BuyBackMailAssign/>
    </RoleRoute>
  }
/>
 <Route
  path="/dept-custodian-list"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <DeptCustodianlist/>
    </RoleRoute>
  }
/>
 <Route
  path="/assign-role-table"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <AssignEmproletable/>
    </RoleRoute>
  }
/>
 <Route
  path="/view-departments"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <ViewDept/>
    </RoleRoute>
  }
/>
 <Route
  path="/view-employees"
  element={
    <RoleRoute allowedRoles={["Admin"]}>
      <ViewEmpDetails/>
    </RoleRoute>
  }
/>
 <Route
  path="/assets/reqbuybacktable"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <ReqBuyBackTable/>
    </RoleRoute>
  }
/>
 <Route
  path="/assets/reqloctable"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <ReqLocTable/>
    </RoleRoute>
  }
/>
   <Route
  path="/assets/custodian-transfer"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <CustodianTranfer/>
    </RoleRoute>
  }
/>
 <Route
  path="/assets/reqcustodiantable"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <ReqCustodianTable/>
    </RoleRoute>
  }
/>
<Route
  path="/assets/asset-return"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <AssetReturn/>
    </RoleRoute>
  }
/>
          <Route
  path="/assets/buyback"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <ReqBuyback />
    </RoleRoute>
  }
/>
       <Route
  path="/assets/reqassettable"
  element={
    <RoleRoute allowedRoles={["Requester"]}>
      <ReqAssetTable />
    </RoleRoute>
  }
/>

          {/* Other Pages */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {/* Custodian */}
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

          {/* Profile & Password (inside MainLayout) */}
          <Route
            path="/profile"
            element={
              <RoleRoute
                allowedRoles={[
                  "Admin",
                  "IT Admin",
                  "HR Admin",
                  "Approver",
                  "Auditor",
                  "Requester",
                  "Custodian",
                ]}
              >
                <Profile />
              </RoleRoute>
            }
          />
          <Route
            path="/password"
            element={
              <RoleRoute
                allowedRoles={[
                  "Admin",
                  "IT Admin",
                  "HR Admin",
                  "Approver",
                  "Auditor",
                  "Requester",
                  "Custodian",
                ]}
              >
                <Password />
              </RoleRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;





