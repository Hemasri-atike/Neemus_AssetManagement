import React, { useState } from "react";
import ModernTable from "../common/ModernTable";

const AudByAsset = () => {
  const [search, setSearch] = useState({});

  const rows = [
    {
      id: 1,
      mainAsset: "60030111",
      subNumber: "0",
      description: "Entry Level Intel Server",
      assetClass: "6003",
      location: "NITROGEN PLANT",
      auditBy: "Shravani",
      auditDate: "4/5/2026",
      auditStatus: "Completed",
      status: "Verified",
    },
  ];

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

  const columns = [
    { field: "mainAsset", label: "Main Asset Number" },
    { field: "subNumber", label: "Sub Number" },
    { field: "description", label: "Asset Description" },
    { field: "assetClass", label: "Asset Class" },
    { field: "location", label: "Location" },
    { field: "auditBy", label: "Audit By" },
    { field: "auditDate", label: "Audit Date" },
    { field: "auditStatus", label: "Audit Status" },
    { field: "status", label: "Status" },
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

export default AudByAsset;