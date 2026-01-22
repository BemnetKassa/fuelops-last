import bcrypt from 'bcryptjs';
import pkg from 'pg';
const { Client } = pkg;


const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres.ixwtwjxjcgjrtnzbbznp:Bkbk123%21%40%23%28%29@aws-1-us-east-1.pooler.supabase.com:6543/postgres',
});

// Connect once at server startup
client.connect().then(() => {
  console.log('PostgreSQL client connected (adminController)');
}).catch(err => {
  console.error('PostgreSQL connection error:', err);
});

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  try {
    const result = await client.query('SELECT * FROM "Admin" WHERE email = $1', [email]);
    const admin = result.rows[0];
    if (admin && (await bcrypt.compare(password, admin.password))) {
      // You can generate a token here if needed
      res.json({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: 'ADMIN',
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during admin login' });
  }
};
