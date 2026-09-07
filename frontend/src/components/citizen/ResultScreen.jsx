import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Volume2, Phone, ShieldCheck, ShieldAlert, ShieldX, CheckCircle2, Flag, Users, ShieldHalf } from "lucide-react";
import { PALETTE, RISK_META, STRINGS } from "../../utils/constants";
import { formatAction } from "../../utils/speech";
import { submitReport, recordPrevention } from "../../api";
import { getAnonymousId } from "../../utils/anonymousId";

const ICONS = { SAFE: ShieldCheck, LOW: ShieldAlert, HIGH: ShieldAlert, CRITICAL: ShieldX };

function RiskMeter({ score }) {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(score) ? score : 0));
  const bands = [
    { width: 25, color: "#7ee2a822" },
    { width: 25, color: "#ffd16622" },
    { width: 25, color: "#ff9f6822" },
    { width: 25, color: "#ff6b6b22" },
  ];
  return (
    <div style={{ paddingTop: "0.85rem" }}>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", height: "9px", borderRadius: "999px", overflow: "hidden", border: "1px solid #3a3e6e" }}>
          {bands.map((b, i) => <div key={i} style={{ width: `${b.width}%`, backgroundColor: b.color }} />)}
        </div>
        <div style={{ position: "absolute", top: "-6px", left: `calc(${clamped}% - 5px)`, width: "10px", height: "21px", borderRadius: "3px", backgroundColor: "#F5F6DB", border: "2px solid #1c1e44" }} />
      </div>
      <div className="flex justify-between" style={{ marginTop: "0.4rem" }}>
        {["0", "25", "50", "75", "100"].map((n) => <span key={n} style={{ fontSize: "0.65rem", color: "#aab0d8", fontWeight: 500 }}>{n}</span>)}
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between" style={{ padding: "0.4rem 0", borderBottom: "1px solid #3a3e6e" }}>
      <span style={{ color: "#aab0d8", fontSize: "0.8rem", fontWeight: 600 }}>{label}</span>
      <span style={{ color: PALETTE.cream, fontSize: "0.82rem", fontWeight: 700, textAlign: "right" }}>{value}</span>
    </div>
  );
}

export default function ResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const t = STRINGS.en;
  const [reportStatus, setReportStatus] = useState("idle");
  const [notPaySent, setNotPaySent] = useState(false);

  // Get data from location state (real API result) or URL params (demo mode)
  const stateData = location.state;
  const demoLevel = searchParams.get("level");
  
  const risk = stateData?.result?.risk_level || demoLevel || "CRITICAL";
  const apiResult = stateData?.result || {
    transaction_details: {
      payee_name: risk === "SAFE" ? "Trusted Shop" : "Fraudster UPI",
      amount: risk === "SAFE" ? 250 : 4999,
    },
    scam_category: risk === "SAFE" ? "Normal payment" : "Fake refund scam",
    final_risk_score: risk === "SAFE" ? 12 : 99,
    recommended_action: risk === "SAFE" ? "ALLOW" : "STOP_PAYMENT",
    risk_indicators: risk === "SAFE" ? [] : ["Blacklisted UPI ID", "Suspicious refund language", "High round amount"],
    safety_advice: risk === "SAFE" ? ["Proceed with normal caution."] : ["Do not enter your UPI PIN.", "This matches a known fake-refund scam pattern."],
  };
  const rawPayload = stateData?.raw || `demo-${risk.toLowerCase()}`;

  useEffect(() => {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(t.risk[risk].voice);
      utter.rate = 0.85;
      utter.lang = t.voiceLang;
      window.speechSynthesis.speak(utter);
    }
  }, [risk]);

  const meta = RISK_META[risk];
  const copy = t.risk[risk];
  const Icon = ICONS[risk];
  const showCall = risk === "HIGH" || risk === "CRITICAL";
  const showNotPay = risk !== "SAFE";
  const details = apiResult?.transaction_details;
  const advice = apiResult?.safety_advice;
  const category = apiResult?.scam_category;
  const score = apiResult?.final_risk_score;
  const action = apiResult?.recommended_action;
  const indicators = apiResult?.risk_indicators;

  async function handleReport() {
    setReportStatus("sending");
    try {
      await submitReport({
        anonymous_id: getAnonymousId(),
        raw_payload: rawPayload,
        input_type: "upi",
        source: "manual",
      });
      setReportStatus("sent");
    } catch (e) {
      setReportStatus("idle");
    }
  }

  async function handleNotPay() {
    setNotPaySent(true);
    try {
      await recordPrevention(null, "I did not pay");
    } catch (e) {}
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

          <div style={{ backgroundColor: meta.bg + "33", borderRadius: "8px", padding: "1.2rem 1rem" }}>
            <div className="flex items-center gap-3">
              <Icon size={32} color={meta.color} style={{ flexShrink: 0 }} />
              <h2 style={{ color: meta.color, fontSize: "1.1rem", fontWeight: 800, lineHeight: 1.15 }}>{copy.label}</h2>
            </div>
            <p style={{ color: PALETTE.cream, fontSize: "0.87rem", marginTop: "0.7rem", lineHeight: 1.5 }}>{copy.message}</p>
            {score != null && (
              <>
                <div className="flex items-center justify-between" style={{ marginTop: "0.9rem" }}>
                  <span style={{ fontSize: "0.78rem", color: "#aab0d8", fontWeight: 600 }}>{t.riskScoreLabel}</span>
                  <span style={{ fontSize: "0.9rem", color: PALETTE.cream, fontWeight: 800 }}>{score}/100</span>
                </div>
                <RiskMeter score={score} />
              </>
            )}
          </div>

          {(details || category || action) && (
            <div style={{ padding: "0 0.1rem" }}>
              {action && <DetailRow label={t.recommendedActionLabel} value={formatAction(action)} />}
              {category && <DetailRow label={t.scamCategoryLabel} value={category} />}
              {details?.payee_name && <DetailRow label={t.payeeLabel} value={details.payee_name} />}
              {details?.amount != null && <DetailRow label={t.amountLabel} value={`₹${details.amount}`} />}
            </div>
          )}

          <button 
            onClick={() => {
              if ("speechSynthesis" in window) {
                const utter = new SpeechSynthesisUtterance(t.risk[risk].voice);
                utter.rate = 0.85;
                utter.lang = t.voiceLang;
                window.speechSynthesis.speak(utter);
              }
            }}
            className="w-full flex items-center justify-center gap-2" 
            style={{ backgroundColor: "#2b2f54", color: PALETTE.cream, borderRadius: "6px", padding: "0.65rem", fontSize: "0.83rem", fontWeight: 700 }}
          >
            <Volume2 size={16} />
            {t.hearAgain}
          </button>

          {showCall && (
            <a href="tel:1930" className="w-full flex items-center justify-center gap-2" style={{ backgroundColor: "#ff6b6b", color: "#1c1e44", borderRadius: "6px", padding: "0.85rem", fontSize: "0.92rem", fontWeight: 800, textDecoration: "none" }}>
              <Phone size={17} />
              {t.callNow}
            </a>
          )}

          {showNotPay && (
            <button 
              onClick={handleNotPay} 
              disabled={notPaySent} 
              className="w-full flex items-center justify-center gap-2" 
              style={{ backgroundColor: notPaySent ? "#7ee2a822" : "#2b2f54", color: notPaySent ? "#7ee2a8" : PALETTE.cream, border: `1px solid ${notPaySent ? "#7ee2a8" : "#3a3e6e"}`, borderRadius: "6px", padding: "0.65rem", fontSize: "0.83rem", fontWeight: 700 }}
            >
              {notPaySent ? <CheckCircle2 size={15} /> : <ShieldCheck size={15} />}
              {notPaySent ? t.notPayConfirmed : t.notPayButton}
            </button>
          )}

          {indicators && indicators.length > 0 && (
            <div style={{ borderLeft: "3px solid #ffd166", backgroundColor: "#ffd16622", borderRadius: "6px", padding: "0.75rem 0.85rem" }}>
              <p style={{ fontWeight: 700, color: "#ffd166", fontSize: "0.82rem", marginBottom: "0.4rem" }}>{t.riskIndicatorsTitle}</p>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {indicators.map((item, i) => <li key={i} style={{ color: "#aab0d8", fontSize: "0.78rem" }}>{item}</li>)}
              </ul>
            </div>
          )}

          {advice && advice.length > 0 && (
            <div style={{ border: "1px solid #3a3e6e", borderRadius: "6px", padding: "0.75rem 0.85rem", backgroundColor: "#2b2f54" }}>
              <p style={{ fontWeight: 700, color: PALETTE.cream, fontSize: "0.82rem", marginBottom: "0.4rem" }}>{t.adviceTitle}</p>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {advice.map((item, i) => <li key={i} style={{ color: "#aab0d8", fontSize: "0.78rem" }}>{item}</li>)}
              </ul>
            </div>
          )}

          <button 
            onClick={handleReport} 
            disabled={reportStatus === "sending" || reportStatus === "sent"} 
            className="w-full flex items-center justify-center gap-2" 
            style={{ backgroundColor: "#2b2f54", color: "#aab0d8", borderRadius: "6px", padding: "0.65rem", fontSize: "0.83rem", fontWeight: 700, border: "1px solid #3a3e6e" }}
          >
            {reportStatus === "sending" ? <Loader2 className="animate-spin" size={15} /> : reportStatus === "sent" ? <CheckCircle2 size={15} /> : <Flag size={15} />}
            {reportStatus === "sent" ? t.reportSent : reportStatus === "sending" ? t.reportSending : t.reportButton}
          </button>

          <button 
            onClick={() => navigate("/citizen/help")} 
            className="w-full flex items-center justify-center gap-2" 
            style={{ backgroundColor: "#2b2f54", color: "#aab0d8", borderRadius: "6px", padding: "0.65rem", fontSize: "0.83rem", fontWeight: 700, border: "1px solid #3a3e6e" }}
          >
            <Users size={15} />
            {t.getHelp}
          </button>
        </div>
      </div>
    </div>
  );
}