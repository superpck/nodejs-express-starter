import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { testConnection } from './middleware/database';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Trust proxy configuration - required for proper IP detection behind proxies
app.set('trust proxy', process.env.TRUST_PROXY || 1);

// Middleware
app.use(cors());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

app.listen(port, async () => {
  // Test database connection
  await testConnection();
  
  return console.log(`Express is listening at http://localhost:${port}`);
});