import dayjs from 'dayjs';
import express from 'express';
import { v4 } from 'uuid';

const router = express.Router();

// Default route
router.get('/', (req, res) => {
  res.json({
    date: dayjs().format('YYYY-MM-DDTHH:mm:ssZ'),
    message: 'Welcome to NodeJS API',
    version: '5.1.0',
    uuid: v4(),
    endpoints: [
      'GET /',
      'GET /test',
      'GET /health',
      'GET /auth/login',
    ]
  });
});

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'Test route is working!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Health check route
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Chat API'
  });
});

export default router;
