import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import {
  PLASTIC_BLUE_HEADER_GRADIENT,
  tableHeadCellSx,
} from "../../theme/plasticBlueTable";
import ExcelButton from "../common/ExcelButton";
import PrintPdfButton from "../common/PrintPdfButton";

// Expanded Professional Dummy Data
const dummyAssets = [
  { id: 1, name: "Dell Latitude 5420", type: "Laptop", status: "Available", location: "Hyderabad", cost: 75000 },
  { id: 2, name: "MacBook Pro M2", type: "Laptop", status: "Assigned", location: "Bangalore", cost: 150000 },
  { id: 3, name: "Ergonomic Chair", type: "Furniture", status: "Available", location: "Hyderabad", cost: 12000 },
  { id: 4, name: "iPhone 14", type: "Mobile", status: "Damaged", location: "Mumbai", cost: 80000 },
  { id: 5, name: "Dell Monitor 27\"", type: "Peripheral", status: "Assigned", location: "Bangalore", cost: 25000 },
  { id: 6, name: "Office Desk", type: "Furniture", status: "Available", location: "Hyderabad", cost: 15000 },
  { id: 7, name: "MacBook Air M1", type: "Laptop", status: "Under Repair", location: "Mumbai", cost: 90000 },
  { id: 8, name: "Logitech MX Master 3", type: "Peripheral", status: "Assigned", location: "Hyderabad", cost: 9000 },
  { id: 9, name: "iPad Air", type: "Tablet", status: "Available", location: "Bangalore", cost: 55000 },
  { id: 10, name: "Cisco Router", type: "Networking", status: "Assigned", location: "Mumbai", cost: 45000 },
  { id: 11, name: "HP EliteBook", type: "Laptop", status: "Available", location: "Hyderabad", cost: 82000 },
  { id: 12, name: "Steelcase Gesture", type: "Furniture", status: "Damaged", location: "Bangalore", cost: 45000 },
];

const Assetreports = () => {
  const [statusFilter, setStatusFilter] = useState("All");

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredAssets = statusFilter === "All" 
    ? dummyAssets 
    : dummyAssets.filter(asset => asset.status === statusFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case "Available": return "#2E7D32"; // Green
      case "Assigned": return "#1565C0"; // Blue
      case "Damaged": return "#C62828"; // Red
      case "Under Repair": return "#ED6C02"; // Orange
      default: return "#757575";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Available": return "#E8F5E9";
      case "Assigned": return "#E3F2FD";
      case "Damaged": return "#FFEBEE";
      case "Under Repair": return "#FFF3E0";
      default: return "#F5F5F5";
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
      {/* Header & Filter Toolbar */}
      <Stack 
        direction={{ xs: "column", sm: "row" }} 
        justifyContent="space-between" 
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#1e293b" gutterBottom>
            Asset Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and filter organization-wide asset records.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Paper 
            elevation={0} 
            sx={{ 
              p: 0.5, 
              borderRadius: 2, 
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              minWidth: 200
            }}
          >
            <FilterListIcon sx={{ color: "#64748b", mr: 1, ml: 1 }} />
            <FormControl fullWidth size="small" variant="standard">
              <InputLabel id="status-filter-label" sx={{ ml: 1 }}>Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                onChange={handleFilterChange}
                disableUnderline
                sx={{ ml: 1, fontWeight: 500 }}
              >
                <MenuItem value="All">All Statuses</MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Assigned">Assigned</MenuItem>
                <MenuItem value="Damaged">Damaged</MenuItem>
                <MenuItem value="Under Repair">Under Repair</MenuItem>
              </Select>
            </FormControl>
          </Paper>

          <ExcelButton 
            data={filteredAssets} 
            filename={`Asset_Report_${statusFilter}_${new Date().toLocaleDateString()}.csv`}
            label="Export Excel"
            sx={{ height: 40 }}
          />
          <PrintPdfButton 
            label="Print PDF" 
            sx={{ height: 40 }}
          />
        </Stack>
      </Stack>

      {/* Main Table Container */}
      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          overflow: "hidden"
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ background: PLASTIC_BLUE_HEADER_GRADIENT }}>
            <TableRow>
              <TableCell sx={tableHeadCellSx}>Asset Name</TableCell>
              <TableCell sx={tableHeadCellSx}>Category</TableCell>
              <TableCell sx={tableHeadCellSx}>Status</TableCell>
              <TableCell sx={tableHeadCellSx}>Location</TableCell>
              <TableCell sx={tableHeadCellSx} align="right">Value (INR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <TableRow 
                  key={asset.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 0.2s' }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600, color: "#334155" }}>
                    {asset.name}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={asset.type} 
                      size="small" 
                      variant="outlined" 
                      sx={{ borderRadius: "6px", fontWeight: 500, color: "#64748b" }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        backgroundColor: getStatusBg(asset.status),
                        color: getStatusColor(asset.status),
                        border: `1px solid ${getStatusColor(asset.status)}30`
                      }}
                    >
                      {asset.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LocationOnIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
                      <Typography variant="body2" sx={{ color: "#475569" }}>{asset.location}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, color: "#1e293b" }}>
                    ₹{asset.cost.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    No assets found matching the selected status.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Info */}
      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Typography variant="caption" color="text.secondary">
          Showing {filteredAssets.length} of {dummyAssets.length} total assets
        </Typography>
      </Box>
    </Box>
  );
};

export default Assetreports;