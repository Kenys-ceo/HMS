const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'HMS',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// test connection (optional)
pool.getConnection()
  .then(conn => {
    console.log("MySQL Connected Successfully");
    conn.release();
  })
  .catch(err => {
    console.error("Database Error:", err.message);
  });

// ✅ EXPORT POOL DIRECTLY
module.exports = pool;