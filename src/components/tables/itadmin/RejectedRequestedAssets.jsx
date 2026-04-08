import React, { useState } from "react";
import ModernTable from "../../common/ModernTable";
import { Box } from "@mui/material";

const rawData = [
  {
    assetTypeName: "Printer",
    reqId: "REQ-004",
    reqName: "Sanjay Dutta",
    dept: "Operations",
    designation: "Fleet Manager",
    requestedQuantity: 1,
    date: "2026-04-02",
    reqStatus: "Rejected",
  },
  {
    assetTypeName: "Webcam",
    reqId: "REQ-005",
    reqName: "Neha Gupta",
    dept: "Marketing",
    designation: "Social Media Lead",
    requestedQuantity: 3,
    date: "2026-04-04",
    reqStatus: "Rejected",
  },
];

const RejectedRequestedAssets = () => {
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
    { field: "assetTypeName", label: "Assettypename" },
    { field: "reqId", label: "req id" },
    { field: "reqName", label: "req name" },
    { field: "dept", label: "dept" },
    { field: "designation", label: "designation" },
    { field: "requestedQuantity", label: "req quantity" },
    { field: "date", label: "date" },
    { field: "reqStatus", label: "req status" },
  ];

  const renderCustomCell = (field, row) => {
    if (field === "reqStatus") {
      return (
        <span className="status-pill status-rejected">
          {row.reqStatus}
        </span>
      );
    }
    return row[field];
  };

  return (
    <Box sx={{ p: 3 }}>
      <ModernTable
        title="Rejected Requested Assets"
        columns={columns}
        data={filteredData}
        onSearch={handleSearch}
        renderCell={renderCustomCell}
      />
    </Box>
  );
};

export default RejectedRequestedAssets;
