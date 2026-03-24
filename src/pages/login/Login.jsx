import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bglogin.jpg";
import theme from "../../theme";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!userId || !password || !selectedRole) {
      setError("Please enter all fields and select a role.");
      return;
    }

    localStorage.setItem("token", "dummyToken");
    localStorage.setItem("user", userId);
    localStorage.setItem("role", selectedRole);

    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: theme.font.family,
      }}
    >
      {/* CARD */}
      <div
        className="w-full max-w-lg p-10 backdrop-blur-[25px] shadow-2xl"
        style={{
          backgroundColor: theme.colors.glass,
          color: theme.colors.secondary,
          borderRadius: theme.borderRadius.large,
        }}
      >
        <h2 className="text-center text-4xl font-medium mb-8">
          Log in
        </h2>

        {/* ERROR */}
        {error && (
          <div
            className="text-center py-2 mb-4"
            style={{
              backgroundColor: theme.colors.error,
              color: theme.colors.secondary,
              borderRadius: theme.borderRadius.medium,
            }}
          >
            {error}
          </div>
        )}

        {/* USER ID */}
        <div className="flex flex-col mb-4">
          <label className="text-sm mb-1 tracking-wide">
            USER ID
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="h-12 px-4 bg-transparent outline-none"
            style={{
              border: `1px solid ${theme.colors.secondary}`,
              color: theme.colors.secondary,
              borderRadius: theme.borderRadius.medium,
            }}
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">PASSWORD</label>
            <span
              className="text-sm cursor-pointer"
              style={{ color: theme.colors.accent }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 px-4 bg-transparent outline-none"
            style={{
              border: `1px solid ${theme.colors.secondary}`,
              color: theme.colors.secondary,
              borderRadius: theme.borderRadius.medium,
            }}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div
          className="text-sm mb-4 cursor-pointer underline"
          style={{ color: theme.colors.accent }}
        >
          Forgot password?
        </div>

        {/* ROLES */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          {[
            "Requester",
            "Auditor",
            "Approver",
            "Admin",
            "IT- Admin",
            "HR Admin",
          ].map((role) => (
            <label key={role} className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={() => setSelectedRole(role)}
                className="scale-110"
                style={{ accentColor: theme.colors.accent }}
              />
              {role}
            </label>
          ))}
        </div>

        {/* LOGIN BUTTON */}
        <button
          className="w-full h-12 text-lg mb-4 transition"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.secondary,
            borderRadius: theme.borderRadius.large,
          }}
          onClick={handleLogin}
        >
          Log In
        </button>

        {/* DOWNLOAD BUTTON */}
        <button
          className="w-full h-12 text-lg transition"
          style={{
            border: `1px solid ${theme.colors.primary}`,
            backgroundColor: theme.colors.secondary,
            color: theme.colors.primary,
            borderRadius: theme.borderRadius.large,
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Login;