const users = []; // In-memory user store for now

const registerUser = (req, res) => {
  const { name, email, password, phone, role, licensePlate, drivingLicenseId } = req.body;

  if (!name || !email || !password || !phone || !role || !licensePlate || !drivingLicenseId) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  // For public registration, only allow 'driver' role
  if (role !== 'driver') {
      return res.status(400).json({ message: 'Public registration is only for drivers.' });
  }

  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password, // In a real app, you should hash this
    phone,
    role,
    licensePlate,
    drivingLicenseId,
  };

  users.push(user);

  console.log('Registered users:', users);

  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    licensePlate: user.licensePlate,
    drivingLicenseId: user.drivingLicenseId,
  });
};

const loginUser = (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: 'Please provide phone and password' });
  }

  const user = users.find((user) => user.phone === phone);

  if (user && user.password === password) { // In a real app, compare hashed passwords
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
};

export { registerUser, loginUser };
