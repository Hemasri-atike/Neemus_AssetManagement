import React, { useState } from "react";
import { Box, Button, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModernTable from "../common/ModernTable";
import { Box, Typography, Stack } from "@mui/material";

const ITApproveAuditedAssets = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState({});
  const [rows, setRows] = useState([
    {
      id: 1,
      select: false,
      assetId: "703",
      mainAsset: "60050040",
      assetClass: "6005",
      assetDesc: "Printer Scanner",
      auditName: "test audit",
      auditBy: "z_sohel",
      remarks: "wewd",
      date: "16-Oct-2024",
      status: "Asset Available",
      location: "CISF",
    },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearch = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Checkbox change
  const handleCheckboxChange = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, select: !row.select } : row
    );

    setRows(updatedRows);

    const selected = updatedRows.filter((r) => r.select);
    setSelectedRows(selected);
  };

  const filteredRows = rows.filter((row) =>
    Object.keys(search).every((key) =>
      row[key]
        ?.toString()
        .toLowerCase()
        .includes(search[key]?.toLowerCase() || "")
    )
  );

  const handleAdd = () => {
    if (selectedRows.length === 0) {
      alert("Select at least one row");
      return;
    }

    navigate("/it-add-approve-table", {
      state: { selectedRows },
    });
  };

  const columns = [
    { field: "select", label: "#" },
    { field: "assetId", label: "Asset ID" },
    { field: "mainAsset", label: "Main Asset Number" },
    { field: "assetClass", label: "Asset Class" },
    { field: "assetDesc", label: "Asset Desc" },
    { field: "auditName", label: "Audit Name" },
    { field: "auditBy", label: "Audit By" },
    { field: "remarks", label: "Auditor Remarks" },
    { field: "date", label: "Audited Date" },
    { field: "status", label: "Asset Status" },
    { field: "location", label: "Asset Location" },
  ];

  return (
    <Box>
      <ModernTable
        title="Approve Audited Assets"
        columns={columns}
        data={filteredRows}
        onSearch={handleSearch}
        onCheckboxChange={handleCheckboxChange}
      />

      {/* ✅ Add Button */}
      <Box mt={2}>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default ITApproveAuditedAssets;


// import React, { useState } from "react";
// import ModernTable from "../common/ModernTable";

// const ITApproveAuditedAssets = () => {
//   const [search, setSearch] = useState({});

//   const rows = [
//     {
//       assetId: "703",
//       mainAsset: "60050040",
//       assetClass: "6005",
//       assetDesc: "Printer Scanner",
//       auditName: "test audit",
//       auditBy: "z_sohel",
//       remarks: "wewd",
//       date: "16-Oct-2024",
//       status: "Asset Available",
//       location: "CISF",
//     },
//   ];

//   const handleSearch = (field, value) => {
//     setSearch((prev) => ({ ...prev, [field]: value }));
//   };

//   const filteredRows = rows.filter((row) =>
//     Object.keys(search).every((key) =>
//       row[key]?.toString().toLowerCase().includes(search[key]?.toLowerCase() || "")
//     )
//   );

//   const columns = [
//     { field: "assetId", label: "Asset ID" },
//     { field: "mainAsset", label: "Main Asset Number" },
//     { field: "assetClass", label: "Asset Class" },
//     { field: "assetDesc", label: "Asset Desc" },
//     { field: "auditName", label: "Audit Name" },
//     { field: "auditBy", label: "Audit By" },
//     { field: "remarks", label: "Auditor Remarks" },
//     { field: "date", label: "Audited Date" },
//     { field: "status", label: "Asset Status" },
//     { field: "location", label: "Asset Location" },
//   ];

//   return (
//     <ModernTable
//       title="Approve Audited Assets"
//       columns={columns}
//       data={filteredRows}
//       onSearch={handleSearch}
//     />
//   );
// };

// export default ITApproveAuditedAssets;

// import React, { useState } from "react";
// import { Box, Button, Checkbox } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import ModernTable from "../common/ModernTable";

// const ITApproveAuditedAssets = () => {
//   const [search, setSearch] = useState({});
//   const [selectedRows, setSelectedRows] = useState([]);
//   const navigate = useNavigate();

//   const rows = [
//     {
//       id: 1,
//       assetId: "703",
//       mainAsset: "60050040",
//       assetClass: "6005",
//       assetDesc: "Printer Scanner",
//       auditName: "test audit",
//       auditBy: "z_sohel",
//       remarks: "wewd",
//       date: "16-Oct-2024",
//       status: "Asset Available",
//       location: "CISF",
//     },
//   ];

//   const handleSearch = (field, value) => {
//     setSearch((prev) => ({ ...prev, [field]: value }));
//   };

//   const filteredRows = rows.filter((row) =>
//     Object.keys(search).every((key) =>
//       row[key]?.toString().toLowerCase().includes(search[key]?.toLowerCase() || "")
//     )
//   );

//   // ✅ Checkbox handler
//   const handleSelect = (row) => {
//     const exists = selectedRows.find((r) => r.id === row.id);

//     if (exists) {
//       setSelectedRows(selectedRows.filter((r) => r.id !== row.id));
//     } else {
//       setSelectedRows([...selectedRows, row]);
//     }
//   };

//   const handleAdd = () => {
//     if (selectedRows.length === 0) {
//       alert("Select at least one row");
//       return;
//     }

//     // 🔥 Send selected rows to next page
//     navigate("/it-add-approve-table", { state: { selectedRows } });
//   };

//   // ✅ Add checkbox column
//   const columns = [
//     {
//       field: "select",
//       label: "#",
//       render: (row) => (
//         <Checkbox
//           checked={selectedRows.some((r) => r.id === row.id)}
//           onChange={() => handleSelect(row)}
//         />
//       ),
//     },
//     { field: "assetId", label: "Asset ID" },
//     { field: "mainAsset", label: "Main Asset Number" },
//     { field: "assetClass", label: "Asset Class" },
//     { field: "assetDesc", label: "Asset Desc" },
//     { field: "auditName", label: "Audit Name" },
//     { field: "auditBy", label: "Audit By" },
//     { field: "remarks", label: "Auditor Remarks" },
//     { field: "date", label: "Audited Date" },
//     { field: "status", label: "Asset Status" },
//     { field: "location", label: "Asset Location" },
//   ];

//   return (
//     <Box>
//       <ModernTable
//         title="Approve Audited Assets"
//         columns={columns}
//         data={filteredRows}
//         onSearch={handleSearch}
//       />

//       {/* ✅ ADD BUTTON BELOW TABLE */}
//       <Box mt={2}>
//         <Button variant="contained" onClick={handleAdd}>
//           Add
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ITApproveAuditedAssets;