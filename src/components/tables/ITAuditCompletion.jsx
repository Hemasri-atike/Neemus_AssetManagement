import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ModernTable from "../common/ModernTable";
import { Typography } from "@mui/material";

const AuditCompletionTable = () => {
  const location = useLocation();
  const formData = location.state?.form;

  const [search, setSearch] = useState({});

  // ✅ Sample + dynamic row
  const rows = [
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

    // ✅ Add completed audit row
    formData && {
      id: 3,
      auditName: formData.auditName,
      description: "Completed Audit",
      auditBy: "You",
      locationCode: "-",
      location: "-",
      creationDate: "-",
      completionDate: formData.date,
      remarks: formData.remarks,
      status: "Active",
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
    <>
      <ModernTable
        title="Audit Completion List"
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

export default AuditCompletionTable;