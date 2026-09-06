function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function getRiskLevel(score) {
  if (score >= 75) return "CRITICAL";
  if (score >= 50) return "HIGH";
  if (score >= 25) return "LOW";
  return "SAFE";
}
module.exports = { clamp, getRiskLevel };