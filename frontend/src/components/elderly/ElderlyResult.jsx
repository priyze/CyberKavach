import { ArrowLeft, Volume2, Phone, ShieldCheck, CheckCircle2, Flag, Users, ShieldAlert, ShieldX } from "lucide-react";
import { PALETTE, RISK_META } from "../../utils/constants";
import { formatAction } from "../../utils/speech";

const ICONS = { SAFE: ShieldCheck, LOW: ShieldAlert, HIGH: ShieldAlert, CRITICAL: ShieldX };

export default function ElderlyResult({ elderly, t, risk, apiResult, onBack, onEmergency, onReplay, onReport, reportStatus, onNotPay, notPaySent }) {
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

  return (
    <div className="flex flex-col gap-4">
      <button onClick={onBack} className="flex items-center gap-1 self-start" style={{ color: PALETTE.navyMid, fontSize: elderly ? "1rem" : "0.85rem" }}>
        <ArrowLeft size={elderly ? 20 : 16} /> {t.back}
      </button>
      <div className="rounded-2xl flex flex-col items-center text-center" style={{ backgroundColor: meta.bg, padding: elderly ? "2rem 1.25rem" : "1.5rem 1rem" }}>
        <Icon size={elderly ? 64 : 44} color={meta.color} />
        <h2 style={{ color: meta.color, fontSize: elderly ? "2rem" : "1.4rem", fontWeight: 800, marginTop: "0.75rem" }}>{copy.label}</h2>
        <p style={{ color: PALETTE.navyDark, fontSize: elderly ? "1.1rem" : "0.9rem", marginTop: "0.5rem" }}>{copy.message}</p>
      </div>
      {(score != null || action) && (
        <div className="flex justify-between gap-3 rounded-xl" style={{ backgroundColor: PALETTE.navyTint, padding: elderly ? "0.85rem 1.1rem" : "0.6rem 0.75rem" }}>
          {score != null && <div style={{ fontSize: elderly ? "0.95rem" : "0.8rem", color: PALETTE.navyDark }}><span style={{ fontWeight: 700 }}>{t.riskScoreLabel}: </span>{score}/100</div>}
          {action && <div style={{ fontSize: elderly ? "0.95rem" : "0.8rem", color: PALETTE.navyDark, textAlign: "right" }}><span style={{ fontWeight: 700 }}>{t.recommendedActionLabel}: </span>{formatAction(action)}</div>}
        </div>
      )}
      {(details || category) && (
        <div className="rounded-xl flex flex-col gap-2" style={{ backgroundColor: PALETTE.navyTint, padding: elderly ? "1rem 1.1rem" : "0.75rem" }}>
          {category && <div className="flex justify-between gap-2" style={{ fontSize: elderly ? "1rem" : "0.85rem", color: PALETTE.navyDark }}><span style={{ fontWeight: 700 }}>{t.scamCategoryLabel}</span><span>{category}</span></div>}
          {details?.payee_name && <div className="flex justify-between gap-2" style={{ fontSize: elderly ? "1rem" : "0.85rem", color: PALETTE.navyDark }}><span style={{ fontWeight: 700 }}>{t.payeeLabel}</span><span>{details.payee_name}</span></div>}
          {details?.amount != null && <div className="flex justify-between gap-2" style={{ fontSize: elderly ? "1rem" : "0.85rem", color: PALETTE.navyDark }}><span style={{ fontWeight: 700 }}>{t.amountLabel}</span><span>₹{details.amount}</span></div>}
        </div>
      )}
      <button onClick={onReplay} className="w-full flex items-center justify-center gap-2 rounded-xl" style={{ backgroundColor: PALETTE.navyTint, color: PALETTE.navyDark, padding: elderly ? "1rem" : "0.7rem", fontSize: elderly ? "1rem" : "0.85rem", fontWeight: 700 }}>
        <Volume2 size={elderly ? 22 : 16} /> {t.hearAgain}
      </button>
      {showCall && (
        <a href="tel:1930" className="w-full flex items-center justify-center gap-2 rounded-xl" style={{ backgroundColor: "#B91C1C", color: "#FFFFFF", padding: elderly ? "1.25rem" : "0.85rem", fontSize: elderly ? "1.15rem" : "0.95rem", fontWeight: 800, textDecoration: "none" }}>
          <Phone size={elderly ? 24 : 18} /> {t.callNow}
        </a>
      )}
      {showNotPay && (
        <button onClick={onNotPay} disabled={notPaySent} className="w-full flex items-center justify-center gap-2 rounded-xl"
          style={{ backgroundColor: notPaySent ? "#E6F4EA" : PALETTE.navyTint, color: notPaySent ? "#1B7A43" : PALETTE.navyDark, padding: elderly ? "1rem" : "0.7rem", fontSize: elderly ? "1rem" : "0.85rem", fontWeight: 700 }}>
          {notPaySent ? <CheckCircle2 size={elderly ? 22 : 16} /> : <ShieldCheck size={elderly ? 22 : 16} />}
          {notPaySent ? t.notPayConfirmed : t.notPayButton}
        </button>
      )}
      {indicators && indicators.length > 0 && (
        <div className="rounded-xl" style={{ backgroundColor: "#FDF3DC", padding: elderly ? "1rem 1.1rem" : "0.75rem" }}>
          <p style={{ fontWeight: 700, color: "#8A5A00", fontSize: elderly ? "1rem" : "0.85rem", marginBottom: "0.4rem" }}>{t.riskIndicatorsTitle}</p>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {indicators.map((item, i) => <li key={i} style={{ color: "#8A5A00", fontSize: elderly ? "0.95rem" : "0.8rem" }}>{item}</li>)}
          </ul>
        </div>
      )}
      {advice && advice.length > 0 && (
        <div className="rounded-xl" style={{ backgroundColor: PALETTE.cream, padding: elderly ? "1rem 1.1rem" : "0.75rem", border: `1px solid ${PALETTE.navyTint}` }}>
          <p style={{ fontWeight: 700, color: PALETTE.navyDark, fontSize: elderly ? "1rem" : "0.85rem", marginBottom: "0.4rem" }}>{t.adviceTitle}</p>
          <ul style={{ margin: 0, paddingLeft: "1.1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {advice.map((item, i) => <li key={i} style={{ color: PALETTE.navyMid, fontSize: elderly ? "0.95rem" : "0.8rem" }}>{item}</li>)}
          </ul>
        </div>
      )}
      <button onClick={onReport} disabled={reportStatus === "sending" || reportStatus === "sent"} className="w-full flex items-center justify-center gap-2 rounded-xl"
        style={{ backgroundColor: PALETTE.white, color: PALETTE.navyMid, padding: elderly ? "1rem" : "0.7rem", fontSize: elderly ? "1rem" : "0.85rem", fontWeight: 700, border: `1px solid ${PALETTE.navyMid}` }}>
        {reportStatus === "sending" ? <Loader2 className="animate-spin" size={elderly ? 20 : 16} /> : reportStatus === "sent" ? <CheckCircle2 size={elderly ? 20 : 16} /> : <Flag size={elderly ? 20 : 16} />}
        {reportStatus === "sent" ? t.reportSent : reportStatus === "sending" ? t.reportSending : t.reportButton}
      </button>
      <button onClick={onEmergency} className="w-full flex items-center justify-center gap-2 rounded-xl" style={{ backgroundColor: PALETTE.white, color: PALETTE.navyMid, padding: elderly ? "1rem" : "0.7rem", fontSize: elderly ? "1rem" : "0.85rem", fontWeight: 700, border: `1px solid ${PALETTE.navyMid}` }}>
        <Users size={elderly ? 20 : 16} /> {t.getHelp}
      </button>
    </div>
  );
}