// import React, { useState } from "react";
// import ModernTable from "../common/ModernTable";

// const ITAddApproveAuditedAssets = () => {
//   const navigate = useNavigate();
//   const [remarks, setRemarks] = useState("");

//   const rows = [
//     {
//       assetId: "698",
//       mainAsset: "60050011",
//       assetClass: "6005",
//       assetDesc: "Printer HP",
//       auditName: "test audit",
//       auditBy: "z_sohel",
//       remarks: "add",
//       date: "18-11-2024",
//       status: "Damaged",
//       location: "IT DEPARTMENT",
//     },
//   ];

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

//   const handleApprove = () => {
//     navigate("/view-page");
//   };

//   const handleReject = () => {
//     navigate("/view-page");
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <ModernTable title="Selected Assets" columns={columns} data={rows} />

//       <Box mt={3}>
//         <Typography>Remarks</Typography>
//         <TextField
//           fullWidth
//           multiline
//           rows={3}
//           value={remarks}
//           onChange={(e) => setRemarks(e.target.value)}
//         />
//       </Box>

//       <Box mt={3} display="flex" gap={2}>
//         <Button variant="contained" onClick={handleApprove}>Approve</Button>
//         <Button variant="outlined" onClick={handleReject}>Reject</Button>
//       </Box>
//     </Box>
//   );
// };

// export default ITAddApproveAuditedAssets;

import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ModernTable from "../common/ModernTable";

const ITAddApproveAuditedAssets = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get selected rows
  const rows = location.state?.selectedRows || [];

  const [remarks, setRemarks] = useState("");

  const columns = [
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

  const handleApprove = () => {
    console.log("Approved:", rows, remarks);
    navigate("/view-page");
  };

  const handleReject = () => {
    console.log("Rejected:", rows, remarks);
    navigate("/view-page");
  };

  return (
    <Box sx={{ p: 3 }}>

      <ModernTable
        title="Selected Assets"
        columns={columns}
        data={rows}
      />

      {/* ✅ Remarks */}
      <Box mt={3}>
        <Typography>Remarks</Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </Box>

      {/* ✅ Buttons */}
      <Box mt={3} display="flex" gap={2}>
        <Button variant="contained" onClick={handleApprove}>
          Approve
        </Button>
        <Button variant="outlined" onClick={handleReject}>
          Reject
        </Button>
      </Box>

    </Box>
  );
};

export default ITAddApproveAuditedAssets;
