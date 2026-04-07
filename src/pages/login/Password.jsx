import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Password = ({ open, handleClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔐 Password validation regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleUpdate = () => {
    const storedPassword =
      localStorage.getItem("password") || "1234";

    // ❌ Old password check
    if (oldPassword !== storedPassword) {
      setError("Old password is incorrect");
      return;
    }

    // ❌ Validation check
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must contain uppercase, lowercase, number & 8+ characters"
      );
      return;
    }

    // ❌ Match check
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // ✅ Save password
    localStorage.setItem("password", newPassword);

    alert("Password updated successfully ✅");

    // 🔄 Reset fields
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent className="p-6">

        {/* TITLE */}
        <Typography
          variant="h6"
          className="mb-2 font-semibold text-center"
        >
          Reset Password
        </Typography>

        {/* SUB TEXT */}
        <Typography className="text-xs text-slate-500 mb-4 text-center">
          Password must contain at least one number, one uppercase and lowercase letter and at least 8 characters
        </Typography>

        {/* OLD PASSWORD */}
        <TextField
          label="Current Password *"
          type={showOld ? "text" : "password"}
          fullWidth
          size="small"
          className="mb-4"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          error={!!error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowOld(!showOld)}>
                  {showOld ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* NEW PASSWORD */}
        <TextField
          label="New Password *"
          type={showNew ? "text" : "password"}
          fullWidth
          size="small"
          className="mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNew(!showNew)}>
                  {showNew ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* CONFIRM PASSWORD */}
        <TextField
          label="Confirm Password *"
          type={showConfirm ? "text" : "password"}
          fullWidth
          size="small"
          className="mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!error}
          helperText={error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleUpdate}
          disabled={!oldPassword || !newPassword || !confirmPassword}
          sx={{
            mt: 2,
            background: "linear-gradient(180deg, #5a9fd4, #2a5a94)",
            "&:hover": {
              background: "linear-gradient(180deg, #3a78b8, #1e3f6b)",
            },
            textTransform: "none",
            borderRadius: "8px",
          }}
        >
          Reset Password
        </Button>

      </DialogContent>
    </Dialog>
  );
};

export default Password;