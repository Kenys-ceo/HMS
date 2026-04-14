const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connections handled per-request in controllers\n// connectDB();

// Routes
app.use('/api/auth', require('./src/routes/Auth'));
app.use('/api/patients', require('./src/routes/patientroutes'));
app.use('/api/doctors', require('./src/routes/doctorroutes'));
app.use('/api/appointments', require('./src/routes/appointmentroutes'));
app.use('/api/invoices', require('./src/routes/invoiceroutes'));
app.use('/api/reports', require('./src/routes/reportroutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
