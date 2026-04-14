// Auth Model - MySQL User Table Schema

const userSchema = {
  tableName: 'users',
  columns: {
    id: {
      type: 'INT',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    email: {
      type: 'VARCHAR(255)',
      unique: true,
      allowNull: false
    },
    password: {
      type: 'VARCHAR(255)',
      allowNull: false
    },
    firstName: {
      type: 'VARCHAR(100)',
      allowNull: true
    },
    lastName: {
      type: 'VARCHAR(100)',
      allowNull: true
    },
    role: {
      type: 'ENUM("admin", "doctor", "patient", "staff")',
      defaultValue: 'patient',
      allowNull: false
    },
    isActive: {
      type: 'BOOLEAN',
      defaultValue: true,
      allowNull: false
    },
    lastLogin: {
      type: 'TIMESTAMP',
      allowNull: true
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
    email: true,
    role: true,
    isActive: true
  }
};

// SQL to create users table
const createUserTableSQL = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  role ENUM('admin', 'doctor', 'patient', 'staff') DEFAULT 'patient' NOT NULL,
  isActive BOOLEAN DEFAULT true NOT NULL,
  lastLogin TIMESTAMP NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_isActive (isActive)
)
`;

// User validation rules
const userValidation = {
  email: {
    required: true,
    type: 'email',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Valid email address is required'
  },
  password: {
    required: true,
    type: 'string',
    minLength: 6,
    maxLength: 255,
    message: 'Password must be between 6 and 255 characters'
  },
  firstName: {
    required: false,
    type: 'string',
    maxLength: 100,
    message: 'First name must be less than 100 characters'
  },
  lastName: {
    required: false,
    type: 'string',
    maxLength: 100,
    message: 'Last name must be less than 100 characters'
  },
  role: {
    required: false,
    type: 'enum',
    enum: ['admin', 'doctor', 'patient', 'staff'],
    defaultValue: 'patient',
    message: 'Role must be one of: admin, doctor, patient, staff'
  }
};

// Auth helper functions
const Auth = {
  // Validate user registration data
  validateRegistration: (data) => {
    const errors = [];

    // Validate email
    if (!data.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }

    // Validate password
    if (!data.password) {
      errors.push('Password is required');
    } else if (data.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }

    // Validate role if provided
    if (data.role && !['admin', 'doctor', 'patient', 'staff'].includes(data.role)) {
      errors.push('Invalid role value');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate user login data
  validateLogin: (data) => {
    const errors = [];

    if (!data.email) {
      errors.push('Email is required');
    }

    if (!data.password) {
      errors.push('Password is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Validate password strength
  validatePasswordStrength: (password) => {
    const strength = {
      score: 0,
      feedback: []
    };

    if (password.length >= 8) strength.score++;
    if (password.length >= 12) strength.score++;
    if (/[a-z]/.test(password)) strength.score++;
    if (/[A-Z]/.test(password)) strength.score++;
    if (/[0-9]/.test(password)) strength.score++;
    if (/[^a-zA-Z0-9]/.test(password)) strength.score++;

    if (strength.score < 2) {
      strength.feedback.push('Weak password');
    } else if (strength.score < 4) {
      strength.feedback.push('Moderate password strength');
    } else {
      strength.feedback.push('Strong password');
    }

    return strength;
  },

  // Validate email uniqueness
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Format user response (exclude password)
  formatUserResponse: (user) => {
    delete user.password;
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  },

  // Get role permissions
  getRolePermissions: (role) => {
    const permissions = {
      admin: ['manage_users', 'manage_doctors', 'manage_patients', 'manage_appointments', 'view_reports', 'manage_invoices', 'view_analytics'],
      doctor: ['view_appointments', 'create_reports', 'update_reports', 'view_patients', 'manage_own_schedule'],
      patient: ['view_appointments', 'book_appointments', 'view_reports', 'view_invoices', 'update_medical_history'],
      staff: ['manage_appointments', 'view_patients', 'view_doctors', 'manage_invoices']
    };
    return permissions[role] || [];
  },

  // Check if user can perform action
  canPerformAction: (userRole, action) => {
    const permissions = Auth.getRolePermissions(userRole);
    return permissions.includes(action);
  },

  // Generate password reset token (simple version)
  generateResetToken: () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  },

  // Validate reset token (in real app, check expiration and database)
  validateResetToken: (token) => {
    return token && token.length > 20;
  }
};

module.exports = {
  userSchema,
  createUserTableSQL,
  userValidation,
  Auth
};
