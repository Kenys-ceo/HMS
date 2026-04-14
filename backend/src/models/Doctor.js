// Doctor Model - MySQL Table Schema

const doctorSchema = {
  tableName: 'doctors',
  columns: {
    id: {
      type: 'INT',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: 'INT',
      allowNull: false,
      references: 'users.id'
    },
    firstName: {
      type: 'VARCHAR(100)',
      allowNull: false
    },
    lastName: {
      type: 'VARCHAR(100)',
      allowNull: false
    },
    specialty: {
      type: 'VARCHAR(100)',
      allowNull: false
    },
    qualifications: {
      type: 'TEXT',
      allowNull: true
    },
    phone: {
      type: 'VARCHAR(20)',
      allowNull: true
    },
    email: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    licenseNumber: {
      type: 'VARCHAR(100)',
      unique: true,
      allowNull: true
    },
    yearsOfExperience: {
      type: 'INT',
      allowNull: true
    },
    bio: {
      type: 'TEXT',
      allowNull: true
    },
    isAvailable: {
      type: 'BOOLEAN',
      defaultValue: true,
      allowNull: false
    },
    rating: {
      type: 'DECIMAL(3,2)',
      defaultValue: 0,
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
    userId: true,
    specialty: true,
    licenseNumber: true,
    isAvailable: true
  }
};

// SQL to create doctors table
const createDoctorTableSQL = `
CREATE TABLE IF NOT EXISTS doctors (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  userId INT NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  qualifications TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  licenseNumber VARCHAR(100) UNIQUE,
  yearsOfExperience INT,
  bio TEXT,
  isAvailable BOOLEAN DEFAULT true NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_userId (userId),
  INDEX idx_specialty (specialty),
  INDEX idx_licenseNumber (licenseNumber),
  INDEX idx_isAvailable (isAvailable)
)
`;

// Doctor validation rules
const doctorValidation = {
  userId: {
    required: true,
    type: 'integer',
    message: 'User ID is required and must be an integer'
  },
  firstName: {
    required: true,
    type: 'string',
    maxLength: 100,
    message: 'First name is required and must be less than 100 characters'
  },
  lastName: {
    required: true,
    type: 'string',
    maxLength: 100,
    message: 'Last name is required and must be less than 100 characters'
  },
  specialty: {
    required: true,
    type: 'string',
    maxLength: 100,
    message: 'Specialty is required and must be less than 100 characters'
  },
  licenseNumber: {
    required: false,
    type: 'string',
    maxLength: 100,
    message: 'License number must be less than 100 characters'
  },
  phone: {
    required: false,
    type: 'string',
    pattern: /^[\d\-\+\(\)\s]+$/,
    message: 'Invalid phone number format'
  },
  yearsOfExperience: {
    required: false,
    type: 'integer',
    min: 0,
    message: 'Years of experience must be a positive number'
  }
};

// Doctor specialties list
const doctorSpecialties = [
  'Cardiology',
  'Dermatology',
  'Endocrinology',
  'Gastroenterology',
  'Neurology',
  'Oncology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Pulmonology',
  'Radiology',
  'Surgery',
  'Urology',
  'Gynecology',
  'Ophthalmology',
  'ENT (Otolaryngology)',
  'General Practice',
  'Internal Medicine'
];

// Doctor helper functions
const Doctor = {
  // Validate doctor data
  validate: (data) => {
    const errors = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }
    if (!data.firstName) {
      errors.push('First name is required');
    }
    if (!data.lastName) {
      errors.push('Last name is required');
    }
    if (!data.specialty) {
      errors.push('Specialty is required');
    }

    // Validate specialty
    if (data.specialty && !Doctor.isValidSpecialty(data.specialty)) {
      errors.push('Invalid specialty selected');
    }

    // Validate phone if provided
    if (data.phone && !/^[\d\-\+\(\)\s]+$/.test(data.phone)) {
      errors.push('Invalid phone number format');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Check if specialty is valid
  isValidSpecialty: (specialty) => {
    return doctorSpecialties.includes(specialty);
  },

  // Get all available specialties
  getSpecialties: () => {
    return doctorSpecialties;
  },

  // Format doctor response
  formatResponse: (doctor) => {
    return {
      id: doctor.id,
      userId: doctor.userId,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      fullName: `${doctor.firstName} ${doctor.lastName}`,
      specialty: doctor.specialty,
      qualifications: doctor.qualifications,
      phone: doctor.phone,
      email: doctor.email,
      licenseNumber: doctor.licenseNumber,
      yearsOfExperience: doctor.yearsOfExperience,
      bio: doctor.bio,
      isAvailable: doctor.isAvailable,
      rating: doctor.rating,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt
    };
  },

  // Calculate doctor rating
  calculateRating: (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(2);
  },

  // Check if doctor is available
  isAvailable: (doctor) => {
    return doctor.isAvailable === true;
  },

  // Get experience level
  getExperienceLevel: (yearsOfExperience) => {
    if (!yearsOfExperience) return 'Not specified';
    if (yearsOfExperience < 2) return 'Trainee';
    if (yearsOfExperience < 5) return 'Junior';
    if (yearsOfExperience < 10) return 'Experienced';
    return 'Senior';
  },

  // Format doctor search result
  formatSearchResult: (doctor) => {
    return {
      id: doctor.id,
      fullName: `${doctor.firstName} ${doctor.lastName}`,
      specialty: doctor.specialty,
      yearsOfExperience: doctor.yearsOfExperience,
      experienceLevel: Doctor.getExperienceLevel(doctor.yearsOfExperience),
      rating: doctor.rating,
      isAvailable: doctor.isAvailable,
      bio: doctor.bio ? doctor.bio.substring(0, 200) : ''
    };
  },

  // Generate doctor profile completion percentage
  getProfileCompleteness: (doctor) => {
    let completed = 0;
    let total = 8;

    if (doctor.firstName) completed++;
    if (doctor.lastName) completed++;
    if (doctor.specialty) completed++;
    if (doctor.qualifications) completed++;
    if (doctor.phone) completed++;
    if (doctor.licenseNumber) completed++;
    if (doctor.yearsOfExperience) completed++;
    if (doctor.bio) completed++;

    return {
      percentage: Math.round((completed / total) * 100),
      completed,
      total
    };
  }
};

module.exports = {
  doctorSchema,
  createDoctorTableSQL,
  doctorValidation,
  doctorSpecialties,
  Doctor
};
