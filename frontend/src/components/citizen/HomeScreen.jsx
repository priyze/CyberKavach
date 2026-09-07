import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScanLine, Phone, AlertTriangle, ShieldHalf } from "lucide-react";
import { PALETTE, RISK_META, STRINGS } from "../../utils/constants";
import { getAlerts } from "../../api";

export default function HomeScreen() {
  const navigate = useNavigate();
  const t = STRINGS.en;
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getAlerts(true).then((data) => {
      const list = Array.isArray(data) ? data : [];
      if (list.length > 0) setAlert(list[0]);
    }).catch(() => {});
  }, []);

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

        <div className="p-5 flex flex-col gap-5">
          <div>
            <h1 style={{ color: PALETTE.cream, fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.25 }}>{t.homeTitle}</h1>
            <p style={{ color: "#aab0d8", fontSize: "0.88rem", marginTop: "0.55rem", lineHeight: 1.5 }}>{t.homeSubtitle}</p>
          </div>

          {alert && (
            <div style={{ backgroundColor: "#2b2f54", borderLeft: "3px solid #ffd166", padding: "0.65rem 0.8rem", borderRadius: "6px" }}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={17} color="#ffd166" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                <div>
                  <p style={{ fontWeight: 700, color: "#ffd166", fontSize: "0.8rem" }}>{t.activeAlertTitle}</p>
                  <p style={{ color: "#aab0d8", fontSize: "0.78rem", marginTop: "0.15rem" }}>{alert.title}{alert.description ? ` — ${alert.description}` : ""}</p>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={() => navigate("/citizen/check")}
            className="w-full flex items-center justify-center gap-2" 
            style={{ backgroundColor: "#F5F6DB", color: "#1c1e44", padding: "1rem", borderRadius: "8px", fontSize: "0.98rem", fontWeight: 700 }}
          >
            <ScanLine size={19} />
            {t.checkButton}
          </button>

          <div style={{ border: "1px solid #3a3e6e", borderRadius: "8px", padding: "0.9rem", backgroundColor: "#2b2f54" }}>
            <p style={{ color: PALETTE.cream, fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.3rem" }}>{t.demoTitle}</p>
            <p style={{ color: "#aab0d8", fontSize: "0.75rem", marginBottom: "0.75rem", lineHeight: 1.45 }}>{t.demoLabel}</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(RISK_META).map((level) => (
                <button 
                  key={level} 
                  onClick={() => navigate(`/citizen/result?level=${level}`)}
                  style={{ backgroundColor: RISK_META[level].bg, color: RISK_META[level].color, border: `1px solid ${RISK_META[level].color}33`, borderRadius: "6px", padding: "0.5rem", fontSize: "0.76rem", fontWeight: 700 }}
                >
                  {t.risk[level].label}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => navigate("/citizen/help")}
            className="w-full flex items-center justify-center gap-2" 
            style={{ backgroundColor: "#2b2f54", color: "#ff6b6b", border: "1px solid #ff6b6b55", borderRadius: "8px", padding: "0.8rem", fontSize: "0.88rem", fontWeight: 700 }}
          >
            <Phone size={17} />
            {t.emergencyButton}
          </button>

          <p style={{ textAlign: "center", color: "#aab0d8", fontSize: "0.72rem" }}>{t.trustLine}</p>
        </div>
      </div>
    </div>
  );
}