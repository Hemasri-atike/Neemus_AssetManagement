import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  IconButton, 
  Stack,
  alpha 
} from "@mui/material";
import { 
  FaCheckCircle, 
  FaClock, 
  FaTimesCircle, 
  FaClipboardList, 
  FaMapMarkerAlt, 
  FaUserEdit, 
  FaChartBar,
  FaArrowRight
} from "react-icons/fa";

const ApproverDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Approver";

  // Navigation Items Configuration
  const navItems = [
    {
      title: "Asset Approvals",
      description: "Review and approve or reject new asset purchase and allocation requests.",
      icon: <FaClipboardList />,
      path: "/assets/reqassettable",
      color: "#3b82f6", // Blue
    },
    {
      title: "Location Transfers",
      description: "Approve or reject physical asset movement requests between locations.",
      icon: <FaMapMarkerAlt />,
      path: "/assets/reqloctable",
      color: "#f59e0b", // Amber
    },
    {
      title: "Reports & Analytics",
      description: "Access comprehensive reports on asset utilization and approval history.",
      icon: <FaChartBar />,
      path: "/reports",
      color: "#6366f1", // Indigo
    },
  ];

  return (
    <Box sx={{  bgcolor: "#f8fafc", pt: 10, pb: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      
      {/* HEADER SECTION */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          fontWeight="800" 
          sx={{ color: "#1e293b", mb: 1, letterSpacing: "-0.02em" }}
        >
          Welcome Back, {username}!
        </Typography>
        <Typography variant="body1" sx={{ color: "#64748b" }}>
          Here's a summary of pending approvals and your dashboard overview.
        </Typography>
      </Box>

      {/* STATS SECTION */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        <Grid item xs={12} sm={6} md={3}>
          <CompactStatCard title="Pending Assets" value="12" icon={<FaClock />} color="#f59e0b" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CompactStatCard title="Approved Total" value="45" icon={<FaCheckCircle />} color="#10b981" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CompactStatCard title="Pending Transfers" value="05" icon={<FaMapMarkerAlt />} color="#3b82f6" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CompactStatCard title="Total Reports" value="62" icon={<FaChartBar />} color="#6366f1" />
        </Grid>
      </Grid>

      {/* NAVIGATION CARDS GRID */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="700" sx={{ color: "#334155", mb: 4 }}>
          Approval Modules & Quick Links
        </Typography>
        <Grid container spacing={4}>
          {navItems.map((item, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <NavigationCard item={item} navigate={navigate} />
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

/* --- SUB-COMPONENTS --- */

const CompactStatCard = ({ title, value, icon, color }) => (
  <Card 
    elevation={0}
    sx={{ 
      borderRadius: 4, 
      border: "1px solid",
      borderColor: "divider",
      bgcolor: "white",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 12px 24px -10px rgba(0,0,0,0.1)",
      }
    }}
  >
    <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar 
          sx={{ 
            bgcolor: alpha(color, 0.1), 
            color: color,
            width: 48,
            height: 48,
            borderRadius: 3
          }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography variant="caption" fontWeight="600" sx={{ color: "#64748b", textTransform: "uppercase" }}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="800" sx={{ color: "#1e293b" }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const NavigationCard = ({ item, navigate }) => (
  <Card 
    sx={{ 
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 5,
      position: "relative",
      overflow: "hidden",
      border: "1px solid",
      borderColor: "rgba(226, 232, 240, 0.8)",
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        borderColor: alpha(item.color, 0.3),
        boxShadow: `0 20px 25px -5px ${alpha(item.color, 0.1)}, 0 10px 10px -5px ${alpha(item.color, 0.04)}`,
        "& .action-btn": {
          bgcolor: item.color,
          color: "white",
          transform: "translateX(4px)"
        }
      }
    }}
  >
    {/* Colored Accent Top Strip */}
    <Box sx={{ height: 6, bgcolor: item.color }} />

    <CardContent sx={{ p: 4, flexGrow: 1 }}>
      <Box 
        sx={{ 
          display: "inline-flex", 
          p: 1.5, 
          borderRadius: 4, 
          bgcolor: alpha(item.color, 0.1), 
          color: item.color,
          fontSize: "1.5rem",
          mb: 3
        }}
      >
        {item.icon}
      </Box>

      <Typography variant="h6" fontWeight="700" sx={{ color: "#1e293b", mb: 1 }}>
        {item.title}
      </Typography>
      
      <Typography variant="body2" sx={{ color: "#64748b", mb: 3, lineHeight: 1.6 }}>
        {item.description}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
        <IconButton 
          className="action-btn"
          onClick={() => navigate(item.path)}
          sx={{ 
            bgcolor: "#f1f5f9", 
            color: "#475569",
            borderRadius: 3,
            transition: "all 0.2s",
            fontSize: "0.875rem",
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": { bgcolor: item.color, color: "white" }
          }}
        >
          <Typography variant="inherit" fontWeight="600">Open Module</Typography>
          <FaArrowRight size={12} />
        </IconButton>
      </Stack>
    </CardContent>
  </Card>
);

export default ApproverDashboard;