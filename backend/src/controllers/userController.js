import bcrypt from 'bcryptjs';
import pool from '../db/pg.js';
import jwt from 'jsonwebtoken';

const client = pool;

const registerUser = async (req, res) => {
  const { name, email, password, phone, role = 'DRIVER' } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'Please enter name, email, phone, and password.' });
  }

  if (role !== 'DRIVER') {
    return res.status(400).json({ message: 'Public registration is only for drivers.' });
  }

  try {
    const existing = await client.query(
      'SELECT id FROM "User" WHERE email = $1 OR phone = $2',
      [email, phone]
    );

    if (existing.rowCount > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const inserted = await client.query(
      'INSERT INTO "User" (name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role',
      [name, email, phone, hashedPassword, role]
    );

    const user = inserted.rows[0];

    res.status(201).json(user);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Please provide phone and password' });
  }

  try {
    const result = await client.query(
      'SELECT id, name, email, phone, password, role FROM "User" WHERE phone = $1',
      [phone]
    );

    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log('Login successful for:', user.phone);
      const token = jwt.sign(
        { id: user.id, role: user.role, phone: user.phone, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'changeme',
        { expiresIn: '7d' }
      );
      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      });
    } else {
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Update user profile
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;
  try {
    // Fetch current user data
    const currentResult = await client.query('SELECT id, name, email, phone FROM "User" WHERE id = $1', [id]);
    if (currentResult.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const current = currentResult.rows[0];

    // Only update fields that are different
    const fields = [];
    const values = [];
    let idx = 1;
    if (name && name !== current.name) { fields.push(`name = $${idx++}`); values.push(name); }
    if (email && email !== current.email) { fields.push(`email = $${idx++}`); values.push(email); }
    if (phone && phone !== current.phone) { fields.push(`phone = $${idx++}`); values.push(phone); }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      fields.push(`password = $${idx++}`);
      values.push(hashedPassword);
    }
    if (fields.length === 0) {
      return res.status(400).json({ message: 'No changes detected.' });
    }
    values.push(id);
    const query = `UPDATE "User" SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id, name, email, phone, role`;
    const result = await client.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ ...result.rows[0], message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error during update' });
  }
};

export { registerUser, loginUser, updateUser };
