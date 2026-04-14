// Invoice Model - MySQL Table Schema

const invoiceSchema = {
  tableName: 'invoices',
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
    appointmentId: {
      type: 'INT',
      allowNull: true,
      references: 'appointments.id'
    },
    amount: {
      type: 'DECIMAL(10,2)',
      allowNull: false
    },
    description: {
      type: 'TEXT',
      allowNull: true
    },
    dueDate: {
      type: 'DATE',
      allowNull: true
    },
    paidDate: {
      type: 'DATE',
      allowNull: true
    },
    status: {
      type: 'ENUM("pending", "paid", "overdue", "cancelled")',
      defaultValue: 'pending',
      allowNull: false
    },
    paymentMethod: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    notes: {
      type: 'TEXT',
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
    patientId: true,
    appointmentId: true,
    status: true,
    dueDate: true
  }
};

// SQL to create invoices table
const createInvoiceTableSQL = `
CREATE TABLE IF NOT EXISTS invoices (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  patientId INT NOT NULL,
  appointmentId INT,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  dueDate DATE,
  paidDate DATE,
  status ENUM('pending', 'paid', 'overdue', 'cancelled') DEFAULT 'pending' NOT NULL,
  paymentMethod VARCHAR(50),
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (appointmentId) REFERENCES appointments(id) ON DELETE SET NULL,
  INDEX idx_patientId (patientId),
  INDEX idx_appointmentId (appointmentId),
  INDEX idx_status (status),
  INDEX idx_dueDate (dueDate)
)
`;

// Invoice validation rules
const invoiceValidation = {
  patientId: {
    required: true,
    type: 'integer',
    message: 'Patient ID is required and must be an integer'
  },
  amount: {
    required: true,
    type: 'decimal',
    min: 0.01,
    message: 'Amount is required and must be greater than 0'
  },
  description: {
    required: false,
    type: 'string',
    message: 'Description must be a string'
  },
  dueDate: {
    required: false,
    type: 'date',
    message: 'Due date must be a valid date'
  },
  status: {
    required: false,
    type: 'enum',
    enum: ['pending', 'paid', 'overdue', 'cancelled'],
    defaultValue: 'pending',
    message: 'Status must be one of: pending, paid, overdue, cancelled'
  },
  paymentMethod: {
    required: false,
    type: 'string',
    enum: ['cash', 'credit_card', 'debit_card', 'bank_transfer', 'insurance'],
    message: 'Payment method must be valid'
  }
};

// Payment methods
const paymentMethods = [
  'cash',
  'credit_card',
  'debit_card',
  'bank_transfer',
  'insurance',
  'check',
  'mobile_payment'
];

// Invoice helper functions
const Invoice = {
  // Validate invoice data
  validate: (data) => {
    const errors = [];

    if (!data.patientId) {
      errors.push('Patient ID is required');
    }
    if (!data.amount) {
      errors.push('Amount is required');
    } else if (data.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    // Validate status if provided
    if (data.status && !['pending', 'paid', 'overdue', 'cancelled'].includes(data.status)) {
      errors.push('Invalid status value');
    }

    // Validate payment method if provided
    if (data.paymentMethod && !paymentMethods.includes(data.paymentMethod)) {
      errors.push('Invalid payment method');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Check if invoice is overdue
  isOverdue: (invoice) => {
    if (invoice.status === 'paid' || invoice.status === 'cancelled') {
      return false;
    }
    if (!invoice.dueDate) {
      return false;
    }
    const today = new Date();
    const dueDate = new Date(invoice.dueDate);
    return dueDate < today;
  },

  // Calculate days overdue
  getDaysOverdue: (dueDate) => {
    if (!dueDate) return 0;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  },

  // Calculate days until due
  getDaysUntilDue: (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  },

  // Format invoice response
  formatResponse: (invoice) => {
    return {
      id: invoice.id,
      patientId: invoice.patientId,
      appointmentId: invoice.appointmentId,
      amount: parseFloat(invoice.amount),
      description: invoice.description,
      dueDate: invoice.dueDate,
      paidDate: invoice.paidDate,
      status: invoice.status,
      paymentMethod: invoice.paymentMethod,
      notes: invoice.notes,
      isOverdue: Invoice.isOverdue(invoice),
      daysOverdue: Invoice.getDaysOverdue(invoice.dueDate),
      daysUntilDue: Invoice.getDaysUntilDue(invoice.dueDate),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    };
  },

  // Get invoice status badge
  getStatusBadge: (status) => {
    const badges = {
      pending: { color: 'warning', label: 'Pending', icon: 'clock' },
      paid: { color: 'success', label: 'Paid', icon: 'check-circle' },
      overdue: { color: 'danger', label: 'Overdue', icon: 'exclamation-circle' },
      cancelled: { color: 'secondary', label: 'Cancelled', icon: 'times-circle' }
    };
    return badges[status] || badges.pending;
  },

  // Calculate total from invoices array
  calculateTotal: (invoices) => {
    return invoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);
  },

  // Filter invoices by date range
  filterByDateRange: (invoices, startDate, endDate) => {
    return invoices.filter(invoice => {
      const createdDate = new Date(invoice.createdAt);
      return createdDate >= new Date(startDate) && createdDate <= new Date(endDate);
    });
  },

  // Generate invoice number
  generateInvoiceNumber: (id) => {
    const timestamp = Date.now();
    return `INV-${timestamp}-${id}`;
  },

  // Get payment due reminder message
  getPaymentReminder: (invoice) => {
    if (invoice.status === 'paid') {
      return 'This invoice has been paid.';
    }
    if (invoice.status === 'cancelled') {
      return 'This invoice has been cancelled.';
    }

    const daysUntilDue = Invoice.getDaysUntilDue(invoice.dueDate);
    
    if (daysUntilDue === null) {
      return 'Due date not set.';
    }
    
    if (daysUntilDue < 0) {
      return `This invoice is ${Math.abs(daysUntilDue)} days overdue.`;
    }
    
    if (daysUntilDue === 0) {
      return 'Due today!';
    }
    
    return `Due in ${daysUntilDue} days.`;
  },

  // Calculate discount percentage
  calculateDiscount: (originalAmount, discountedAmount) => {
    if (originalAmount <= 0) return 0;
    return ((originalAmount - discountedAmount) / originalAmount * 100).toFixed(2);
  },

  // Format currency
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
};

module.exports = {
  invoiceSchema,
  createInvoiceTableSQL,
  invoiceValidation,
  paymentMethods,
  Invoice
};
