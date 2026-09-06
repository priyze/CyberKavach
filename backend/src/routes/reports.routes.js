const express = require("express");
const supabase = require("../services/supabase");
const { parseUpiPayload } = require("../services/upiParser");
const { getReputation, recordReport, confirmScam } = require("../services/reputationService");
const { analyzeRisk } = require("../services/riskEngine");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const b = req.body; const raw = b.raw_payload || b.content;
    const parsed = parseUpiPayload(raw); const rep = await getReputation(parsed.payee_vpa);
    const risk = analyzeRisk(raw, parsed, rep, { source: b.source });
    await recordReport(parsed.payee_vpa);
    const { data, error } = await supabase.from("reports").insert([{
      anonymous_id: b.anonymous_id, input_type: b.input_type || "upi", raw_payload: raw, parsed_payload: parsed,
      payee_vpa: parsed.payee_vpa, payee_name: parsed.payee_name, amount: parsed.amount, note: parsed.note,
      request_type: parsed.request_type, source: b.source, feature_scores: risk.feature_scores,
      final_risk_score: risk.final_risk_score, risk_level: risk.risk_level, recommended_action: risk.recommended_action,
      scam_category: risk.scam_category, explanation: risk.simple_explanation, safety_advice: risk.safety_advice.join(", "), status: "pending"
    }]).select();
    if (error) throw error;
    res.json({ success: true, report: data[0] });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get("/", async (req, res) => {
  let q = supabase.from("reports").select("*").order("created_at", { ascending: false });
  if (req.query.status) q = q.eq("status", req.query.status);
  const { data, error } = await q;
  if (error) throw error;
  res.json(data);
});

router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  const { data, error } = await supabase.from("reports").update({ status }).eq("id", req.params.id).select().single();
  if (error) throw error;
  if (status === "confirmed scam" && data.payee_vpa) await confirmScam(data.payee_vpa);
  res.json({ success: true, report: data });
});
module.exports = router;