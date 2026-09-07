import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ScanLine, Loader2, AlertTriangle, ShieldHalf } from "lucide-react";
import { PALETTE, STRINGS } from "../../utils/constants";
import { analyzeUpi } from "../../api";

export default function InputScreen() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const t = STRINGS.en;

  async function handleSubmit() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeUpi(text.trim(), "manual", false);
      navigate("/citizen/result", { state: { result: data, raw: text.trim() } });
    } catch (e) {
      setError(t.checkError);
    } finally {
      setLoading(false);
    }
  }

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
          <p style={{ color: PALETTE.cream, fontWeight: 700, fontSize: "0.92rem" }}>{t.pasteLabel}</p>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder={t.pastePlaceholder} 
            rows={3} 
            style={{ width: "100%", borderRadius: "8px", border: "1px solid #3a3e6e", padding: "0.7rem", fontSize: "0.9rem", color: PALETTE.cream, resize: "vertical", backgroundColor: "#2b2f54" }} 
          />
          {error && (
            <div className="flex items-center gap-2" style={{ backgroundColor: "#ff6b6b22", color: "#ff6b6b", padding: "0.65rem 0.8rem", borderRadius: "6px", fontSize: "0.8rem" }}>
              <AlertTriangle size={15} />
              {error}
            </div>
          )}
          <button 
            onClick={handleSubmit} 
            disabled={loading || !text.trim()} 
            className="w-full flex items-center justify-center gap-2" 
            style={{ backgroundColor: "#F5F6DB", color: "#1c1e44", borderRadius: "8px", padding: "0.9rem", fontSize: "0.95rem", fontWeight: 700, opacity: loading || !text.trim() ? 0.55 : 1 }}
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <ScanLine size={18} />}
            {loading ? t.checking : t.checkThisPayment}
          </button>
        </div>
      </div>
    </div>
  );
}