// Removed Prisma import
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
  const { name, email, password, phone, role, licensePlate, drivingLicenseId } = req.body;

  if (!name || !email || !password || !phone || !role || !licensePlate || !drivingLicenseId) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  if (role !== 'DRIVER') {
    return res.status(400).json({ message: 'Public registration is only for drivers.' });
  }

  try {
    // TODO: Replace with raw SQL or other DB logic
    const userExists = false; // Placeholder

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // TODO: Replace with raw SQL or other DB logic
    const user = { name, email, password: hashedPassword, phone, role, licensePlate, drivingLicenseId }; // Placeholder

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
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
    const user = await prisma.user.findFirst({ where: { phone } });

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log('Login successful for:', user.phone);
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
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
