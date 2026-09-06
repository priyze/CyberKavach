import { ArrowLeft, Phone, Users } from "lucide-react";
import { PALETTE } from "../../utils/constants";

export default function ElderlyEmergency({ elderly, t, onBack }) {
  return (
    <div className="flex flex-col gap-4">
      <button onClick={onBack} className="flex items-center gap-1 self-start" style={{ color: PALETTE.navyMid, fontSize: elderly ? "1rem" : "0.85rem" }}>
        <ArrowLeft size={elderly ? 20 : 16} /> {t.back}
      </button>
      <h2 style={{ color: PALETTE.navyDark, fontSize: elderly ? "1.6rem" : "1.2rem", fontWeight: 800 }}>{t.getHelpNowTitle}</h2>
      <a href="tel:1930" className="w-full flex flex-col items-center justify-center gap-2 rounded-2xl" style={{ backgroundColor: "#B91C1C", color: "#FFFFFF", padding: elderly ? "2rem" : "1.25rem", textDecoration: "none" }}>
        <Phone size={elderly ? 40 : 28} />
        <span style={{ fontSize: elderly ? "1.3rem" : "1rem", fontWeight: 800 }}>{t.call1930}</span>
        <span style={{ fontSize: elderly ? "0.95rem" : "0.8rem", opacity: 0.9 }}>{t.helpline}</span>
      </a>
      <button className="w-full flex flex-col items-center justify-center gap-2 rounded-2xl" style={{ backgroundColor: PALETTE.navyTint, color: PALETTE.navyDark, padding: elderly ? "1.5rem" : "1rem" }}>
        <Users size={elderly ? 36 : 24} />
        <span style={{ fontSize: elderly ? "1.15rem" : "0.95rem", fontWeight: 800 }}>{t.askFamily}</span>
      </button>
    </div>
  );
}