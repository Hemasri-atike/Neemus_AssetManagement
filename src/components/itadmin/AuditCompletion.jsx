import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";

import RequestFormCard from "../common/RequestFormCard";
import ModernTable from "../common/ModernTable";

const ITAuditCompletionPage = () => {
  const [form, setForm] = useState({
    auditName: "",
    date: "",
    remarks: "",
  });

  const [search, setSearch] = useState({});
  const [tableData, setTableData] = useState([
    {
      id: 1,
      auditName: "Field Offices Audit",
      description: "IT Asset Audit at H2U Operator Cabin",
      auditBy: "z_sohel",
      locationCode: "NR67",
      location: "HYDROGEN UNIT",
      creationDate: "29-Dec-2020",
      completionDate: "",
      remarks: "",
      status: "InActive",
    },
    {
      id: 2,
      auditName: "Field Offices Audit",
      description: "IT Asset Audit at SDU Operator Cabin",
      auditBy: "z_sohel",
      locationCode: "NR82",
      location: "SOLVENT DEOILING UNIT (WAX)",
      creationDate: "29-Dec-2020",
      completionDate: "",
      remarks: "",
      status: "InActive",
    },
  ]);

  const auditOptions = ["Field Offices Audit", "Plant Audit"];

  // ✅ Form change
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Submit → update table directly
  const handleSubmit = () => {
    if (!form.auditName || !form.date) {
      alert("Please fill required fields");
      return;
    }

    const newRow = {
      id: tableData.length + 1,
      auditName: form.auditName,
      description: "Completed Audit",
      auditBy: "You",
      locationCode: "-",
      location: "-",
      creationDate: "-",
      completionDate: form.date,
      remarks: form.remarks,
      status: "Active",
    };

    setTableData((prev) => [...prev, newRow]);

    // reset form
    setForm({
      auditName: "",
      date: "",
      remarks: "",
    });
  };

  // 🔍 Search
  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  // 🔍 Filter
  const filteredRows = tableData.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  // ✅ Status UI
  const renderCustomCell = (field, row) => {
    if (field === "status") {
      const statusClass =
        row.status === "Active"
          ? "status-available"
          : "status-default";

      return (
        <span className={`status-pill ${statusClass}`}>
          {row.status}
        </span>
      );
    }
    return row[field];
  };

  // ✅ Columns
  const columns = [
    { field: "auditName", label: "Audit Name" },
    { field: "description", label: "Audit Description" },
    { field: "auditBy", label: "Audit By" },
    { field: "locationCode", label: "Location Code" },
    { field: "location", label: "Location" },
    { field: "creationDate", label: "Audit Creation Date" },
    { field: "completionDate", label: "Completion Date" },
    { field: "remarks", label: "Admin Remarks" },
    { field: "status", label: "Audit Status" },
  ];

  return (
    <Box sx={{ background: "#f4f6f8", p: 3 }}>
      <Box maxWidth="1100px" mx="auto">

        {/* 🔹 FORM CARD */}
        <RequestFormCard>
          <Typography variant="h6" mb={3} sx={{ fontWeight: 700 }}>
            Audit Completion
          </Typography>

          <Box display="flex" gap={3} flexWrap="wrap">

            {/* Audit Name */}
            <TextField
              select
              label="Select Audit"
              size="small"
              value={form.auditName}
              onChange={(e) =>
                handleChange("auditName", e.target.value)
              }
              sx={{ width: 220 }}
            >
              {auditOptions.map((audit, i) => (
                <MenuItem key={i} value={audit}>
                  {audit}
                </MenuItem>
              ))}
            </TextField>

            {/* Date */}
            <TextField
              type="date"
              size="small"
              label="Select Date"
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={(e) =>
                handleChange("date", e.target.value)
              }
            />

            {/* Remarks */}
            <TextField
              size="small"
              label="Remarks"
              value={form.remarks}
              onChange={(e) =>
                handleChange("remarks", e.target.value)
              }
            />

            {/* Button */}
            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              Mark Audit Complete
            </Button>
          </Box>
        </RequestFormCard>

        {/* 🔹 TABLE */}
        <Box mt={4}>
          <ModernTable
            title="IT Audit Completion List"
            columns={columns}
            data={filteredRows}
            onSearch={handleSearch}
            renderCell={renderCustomCell}
          />
        </Box>

        {/* 🔹 COUNT */}
        <Typography mt={2}>
          Count = {filteredRows.length}
        </Typography>

      </Box>
    </Box>
  );
};

export default ITAuditCompletionPage;