import express from 'express';
import { generateToken, verifyToken, AuthenticatedRequest } from '../middleware/auth';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Login route
router.get('/', (req, res) => {
  res.json({
    message: 'Login endpoint is working',
    timestamp: new Date().toISOString()
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Username and password are required'
    });
  }

  // TODO: Replace with actual database lookup
  // Mock user data for demonstration
  const mockUser = {
    id: '1',
    username: 'testuser',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy' // 'secret'
  };

  // Check if username exists (mock check)
  if (username !== mockUser.username) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials'
    });
  }

  // Verify password
  const isValidPassword = bcrypt.compareSync(password, mockUser.password);
  if (!isValidPassword) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials'
    });
  }

  // Generate JWT token
  const token = generateToken({
    id: mockUser.id,
    username: mockUser.username
  });

  res.json({
    status: 'success',
    message: 'Login successful',
    data: {
      username: mockUser.username,
      token: token,
      timestamp: new Date().toISOString()
    }
  });
});

// Logout route (requires authentication)
router.post('/logout', verifyToken, (req: AuthenticatedRequest, res) => {
  res.json({
    status: 'success',
    message: 'Logged out successfully',
    user: req.user?.username,
    timestamp: new Date().toISOString()
  });
});

// Protected route example
router.get('/profile', verifyToken, (req: AuthenticatedRequest, res) => {
  res.json({
    status: 'success',
    message: 'Profile data',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Register route
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Username, email, and password are required'
    });
  }

  // TODO: Implement actual registration logic
  res.status(201).json({
    status: 'success',
    message: 'Registration endpoint is working',
    data: {
      username: username,
      email: email,
      timestamp: new Date().toISOString()
    }
  });
});

export default router;
