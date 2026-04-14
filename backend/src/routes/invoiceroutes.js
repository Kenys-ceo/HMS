const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoicecontroller');
const auth = require('../middleware/Auth');

// GET all invoices
router.get('/api/invoices', auth.verifyToken, invoiceController.getAllInvoices);

// GET invoice by ID
router.get('/api/invoices/:id', auth.verifyToken, invoiceController.getInvoiceById);

// Create new invoice
router.post('/api/invoices', auth.verifyToken, invoiceController.createInvoice);

// Update invoice
router.put('/api/invoices/:id', auth.verifyToken, invoiceController.updateInvoice);

// Delete invoice
router.delete('/api/invoices/:id', auth.verifyToken, invoiceController.deleteInvoice);

module.exports = router;