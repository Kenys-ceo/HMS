const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientcontroller');
const auth = require('../middleware/Auth');

// GET all patients
router.get('/api/patients', auth.verifyToken, patientController.getAllPatients);

// GET patient by ID
router.get('/api/patients/:id', auth.verifyToken, patientController.getPatientById);

// Create new patient
router.post('/api/patients', auth.verifyToken, patientController.createPatient);

// Update patient
router.put('/api/patients/:id', auth.verifyToken, patientController.updatePatient);

// Delete patient
router.delete('/api/patients/:id', auth.verifyToken, patientController.deletePatient);

module.exports = router;

