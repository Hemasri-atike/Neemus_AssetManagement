import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModernTable from "../common/ModernTable";

const ITApproveAuditedAssets = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState({});
  const [rows, setRows] = useState([
    {
      id: 1,
      select: false,
      assetId: "703",
      mainAsset: "60050040",
      assetClass: "6005",
      assetDesc: "Printer Scanner",
      auditName: "test audit",
      auditBy: "z_sohel",
      remarks: "wewd",
      date: "16-Oct-2024",
      status: "Asset Available",
      location: "CISF",
    },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);

  // ✅ Search
  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Checkbox toggle (MAIN FIX)
  const handleCheckboxChange = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, select: !row.select } : row
    );

    setRows(updatedRows);

    const selected = updatedRows.filter((r) => r.select);
    setSelectedRows(selected);
  };

  // ✅ Custom cell rendering (checkbox column)
  const renderCustomCell = (field, row) => {
    if (field === "select") {
      return (
        <input
          type="checkbox"
          checked={row.select}
          onChange={() => handleCheckboxChange(row.id)}
        />
      );
    }

    return row[field];
  };

  // ✅ Filter
  const filteredRows = rows.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  // ✅ Add button action
  const handleAdd = () => {
    if (selectedRows.length === 0) {
      alert("Select at least one row");
      return;
    }

    navigate("/ITAddApproveAuditedAssets", {
      state: { selectedRows },
    });
  };

  // ✅ Columns
  const columns = [
    { field: "select", label: "#" },
    { field: "assetId", label: "Asset ID" },
    { field: "mainAsset", label: "Main Asset Number" },
    { field: "assetClass", label: "Asset Class" },
    { field: "assetDesc", label: "Asset Desc" },
    { field: "auditName", label: "Audit Name" },
    { field: "auditBy", label: "Audit By" },
    { field: "remarks", label: "Auditor Remarks" },
    { field: "date", label: "Audited Date" },
    { field: "status", label: "Asset Status" },
    { field: "location", label: "Asset Location" },
  ];

  return (
    <Box>
      <ModernTable
        title="Approve Audited Assets"
        columns={columns}
        data={filteredRows}
        onSearch={handleSearch}
        renderCell={renderCustomCell} // ✅ important
      />

      {/* ✅ Add Button */}
      <Box mt={2}>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default ITApproveAuditedAssets;