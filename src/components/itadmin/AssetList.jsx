import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import PrintPdfButton from "../common/PrintPdfButton";
import GenerateQrButton from "../common/GenerateQrButton";
import { Box, Typography, Stack } from "@mui/material";

const rawData = [
  {
    mainAssetNumber: "Chair",
    subNumber: 5,
    assetClass: "Furniture",
    assetDescription: "Office Chair",
    additionalDescription: "Wooden",
    custodianId: "EMP001",
    custodianName: "Ravi Kumar",
    custodianDept: "Admin",
    location: "Hyderabad",
    status: "Request Sent To Approver",
    statusDescription: "Pending approval",
    quantity: 1,
    unit: "Nos",
    capitalizationDate: "01-Jan-2024",
    acquisitionDate: "01-Jan-2023",
    component: "Seat",
    componentDescription: "Cushioned",
    deactivationDate: "-",
    inventoryDate: "01-Mar-2026",
    inventoryNote: "Good",
    qrCode: "QR123",
    qrImage: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Asset-Chair-5",
    importedDate: "09-Mar-2026",
  },
];

const AssetList = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState({});

  const toggleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map((r) => r.mainAssetNumber));
    }
  };

  const handlePrint = () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one asset to print.");
      return;
    }
  };

  const handleQrGenerated = (qrUrls) => {
    console.log("Generated QR URLs:", qrUrls);
    alert(`Generated QR codes for ${qrUrls.length} assets.`);
  };

  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = rawData.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

const columns = [
  { 
    field: "select", 
    label: (
      <input 
        type="checkbox" 
        checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
        onChange={toggleSelectAll}
      />
    ) 
  },
  { field: "mainAssetNumber", label: "Main Asset Number" },
  { field: "subNumber", label: "Sub Number" },
  { field: "assetClass", label: "Asset Class" },
  { field: "assetDescription", label: "Asset Description" },
  { field: "additionalDescription", label: "Additional Description" },
  { field: "custodianId", label: "Custodian ID" },
  { field: "custodianName", label: "Custodian Name" },
  { field: "custodianDept", label: "Custodian Department" },
  { field: "location", label: "Location" },
  { field: "status", label: "Status" },
  { field: "statusDescription", label: "Status Description" },
  { field: "quantity", label: "Quantity" },
  { field: "unit", label: "Unit" },
  { field: "capitalizationDate", label: "Asset Capitalization Date" },
  { field: "acquisitionDate", label: "First Acquisition Date" },
  { field: "component", label: "Component" },
  { field: "componentDescription", label: "Component Description" },
  { field: "deactivationDate", label: "Deactivation Date" },
  { field: "inventoryDate", label: "Inventory Date" },
  { field: "inventoryNote", label: "Inventory Note" },
  { field: "qrCode", label: "QR Code" },
  { field: "qrImage", label: "QR Image" },
  { field: "importedDate", label: "Imported Date" },
];

 const renderCustomCell = (field, row) => {
  // ✅ Radio button column
  if (field === "select") {
    return (
      <input
        type="checkbox"
        checked={selectedRows.includes(row.mainAssetNumber)}
        onChange={() => toggleSelect(row.mainAssetNumber)}
      />
    );
  }

  // ✅ Status styling
  if (field === "status") {
    let statusClass = "status-default";

    if (row.status === "Approved") statusClass = "status-available";
    else if (row.status === "Rejected") statusClass = "status-rejected";
    else if (row.status.includes("Approver"))
      statusClass = "status-transferred";

    return (
      <span className={`status-pill ${statusClass}`}>
        {row.status}
      </span>
    );
  }

  // ✅ Render QR Image
  if (field === "qrImage") {
    return (
      <img
        src={row.qrImage}
        alt="QR Code"
        style={{ width: "40px", height: "40px", borderRadius: "4px" }}
      />
    );
  }

  return row[field];
};
  return (
    <Box sx={{ p: 3 }}>
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        justifyContent="space-between" 
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography 
          variant="h5" 
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Print QrCodes For Selected Assets
        </Typography>
        <Stack direction="row" spacing={2}>
          <GenerateQrButton 
            data={rawData.filter(r => selectedRows.includes(r.mainAssetNumber))}
            onGenerated={handleQrGenerated}
            label={`Generate QRs (${selectedRows.length})`}
          />
          <PrintPdfButton 
            label={`Print PDF (${selectedRows.length})`}
            onBeforePrint={handlePrint}
          />
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

export default AssetList;
