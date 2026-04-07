import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const ViewAudits = () => {
  const [search, setSearch] = useState({});

 const columns = [
    { field: "auditName", label: "Audit Name" },
    { field: "description", label: "Audit Description" },
    { field: "createdBy", label: "CreatedBy" },
    { field: "locationCode", label: "Location Code" },
    { field: "location", label: "Location" },
    { field: "auditDate", label: "Audit Date" },
    { field: "status", label: "Audit Status" },
  ];

  const rows = [
    {
      id: 1,
      auditName: "test audit",
      description: "test added",
      createdBy: "z_sohel",
      locationCode: "NR72",
      location: "NITROGEN PLANT",
      auditDate: "25-Apr-2023",
      status: "Asset Available",
    },
  ];

  // 🔍 Handle Search
  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  // 🔍 Filter Logic
  const filteredRows = rows.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  const renderCustomCell = (field, row) => {
    if (field === "status") {
      const statusClass = 
        row.status === "Asset Available" 
          ? "status-available" 
          : row.status === "Asset Location Transferred"
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

  return (
    <div style={{ padding: "1rem" }}>
      <ModernTable
        title="Audits List"
        columns={columns}
        data={filteredRows}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default ViewAudits;


