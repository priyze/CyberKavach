import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortalHeader from "./PortalHeader";
import { getStats } from "../../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats).catch(() => {});
  }, []);

  const statCards = [
    { label: "Total Reports", value: stats?.total_reports ?? "-", color: "#F5F6DB" },
    { label: "Pending", value: stats?.pending_reports ?? "-", color: "#ffd166" },
    { label: "Confirmed Scams", value: stats?.confirmed_scams ?? "-", color: "#ff6b6b" },
    { label: "Critical", value: stats?.critical_reports ?? "-", color: "#ff6b6b" },
    { label: "Active Alerts", value: stats?.active_alerts ?? "-", color: "#7ee2a8" },
    { label: "Preventions", value: stats?.prevented_events ?? "-", color: "#7ee2a8" },
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1c1e44", 
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <PortalHeader title="Analyst Dashboard" />

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "1rem",
          marginBottom: "2rem"
        }}>
          {statCards.map((stat, i) => (
            <div 
              key={i}
              style={{
                backgroundColor: "#2b2f54",
                padding: "1.5rem",
                borderRadius: "12px",
                textAlign: "center"
              }}
            >
              <div style={{ fontSize: "2.5rem", fontWeight: "800", color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ color: "#aab0d8", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link 
            to="/admin/reports"
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "#F5F6DB",
              color: "#1c1e44",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: "700"
            }}
          >
            View Reports
          </Link>
          <Link 
            to="/admin/alerts/new"
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "#ff6b6b",
              color: "#1c1e44",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: "700"
            }}
          >
            Create Public Alert
          </Link>
          <Link 
            to="/admin/alerts"
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "1rem",
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: "#F5F6DB",
              textDecoration: "none",
              textAlign: "center",
              fontWeight: "700",
              border: "2px solid #F5F6DB"
            }}
          >
            View Alerts
          </Link>
        </div>
      </div>
    </div>
  );
}