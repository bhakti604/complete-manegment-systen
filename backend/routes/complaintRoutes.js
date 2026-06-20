const express = require("express");
const router = express.Router();

// ⚠️ Controller import kara
const complaintController = require("../controllers/complaintController");

// 1. Get all complaints (Matches GET /api/complaints)
router.get("/", complaintController.getComplaints);

// 2. Register a new complaint (Matches POST /api/complaints)
router.post("/", complaintController.addComplaint);

// 3. Update complaint status / remarks (Matches PUT /api/complaints/:id)
router.put("/:id", complaintController.updateComplaint);

// 4. Delete a complaint record (Matches DELETE /api/complaints/:id)
router.delete("/:id", complaintController.deleteComplaint);

// 5. Get complaints filtered by department & level (Admin View)
router.get("/filter", complaintController.getAdminFilteredComplaints);

module.exports = router;