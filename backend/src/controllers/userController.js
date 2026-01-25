import bcrypt from 'bcryptjs';
import pkg from 'pg';

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres.ixwtwjxjcgjrtnzbbznp:Bkbk123%21%40%23%28%29@aws-1-us-east-1.pooler.supabase.com:6543/postgres',
});

client.connect().then(() => {
  console.log('PostgreSQL client connected (userController)');
}).catch((err) => {
  console.error('PostgreSQL connection error (userController):', err);
});

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
      res.json({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role });
    } else {
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export { registerUser, loginUser };
