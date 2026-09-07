import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldHalf } from "lucide-react";
import { PALETTE, STRINGS } from "../../utils/constants";

export default function ReportSuccess() {
  const navigate = useNavigate();
  const t = STRINGS.en;

  return (
    <div className="min-h-screen flex items-start justify-center p-4" style={{ backgroundColor: PALETTE.cream, fontFamily: "Manrope, system-ui, sans-serif" }}>
      <div className="w-full max-w-sm overflow-hidden" style={{ border: "1px solid #3a3e6e", borderRadius: "12px", backgroundColor: "#1c1e44" }}>
        <div className="px-5 pt-4 pb-3" style={{ backgroundColor: "#1c1e44", borderBottom: "1px solid #3a3e6e" }}>
          <div className="flex items-center gap-2">
            <ShieldHalf size={20} color={PALETTE.cream} />
            <div>
              <div style={{ color: PALETTE.cream, fontWeight: 800, fontSize: "0.98rem" }}>{t.appName}</div>
              <div style={{ color: "#aab0d8", fontSize: "0.68rem" }}>{t.tagline}</div>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <h1 style={{ color: PALETTE.cream, fontWeight: 800, fontSize: "1.5rem" }}>{t.reportSent}</h1>
          <p style={{ color: "#aab0d8", fontSize: "0.9rem", lineHeight: 1.5 }}>
            Your report helps protect others from similar scams. Thank you for making Digital India safer.
          </p>
          <button 
            onClick={() => navigate("/citizen")}
            className="w-full"
            style={{ backgroundColor: "#F5F6DB", color: "#1c1e44", padding: "1rem", borderRadius: "8px", fontSize: "0.98rem", fontWeight: 700, border: "none", cursor: "pointer", marginTop: "1rem" }}
          >
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
}