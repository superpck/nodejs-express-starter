import express from 'express';
import indexRoute from './indexRoute';
import loginRoute from './loginRoute';

const router = express.Router();

// Use routes
router.use('/', indexRoute);
router.use('/auth', loginRoute);

export default router;
