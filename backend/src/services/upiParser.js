function parseUpiPayload(raw) {
  const r = { request_type: null, payee_vpa: null, payee_name: null, amount: null, note: null, merchant_code: null, is_url: false, is_short_link: false, malformed: false };
  if (!raw || !raw.trim()) { r.malformed = true; return r; }
  const text = raw.trim();

  if (/^https?:\/\//i.test(text)) {
    r.is_url = true;
    r.is_short_link = /bit\.ly|tinyurl|t\.co/i.test(text);
    const m = text.match(/upi:\/\/[^\s"']+/i);
    if (m) { const inner = parseUpiPayload(decodeURIComponent(m[0])); return { ...inner, is_url: true, is_short_link: r.is_short_link }; }
    return r;
  }

  if (/^upi:\/\//i.test(text)) {
    r.request_type = /collect/i.test(text) ? "upi_collect" : "upi_pay";
    const params = new URLSearchParams(text.split("?")[1] || "");
    r.payee_vpa = params.get("pa");
    r.payee_name = params.get("pn");
    r.amount = params.get("am") ? parseFloat(params.get("am")) : null;
    r.note = params.get("tn");
    r.merchant_code = params.get("mc");
    if (!r.payee_vpa) r.malformed = true;
    return r;
  }

  if (/^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(text)) {
    r.payee_vpa = text; r.request_type = "upi_id_only"; return r;
  }
  r.malformed = true; return r;
}
module.exports = { parseUpiPayload };