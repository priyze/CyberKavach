import { ScanLine, Phone } from "lucide-react";
import { PALETTE, RISK_META } from "../../utils/constants";
import AlertBanner from "../shared/AlertBanner";

export default function ElderlyHome({ elderly, t, onStartCheck, onCheck, onEmergency, alert }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 style={{ color: PALETTE.navyDark, fontWeight: elderly ? 800 : 600, fontSize: elderly ? "1.75rem" : "1.25rem", lineHeight: 1.2 }}>{t.homeTitle}</h1>
        <p style={{ color: PALETTE.navyMid, fontSize: elderly ? "1.05rem" : "0.9rem", marginTop: "0.4rem" }}>{t.homeSubtitle}</p>
      </div>
      <AlertBanner elderly={elderly} t={t} alert={alert} />
      <button className="w-full flex flex-col items-center justify-center gap-2 rounded-2xl" style={{ backgroundColor: PALETTE.navyDark, color: PALETTE.cream, padding: elderly ? "2rem 1rem" : "1.25rem 1rem" }} onClick={onStartCheck}>
        <ScanLine size={elderly ? 40 : 28} />
        <span style={{ fontSize: elderly ? "1.3rem" : "1rem", fontWeight: 600 }}>{t.checkButton}</span>
      </button>
      <div className="rounded-xl" style={{ backgroundColor: PALETTE.navyTint, padding: "0.9rem" }}>
        <p style={{ color: PALETTE.navyMid, fontSize: elderly ? "0.95rem" : "0.8rem", marginBottom: "0.6rem" }}>{t.demoLabel}</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(RISK_META).map((level) => (
            <button key={level} onClick={() => onCheck(level)} className="rounded-lg" style={{ backgroundColor: RISK_META[level].bg, color: RISK_META[level].color, padding: elderly ? "0.75rem 0.5rem" : "0.5rem", fontSize: elderly ? "0.9rem" : "0.75rem", fontWeight: 700 }}>
              {t.risk[level].label}
            </button>
          ))}
        </div>
      </div>
      <button onClick={onEmergency} className="w-full flex items-center justify-center gap-2 rounded-2xl" style={{ backgroundColor: "#FBE2E2", color: "#B91C1C", padding: elderly ? "1.25rem" : "0.85rem", fontSize: elderly ? "1.1rem" : "0.95rem", fontWeight: 700 }}>
        <Phone size={elderly ? 24 : 18} /> {t.emergencyButton}
      </button>
    </div>
  );
}