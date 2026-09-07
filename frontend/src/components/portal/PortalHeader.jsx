import React from "react";
import { Link } from "react-router-dom";

export default function PortalHeader({ title }) {
  return (
    <div style={{ 
      backgroundColor: "#2b2f54", 
      padding: "1rem 1.5rem", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      borderRadius: "12px",
      marginBottom: "1.5rem"
    }}>
      <h2 style={{ color: "#F5F6DB", margin: 0, fontSize: "1.5rem" }}>
        🏛️ {title || "Government Portal"}
      </h2>
      <Link 
        to="/admin/dashboard" 
        style={{ 
          color: "#F5F6DB", 
          textDecoration: "none",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          backgroundColor: "#1c1e44"
        }}
      >
        Dashboard
      </Link>
    </div>
  );
}