const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// 1. 📂 ROUTES IMPORT KARA (He add karne garjeche aahe)
const adminRoutes = require("./routes/adminRoutes"); 

const app = express();
app.use(cors());
app.use(express.json());

// 🔌 MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/complaintDB";

mongoose.connect(mongoURI)
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => console.error("❌ DB Connection Error:", err));

// 📝 Schema Definition (Complaints sathi)
const complaintSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dept: { type: String, required: true },
  level: { type: String, default: "Department" },
  priority: { type: String, default: "Medium" },
  category: { type: String, default: "Student" },
  msg: { type: String, required: true }, 
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// ---------------------------------------------------------
// 🌐 API ROUTES
// ---------------------------------------------------------

// 2. 🔗 ADMIN ROUTES LINK KARA (He add kara)
app.use("/api/admin", adminRoutes);

// 3. COMPLAINT ROUTES
app.post("/api/complaints", async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    const savedComplaint = await newComplaint.save();
    res.status(201).json({ message: "Saved!", complaintId: savedComplaint._id });
  } catch (err) {
    res.status(500).json({ error: "Database Save Fail!", details: err.message });
  }
});

app.get("/api/admin/profile", async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.query.email });
        res.json(admin);
    } catch (err) {
        res.status(500).send("Error fetching profile");
    }

});

app.put("/api/complaints/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id, 
      { status: status }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update Fail!" });
  }
});

// 🚀 Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});