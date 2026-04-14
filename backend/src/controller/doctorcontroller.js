const connectDB = require('../config/db');

const doctorController = {
  getAllDoctors: async (req, res) => {
    try {
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM doctors';
      const [doctors] = await connection.execute(query);
      connection.release();
      res.json({ success: true, data: doctors });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getDoctorById: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM doctors WHERE id = ?';
      const [doctors] = await connection.execute(query, [id]);
      connection.release();
      if (doctors.length === 0) return res.status(404).json({ success: false, message: 'Doctor not found' });
      res.json({ success: true, data: doctors[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createDoctor: async (req, res) => {
    try {
      const { firstName, lastName, specialty, phone, email, qualification } = req.body;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'INSERT INTO doctors (firstName, lastName, specialty, phone, email, qualification) VALUES (?, ?, ?, ?, ?, ?)';
      const [result] = await connection.execute(query, [firstName, lastName, specialty, phone, email, qualification]);
      connection.release();
      res.status(201).json({ success: true, message: 'Doctor created', id: result.insertId });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateDoctor: async (req, res) => {
    try {
      const { id } = req.params;
      const fields = req.body;
      const updates = Object.keys(fields).map(key => `${key} = ?`).join(', ');
      const values = Object.values(fields);
      values.push(id);
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = `UPDATE doctors SET ${updates} WHERE id = ?`;
      const [result] = await connection.execute(query, values);
      connection.release();
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Doctor not found' });
      res.json({ success: true, message: 'Doctor updated' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteDoctor: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'DELETE FROM doctors WHERE id = ?';
      const [result] = await connection.execute(query, [id]);
      connection.release();
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Doctor not found' });
      res.json({ success: true, message: 'Doctor deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = doctorController;
