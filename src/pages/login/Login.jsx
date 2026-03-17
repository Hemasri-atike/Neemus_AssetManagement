import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bglogin.jpg";

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
      className="h-screen bg-cover bg-center flex justify-center items-center font-poppins"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-lg p-10 rounded-3xl bg-white/10 backdrop-blur-[25px] shadow-2xl text-white">
        
        <h2 className="text-center text-4xl font-medium mb-8">
          Log in
        </h2>

        {error && (
          <div className="bg-red-500/60 text-white text-center py-2 mb-4 rounded">
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
            className="h-12 rounded-xl border border-white bg-transparent px-4 text-white text-base outline-none"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">PASSWORD</label>
            <span
              className="text-sm cursor-pointer hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            className="h-12 rounded-xl border border-white bg-transparent px-4 text-white text-base outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className="text-sm underline mb-4 cursor-pointer">
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
            className="accent-blue-600 scale-110 focus:ring-2 focus:ring-blue-400"
              />
              {role}
            </label>
          ))}
        </div>

        {/* LOGIN BUTTON */}
        <button
          className="w-full h-12 bg-black rounded-2xl text-white text-lg mb-4 hover:bg-gray-800 transition"
          onClick={handleLogin}
        >
          Log In
        </button>

        {/* DOWNLOAD BUTTON */}
        <button className="w-full h-12 rounded-2xl text-lg border border-black bg-white/70 text-black hover:bg-white/90 transition">
          Download
        </button>
      </div>
    </div>
  );
};

export default Login;