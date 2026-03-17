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

          {/* Other Pages */}
          <Route path="/reports" element={<Reports />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;