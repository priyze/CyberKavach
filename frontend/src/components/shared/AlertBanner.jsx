import { AlertTriangle } from "lucide-react";
import { PALETTE } from "../../utils/constants";

export default function AlertBanner({ elderly, t, alert }) {
  if (!alert) return null;
  return (
    <div className="flex items-start gap-2 rounded-xl" style={{ backgroundColor: "#FDF3DC", padding: elderly ? "1rem 1.1rem" : "0.7rem 0.85rem" }}>
      <AlertTriangle size={elderly ? 24 : 18} color="#8A5A00" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
      <div>
        <p style={{ fontWeight: 700, color: "#8A5A00", fontSize: elderly ? "1rem" : "0.85rem" }}>{t.activeAlertTitle}</p>
        <p style={{ color: "#8A5A00", fontSize: elderly ? "0.95rem" : "0.8rem", marginTop: "0.2rem" }}>
          {alert.title} {alert.description ? ` — ${alert.description}` : ""}
        </p>
      </div>
    </div>
  );
}