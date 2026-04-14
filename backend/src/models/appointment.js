// Appointment Model - MySQL Table Schema

const appointmentSchema = {
  tableName: 'appointments',
  columns: {
    id: {
      type: 'INT',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    patientId: {
      type: 'INT',
      allowNull: false,
      references: 'patients.id'
    },
    doctorId: {
      type: 'INT',
      allowNull: false,
      references: 'doctors.id'
    },
    appointmentDate: {
      type: 'DATE',
      allowNull: false
    },
    appointmentTime: {
      type: 'TIME',
      allowNull: false
    },
    reason: {
      type: 'VARCHAR(500)',
      allowNull: true
    },
    status: {
      type: 'ENUM("scheduled", "completed", "cancelled", "no-show")',
      defaultValue: 'scheduled',
      allowNull: false
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP'
    }
  },
  indexes: {
    patientId: true,
    doctorId: true,
    appointmentDate: true,
    status: true
  }
};

// SQL to create appointments table
const createAppointmentTableSQL = `
CREATE TABLE IF NOT EXISTS appointments (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  patientId INT NOT NULL,
  doctorId INT NOT NULL,
  appointmentDate DATE NOT NULL,
  appointmentTime TIME NOT NULL,
  reason VARCHAR(500),
  status ENUM('scheduled', 'completed', 'cancelled', 'no-show') DEFAULT 'scheduled' NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE,
  INDEX idx_patientId (patientId),
  INDEX idx_doctorId (doctorId),
  INDEX idx_appointmentDate (appointmentDate),
  INDEX idx_status (status)
)
`;

// Sample appointment data validation rules
const appointmentValidation = {
  patientId: {
    required: true,
    type: 'integer',
    message: 'Patient ID is required and must be an integer'
  },
  doctorId: {
    required: true,
    type: 'integer',
    message: 'Doctor ID is required and must be an integer'
  },
  appointmentDate: {
    required: true,
    type: 'date',
    message: 'Appointment date is required (YYYY-MM-DD)',
    minDate: new Date()
  },
  appointmentTime: {
    required: true,
    type: 'time',
    message: 'Appointment time is required (HH:MM:SS)'
  },
  reason: {
    required: false,
    type: 'string',
    maxLength: 500,
    message: 'Reason must be less than 500 characters'
  },
  status: {
    required: false,
    type: 'enum',
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    defaultValue: 'scheduled',
    message: 'Status must be one of: scheduled, completed, cancelled, no-show'
  }
};

// Appointment helper functions
const Appointment = {
  // Validate appointment data
  validate: (data) => {
    const errors = [];

    if (!data.patientId) {
      errors.push('Patient ID is required');
    }
    if (!data.doctorId) {
      errors.push('Doctor ID is required');
    }
    if (!data.appointmentDate) {
      errors.push('Appointment date is required');
    }
    if (!data.appointmentTime) {
      errors.push('Appointment time is required');
    }

    // Validate status if provided
    if (data.status && !['scheduled', 'completed', 'cancelled', 'no-show'].includes(data.status)) {
      errors.push('Invalid status value');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Check if appointment date is in the future
  isFutureDate: (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime > new Date();
  },

  // Format appointment response
  formatResponse: (appointment) => {
    return {
      id: appointment.id,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      reason: appointment.reason,
      status: appointment.status,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt
    };
  },

  // Get appointment status badge
  getStatusBadge: (status) => {
    const badges = {
      scheduled: { color: 'blue', label: 'Scheduled' },
      completed: { color: 'green', label: 'Completed' },
      cancelled: { color: 'red', label: 'Cancelled' },
      'no-show': { color: 'orange', label: 'No Show' }
    };
    return badges[status] || badges.scheduled;
  }
};

module.exports = {
  appointmentSchema,
  createAppointmentTableSQL,
  appointmentValidation,
  Appointment
};
