const Admin = require("../models/Admin");

// 1. Admin Login Logic
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Database madhe admin shodha
        const admin = await Admin.findOne({ email: email, password: password });

        if (admin) {
            // Login success: Role (HOD/Principal) pathva
            res.json({ 
                message: "Login Success", 
                role: admin.role,
                dept: admin.dept 
            });
        } else {
            // Login fail
            res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Admin chi mahiti fetch karne (Profile check sathi)
exports.getProfile = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.query.email });
        res.json(admin || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Admin chi mahiti update karne (Modal madhun)
exports.updateProfile = async (req, res) => {
    const { email, dept, mobile } = req.body;
    try {
        const updatedAdmin = await Admin.findOneAndUpdate(
            { email: email },
            { dept: dept, mobile: mobile },
            { new: true, upsert: true } 
        );
        res.json({ message: "Success", data: updatedAdmin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};