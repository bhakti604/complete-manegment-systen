const express = require("express");
const router = express.Router();

// ⚠️ Controller import kara
const complaintController = require("../controllers/complaintController");

// 1. Sagle complaints ghenyasathi (Tuzyatlya controller madhe 'getComplaints' naav aahe)
router.get("/all", complaintController.getComplaints);

// 2. Navin complaint add karnyathi
router.post("/add", complaintController.addComplaint);

// 3. Status update karnyathi
router.put("/update/:id", complaintController.updateComplaint);

// 4. Complaint delete karnyathi
router.delete("/delete/:id", complaintController.deleteComplaint);

// 5. Department wise complaints (Extra feature sathi)
router.get("/dept/:deptName", complaintController.getDeptComplaints);

module.exports = router;