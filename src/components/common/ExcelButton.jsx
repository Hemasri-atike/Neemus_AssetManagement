import React from "react";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

/**
 * Reusable Excel (CSV) Export Button Component
 * @param {Object} props
 * @param {Array} props.data - The array of objects to export
 * @param {string} props.filename - Desired name for the exported file
 * @param {string} props.label - Button text
 * @param {Object} props.sx - MUI style overrides
 */
const ExcelButton = ({ 
  data = [], 
  filename = "export.csv", 
  label = "Export To Excel", 
  sx = {} 
}) => {
  
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    // Prepare CSV content
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","), // Header row
      ...data.map(row => 
        headers.map(field => {
          let cell = row[field] === null || row[field] === undefined ? "" : row[field];
          // Escape quotes and commas
          cell = cell.toString().replace(/"/g, '""');
          if (cell.includes(",") || cell.includes('"')) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(",")
      )
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="contained"
      startIcon={<FileDownloadIcon />}
      onClick={handleExport}
      sx={{
        background: "linear-gradient(135deg, #166534 0%, #15803d 100%)", // Excel Green
        color: "white",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "8px",
        px: 3,
        py: 1,
        boxShadow: "0 4px 10px rgba(22, 101, 52, 0.3)",
        "&:hover": {
          background: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
          boxShadow: "0 6px 15px rgba(22, 101, 52, 0.4)",
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

export default ExcelButton;
