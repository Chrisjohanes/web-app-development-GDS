require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const newsRoutes = require("./routes/news.routes");
const sermonRoutes = require("./routes/sermon.routes");
const contactRoutes = require("./routes/contact.routes");
const scheduleRoutes = require("./routes/schedule.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route test sederhana untuk cek server hidup
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "GDS API berjalan dengan baik" });
});

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/sermons", sermonRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/schedule", scheduleRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
