export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const PALETTE = {
  navyDark: "#1c1e44",
  navyMid: "#2b2f54",
  cream: "#F5F6DB",
  navyTint: "#e9e9f1",
  white: "#FFFFFF",
};

export const RISK_META = {
  SAFE: { color: "#1B7A43", bg: "#E6F4EA", Icon: null }, // Icons handled in component
  LOW: { color: "#8A5A00", bg: "#FDF3DC", Icon: null },
  HIGH: { color: "#B94A00", bg: "#FCE8DD", Icon: null },
  CRITICAL: { color: "#B91C1C", bg: "#FBE2E2", Icon: null },
};

export const STATUS_OPTIONS = ["pending", "confirmed scam", "likely safe", "needs investigation", "escalated"];

export const STRINGS = {
  en: {
    appName: "CyberKavach", elderlyMode: "Elderly Mode", language: "Language",
    homeTitle: "Is this payment safe?", homeSubtitle: "Scan a QR code or paste a payment link to check.",
    checkButton: "Check A Payment", demoLabel: "Demo only — simulate a scan result",
    emergencyButton: "Emergency Help", back: "Back", hearAgain: "Hear This Again",
    callNow: "Call 1930 Now", getHelp: "Get Help From Someone", getHelpNowTitle: "Get Help Now",
    call1930: "Call 1930", helpline: "National Cyber Helpline", askFamily: "Ask A Family Member",
    voiceLang: "en-IN", pasteLabel: "Paste The Payment Link Or QR Text Here",
    pastePlaceholder: "e.g. upi://pay?pa=name@bank&am=500", checkThisPayment: "Check This Payment",
    checking: "Checking Your Payment…", checkError: "We could not check this right now. Please try again.",
    tryAgain: "Try Again", scamCategoryLabel: "Type Of Scam", amountLabel: "Amount",
    payeeLabel: "Paying To", adviceTitle: "What You Should Do",
    reportButton: "Report This To Help Others", reportSending: "Sending Report…",
    reportSent: "Thank You. Your Report Has Been Sent.", notPayButton: "I Will Not Pay This",
    notPayConfirmed: "Good. We Have Noted This.", activeAlertTitle: "Current Scam Alert",
    riskScoreLabel: "Risk Score", recommendedActionLabel: "Recommended Action",
    riskIndicatorsTitle: "Why This Was Flagged",
    risk: {
      SAFE: { label: "Safe", message: "This payment looks safe.", voice: "This looks safe. You may continue." },
      LOW: { label: "Ask Someone For Help", message: "This might be risky. Show it to a family member before paying.", voice: "This might be risky. Please ask a family member or friend before you pay." },
      HIGH: { label: "Do Not Pay, Verify", message: "Do not pay yet. Call the person or company to check first.", voice: "Do not pay yet. Please call the person directly to check before you pay." },
      CRITICAL: { label: "Dangerous", message: "Do not pay. This looks like a scam.", voice: "Warning. This may be a scam. Do not pay. Do not share your O T P, PIN, or password." },
    },
  },
  hi: {
    appName: "CyberKavach", elderlyMode: "बुजुर्ग मोड", language: "भाषा",
    homeTitle: "क्या यह भुगतान सुरक्षित है?", homeSubtitle: "जांचने के लिए क्यूआर कोड स्कैन करें या भुगतान लिंक पेस्ट करें।",
    checkButton: "भुगतान जांचें", demoLabel: "केवल डेमो — जांच का परिणाम चुनें",
    emergencyButton: "आपातकालीन मदद", back: "वापस", hearAgain: "फिर से सुनें",
    callNow: "अभी 1930 पर कॉल करें", getHelp: "किसी से मदद लें", getHelpNowTitle: "अभी मदद लें",
    call1930: "1930 पर कॉल करें", helpline: "राष्ट्रीय साइबर हेल्पलाइन", askFamily: "परिवार के सदस्य से पूछें",
    voiceLang: "hi-IN", pasteLabel: "यहां भुगतान लिंक या क्यूआर टेक्स्ट पेस्ट करें",
    pastePlaceholder: "उदाहरण: upi://pay?pa=name@bank&am=500", checkThisPayment: "इस भुगतान की जांच करें",
    checking: "आपके भुगतान की जांच हो रही है…", checkError: "अभी जांच नहीं हो सकी। कृपया फिर से प्रयास करें।",
    tryAgain: "फिर से प्रयास करें", scamCategoryLabel: "धोखाधड़ी का प्रकार", amountLabel: "राशि",
    payeeLabel: "किसे भुगतान", adviceTitle: "आपको क्या करना चाहिए",
    reportButton: "दूसरों की मदद के लिए रिपोर्ट करें", reportSending: "रिपोर्ट भेजी जा रही है…",
    reportSent: "धन्यवाद। आपकी रिपोर्ट भेज दी गई है।", notPayButton: "मैं भुगतान नहीं करूंगा/करूंगी",
    notPayConfirmed: "अच्छा। यह दर्ज कर लिया गया है।", activeAlertTitle: "मौजूदा धोखाधड़ी चेतावनी",
    riskScoreLabel: "जोखिम स्कोर", recommendedActionLabel: "अनुशंसित कार्रवाई",
    riskIndicatorsTitle: "इसे क्यों चिह्नित किया गया",
    risk: {
      SAFE: { label: "सुरक्षित", message: "यह भुगतान सुरक्षित लगता है।", voice: "यह सुरक्षित लगता है। आप आगे बढ़ सकते हैं।" },
      LOW: { label: "किसी से मदद मांगें", message: "इसमें जोखिम हो सकता है। भुगतान करने से पहले परिवार के किसी सदस्य को दिखाएं।", voice: "इसमें जोखिम हो सकता है। कृपया भुगतान करने से पहले परिवार के किसी सदस्य या दोस्त से पूछें।" },
      HIGH: { label: "भुगतान न करें, जांच लें", message