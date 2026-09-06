import { useState } from "react";
import { ArrowLeft, ScanLine, Loader2, AlertTriangle } from "lucide-react";
import { PALETTE } from "../../utils/constants";

export default function ElderlyInput({ elderly, t, onBack, onSubmit, loading, error }) {
  const [text, setText] = useState("");
  return (
    <div className="flex flex-col gap-4">
      <button onClick={onBack} className="flex items-center gap-1 self-start" style={{ color: PALETTE.navyMid, fontSize: elderly ? "1rem" : "0.85rem" }}>
        <ArrowLeft size={elderly ? 20 : 16} /> {t.back}
      </button>
      <p style={{ color: PALETTE.navyDark, fontWeight: 700, fontSize: elderly ? "1.15rem" : "0.95rem" }}>{t.pasteLabel}</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t.pastePlaceholder} rows={elderly ? 4 : 3}
        style={{ width: "100%", borderRadius: "0.75rem", border: `1px solid ${PALETTE.navyMid}`, padding: elderly ? "1rem" : "0.65rem", fontSize: elderly ? "1.05rem" : "0.9rem", color: PALETTE.navyDark, resize: "vertical" }} />
      {error && (
        <div className="flex items-center gap-2 rounded-lg" style={{ backgroundColor: "#FBE2E2", color: "#B91C1C", padding: "0.6rem 0.75rem", fontSize: elderly ? "0.95rem" : "0.8rem" }}>
          <AlertTriangle size={elderly ? 20 : 16} /> {error}
        </div>
      )}
      <button onClick={() => text.trim() && onSubmit(text.trim())} disabled={loading || !text.trim()} className="w-full flex items-center justify-center gap-2 rounded-2xl"
        style={{ backgroundColor: PALETTE.navyDark, color: PALETTE.cream, padding: elderly ? "1.4rem" : "1rem", fontSize: elderly ? "1.2rem" : "1rem", fontWeight: 700, opacity: loading || !text.trim() ? 0.6 : 1 }}>
        {loading ? <Loader2 className="animate-spin" size={elderly ? 26 : 20} /> : <ScanLine size={elderly ? 26 : 20} />}
        {loading ? t.checking : t.checkThisPayment}
      </button>
    </div>
  );
}