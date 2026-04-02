import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const AllocatedAssets = () => {
  const [search, setSearch] = useState({});

  const rows = [
    {
      id: 1,
      mainAsset: "60030111",
      subNumber: "0",
      assetName: "Entry Level Intel Server",
      class: "6003",
      location: "NITROGEN PLANT",
      custodianId: "100495",
      custodianName: "Devajit Jaradhara",
      department: "ERP",
      status: "Asset Location Transferred",
    },
    {
      id: 2,
      mainAsset: "60052885",
      subNumber: "0",
      assetName: "HP ProBook 440 G5",
      class: "6005",
      location: "ERP CELL",
      custodianId: "100495",
      custodianName: "Devajit Jaradhara",
      department: "ERP",
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

  const columns = [
    { field: "mainAsset", label: "Main Asset Number" },
    { field: "subNumber", label: "SubNumber" },
    { field: "assetName", label: "Asset Name" },
    { field: "class", label: "Class" },
    { field: "location", label: "Location" },
    { field: "custodianId", label: "Custodian ID" },
    { field: "custodianName", label: "Custodian Name" },
    { field: "department", label: "Department" },
    { field: "status", label: "Status Desc" },
  ];

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
        title="Allocated Assets"
        columns={columns}
        data={filteredRows}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AllocatedAssets;