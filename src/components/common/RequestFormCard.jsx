import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const GRADIENT_BG =
  "linear-gradient(180deg, rgba(219,234,254,0.65) 0%, rgba(255,255,255,0.96) 55%, rgba(240,249,255,0.92) 100%)";

/**
 * Reusable gradient card for forms.
 * Put your page-specific inputs in `children`.
 */
export default function RequestFormCard({
  title,
  children,
  titleProps,
  paperSx,
  contentSx,
}) {
  return (
    <Paper
      elevation={6}
      sx={{
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: 3,
        backgroundImage: GRADIENT_BG,
        border: "1px solid rgba(147,197,253,0.42)",
        boxShadow: "0 22px 60px -28px rgba(59,130,246,0.35)",
        backdropFilter: "blur(8px)",
        ...paperSx,
      }}
    >
      {title ? (
        <Typography
          variant="h5"
          fontWeight="800"
          mb={4}
          sx={{ color: "#0b2a4a", ...titleProps?.sx }}
          {...titleProps}
        >
          {title}
        </Typography>
      ) : null}

      <div style={contentSx}>{children}</div>
    </Paper>
  );
}

