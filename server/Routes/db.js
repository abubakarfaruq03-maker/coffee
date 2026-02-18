import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg; 

// We check if DATABASE_URL exists (Production). 
// If not, it falls back to your local individual variables.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  /* SSL is required for Neon/Vercel. 
     We only turn it on if we are connecting to the cloud.
  */
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Fallback for local development if DATABASE_URL isn't set yet
if (!process.env.DATABASE_URL) {
  pool.options.user = process.env.PG_USER;
  pool.options.host = process.env.PG_HOST;
  pool.options.database = process.env.PG_DATABASE;
  pool.options.password = process.env.PG_PASSWORD;
  pool.options.port = process.env.PG_PORT || 5432;
}

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
