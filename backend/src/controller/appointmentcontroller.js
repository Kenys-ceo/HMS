const connectDB = require('../config/db');

const appointmentController = {
  getAllAppointments: async (req, res) => {
    try {
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM appointments';
      const [appointments] = await connection.execute(query);
      connection.release();
      res.json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAppointmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM appointments WHERE id = ?';
      const [appointments] = await connection.execute(query, [id]);
      connection.release();
      if (appointments.length === 0) return res.status(404).json({ success: false, message: 'Appointment not found' });
      res.json({ success: true, data: appointments[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createAppointment: async (req, res) => {
    try {
      const { patientId, doctorId, serviceId, date, time, status } = req.body;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'INSERT INTO appointments (patientId, doctorId, serviceId, date, time, status) VALUES (?, ?, ?, ?, ?, ?)';
      const [result] = await connection.execute(query, [patientId, doctorId, serviceId, date, time, status || 'scheduled']);
      connection.release();
      res.status(201).json({ success: true, message: 'Appointment created', id: result.insertId });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const fields = req.body;
      const updates = Object.keys(fields).map(key => `${key} = ?`).join(', ');
      const values = Object.values(fields);
      values.push(id);
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = `UPDATE appointments SET ${updates} WHERE id = ?`;
      const [result] = await connection.execute(query, values);
      connection.release();
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Appointment not found' });
      res.json({ success: true, message: 'Appointment updated' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'DELETE FROM appointments WHERE id = ?';
      const [result] = await connection.execute(query, [id]);
      connection.release();
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Appointment not found' });
      res.json({ success: true, message: 'Appointment deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = appointmentController;
