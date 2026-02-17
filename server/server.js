import express from 'express';
import menuRouter from './Routes/menu.js';
import cors from 'cors'
import pg from 'pg';
import env from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const app = express();
env.config();

app.use(cors())
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();





app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This is the magic line
// Replace your static line with this:
// Change this line:
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/menu" , menuRouter);


// REGISTER
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username',
      [username, email, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    // Check if the error is a duplicate key error (code 23505)
    if (err.code === '23505') {
      return res.status(400).json({ error: "User already exists" });
    }
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});
// LOGIN
// Updated Login Logic
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ error: "Check your email and password and try again" });

    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) return res.status(400).json({ error: "Check your email and password and try again" });

    const token = jwt.sign(
      { userId: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      token, 
      username: user.rows[0].username,
      email: user.rows[0].email 
    });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});
// GET /api/cart
app.get('/api/cart', async (req, res) => {
  try {
    // We sum the quantities so the badge shows total items, not just unique rows
    const result = await db.query('SELECT * FROM cart_items');
    res.json(result.rows);
  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).send(err.message);
  }
});
// POST /api/cart
app.post('/api/cart', async (req, res) => {
  const { id, title, price, image, quantity } = req.body;
  const qty = quantity || 1;

  try {
    const result = await db.query(
      `INSERT INTO cart_items (product_id, title, price, image_url, quantity)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (product_id) DO UPDATE SET quantity = cart_items.quantity + $5
       RETURNING *`,
      [id, title, price, image, qty]
    );

    // CRITICAL: You must send a JSON response back
    return res.status(200).json(result.rows[0]); 
    
  } catch (err) {
    console.error("DETAILED DB ERROR:", err);
    // Send JSON error so the frontend can parse it
    return res.status(500).json({ error: err.message });
  }
});
// PATCH /api/cart/:id
// ... after your app.post('/api/cart') ...

// Ensure the path is exactly '/api/cart/:id'
app.patch('/api/cart/:id', async (req, res) => {
  const { id } = req.params; // This gets the '69' from the URL
  const { quantity } = req.body;

  try {
    const result = await db.query(
      'UPDATE cart_items SET quantity = $1 WHERE product_id = $2 RETURNING *',
      [quantity, id]
    );

    if (result.rows.length === 0) {
      // If the route is found but the ID doesn't exist in the DB
      return res.status(404).json({ message: "Product ID not found in cart table" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PATCH ROUTE ERROR:", err);
    res.status(500).send(err.message);
  }
});
app.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM cart_items WHERE product_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", deletedItem: result.rows[0] });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).send(err.message);
  }
});
// DELETE ALL items in cart
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
app.delete('/api/cart', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM cart_items');
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(3000,  '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});