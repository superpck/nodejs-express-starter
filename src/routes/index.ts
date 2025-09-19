import express from 'express';
import indexRoute from './indexRoute';
import loginRoute from './loginRoute';
import serverRoute from './serverRoute';

const router = express.Router();

// Use routes
router.use('/', indexRoute);
router.use('/server', serverRoute);
router.use('/auth', loginRoute);

export default router;
