import { Languages } from "lucide-react";
import { PALETTE } from "../../utils/constants";

export default function LanguageSelect({ language, onChange, label, elderly }) {
  return (
    <div className="flex items-center gap-2 rounded-full" style={{ backgroundColor: PALETTE.navyTint, padding: elderly ? "0.85rem 1.1rem" : "0.4rem 0.7rem" }}>
      <Languages size={elderly ? 26 : 18} color={PALETTE.navyDark} />
      <select value={language} onChange={(e) => onChange(e.target.value)} aria-label={label}
        style={{ backgroundColor: "transparent", color: PALETTE.navyDark, fontWeight: 700, fontSize: elderly ? "1.1rem" : "0.85rem", border: "none", outline: "none" }}>
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
}