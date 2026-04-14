const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/db');

// Register user
exports.register = async (req, res) => {
  try {
    const { email, password, role, firstName, lastName } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email, password, and role are required' 
      });
    }

    const pool = await connectDB();
    const connection = await pool.getConnection();

    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    const [existingUser] = await connection.execute(checkQuery, [email]);

    if (existingUser.length > 0) {
      connection.release();
      return res.status(409).json({ 
        success: false, 
        message: 'User already exists with this email' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const query = 'INSERT INTO users (email, password, role, firstName, lastName, createdAt) VALUES (?, ?, ?, ?, ?, NOW())';
    const [result] = await connection.execute(query, [
      email,
      hashedPassword,
      role,
      firstName || null,
      lastName || null
    ]);

    connection.release();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering user',
      error: error.message 
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    const pool = await connectDB();
    const connection = await pool.getConnection();

    // Find user by email
    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await connection.execute(query, [email]);

    if (users.length === 0) {
      connection.release();
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const user = users[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    connection.release();

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in',
      error: error.message 
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const pool = await connectDB();
    const connection = await pool.getConnection();

    const query = 'SELECT id, email, role, firstName, lastName, createdAt FROM users WHERE id = ?';
    const [users] = await connection.execute(query, [userId]);

    connection.release();

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user',
      error: error.message 
    });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password and new password are required' 
      });
    }

    const pool = await connectDB();
    const connection = await pool.getConnection();

    // Get user
    const query = 'SELECT password FROM users WHERE id = ?';
    const [users] = await connection.execute(query, [userId]);

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, users[0].password);

    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
    await connection.execute(updateQuery, [hashedPassword, userId]);

    connection.release();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating password',
      error: error.message 
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging out',
      error: error.message 
    });
  }
};
