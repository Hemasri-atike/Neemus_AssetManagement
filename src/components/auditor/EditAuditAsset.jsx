import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button
} from "@mui/material";

import RequestFormCard from "../common/RequestFormCard";
import SendRequestButton from "../common/SendRequestButton";

const EditAuditAsset = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    auditPlan: "",
    assetClass: "",
    asset: "",
    location: "",
    custodian: "",
    status: "",
    remarks: "",
  });

  const auditPlans = ["Plan A", "Plan B"];
  const assetClasses = ["IT Equipment", "Furniture", "Electronics"];
  const assets = ["Laptop", "Desktop", "Printer"];
  const locations = ["HYD", "Bangalore", "Chennai"];
  const custodians = ["John", "Smith", "David"];
  const statusList = ["Asset Damaged but Repairable", "Good", "Scrap"];

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log(form);
    alert("Request Submitted!");
    navigate("/AudEditAsset");
  };

  return (
    <Box sx={{ p: 3, background: "#f4f6f8", minHeight: "100vh" }}>
      
      <RequestFormCard>
        <Typography variant="h6" mb={4} sx={{ fontWeight: 700 }}>
                     Edit Audited Asset
                  </Typography>
        <Box display="flex" gap={5}>

          {/* 🔹 LEFT SIDE */}
          <Box flex={1}>
            
            {/* Audit Plan */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography sx={{ width: "200px" }}>
                Select Audit Plan *
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={form.auditPlan}
                onChange={(e) => handleChange("auditPlan", e.target.value)}
              >
                {auditPlans.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Asset */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography sx={{ width: "200px" }}>
                Select Asset
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={form.asset}
                onChange={(e) => handleChange("asset", e.target.value)}
              >
                {assets.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Location */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography sx={{ width: "200px" }}>
                Asset Location
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              >
                {locations.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Status */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography sx={{ width: "200px" }}>
                Asset Status
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                {statusList.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Box>

          </Box>

          {/* 🔹 RIGHT SIDE */}
          <Box flex={1}>

            {/* Asset Class */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography sx={{ width: "200px" }}>
                Select Asset Class *
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={form.assetClass}
                onChange={(e) => handleChange("assetClass", e.target.value)}
              >
                {assetClasses.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Custodian */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography sx={{ width: "200px" }}>
                Select Custodian
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={form.custodian}
                onChange={(e) => handleChange("custodian", e.target.value)}
              >
                {custodians.map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Remarks */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography sx={{ width: "200px" }}>
                Remarks
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={form.remarks}
                onChange={(e) => handleChange("remarks", e.target.value)}
              />
            </Box>
          </Box>
        </Box>
        {/* Send Button */}
            <Box textAlign="center" mt={3} >
              <SendRequestButton
                onClick={handleSubmit}
                label="Update"
              />
            </Box>
      </RequestFormCard>
      
    </Box>
  );
};

export default EditAuditAsset;