const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorcontroller');
const auth = require('../middleware/Auth');

// GET all doctors
router.get('/api/doctors', auth.verifyToken, doctorController.getAllDoctors);

// GET doctor by ID
router.get('/api/doctors/:id', auth.verifyToken, doctorController.getDoctorById);

// Create new doctor
router.post('/api/doctors', auth.verifyToken, doctorController.createDoctor);

// Update doctor
router.put('/api/doctors/:id', auth.verifyToken, doctorController.updateDoctor);

// Delete doctor
router.delete('/api/doctors/:id', auth.verifyToken, doctorController.deleteDoctor);

module.exports = router;

