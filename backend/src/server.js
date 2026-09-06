app.get("/", (req, res) => {
  res.send("CyberKavach API is running. Use /api/health to check status.");
});
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok", project: "CyberKavach" }));
app.use("/api/v2/analyze", require("./routes/analyze.routes"));
app.use("/api/v2/reports", require("./routes/reports.routes"));
app.use("/api/v2/alerts", require("./routes/alerts.routes"));
app.use("/api/v2/prevention-events", require("./routes/prevention.routes"));
app.use("/api/v2/dashboard", require("./routes/dashboard.routes"));

app.listen(process.env.PORT || 5000, () => console.log(`🚀 CyberKavach Backend running on port ${process.env.PORT || 5000}`));