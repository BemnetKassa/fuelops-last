import bcrypt from 'bcryptjs';
import pkg from 'pg';
const { Client } = pkg;


const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres.ixwtwjxjcgjrtnzbbznp:Bkbk123%21%40%23%28%29@aws-1-us-east-1.pooler.supabase.com:6543/postgres',
});

// Connect once at server startup
client.connect().then(() => {
  console.log('PostgreSQL client connected (stationAdminController)');
}).catch(err => {
  console.error('PostgreSQL connection error:', err);
});

export const stationAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  try {
    const result = await client.query('SELECT * FROM "StationAdmin" WHERE email = $1', [email]);
    const stationAdmin = result.rows[0];
    if (stationAdmin && (await bcrypt.compare(password, stationAdmin.password))) {
      res.json({
        id: stationAdmin.id,
        name: stationAdmin.name,
        email: stationAdmin.email,
        phone: stationAdmin.phone,
        stationId: stationAdmin.stationId,
        role: 'STATION_ADMIN',
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Station admin login error:', error);
    res.status(500).json({ message: 'Server error during station admin login' });
  }
};
