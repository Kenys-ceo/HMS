const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportcontroller');
const auth = require('../middleware/Auth');

// GET dashboard summary report
router.get('/api/reports/dashboard', auth.verifyToken, reportController.getDashboardSummary);

// GET appointments report (filter by date range)
router.get('/api/reports/appointments', auth.verifyToken, reportController.getAppointmentsReport);

// GET revenue report (by date range)
router.get('/api/reports/revenue', auth.verifyToken, reportController.getRevenueReport);

// GET patient statistics
router.get('/api/reports/patients', auth.verifyToken, reportController.getPatientStats);

// GET doctor performance report
router.get('/api/reports/doctors', auth.verifyToken, reportController.getDoctorPerformance);

// Export report (PDF/Excel - generic endpoint)
router.get('/api/reports/export/:type', auth.verifyToken, reportController.exportReport);

module.exports = router;