const express = require("express");
const supabase = require("../services/supabase");
const router = express.Router();

router.post("/", async (req, res) => {
  const { title, description, scam_category, risk_level } = req.body;
  const { data, error } = await supabase.from("alerts").insert([{ title, description, scam_category, risk_level, active: true, created_by_name: "Demo Analyst", created_by_role: "analyst" }]).select();
  if (error) throw error;
  res.json({ success: true, alert: data[0] });
});

router.get("/", async (req, res) => {
  let q = supabase.from("alerts").select("*").order("created_at", { ascending: false });
  if (req.query.active === "true") q = q.eq("active", true);
  const { data, error } = await q;
  if (error) throw error;
  res.json(data);
});
module.exports = router;