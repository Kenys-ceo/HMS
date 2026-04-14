const connectDB = require('../config/db');

const reportController = {
  getDashboardSummary: async (req, res) => {
    try {
      const pool = await connectDB();
      const connection = await pool.getConnection();
      
      const [totalPatients] = await connection.execute('SELECT COUNT(*) as count FROM patients');
      const [totalDoctors] = await connection.execute('SELECT COUNT(*) as count FROM doctors');
      const [totalAppointments] = await connection.execute('SELECT COUNT(*) as count FROM appointments');
      const [totalRevenue] = await connection.execute('SELECT SUM(totalAmount) as total FROM invoices WHERE status = "paid"');
      
      connection.release();
      
      res.json({
        success: true,
        data: {
          totalPatients: totalPatients[0].count,
          totalDoctors: totalDoctors[0].count,
          totalAppointments: totalAppointments[0].count,
          totalRevenue: totalRevenue[0].total || 0
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getAppointmentsReport: async (req, res) => {
    try {
      const { start, end } = req.query;
      let query = 'SELECT * FROM appointments WHERE 1=1';
      let params = [];
      if (start || end) {
        query += ' AND date BETWEEN ? AND ?';
        params = [start || '1970-01-01', end || '2100-01-01'];
      }
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const [appointments] = await connection.execute(query, params);
      connection.release();
      res.json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getRevenueReport: async (req, res) => {
    try {
      const { start, end } = req.query;
      let query = 'SELECT DATE(date) as date, SUM(totalAmount) as revenue FROM invoices WHERE status = "paid"';
      if (start || end) {
        query += ' AND date BETWEEN ? AND ?';
      }
      query += ' GROUP BY DATE(date)';
      const params = start && end ? [start, end] : [];
      
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const [report] = await connection.execute(query, params);
      connection.release();
      res.json({ success: true, data: report });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getPatientStats: async (req, res) => {
    try {
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const [stats] = await connection.execute(`
        SELECT 
          COUNT(*) as totalPatients,
          SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) as maleCount,
          SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) as femaleCount
        FROM patients
      `);
      connection.release();
      res.json({ success: true, data: stats[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  getDoctorPerformance: async (req, res) => {
    try {
      const pool = await connectDB();
      const connection = await pool.getConnection();
      const query = `
        SELECT d.id, d.firstName, d.lastName, COUNT(a.id) as appointmentCount
        FROM doctors d
        LEFT JOIN appointments a ON d.id = a.doctorId
        GROUP BY d.id
        ORDER BY appointmentCount DESC
      `;
      const [report] = await connection.execute(query);
      connection.release();
      res.json({ success: true, data: report });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  exportReport: async (req, res) => {
    res.json({ success: true, message: 'Export functionality to be implemented' });
  }
};

module.exports = reportController;
