const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// 1. Admin Login Route (POST request)
// Jenvha login.js madhun fetch('.../login') call hoil
router.post('/login', adminController.login);

// 2. Admin Profile Fetch Route (GET request)
// Jenvha admin.html load hote tenvha profile check karnyathi
router.get('/profile', adminController.getProfile);

// 3. Admin Profile Update Route
router.put('/update', adminController.updateProfile);
router.post('/update-profile', adminController.updateProfile);

module.exports = router;