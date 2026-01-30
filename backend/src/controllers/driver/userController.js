import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../db/pg.js';

const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    role = 'DRIVER',
    licensePlate,
    drivingLicenseId,
    carType,
    fuelType,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !licensePlate ||
    !drivingLicenseId ||
    !carType ||
    !fuelType
  ) {
    return res.status(400).json({
      message:
        'Please enter name, email, phone, password, license plate, driving license ID, car type, and fuel type.',
    });
  }

  if (role !== 'DRIVER') {
    return res.status(400).json({ message: 'Public registration is only for drivers.' });
  }

  try {
    const existing = await pool.query(
      'SELECT id FROM "User" WHERE email = $1 OR phone = $2',
      [email, phone]
    );

    if (existing.rowCount > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const inserted = await pool.query(
      'INSERT INTO "User" (name, email, phone, password, role, "licensePlate", "drivingLicenseId", "carType", "fuelType") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, name, email, phone, role, "licensePlate", "carType", "fuelType"',
      [name, email, phone, hashedPassword, role, licensePlate, drivingLicenseId, carType, fuelType]
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
    const result = await pool.query(
      'SELECT id, name, email, phone, password, role, "licensePlate", "drivingLicenseId", "carType", "fuelType" FROM "User" WHERE phone = $1',
      [phone]
    );

    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, role: user.role, phone: user.phone, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'changeme',
        { expiresIn: '7d' }
      );
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          licensePlate: user.licensePlate,
          drivingLicenseId: user.drivingLicenseId,
          carType: user.carType,
          fuelType: user.fuelType,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid phone number or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export { registerUser, loginUser };
