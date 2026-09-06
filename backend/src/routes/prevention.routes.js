const express = require("express");
const supabase = require("../services/supabase");
const router = express.Router();

router.post("/", async (req, res) => {
  const { report_id, user_action } = req.body;
  const { data, error } = await supabase.from("prevention_events").insert([{ report_id, user_action }]).select();
  if (error) throw error;
  res.json({ success: true, event: data[0] });
});
module.exports = router;