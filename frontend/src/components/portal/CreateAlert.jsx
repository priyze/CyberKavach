import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortalHeader from "./PortalHeader";
import { createAlert } from "../../api";

export default function CreateAlert() {
  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
    scam_category: "UPI Scam", 
    risk_level: "CRITICAL" 
  });
  const navigate = useNavigate();

  async function submit() {
    await createAlert({ 
      ...form, 
      created_by_name: "Demo Analyst", 
      created_by_role: localStorage.getItem("portal_role") || "analyst" 
    });
    navigate("/admin/alerts");
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1c1e44", 
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <PortalHeader title="Create Public Alert" />

        <div style={{ 
          backgroundColor: "#2b2f54", 
          padding: "1.5rem", 
          borderRadius: "12px"
        }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#F5F6DB", display: "block", marginBottom: "0.5rem" }}>
              Alert Title
            </label>
            <input 
              placeholder="e.g., Fake UPI Collect Request Alert"
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#1c1e44",
                color: "#F5F6DB",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#F5F6DB", display: "block", marginBottom: "0.5rem" }}>
              Alert Description
            </label>
            <textarea 
              placeholder="Describe the scam and safety advice..."
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={5}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#1c1e44",
                color: "#F5F6DB",
                fontSize: "1rem",
                resize: "vertical"
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#F5F6DB", display: "block", marginBottom: "0.5rem" }}>
              Risk Level
            </label>
            <select 
              value={form.risk_level} 
              onChange={e => setForm({ ...form, risk_level: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#1c1e44",
                color: "#F5F6DB",
                fontSize: "1rem"
              }}
            >
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="LOW">LOW</option>
              <option value="SAFE">SAFE</option>
            </select>
          </div>

          <button 
            onClick={submit}
            disabled={!form.title || !form.description}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ff6b6b",
              color: "#1c1e44",
              fontSize: "1rem",
              fontWeight: "700",
              cursor: "pointer",
              opacity: !form.title || !form.description ? 0.5 : 1
            }}
          >
            Publish Alert
          </button>
        </div>
      </div>
    </div>
  );
}