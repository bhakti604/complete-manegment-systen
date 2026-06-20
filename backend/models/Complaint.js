const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: String,
  classYear: String,
  category: { 
    type: String, 
    default: "Student" 
  },
  msg: { 
    type: String, 
    required: true 
  },
  priority: { 
    type: String, 
    default: "Medium" 
  },
  targetLevel: { 
    type: String, 
    required: true, 
    enum: ['HOD', 'Principal', 'Management']
  },
  dept: { 
    type: String, 
    required: true 
  }, 
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);