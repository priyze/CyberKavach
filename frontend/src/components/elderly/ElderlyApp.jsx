import { useState, useEffect } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { PALETTE, STRINGS } from "../../utils/constants";
import { speak } from "../../utils/speech";
import { analyzeUpi, submitReport, recordPrevention, getAlerts } from "../../api";
import { getAnonymousId } from "../../utils/anonymousId";
import LanguageSelect from "../shared/LanguageSelect";
import ElderlyHome from "./ElderlyHome";
import ElderlyInput from "./ElderlyInput";
import ElderlyResult from "./ElderlyResult";
import ElderlyEmergency from "./ElderlyEmergency";

export default function ElderlyApp() {
  const [elderly, setElderly] = useState(true);
  const [language, setLanguage] = useState("en");
  const [screen, setScreen] = useState("home");
  const [risk, setRisk] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [rawPayload, setRawPayload] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(null);
  const [reportStatus, setReportStatus] = useState("idle");
  const [notPaySent, setNotPaySent] = useState(false);
  const [activeAlert, setActiveAlert] = useState(null);

  const t = STRINGS[language];

  useEffect(() => {
    if (screen === "result" && risk) speak(t.risk[risk].voice, t.voiceLang);
  }, [screen, risk, language]);

  useEffect(() => {
    getAlerts(true).then((data) => {
      const list = Array.isArray(data) ? data : [];
      if (list.length > 0) setActiveAlert(list[0]);
    }).catch(() => {});
  }, []);

  function resetResultFlags() {
    setReportStatus("idle");
    setNotPaySent(false);
  }

  function goResult(level) {
    setApiResult(null);
    setRisk(level);
    setRawPayload(`demo-${level.toLowerCase()}`);
    resetResultFlags();
    setScreen("result");
  }

  async function handleAnalyze(payload) {
    setRawPayload(payload);
    setLoading(true);
    setInputError(null);
    try {
      const data = await analyzeUpi(payload, "manual", elderly);
      setApiResult(data);
      setRisk(data.risk_level);
      resetResultFlags();
      setScreen("result");
    } catch (e) {
      setInputError(t.checkError);
    } finally {
      setLoading(false);
    }
  }

  async function handleReport() {
    setReportStatus("sending");
    try {
      await submitReport({
        anonymous_id: getAnonymousId(),
        raw_payload: rawPayload || "unknown-payload",
        input_type: "upi",
        source: "manual",
      });
      setReportStatus("sent");
    } catch (e) {
      setReportStatus("idle");
    }
  }

  async function handleNotPay() {
    setNotPaySent(true);
    try {
      await recordPrevention(null, "I did not pay");
    } catch (e) { /* best effort */ }
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-4" style={{ backgroundColor: PALETTE.cream, fontFamily: "Arial, Helvetica, sans-serif" }}>
      <style>{`button, select, textarea { font-family: inherit; }`}</style>
      <div className="w-full max-w-sm rounded-2xl overflow-hidden" style={{ border: `1px solid ${PALETTE.navyMid}`, backgroundColor: PALETTE.white }}>
        <div style={{ backgroundColor: PALETTE.navyDark }}>
          <div className="px-5 pt-4 pb-2 text-center">
            <span style={{ color: PALETTE.cream, fontWeight: 700, fontSize: elderly ? "1.15rem" : "0.95rem" }}>{t.appName}</span>
          </div>
          <div className="flex items-center justify-between gap-3 px-4 pb-4">
            <button onClick={() => setElderly((v) => !v)} className="flex items-center gap-2 rounded-full"
              style={{ backgroundColor: elderly ? PALETTE.cream : "rgba(255,255,255,0.15)", padding: elderly ? "0.85rem 1.1rem" : "0.5rem 0.9rem" }}>
              {elderly ? <ToggleRight size={30} color={PALETTE.navyDark} /> : <ToggleLeft size={20} color={PALETTE.cream} />}
              <span style={{ fontSize: elderly ? "1.05rem" : "0.85rem", color: elderly ? PALETTE.navyDark : PALETTE.cream, fontWeight: 700 }}>{t.elderlyMode}</span>
            </button>
            <LanguageSelect language={language} onChange={setLanguage} label={t.language} elderly={elderly} />
          </div>
        </div>

        <div className="p-5">
          {screen === "home" && <ElderlyHome elderly={elderly} t={t} onStartCheck={() => { setInputError(null); setScreen("input"); }} onCheck={goResult} onEmergency={() => setScreen("emergency")} alert={activeAlert} />}
          {screen === "input" && <ElderlyInput elderly={elderly} t={t} onBack={() => setScreen("home")} onSubmit={handleAnalyze} loading={loading} error={inputError} />}
          {screen === "result" && risk && <ElderlyResult elderly={elderly} t={t} risk={risk} apiResult={apiResult} onBack={() => setScreen("home")} onEmergency={() => setScreen("emergency")} onReplay={() => speak(t.risk[risk].voice, t.voiceLang)} onReport={handleReport} reportStatus={reportStatus} onNotPay={handleNotPay} notPaySent={notPaySent} />}
          {screen === "emergency" && <ElderlyEmergency elderly={elderly} t={t} onBack={() => setScreen(risk ? "result" : "home")} />}
        </div>
      </div>
    </div>
  );
}