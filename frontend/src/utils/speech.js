export function speak(text, langCode) {
  try {
    if (window && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.85;
      utter.lang = langCode || "en-IN";
      window.speechSynthesis.speak(utter);
    }
  } catch (e) {
    /* speech not supported */
  }
}

export function formatAction(action) {
  if (!action) return "";
  return action.toLowerCase().split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}