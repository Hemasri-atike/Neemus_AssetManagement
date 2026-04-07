import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import { Add } from "@mui/icons-material";
import AddAssetClass from "../admin/AddAssetClass";

// ✅ Correct data according to labels
const rawData = [
  {
    assetClassCode: "AC001",
    assetClassName: "Furniture",
    departmentName: "Admin",
  },
  {
    assetClassCode: "AC002",
    assetClassName: "Electrical",
    departmentName: "Maintenance",
  },
  {
    assetClassCode: "AC003",
    assetClassName: "IT Equipment",
    departmentName: "IT",
  },
];

const AdAssetClass = () => {
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

  // ✅ Columns match labels perfectly
  const columns = [
    { field: "assetClassCode", label: "Asset Class Code" },
    { field: "assetClassName", label: "Asset Class Name" },
    { field: "departmentName", label: "Department Name" },
    { field: "actions", label: "Actions" },
  ];

  const renderCustomCell = (field, row) => {
    if (field === "actions") {
      return (
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-view">Delete</button>
          <button className="btn-edit">Edit</button>
        </div>
      );
    }

    return row[field];
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <ModernTable
        title="Asset Class List"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </div>
  );
};

export default AdAssetClass;