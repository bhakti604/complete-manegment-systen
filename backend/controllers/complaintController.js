const Complaint = require("../models/Complaint");
const Admin = require("../models/Admin"); // ✅ Admin model import kela
const sendEmail = require("../utils/mailer"); // ✅ Mailer utility import keli

// 1. Register New Complaint (With Admin Notification)
exports.addComplaint = async (req, res) => {
  try {
    const { email, fullName, msg, dept, targetLevel, category, priority } = req.body;

    // 🛑 Basic Input Validation
    if (!fullName || !msg || !dept || !targetLevel) {
      return res.status(400).json({ error: "❌ Essential fields are missing!" });
    }

    const complaint = new Complaint({
      ...req.body,
      status: "Pending",
      createdAt: new Date()
    });

    // 💾 Save Complaint to Database
    await complaint.save();

    // 📧 --- NOTIFICATION LOGIC START ---
    try {
      // Target Level ani Dept anusar Admin shodha
      // Jar Principal asel tar fkt Level check karel (karan Principal saglya dept sathi ekach astat)
      let query = { level: targetLevel };
      if (targetLevel === "HOD") {
        query.dept = dept;
      }

      const targetAdmin = await Admin.findOne(query);

      if (targetAdmin && targetAdmin.email) {
        const mailSubject = `New ${targetLevel} Level Complaint - ${dept}`;
        const mailBody = `
          Hello ${targetAdmin.name},
          
          Tumchya level chi ek navin complaint register zali aahe.
          
          Details:
          - Student Name: ${fullName}
          - Department: ${dept}
          - Priority: ${priority}
          - Description: ${msg}
          
          Krupaya Admin Dashboard var jaun check kara.
        `;

        await sendEmail(targetAdmin.email, mailSubject, mailBody);
        console.log(`✅ Email sent to ${targetLevel}: ${targetAdmin.email}`);
      }
    } catch (mailErr) {
      console.error("❌ Notification Error:", mailErr.message);
      // Mail gela nahi tari complaint save zali aahe, mhanun error return nahi kela
    }
    // 📧 --- NOTIFICATION LOGIC END ---

    res.status(201).json({ 
      message: "✅ Complaint Submitted Successfully",
      complaintId: complaint._id 
    });

  } catch (err) {
    res.status(500).json({ error: "Server Error: " + err.message });
  }
};

// 2. Get All Complaints (For Principal/General Admin)
exports.getComplaints = async (req, res) => {
  try {
    const data = await Complaint.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Update Complaint (Status & Admin Remarks)
exports.updateComplaint = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { 
        status: status, 
        adminRemarks: remarks, 
        updatedAt: Date.now() 
      },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    // Trigger resolution notification if status changed to Resolved
    if (status === "Resolved" && updatedComplaint.email) {
      try {
        await sendEmail.sendResolutionEmail(updatedComplaint.email, updatedComplaint.fullName, updatedComplaint._id);
      } catch (mailErr) {
        console.error("❌ Resolution notification mail fail:", mailErr.message);
      }
    }

    res.json({ message: "✅ Complaint Updated to " + status, data: updatedComplaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Delete Complaint Record
exports.deleteComplaint = async (req, res) => {
  try {
    const result = await Complaint.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "🗑️ Complaint Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Get Complaints by Department & Level (For Specific Admin View)
exports.getAdminFilteredComplaints = async (req, res) => {
  try {
    const { dept, level } = req.query; 
    let filter = { targetLevel: level };

    if (level === "HOD") {
      filter.dept = dept;
    }

    const data = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};