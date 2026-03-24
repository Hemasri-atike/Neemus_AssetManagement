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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>

        {/* ✅ Login (No Layout) */}
        <Route
          path="/"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* ✅ Protected Layout Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/assets/add-asset" element={<AddAsset />} />

          {/* Assets Nested */}
       <Route path="/assets">
  <Route path="list" element={<Assets />} />
  <Route path="add-asset" element={<AddAsset />} />

          
            <Route path="request-access" element={<RequestAccess />} />
            <Route path="add-documents" element={<AddDocuments />} />
          </Route>

             {/* Roles */}
          <Route path="/roles">
            <Route path="view" element={<ViewRoles />} />
            <Route path="create" element={<CreateRole />} />
          </Route>

          {/* Asset Status Change */}
          <Route path="/assets/status-change" element={<AssetStatusChange />} />
          <Route path="/assets/status" element={<AssetStatusChange />} />

           {/* Add Status */}
          <Route path="/assets/add-status" element={<AddStatus />} />
          

          {/* Other Pages */}
          <Route path="/reports" element={<Reports />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;