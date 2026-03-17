// Login.jsx
import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (API call, Firebase, etc.)
    console.log("Login attempt:", { email, password });
  };

  return (
    <div
      className="login-page-container  "
      style={{
        marginLeft: "0 !important", // ← kills sidebar push
        paddingTop: "0 !important", // ← kills navbar space
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="input-field email-field"
            />
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="input-field password-field"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
