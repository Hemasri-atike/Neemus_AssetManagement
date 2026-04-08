import React, { useState } from "react";
import ModernTable from "../common/ModernTable";
import { Add } from "@mui/icons-material";
import AddAssetClass from "../admin/AddAssetClass";
import AssetChangeUpdate from "../itadmin/AssetChangeUpdate";

// ✅ Correct data according to labels
const rawData = [
  {
    mainAssetNumber: "AC001",
    subNumber: "001",
    assetClass: "Furniture",
    assetDescription: "Office furniture items",
    assetStatus: "Available",
  },
  {
    mainAssetNumber: "AC002",
    subNumber: "002",
    assetClass: "Electrical",
    assetDescription: "Electrical equipment",
    assetStatus: "Available but damaged",
  },
  {
    mainAssetNumber: "AC003",
    subNumber: "003",
    assetClass: "IT Equipment",
    assetDescription: "Computers & devices",
    assetStatus: "Damaged",
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

 const columns = [
  { field: "mainAssetNumber", label: "Main Asset Number" },
  { field: "subNumber", label: "Sub Number" },
  { field: "assetClass", label: "Asset Class" },
  { field: "assetDescription", label: "Asset Description" },
  { field: "assetStatus", label: "Asset Status" },

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

  if (field === "assetStatus") {
    return (
      <span
        style={{
          color: row.assetStatus === "Available" ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {row.assetStatus}
      </span>
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