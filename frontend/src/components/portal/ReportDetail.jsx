import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PortalHeader from "./PortalHeader";
import { getReport, updateReportStatus } from "../../api";
import RiskBadge from "../shared/RiskBadge";
import { STATUS_OPTIONS } from "../../utils/constants";

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    getReport(id).then(setReport).catch(() => {});
  }, [id]);

  async function setStatus(status) {
    await updateReportStatus(id, status);
    setReport({ ...report, status });
  }

  if (!report) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: "#1c1e44", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        color: "#F5F6DB",
        fontSize: "1.5rem"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#1c1e44", 
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <PortalHeader title="Report Detail" />

        <div style={{ 
          backgroundColor: "#2b2f54", 
          padding: "1.5rem", 
          borderRadius: "12px",
          marginBottom: "1.5rem"
        }}>
          <div style={{ marginBottom: "1rem" }}>
            <strong style={{ color: "#aab0d8" }}>Raw Payload:</strong>
            <p style={{ color: "#F5F6DB", fontFamily: "monospace", wordBreak: "break-all", marginTop: "0.5rem" }}>
              {report.raw_payload}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <strong style={{ color: "#aab0d8" }}>Payee VPA:</strong>
              <p style={{ color: "#F5F6DB" }}>{report.payee_vpa || "-"}</p>
            </div>
            <div>
              <strong style={{ color: "#aab0d8" }}>Payee Name:</strong>
              <p style={{ color: "#F5F6DB" }}>{report.payee_name || "-"}</p>
            </div>
            <div>
              <strong style={{ color: "#aab0d8" }}>Amount:</strong>
              <p style={{ color: "#F5F6DB" }}>₹{report.amount ?? "-"}</p>
            </div>
            <div>
              <strong style={{ color: "#aab0d8" }}>Note:</strong>
              <p style={{ color: "#F5F6DB" }}>{report.note || "-"}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <strong style={{ color: "#aab0d8" }}>Risk Score:</strong>
              <span style={{ color: "#F5F6DB", fontSize: "1.5rem", fontWeight: "800", marginLeft: "0.5rem" }}>
                {report.final_risk_score}/100
              </span>
            </div>
            <RiskBadge level={report.risk_level} />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong style={{ color: "#aab0d8" }}>Category:</strong>
            <p style={{ color: "#F5F6DB" }}>{report.scam_category}</p>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <strong style={{ color: "#aab0d8" }}>Explanation:</strong>
            <p style={{ color: "#F5F6DB" }}>{report.explanation}</p>
          </div>

          <div>
            <strong style={{ color: "#aab0d8" }}>Current Status:</strong>
            <p style={{ color: "#F5F6DB", fontWeight: "700" }}>{report.status}</p>
          </div>
        </div>

        <div style={{ 
          backgroundColor: "#2b2f54", 
          padding: "1.5rem", 
          borderRadius: "12px",
          marginBottom: "1.5rem"
        }}>
          <h3 style={{ color: "#F5F6DB", marginBottom: "1rem" }}>Update Status</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {STATUS_OPTIONS.map(s => (
              <button 
                key={s}
                onClick={() => setStatus(s)}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: report.status === s ? "#F5F6DB" : "#1c1e44",
                  color: report.status === s ? "#1c1e44" : "#F5F6DB",
                  fontWeight: "700",
                  cursor: "pointer",
                  textTransform: "capitalize"
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link 
            to="/admin/alerts/new"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              backgroundColor: "#ff6b6b",
              color: "#1c1e44",
              textDecoration: "none",
              fontWeight: "700"
            }}
          >
            Create Alert From This
          </Link>
          <Link 
            to="/admin/reports"
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: "#F5F6DB",
              textDecoration: "none",
              border: "2px solid #F5F6DB"
            }}
          >
            ← Back to Reports
          </Link>
        </div>
      </div>
    </div>
  );
}