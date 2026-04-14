const connectDB = require('../config/db');

const invoiceController = {
  getAllInvoices: async (req, res) => {
    try {
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM invoices';
      const [invoices] = await connection.execute(query);
      connection.release();
      res.json({ success: true, data: invoices });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getInvoiceById: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM invoices WHERE id = ?';
      const [invoices] = await connection.execute(query, [id]);
      connection.release();
      if (invoices.length === 0) return res.status(404).json({ success: false, message: 'Invoice not found' });
      res.json({ success: true, data: invoices[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createInvoice: async (req, res) => {
    try {
      const { appointmentId, patientId, totalAmount, status } = req.body;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'INSERT INTO invoices (appointmentId, patientId, totalAmount, status) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [appointmentId, patientId, totalAmount, status || 'pending']);
      connection.release();
      res.status(201).json({ success: true, message: 'Invoice created', id: result.insertId });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateInvoice: async (req, res) => {
    try {
      const { id } = req.params;
      const fields = req.body;
      const updates = Object.keys(fields).map(key => `${key} = ?`).join(', ');
      const values = Object.values(fields);
      values.push(id);
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = `UPDATE invoices SET ${updates} WHERE id = ?`;
      const [result] = await connection.execute(query, values);
      connection.release();
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Invoice not found' });
      res.json({ success: true, message: 'Invoice updated' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteInvoice: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'DELETE FROM invoices WHERE id = ?';
      const [result] = await connection.execute(query, [id]);
      connection.release();
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Invoice not found' });
      res.json({ success: true, message: 'Invoice deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = invoiceController;
