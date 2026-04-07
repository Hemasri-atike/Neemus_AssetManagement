import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const rawData = [
  {
    auditName: "Plan A",
    assetBy: "IT Equipment",
    mainAssetNumber: "Laptop",
    assetClass: "IT Equipment",
    assetDescription: "Dell Laptop",
    location: "HYD",
    custodianId: "John",
    auditStatus: "Completed",
    auditorComments: "Screen issue",
    auditedDate: "04/05/2026",
    status: "Asset Damaged but Repairable",
  },
  {
    auditName: "Plan B",
    assetBy: "Furniture",
    mainAssetNumber: "Chair",
    assetClass: "Furniture",
    assetDescription: "Office Chair",
    location: "Bangalore",
    custodianId: "Smith",
    auditStatus: "Completed",
    auditorComments: "No issues",
    auditedDate: "04/05/2026",
    status: "Good",
  },
  {
    auditName: "Plan A",
    assetBy: "Electronics",
    mainAssetNumber: "Printer",
    assetClass: "Electronics",
    assetDescription: "HP Printer",
    location: "Chennai",
    custodianId: "David",
    auditStatus: "Pending",
    auditorComments: "Not working",
    auditedDate: "04/05/2026",
    status: "Scrap",
  },
];

const AuditEditAsset = () => {
  const [search, setSearch] = useState({});

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

  // ✅ MATCHED COLUMNS PERFECTLY
  const columns = [
    { field: "auditName", label: "Audit Name" },
    { field: "assetBy", label: "Asset By" },
    { field: "mainAssetNumber", label: "Main Asset Number" },
    { field: "assetClass", label: "Asset Class" },
    { field: "assetDescription", label: "Asset Description" },
    { field: "location", label: "Location" },
    { field: "custodianId", label: "Custodian ID" },
    { field: "auditStatus", label: "Audit Status" },
    { field: "auditorComments", label: "Auditor Comments" },
    { field: "auditedDate", label: "Audited Date" },
    { field: "status", label: "Status" },
  ];

  // ✅ STATUS COLOR LOGIC
  const renderCustomCell = (field, row) => {
    if (field === "status") {
      let statusClass = "status-default";

      if (row.status === "Good") statusClass = "status-available";
      else if (row.status === "Scrap") statusClass = "status-rejected";
      else if (row.status.includes("Damaged"))
        statusClass = "status-transferred";

      return (
        <span className={`status-pill ${statusClass}`}>
          {row.status}
        </span>
      );
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Edit Audited Assets"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AuditEditAsset;
