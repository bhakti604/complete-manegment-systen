const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  classYear: String,
  category: String,
  description: String,
  priority: String,
  
  // ✅ NAVIN FIELDS ADD KELE AAHE
  targetLevel: { 
    type: String, 
    required: true, 
    enum: ['HOD', 'Principal', 'Management'] // He options fkt select karta yetil
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