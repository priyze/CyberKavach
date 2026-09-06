const { clamp, getRiskLevel } = require("../utils/helpers");
const WEIGHTS = { payee: 0.30, payload: 0.20, amount: 0.15, intent: 0.15, qr: 0.10, context: 0.10 };

function scorePayee(rep) {
  if (!rep || !rep.record) return 0.35;
  if (rep.whitelisted) return 0.0; if (rep.blacklisted) return 1.0;
  if (rep.confirmed >= 3) return 1.0; if (rep.confirmed >= 1) return 0.75;
  if (rep.pending >= 2) return 0.65; if (rep.pending === 1) return 0.55;
  return 0.35;
}

function scorePayload(p) {
  if (p.malformed) return 0.8; if (p.is_short_link) return 0.9; if (p.is_url) return 0.8;
  if (p.request_type === "upi_collect") return 0.7; return 0.1;
}

function scoreIntent(text) {
  if (/otp|pin|password/.test(text)) return 1.0;
  if (/refund|verify|reward|prize|lottery|kyc|blocked|suspend/.test(text)) return 0.8;
  if (/immediately|urgent|last chance/.test(text)) return 0.5;
  return 0.1;
}

function scoreAmount(p, intent) {
  if (p.amount == null) return p.request_type === "upi_collect" ? 0.5 : 0.1;
  if (intent >= 0.8) return 0.9;
  if (p.amount >= 5000) return 0.7; if (p.amount >= 1000) return 0.5;
  return 0.1;
}

function analyzeRisk(raw, parsed, rep, ctx = {}) {
  const text = `${raw || ""} ${parsed.payee_name || ""} ${parsed.note || ""}`.toLowerCase();
  const indicators = [];
  
  const payee = scorePayee(rep); const payload = scorePayload(parsed);
  const intent = scoreIntent(text); const amount = scoreAmount(parsed, intent);
  const qr = ctx.source === "whatsapp_forward" ? 0.6 : 0.2;
  const context = ctx.elderly_mode ? 0.3 : 0.1;

  if (rep.blacklisted) indicators.push("Blacklisted UPI ID");
  if (rep.confirmed > 0) indicators.push(`${rep.confirmed} prior scam reports`);
  if (parsed.request_type === "upi_collect") indicators.push("Unsolicited Collect Request");
  if (intent >= 0.8) indicators.push("Scam language detected");
  if (amount >= 0.7) indicators.push("Suspicious amount");

  const base = 100 * (WEIGHTS.payee*payee + WEIGHTS.payload*payload + WEIGHTS.amount*amount + WEIGHTS.intent*intent + WEIGHTS.qr*qr + WEIGHTS.context*context);
  const boost = Math.min(25, (rep.blacklisted ? 15 : 0) + 5 * rep.confirmed + 2 * rep.pending);
  const offset = Math.min(30, (rep.whitelisted ? 20 : 0));
  
  const final = clamp(Math.round(base + boost - offset), 0, 100);
  const level = getRiskLevel(final);
  
  let category = "Suspicious UPI Request";
  if (parsed.request_type === "upi_collect") category = "Fake UPI Collect Request";
  else if (/lottery|prize/.test(text)) category = "Lottery Scam";
  else if (/kyc|blocked/.test(text)) category = "Bank Phishing";
  else if (/refund/.test(text)) category = "Fake Refund Scam";

  return {
    final_risk_score: final, risk_level: level,
    recommended_action: level === "CRITICAL" ? "STOP_PAYMENT" : level === "HIGH" ? "REVIEW_DELAY" : "PROCEED",
    scam_category: category,
    simple_explanation: level === "CRITICAL" ? "Dangerous! Do not enter UPI PIN." : level === "HIGH" ? "Suspicious. Verify before paying." : "Appears safe.",
    transaction_details: { payee_vpa: parsed.payee_vpa, payee_name: parsed.payee_name, amount: parsed.amount, note: parsed.note, request_type: parsed.request_type },
    feature_scores: { payee, payload, amount, intent, qr_source: qr, context },
    risk_indicators: indicators,
    safety_advice: ["Do not share OTP/PIN", "Do not approve collect requests", "Call 1930 if paid"]
  };
}
module.exports = { analyzeRisk };