import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const [role, setRole] = useState("analyst");
  const navigate = useNavigate();

  function enter() {
    localStorage.setItem("portal_role", role);
    navigate("/admin/dashboard");
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1c1e44", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{ 
        backgroundColor: "#2b2f54", 
        padding: "2.5rem", 
        borderRadius: "16px", 
        maxWidth: "400px",
        width: "100%"
      }}>
        <h1 style={{ color: "#F5F6DB", marginBottom: "0.5rem", fontSize: "2rem" }}>
          🏛️ Government Portal
        </h1>
        <p style={{ color: "#aab0d8", marginBottom: "1.5rem" }}>
          Select your role to access the dashboard
        </p>
        
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "2px solid #F5F6DB",
            backgroundColor: "#1c1e44",
            color: "#F5F6DB",
            fontSize: "1rem",
            marginBottom: "1rem"
          }}
        >
          <option value="analyst">Analyst</option>
          <option value="admin">Admin</option>
          <option value="volunteer">Volunteer</option>
        </select>

        <button 
          onClick={enter}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#F5F6DB",
            color: "#1c1e44",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}