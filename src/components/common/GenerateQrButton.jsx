import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { QrCode } from "lucide-react";

/**
 * Reusable Generate QR Button Component
 * @param {Object} props
 * @param {string} props.label - Button text
 * @param {Array} props.data - Array of items to generate QRs for
 * @param {Function} props.onGenerated - Callback after QR URLs are prepared
 * @param {Object} props.sx - MUI style overrides
 */
const GenerateQrButton = ({ 
  label = "Generate QR Codes", 
  data = [], 
  onGenerated, 
  sx = {} 
}) => {
  const [loading, setLoading] = useState(false);

  const generateQrs = async () => {
    if (data.length === 0) {
      alert("No data provided to generate QR codes.");
      return;
    }

    setLoading(true);
    
    // Simulate generation/API lag
    setTimeout(() => {
      const qrUrls = data.map(item => ({
        id: item.id || item.mainAssetNumber,
        url: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${item.qrCode || item.id}`
      }));

      setLoading(false);
      if (onGenerated) onGenerated(qrUrls);
    }, 800);
  };

  return (
    <Button
      variant="outlined"
      startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <QrCode size={18} />}
      onClick={generateQrs}
      disabled={loading}
      sx={{
        borderColor: "#475569",
        color: "#1e293b",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "8px",
        px: 3,
        py: 1,
        borderWidth: "1.5px",
        "&:hover": {
          borderColor: "#0f172a",
          bgcolor: "rgba(15, 23, 42, 0.04)",
          borderWidth: "1.5px",
        },
        ...sx,
      }}
    >
      {loading ? "Generating..." : label}
    </Button>
  );
};

export default GenerateQrButton;
