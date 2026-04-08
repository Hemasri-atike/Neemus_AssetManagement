import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, Button, Grid, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustTransferDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <Typography sx={{ p: 3 }}>No Data Found</Typography>;

  const detailItems = [
    { label: "Asset Name", value: state.assetName },
    { label: "Requestor ID", value: state.requestorId },
    { label: "Requestor Name", value: state.requestorName },
    { label: "Transfer To", value: state.transferTo },
    { label: "Requestor Comments", value: state.requestorComments },
    { label: "Approver ID", value: state.approverId || "N/A" },
    { label: "Approver Remarks", value: state.approverRemarks || "N/A" },
    { label: "Date", value: state.date },
    { label: "Status", value: state.status },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Dashboard
      </Button>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#0f172a" }}>
          Custodian Transfer Details
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mb: 3 }}>
          Review the asset transfer request information below.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {detailItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box>
                <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>
                  {item.label}
                </Typography>
                <Typography variant="body1" sx={{ color: "#1e293b", fontWeight: 500 }}>
                  {item.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default CustTransferDetails;
