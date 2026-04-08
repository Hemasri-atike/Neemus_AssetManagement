import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import RequestFormCard from "../common/RequestFormCard";

const EditAuditedAsset = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    auditName: "",
    assetClass: "",
    asset: "",
    location: "",
    custodian: "",
    assetStatus: "",
    remarks: "",
  });

  const auditOptions = ["test audit"];
  const assetClassOptions = ["6005", "6003"];
  const assetOptions = ["60050040", "60050011"];
  const locationOptions = ["CISF", "IT DEPARTMENT"];
  const custodianOptions = ["100528", "150316"];
  const assetStatusOptions = [
    "Asset Available",
    "Asset Damaged",
    "Asset Location Transferred",
  ];

  // ✅ Handle Change
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Navigate to table page
  const handleSubmit = () => {
    if (!form.auditName || !form.assetClass) {
      alert("Please fill required fields");
      return;
    }

    navigate("/ITEditAuditedAsset", {
      state: { form },
    });
  };

  return (
    <Box sx={{ background: "#f4f6f8", p: 3 }}>
      <Box maxWidth="1100px" mx="auto">

        <RequestFormCard>
          <Typography variant="h6" mb={3} sx={{ fontWeight: 700 }}>
            Edit Audited Asset
          </Typography>

          <Box display="flex" gap={3} flexWrap="wrap">

            <TextField
              select
              label="Select Audit Plan"
              value={form.auditName}
              onChange={(e) =>
                handleChange("auditName", e.target.value)
              }
              sx={{ width: 220 }}
            >
              {auditOptions.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select Asset Class"
              value={form.assetClass}
              onChange={(e) =>
                handleChange("assetClass", e.target.value)
              }
              sx={{ width: 200 }}
            >
              {assetClassOptions.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select Asset"
              value={form.asset}
              onChange={(e) =>
                handleChange("asset", e.target.value)
              }
              sx={{ width: 200 }}
            >
              {assetOptions.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Asset Location"
              value={form.location}
              onChange={(e) =>
                handleChange("location", e.target.value)
              }
              sx={{ width: 200 }}
            >
              {locationOptions.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Select Custodian"
              value={form.custodian}
              onChange={(e) =>
                handleChange("custodian", e.target.value)
              }
              sx={{ width: 200 }}
            >
              {custodianOptions.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Asset Status"
              value={form.assetStatus}
              onChange={(e) =>
                handleChange("assetStatus", e.target.value)
              }
              sx={{ width: 220 }}
            >
              {assetStatusOptions.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Remarks"
              value={form.remarks}
              onChange={(e) =>
                handleChange("remarks", e.target.value)
              }
              sx={{ width: 220 }}
            />
          </Box>
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3 }}>
              Update
            </Button>
        </RequestFormCard>

      </Box>
    </Box>
  );
};

export default EditAuditedAsset;