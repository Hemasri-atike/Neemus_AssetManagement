import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const AudWiseStatus = () => {
  const [search, setSearch] = useState({});

  const rows = [];

  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  const filteredRows = rows.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  // ✅ MATCHED WITH SCREENSHOT
  const columns = [
    { field: "auditName", label: "Audit Name" },
    { field: "assetId", label: "Asset ID" },
    { field: "assetDesc", label: "Asset Desc" },
    { field: "mainAsset", label: "Main Asset Number" },
    { field: "subNumber", label: "Asset Sub Number" },
    { field: "status", label: "Status" },
    { field: "location", label: "Location" },
  ];

  return (
    <ModernTable
      title="Audit List"
      columns={columns}
      data={filteredRows}
      onSearch={handleSearch}
    />
  );
};

export default AudWiseStatus;