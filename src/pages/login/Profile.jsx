import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Divider,
  Button,
} from "@mui/material";

const Profile = () => {
  const user = localStorage.getItem("user") || "User";
  const role = localStorage.getItem("role") || "Role";

  const profileData = {
    firstName: user,
    lastName: "",
    employer: "Neemus Software Solutions",
    employeeId: "EMP001",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    email: `${user}@company.com`,
    role: role,
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      
      {/* 🔷 HEADER CARD (Plastic Blue style) */}
      <Card
        className="rounded-2xl shadow-lg mb-6"
        sx={{
          background:
            "linear-gradient(180deg, #9cccf2 0%, #5a9fd4 38%, #3a78b8 72%, #2a5a94 100%)",
          color: "white",
        }}
      >
        <CardContent className="flex items-center gap-4">
          
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "#ffffff",
              color: "#2a5a94",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {user.charAt(0).toUpperCase()}
          </Avatar>

          <div>
            <Typography variant="h6" fontWeight="600">
              {profileData.firstName}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {profileData.role}
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* 🔷 DETAILS CARD */}
      <Card className="rounded-2xl shadow-md border border-slate-200">
        <CardContent>
          
          <Typography
            variant="h6"
            fontWeight="600"
            className="mb-2 text-slate-700"
          >
            Profile Details
          </Typography>

          <Divider className="mb-4" />

          <Grid container spacing={3}>
            
            {[
              ["First Name", profileData.firstName],
              ["Last Name", profileData.lastName || "-"],
              ["Employer", profileData.employer],
              ["Employee ID", profileData.employeeId],
              ["Country", profileData.country],
              ["State", profileData.state],
              ["City", profileData.city],
              ["Email", profileData.email],
              ["Role", profileData.role],
            ].map(([label, value], index) => (
              <Grid item xs={12} md={label === "Country" || label === "State" || label === "City" ? 4 : 6} key={index}>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 hover:shadow-sm transition">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="font-medium text-slate-700">{value}</p>
                </div>
              </Grid>
            ))}

          </Grid>

          {/* 🔷 BUTTON */}
          <div className="flex justify-end mt-6">
            <Button
              variant="contained"
              sx={{
                background:
                  "linear-gradient(180deg, #5a9fd4, #2a5a94)",
                "&:hover": {
                  background:
                    "linear-gradient(180deg, #3a78b8, #1e3f6b)",
                },
                textTransform: "none",
                borderRadius: "10px",
                paddingX: 3,
              }}
            >
              Update Password
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;