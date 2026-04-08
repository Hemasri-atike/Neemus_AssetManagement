import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import PrintPdfButton from "../common/PrintPdfButton";
import ExcelButton from "../common/ExcelButton";
import { Box, Typography, Stack } from "@mui/material";

// ✅ Data matching labels
const rawData = [
  {
    updateStatus: "Approved",
    updateDate: "10-Mar-2026",
    mainAssetNumber: "Chair",
    assetSubNumber: "SUB001",
    location: "NITROGEN PLANT",
    custodianId: "APR1001",
    status: "Approved",
  },
  {
    updateStatus: "Rejected",
    updateDate: "09-Jan-2025",
    mainAssetNumber: "Transformer",
    assetSubNumber: "SUB002",
    location: "NITROGEN PLANT",
    custodianId: "APR1002",
    status: "Rejected",
  },
  {
    updateStatus: "Approved",
    updateDate: "09-Jan-2025",
    mainAssetNumber: "Scanner",
    assetSubNumber: "SUB003",
    location: "FIELD OFFICE",
    custodianId: "APR1003",
    status: "Approved",
  },
];

const AssetExportHistory = () => {
  const [search, setSearch] = useState({});

  // ✅ Handle search
  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Filter data
  const filteredData = rawData.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  // ✅ Columns (match labels exactly)
  const columns = [
    { field: "updateStatus", label: "Update Status" },
    { field: "updateDate", label: "Update Date" },
    { field: "mainAssetNumber", label: "Main Asset Number" },
    { field: "assetSubNumber", label: "Asset Sub Number" },
    { field: "location", label: "Location" },
    { field: "custodianId", label: "Custodian ID" },
    { field: "status", label: "Status" },
  ];

  // ✅ Custom cell rendering (status styling)
  const renderCustomCell = (field, row) => {
    if (field === "status" || field === "updateStatus") {
      let statusClass = "status-default";

      if (row.status === "Approved") statusClass = "status-available";
      else if (row.status === "Rejected") statusClass = "status-rejected";

      return (
        <span className={`status-pill ${statusClass}`}>
          {row[field]}
        </span>
      );
    }

    return row[field];
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        justifyContent="space-between" 
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography 
          variant="h5" 
          sx={{ fontWeight: "bold", color: "#1e293b" }}
        >
          Asset Export History
        </Typography>
        <Stack direction="row" spacing={2}>
          <ExcelButton data={filteredData} filename="Asset_Export_History" />
          <PrintPdfButton label="Export To PDF" />
        </Stack>
      </Stack>

      <ModernTable
        title=""
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </Box>
  );
};

export default AssetExportHistory;