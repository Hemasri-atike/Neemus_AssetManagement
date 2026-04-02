import React from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

const GRADIENT =
  "linear-gradient(135deg, rgba(219,234,254,1) 0%, rgba(147,197,253,1) 45%, rgba(96,165,250,0.95) 100%)";

/**
 * Pastel-blue gradient button you can reuse anywhere.
 * - If `to` is provided, it navigates using react-router Link.
 * - Otherwise use `onClick` for page-specific navigation.
 */
export default function SendRequestButton({
  label = "Send Request",
  to,
  onClick,
  disabled,
  type = "button",
  fullWidthOnMobile = true,
}) {
  return (
    <Button
      type={type}
      variant="contained"
      disabled={disabled}
      onClick={to ? undefined : onClick}
      component={to ? RouterLink : "button"}
      to={to}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        borderRadius: 2,
        px: { xs: 2.5, sm: 4 },
        py: { xs: 1.2, sm: 1.5 },
        width: fullWidthOnMobile ? { xs: "100%", sm: "auto" } : "auto",
        backgroundImage: GRADIENT,
        color: "#0f172a",
        boxShadow: "0 10px 30px -12px rgba(59,130,246,0.55)",
        "&:hover": {
          backgroundImage:
            "linear-gradient(135deg, rgba(191,219,254,1) 0%, rgba(59,130,246,0.95) 50%, rgba(34,211,238,0.8) 100%)",
          boxShadow: "0 14px 35px -14px rgba(59,130,246,0.65)",
        },
        "&.Mui-disabled": {
          backgroundImage:
            "linear-gradient(135deg, rgba(226,232,240,1) 0%, rgba(148,163,184,0.9) 100%)",
          color: "#64748b",
          boxShadow: "none",
        },
      }}
    >
      {label}
    </Button>
  );
}

