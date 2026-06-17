const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: { 
        type: String, 
        default: "" 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    mobile: { 
        type: String, 
        default: "" 
    },
    dept: { 
        type: String, 
        default: "" // e.g., "AI-DS", "CSE", "MECH"
    },
    role: { 
        type: String, 
        enum: ['HOD', 'Principal', 'Management'],
        default: "HOD"
    }
});

module.exports = mongoose.model("Admin", adminSchema);