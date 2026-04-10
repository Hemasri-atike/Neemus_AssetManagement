import React from "react";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

/**
 * Reusable Print/PDF Button Component
 * @param {Object} props
 * @param {string} props.label - Button text
 * @param {Function} props.onBeforePrint - Optional callback before printing
 * @param {Object} props.sx - MUI style overrides
 */
const PrintPdfButton = ({ label = "Print PDF", onBeforePrint, sx = {} }) => {
  const handlePrint = () => {
    if (onBeforePrint) onBeforePrint();
    window.print();
  };

  return (
    <Button
      variant="contained"
      startIcon={<PrintIcon />}
      onClick={handlePrint}
      sx={{
        background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
        color: "white",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "8px",
        px: 3,
        py: 1,
        boxShadow: "0 4px 10px rgba(37, 99, 235, 0.3)",
        "&:hover": {
          background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
          boxShadow: "0 6px 15px rgba(37, 99, 235, 0.4)",
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};

export default PrintPdfButton;
