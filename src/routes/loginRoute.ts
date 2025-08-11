import express from 'express';
import { generateToken, verifyToken, AuthenticatedRequest } from '../middleware/auth';
import UserModel from '../models/UserModel';

const router = express.Router();

// Login route
router.get('/', (req, res) => {
  res.json({
    message: 'Login endpoint is working',
    timestamp: new Date().toISOString()
  });
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req?.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: 'Username and password are required'
      });
    }

    // Find user by username
    const user = await UserModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await UserModel.verifyPassword(user, password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id.toString(),
      username: user.username
    });

    res.json({
      status: 200,
      message: 'Login successful',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        token: token,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Login error:', error.message || error.code || error);
    res.status(500).json({
      status: 500,
      message: error.message || error.code || 'Internal server error'
    });
  }
});

// Logout route (requires authentication)
router.post('/logout', verifyToken, (req: AuthenticatedRequest, res) => {
  res.json({
    status: 200,
    message: 'Logged out successfully',
    user: req.user?.username,
    timestamp: new Date().toISOString()
  });
});

// Protected route example
router.get('/profile', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        status: 401,
        message: 'User not authenticated'
      });
    }

    const user = await UserModel.findByIdSafe(parseInt(req.user.id));
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found'
      });
    }

    res.json({
      status: 200,
      message: 'Profile data',
      data: user,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Profile error:', error);
    res.status(500).json({
      status: 500,
      message: error.message || error.code || 'Internal server error'
    });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: 'Username, email, and password are required'
      });
    }

    // Check if username already exists
    if (await UserModel.usernameExists(username)) {
      return res.status(409).json({
        status: 409,
        message: 'Username already exists'
      });
    }

    // Check if email already exists
    if (await UserModel.emailExists(email)) {
      return res.status(409).json({
        status: 409,
        message: 'Email already exists'
      });
    }

    // Create user
    const newUser = await UserModel.createUser({
      username,
      email,
      password
    });

    if (!newUser) {
      return res.status(500).json({
        status: 500,
        message: 'Failed to create user'
      });
    }

    res.status(201).json({
      status: 201,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 500,
      message: error.message || error.code || 'Internal server error'
    });
  }
});

export default router;
