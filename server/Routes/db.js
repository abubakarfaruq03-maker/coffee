import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg; 


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
//  SSl for Noen
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Fallback for local development 
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
