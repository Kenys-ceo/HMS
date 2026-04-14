const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentcontroller');
const auth = require('../middleware/Auth');

// GET all appointments
router.get('/api/appointments', auth.verifyToken, appointmentController.getAllAppointments);

// GET appointment by ID
router.get('/api/appointments/:id', auth.verifyToken, appointmentController.getAppointmentById);

// Create new appointment
router.post('/api/appointments', auth.verifyToken, appointmentController.createAppointment);

// Update appointment
router.put('/api/appointments/:id', auth.verifyToken, appointmentController.updateAppointment);

// Delete appointment
router.delete('/api/appointments/:id', auth.verifyToken, appointmentController.deleteAppointment);

module.exports = router;

