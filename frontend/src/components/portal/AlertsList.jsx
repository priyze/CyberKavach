import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortalHeader from "./PortalHeader";
import { getAlerts, deleteAlert } from "../../api";
import RiskBadge from "../shared/RiskBadge";

export default function AlertsList() {
  const [alerts, setAlerts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getAlerts(false).then(setAlerts).catch(() => {});
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this alert? This cannot be undone.")) return;
    
    setDeletingId(id);
    try {
      await deleteAlert(id);
      setAlerts(alerts.filter(a => a.id !== id));
    } catch (e) {
      alert("Failed to delete alert");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1c1e44", 
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <PortalHeader title="Public Alerts" />

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {alerts.length === 0 && (
            <div style={{ 
              backgroundColor: "#2b2f54", 
              padding: "2rem", 
              borderRadius: "12px",
              textAlign: "center",
              color: "#aab0d8"
            }}>
              No alerts yet. Create one from the dashboard.
            </div>
          )}

          {alerts.map(a => (
            <div 
              key={a.id}
              style={{
                backgroundColor: "#2b2f54",
                padding: "1.5rem",
                borderRadius: "12px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                <h3 style={{ color: "#F5F6DB", margin: 0 }}>{a.title}</h3>
                <RiskBadge level={a.risk_level} />
              </div>
              <p style={{ color: "#F5F6DB", marginBottom: "0.75rem" }}>
                {a.description}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <small style={{ color: "#aab0d8" }}>
                  By {a.created_by_name} ({a.created_by_role}) • {a.scam_category}
                </small>
                <button
                  onClick={() => handleDelete(a.id)}
                  disabled={deletingId === a.id}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ff6b6b",
                    color: "#1c1e44",
                    fontWeight: "700",
                    fontSize: "0.85rem",
                    cursor: deletingId === a.id ? "not-allowed" : "pointer",
                    opacity: deletingId === a.id ? 0.5 : 1
                  }}
                >
                  {deletingId === a.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <Link 
          to="/admin/dashboard"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            backgroundColor: "transparent",
            color: "#F5F6DB",
            textDecoration: "none",
            border: "2px solid #F5F6DB"
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}