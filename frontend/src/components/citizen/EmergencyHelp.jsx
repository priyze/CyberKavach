import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Users, ShieldHalf } from "lucide-react";
import { PALETTE, STRINGS } from "../../utils/constants";

export default function EmergencyHelp() {
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
          <button onClick={() => navigate("/citizen")} className="flex items-center gap-1 self-start" style={{ color: "#aab0d8", fontSize: "0.85rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={16} />
            {t.back}
          </button>
          <h2 style={{ color: PALETTE.cream, fontSize: "1.15rem", fontWeight: 800 }}>{t.getHelpNowTitle}</h2>
          <a href="tel:1930" className="w-full flex flex-col items-center justify-center gap-1" style={{ backgroundColor: "#ff6b6b", color: "#1c1e44", borderRadius: "8px", padding: "1.4rem", textDecoration: "none" }}>
            <Phone size={26} />
            <span style={{ fontSize: "1.02rem", fontWeight: 800, marginTop: "0.3rem" }}>{t.call1930}</span>
            <span style={{ fontSize: "0.78rem", opacity: 0.85 }}>{t.helpline}</span>
          </a>
          <button className="w-full flex flex-col items-center justify-center gap-1" style={{ backgroundColor: "#2b2f54", color: PALETTE.cream, borderRadius: "8px", padding: "1.1rem" }}>
            <Users size={22} />
            <span style={{ fontSize: "0.92rem", fontWeight: 700, marginTop: "0.2rem" }}>{t.askFamily}</span>
          </button>
        </div>
      </div>
    </div>
  );
}