const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/complaintDB";

mongoose.connect(mongoURI)
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => console.error("❌ DB Connection Error:", err));


// Complaint Schema
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


// ================= ROUTES =================


// Vercel test route
app.get("/", (req,res)=>{
    res.send("Backend is running successfully 🚀");
});


// Admin Routes
app.use("/api/admin", adminRoutes);


// Complaint Save
app.post("/api/complaints", async (req, res) => {
  try {

    const newComplaint = new Complaint(req.body);

    const savedComplaint = await newComplaint.save();

    res.status(201).json({
      message: "Saved!",
      complaintId: savedComplaint._id
    });

  } catch (err) {

    res.status(500).json({
      error: "Database Save Fail!",
      details: err.message
    });

  }
});


// Update Complaint
app.put("/api/complaints/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    res.json(updated);

  } catch(err){

    res.status(500).json({
      error:"Update Fail!"
    });

  }

});



// Vercel Port
const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`🔥 Server running on port ${PORT}`);
});