import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import Password from "./Password";

const Profile = () => {
  const [openPassword, setOpenPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const user = localStorage.getItem("user") || "User";
  const role = localStorage.getItem("role") || "Role";
  const storedEmail = localStorage.getItem("email") || `${user.toLowerCase()}@company.com`;

  const [email, setEmail] = useState(storedEmail);

  const profileData = {
    firstName: user,
    lastName: "",
    employer: "Neemus Software Solutions",
    employeeId: "EMP001",
    country: "India",
    state: "Telangana",
    city: "Hyderabad",
    email: email,
    role: role,
  };

  const handleSave = () => {
    localStorage.setItem("email", email);
    setIsEditing(false);
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="p-0 sm:p-2 md:p-4 animate-in fade-in duration-500">
      
      {/* 🔷 HEADER CARD */}
      <Card
        className="rounded-3xl shadow-xl mb-6 overflow-hidden border-none"
        sx={{
          background:
            "linear-gradient(135deg, #004b80 0%, #2a5a94 100%)",
          color: "white",
        }}
      >
        <CardContent className="flex flex-col sm:flex-row items-center gap-6 p-8">
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              border: "3px solid rgba(255, 255, 255, 0.4)",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "32px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
            }}
          >
            {user.charAt(0).toUpperCase()}
          </Avatar>

          <div className="text-center sm:text-left flex-1">
            <Typography variant="h4" fontWeight="700" className="tracking-tight">
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: "400" }}>
              {profileData.role}
            </Typography>
            <div className="mt-2 inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-xs font-medium backdrop-blur-md border border-white/20">
              Employee ID: {profileData.employeeId}
            </div>
          </div>

          <div className="flex gap-3">
             <Button
              variant="outlined"
              onClick={() => setIsEditing(!isEditing)}
              sx={{
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                textTransform: "none",
                borderRadius: "12px",
                px: 3,
              }}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 🔷 DETAILS CARD */}
      <Card className="rounded-3xl shadow-2xl border border-white/20 bg-white/70 backdrop-blur-xl">
        <CardContent className="p-8">
          
          <div className="flex justify-between items-center mb-6">
            <Typography
              variant="h5"
              fontWeight="700"
              className="text-slate-800"
            >
              Profile Information
            </Typography>
            {isEditing && (
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "600",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
                }}
              >
                Save Changes
              </Button>
            )}
          </div>

          <Divider className="mb-8 opacity-50" />

          <Grid container spacing={4}>
            {[
              { label: "First Name", value: profileData.firstName, editable: false },
              { label: "Last Name", value: profileData.lastName || "-", editable: false },
              { label: "Email Address", value: email, editable: true, type: "email" },
              { label: "Employer", value: profileData.employer, editable: false },
              { label: "Role", value: profileData.role, editable: false },
              { label: "Country", value: profileData.country, editable: false },
              { label: "State", value: profileData.state, editable: false },
              { label: "City", value: profileData.city, editable: false },
            ].map((field, index) => (
              <Grid
                item
                xs={12}
                md={field.label === "Email Address" ? 12 : 6}
                lg={field.label === "Email Address" || field.label === "Employer" ? 6 : 4}
                key={index}
              >
                <div className="group transition-all duration-300">
                  <Typography variant="caption" className="text-slate-400 font-bold tracking-wider uppercase ml-1">
                    {field.label}
                  </Typography>
                  <div className={`mt-1.5 transition-all duration-300 rounded-2xl p-4 ${
                    field.editable && isEditing 
                      ? "bg-white border-2 border-sky-400 shadow-inner" 
                      : "bg-slate-50/50 border border-slate-100 group-hover:border-sky-100 group-hover:bg-sky-50/30"
                  }`}>
                    {field.editable && isEditing ? (
                      <input
                        type={field.type || "text"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-slate-800 font-semibold text-lg"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        autoFocus
                      />
                    ) : (
                      <Typography className="text-slate-700 font-semibold text-lg truncate">
                        {field.value}
                      </Typography>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>

          {/* 🔷 SECURITY SECTION */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <Typography variant="h6" fontWeight="700" className="text-slate-800 mb-4">
              Security
            </Typography>
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-amber-50/50 border border-amber-100 rounded-3xl gap-4">
              <div>
                <Typography className="font-bold text-amber-900">Account Password</Typography>
                <Typography variant="body2" className="text-amber-700">Update your account password regularly to stay secure.</Typography>
              </div>
              <Button
                variant="contained"
                onClick={() => setOpenPassword(true)}
                sx={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #d97706, #b45309)",
                  },
                  textTransform: "none",
                  borderRadius: "14px",
                  paddingX: 4,
                  fontWeight: "600",
                  whiteSpace: "nowrap"
                }}
              >
                Change Password
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* 🔥 PASSWORD MODAL */}
      <Password
        open={openPassword}
        handleClose={() => setOpenPassword(false)}
      />
    </div>
  );
};

export default Profile;