const { Pool } = require('pg');
require('dotenv').config(); // Loads environment variables from .env file

// Create a new pool for connections to the PostgreSQL database
const pool = new Pool({
  user: 'postgres',                 // Username for PostgreSQL
  host: 'localhost',                // PostgreSQL host
  database: 'marcys-employee-manager', // Database name
  password: 'IAmShitAtCoding1!',     // PostgreSQL password
  port: 5432,                       // Default PostgreSQL port
});

module.exports = pool;
