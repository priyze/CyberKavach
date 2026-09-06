const express = require("express");
const supabase = require("../services/supabase");
const router = express.Router();

router.get("/stats", async (req, res) => {
  const { data: reports } = await supabase.from("reports").select("*");
  const { data: alerts } = await supabase.from("alerts").select("*");
  const { data: events } = await supabase.from("prevention_events").select("*");
  res.json({
    total_reports: (reports||[]).length, pending_reports: (reports||[]).filter(r=>r.status==='pending').length,
    confirmed_scams: (reports||[]).filter(r=>r.status==='confirmed scam').length,
    critical_reports: (reports||[]).filter(r=>r.risk_level==='CRITICAL').length,
    active_alerts: (alerts||[]).filter(a=>a.active).length, prevented_events: (events||[]).length
  });
});
module.exports = router;