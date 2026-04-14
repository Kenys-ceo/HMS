const connectDB = require('../config/db');

const patientController = {
  getAllPatients: async (req, res) => {
    try {
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM patients';
      const [patients] = await connection.execute(query);
      connection.release();
      res.json({ success: true, data: patients });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getPatientById: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'SELECT * FROM patients WHERE id = ?';
      const [patients] = await connection.execute(query, [id]);
      connection.release();
      if (patients.length === 0) return res.status(404).json({ success: false, message: 'Patient not found' });
      res.json({ success: true, data: patients[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  createPatient: async (req, res) => {
    try {
      const { firstName, lastName, email, phone, dateOfBirth, gender, address, emergencyContact } = req.body;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'INSERT INTO patients (firstName, lastName, email, phone, dateOfBirth, gender, address, emergencyContact) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      const [result] = await connection.execute(query, [firstName, lastName, email, phone, dateOfBirth, gender, address, emergencyContact]);
      connection.release();
      res.status(201).json({ success: true, message: 'Patient created', id: result.insertId });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updatePatient: async (req, res) => {
    try {
      const { id } = req.params;
      const fields = req.body;
      const updates = Object.keys(fields).map(key => `${key} = ?`).join(', ');
      const values = Object.values(fields);
      values.push(id);
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = `UPDATE patients SET ${updates} WHERE id = ?`;
      const [result] = await connection.execute(query, values);
      connection.release();
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Patient not found' });
      res.json({ success: true, message: 'Patient updated' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deletePatient: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = 'DELETE FROM patients WHERE id = ?';
      const [result] = await connection.execute(query, [id]);
      connection.release();
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Patient not found' });
      res.json({ success: true, message: 'Patient deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = patientController;
