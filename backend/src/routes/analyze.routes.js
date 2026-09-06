const express = require("express");
const { parseUpiPayload } = require("../services/upiParser");
const { getReputation } = require("../services/reputationService");
const { analyzeRisk } = require("../services/riskEngine");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const raw = req.body.raw_payload || req.body.content;
    if (!raw) return res.status(400).json({ error: "raw_payload required" });
    const parsed = parseUpiPayload(raw);
    const rep = await getReputation(parsed.payee_vpa);
    const result = analyzeRisk(raw, parsed, rep, { source: req.body.source, elderly_mode: req.body.elderly_mode });
    res.json(result);
  } catch (e) { res.status(500).json({ error: e.message }); }
});
module.exports = router;