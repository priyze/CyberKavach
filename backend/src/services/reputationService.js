const supabase = require("./supabase");

async function getReputation(vpa) {
  if (!vpa) return { blacklisted: false, whitelisted: false, confirmed: 0, pending: 0, record: null };
  const { data: bl } = await supabase.from("blacklist").select("*").eq("value", vpa).maybeSingle();
  const { data: rep } = await supabase.from("payee_reputation").select("*").eq("payee_vpa", vpa).maybeSingle();
  return {
    blacklisted: !!bl, whitelisted: rep ? rep.whitelisted : false,
    confirmed: rep ? rep.confirmed_scam_reports : 0, pending: rep ? rep.pending_reports : 0, record: rep || null
  };
}

async function recordReport(vpa) {
  if (!vpa) return;
  const { data } = await supabase.from("payee_reputation").select("*").eq("payee_vpa", vpa).maybeSingle();
  if (data) {
    await supabase.from("payee_reputation").update({ total_reports: data.total_reports + 1, pending_reports: data.pending_reports + 1, last_seen_at: new Date().toISOString() }).eq("id", data.id);
  } else {
    await supabase.from("payee_reputation").insert([{ payee_vpa: vpa, total_reports: 1, pending_reports: 1 }]);
  }
}

async function confirmScam(vpa) {
  if (!vpa) return;
  const { data } = await supabase.from("payee_reputation").select("*").eq("payee_vpa", vpa).maybeSingle();
  if (data) {
    await supabase.from("payee_reputation").update({ confirmed_scam_reports: data.confirmed_scam_reports + 1, pending_reports: Math.max(0, data.pending_reports - 1), risk_level: "CRITICAL" }).eq("id", data.id);
  }
}
module.exports = { getReputation, recordReport, confirmScam };