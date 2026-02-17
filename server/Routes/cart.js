import express from 'express';
import jwt from 'jsonwebtoken';
import db from './db.js';
const router = express.Router();

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// GET all items
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM cart_items');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add/update item
router.post('/', async (req, res) => {
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
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update quantity
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const result = await db.query(
      'UPDATE cart_items SET quantity = $1 WHERE product_id = $2 RETURNING *',
      [quantity, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE single item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM cart_items WHERE product_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Deleted", item: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all (Protected)
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await db.query('DELETE FROM cart_items');
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;