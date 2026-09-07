import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortalHeader from "./PortalHeader";
import { getReports } from "../../api";
import RiskBadge from "../shared/RiskBadge";

export default function ReportsTable() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then(setReports).catch(() => {});
  }, []);

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1c1e44", 
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <PortalHeader title="Reports" />

        <div style={{ 
          backgroundColor: "#2b2f54", 
          borderRadius: "12px", 
          overflow: "hidden"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#1c1e44" }}>
                <th style={{ padding: "1rem", textAlign: "left", color: "#F5F6DB" }}>Payee</th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#F5F6DB" }}>Amount</th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#F5F6DB" }}>Score</th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#F5F6DB" }}>Level</th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#F5F6DB" }}>Status</th>
                <th style={{ padding: "1rem", textAlign: "left", color: "#F5F6DB" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr key={r.id} style={{ 
                  borderBottom: i < reports.length - 1 ? "1px solid #3a3e6e" : "none"
                }}>
                  <td style={{ padding: "1rem", color: "#F5F6DB" }}>
                    {r.payee_vpa || "Unknown"}
                  </td>
                  <td style={{ padding: "1rem", color: "#F5F6DB" }}>
                    ₹{r.amount ?? "-"}
                  </td>
                  <td style={{ padding: "1rem", color: "#F5F6DB", fontWeight: "700" }}>
                    {r.final_risk_score}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <RiskBadge level={r.risk_level} />
                  </td>
                  <td style={{ padding: "1rem", color: "#F5F6DB" }}>
                    {r.status}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <Link 
                      to={`/admin/reports/${r.id}`}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        backgroundColor: "#F5F6DB",
                        color: "#1c1e44",
                        textDecoration: "none",
                        fontWeight: "700",
                        fontSize: "0.9rem"
                      }}
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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