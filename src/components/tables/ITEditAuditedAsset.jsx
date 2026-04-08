import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ModernTable from "../common/ModernTable";
import { Typography } from "@mui/material";

const ITEditAuditedAsset = () => {
  const location = useLocation();
  const formData = location.state?.form;

  const [search, setSearch] = useState({});

  // ✅ Default rows
  const rows = [
    {
      id: 1,
      auditName: "test audit",
      auditBy: "z_sohel",
      mainAsset: "60050039",
      assetClass: "6005",
      assetDesc: "Printer, Copier cum Scanner cum Fax",
      location: "CIVIL DEPARTMENT",
      custodianId: "25482",
      auditStatus: "Asset Available",
      remarks: "",
      date: "16-Oct-2024",
      status: "Approved",
    },
    {
      id: 2,
      auditName: "test audit",
      auditBy: "z_sohel",
      mainAsset: "60050040",
      assetClass: "6005",
      assetDesc: "Printer, Copier cum Scanner cum Fax",
      location: "CISF",
      custodianId: "100528",
      auditStatus: "Asset Location Transferred",
      remarks: "wewd",
      date: "16-Oct-2024",
      status: "Audited",
    },
    {
      id: 3,
      auditName: "test audit",
      auditBy: "z_sohel",
      mainAsset: "60050011",
      assetClass: "6005",
      assetDesc: "A3 Size Multi Function Printing Device",
      location: "FIELD OFFICE",
      custodianId: "150316",
      auditStatus: "Asset Available",
      remarks: "add",
      date: "18-Nov-2024",
      status: "Audited",
    },

    // ✅ Add updated row from form
    formData && {
      id: 4,
      auditName: formData.auditName,
      auditBy: "You",
      mainAsset: formData.asset,
      assetClass: formData.assetClass,
      assetDesc: "Updated Asset",
      location: formData.location,
      custodianId: formData.custodian,
      auditStatus: formData.assetStatus,
      remarks: formData.remarks,
      date: new Date().toLocaleDateString(),
      status: "Approved",
    },
  ].filter(Boolean);

  // 🔍 Search
  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  // 🔍 Filter
  const filteredRows = rows.filter((row) =>
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
        row.status === "Approved"
          ? "status-available"
          : row.status === "Rejected"
          ? "status-transferred"
          : "status-default";

      return (
        <span className={`status-pill ${statusClass}`}>
          {row.status}
        </span>
      );
    }
    return row[field];
  };

  const columns = [
    { field: "auditName", label: "Audit Name" },
    { field: "auditBy", label: "Audit By" },
    { field: "mainAsset", label: "Main Asset Number" },
    { field: "assetClass", label: "Asset Class" },
    { field: "assetDesc", label: "Asset Desc" },
    { field: "location", label: "Location" },
    { field: "custodianId", label: "Custodian ID" },
    { field: "auditStatus", label: "Audit Status" },
    { field: "remarks", label: "Auditor Comments" },
    { field: "date", label: "Audited Date" },
    { field: "status", label: "Status" },
  ];

  return (
    <>
      <ModernTable
        title="Audited Asset List"
        columns={columns}
        data={filteredRows}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />

      <Typography mt={2}>
        Count = {filteredRows.length}
      </Typography>
    </>
  );
};

export default ITEditAuditedAsset;