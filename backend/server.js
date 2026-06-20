const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// 📂 Routes Import
const adminRoutes = require("./routes/adminRoutes"); 
const complaintRoutes = require("./routes/complaintRoutes"); 

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/complaintDB";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// 🌐 API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);

// 📂 Serve Static Frontend Files
// Visiting "/" serves the start.html (splash screen)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/start.html"));
});

// Serve other static assets and HTML pages
app.use(express.static(path.join(__dirname, "../frontend")));

// Fallback all other routes to start.html (skipping API paths)
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "../frontend/start.html"));
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});