# NodeJS Express Starter

A Node.js Express TypeScript API starter with JWT authentication, database integration, and security middleware.

## Features

- 🚀 Express.js with TypeScript
- 🔐 JWT Authentication with bcrypt password hashing
- 🗄️ Database integration with Knex.js (MySQL/PostgreSQL)
- 🏗️ Model-based architecture with BaseModel
- 🛡️ Security middleware (CORS, Helmet, Rate Limiting)
- 📝 Environment configuration with dotenv
- 🧩 Modular route structure
- ⚡ Hot reload development with tsx/ts-node-dev
- ✨ Built-in TypeScript definitions (no deprecated @types packages)

## Installation

1. Clone the repository
```bash
git clone https://github.com/superpck/nodejs-express-starter.git
cd nodejs-express-starter
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=3000
JWT_SECRET=your-very-secure-secret-key

# Database Configuration
DB_TYPE=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=api
DB_USER=root
DB_PASS=
```

5. Setup Database (Optional)
   - Create database `api` in MySQL/PostgreSQL
   - Create users table:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(100) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   ```

## Available Scripts

```bash
# Development (with tsx - faster)
npm run dev:tsx

# Development (with ts-node-dev)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start

# Run tests
npm test
```

## API Endpoints

### Public Routes
- `GET /` - Welcome message with API info
- `GET /test` - Test endpoint
- `GET /health` - Health check

### Authentication Routes
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout (requires authentication)
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile (requires authentication)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Example
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "secret"
  }'
```

### Register Example
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Using Protected Routes
Include the JWT token in the Authorization header:
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

```
src/
├── index.ts              # Main application entry point
├── middleware/
│   ├── auth.ts          # JWT authentication middleware
│   └── database.ts      # Database configuration and connection
├── models/
│   ├── BaseModel.ts     # Base model class with CRUD operations
│   └── UserModel.ts     # User model with authentication methods
└── routes/
    ├── index.ts         # Main routes aggregator
    ├── indexRoute.ts    # Public routes (home, test, health)
    └── loginRoute.ts    # Authentication routes
```

## Database Integration

The API uses Knex.js query builder with support for:
- **MySQL** (default): Set `DB_TYPE=development`
- **PostgreSQL**: Set `DB_TYPE=postgres`

### Models
- **BaseModel**: Provides common CRUD operations (`findAll`, `findById`, `create`, `update`, `delete`)
- **UserModel**: User-specific methods with password hashing and authentication

## Security Features

- **CORS**: Cross-origin resource sharing protection
- **Helmet**: Security headers middleware
- **Rate Limiting**: Request rate limiting (100 requests per 15 minutes per IP)
- **JWT**: Secure token-based authentication
- **bcrypt**: Password hashing

## Development

The project supports hot reload during development:

```bash
# Using tsx (recommended - faster)
npm run dev:tsx

# Using ts-node-dev
npm run dev
```

## Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Server port | `3000` | `3000` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` | `super-secure-jwt-secret-key` |
| `TRUST_PROXY` | Trust proxy configuration for rate limiting | `1` | `1`, `2`, `true` |
| `DB_TYPE` | Database type | `development` | `development` or `postgres` |
| `DB_HOST` | Database host | `localhost` | `localhost` |
| `DB_PORT` | Database port | `3306` (MySQL) / `5432` (PostgreSQL) | `3306` |
| `DB_NAME` | Database name | `chat_api` | `my_app_db` |
| `DB_USER` | Database user | `root` (MySQL) / `postgres` (PostgreSQL) | `dbuser` |
| `DB_PASS` | Database password | ` ` | `password123` |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Credits

This project was developed with assistance from **GitHub Copilot** - an AI pair programming tool that helped accelerate development and improve code quality.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

Made with ❤️ and GitHub Copilot
